#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser
import uuid
import random
import json
import math

from flask import request, g
from bson.objectid import ObjectId
from jsonschema import validate, ValidationError
from mongoengine.queryset import queryset_manager

from survaider.minions.helpers import HashId, Obfuscate, Uploads
from survaider.minions.contextresolver import current_user
from survaider.minions.attachment import Image as AttachmentImage
from survaider.user.model import User
from survaider.notification.signals import survey_response_notify
from survaider.survey.structuretemplate import survey_struct_schema
from survaider.survey.structuretemplate import starter_template
from survaider import db, app

class Survey(db.Document):
    added       = db.DateTimeField(default = datetime.datetime.now)

    metadata    = db.DictField()
    structure   = db.DictField()
    attachments = db.ListField(db.ReferenceField(AttachmentImage))

    created_by  = db.ListField(db.ReferenceField(User))

    meta = {'allow_inheritance': True, 'strict': False}

    def __unicode__(self):
        return HashId.encode(self.id)

    @property
    def resolved_root(self):
        return self

    @property
    def cols(self):
        return [_['cid'] for _ in self.structure['fields']]

    @property
    def notification_hooks(self):
        rules = {}
        for field in self.structure['fields']:
            if field.get('notifications', False) is True:
                options = enumerate(field['field_options'].get('options', []))
                store = []
                for i, option in options:
                    if option.get('notify', False) is True:
                        val = "a_{0}".format(i + 1)

                        for j in range(0, 5):
                            if option.get("notify_{0}".format(j)):
                                store.append("a_{0}##{1}".format(i + 1, j + 1))
                        store.append(val)

                rules[field['cid']] = store

        return rules

    @property
    def questions(self):
        return [[_['cid'], _['label']] for _ in self.structure['fields']]

    @property
    def expires(self):
        return self.metadata['expires'] if 'expires' in self.metadata else datetime.datetime.max

    @expires.setter
    def expires(self, value):
        self.metadata['expires'] = value

    @property
    def active(self):
        time_now = datetime.datetime.now()
        return all([
            not self.hidden,
            time_now <= self.expires,
            not self.paused,
            self.response_cap > self.obtained_responses,
        ])

    @property
    def paused(self):
        return self.metadata['paused'] if 'paused' in self.metadata else False

    @paused.setter
    def paused(self, value):
        self.metadata['paused'] = value

    @property
    def response_cap(self):
        return self.metadata['response_cap'] if 'response_cap' in self.metadata else 2**32

    @property
    def obtained_responses(self):
        return ResponseAggregation(self).count

    @response_cap.setter
    def response_cap(self, value):
        self.metadata['response_cap'] = value

    @property
    def struct(self):
        ret = {}
        ret['fields'] = self.structure.get('fields',
                                           starter_template['fields'])
        ret['screens'] = self.structure.get('screens',
                                           starter_template['screens'])
        ret['links'] = self.structure.get('links', None)

        return ret

    @struct.setter
    def struct(self, value):
        try:
            validate(value, survey_struct_schema)
            self.structure.update(value)
        except ValidationError as e:
            raise TypeError('Struct value invalid' + str(e))

    #: DEPRECATED
    @property
    def gamified_enabled(self):
        return False

    @property
    def modified(self):
        return self.metadata['modified'] if 'modified' in self.metadata else self.added

    @property
    def img_uploads(self):
        return [_.repr for _ in self.attachments]

    @property
    def hidden(self):
        return self.metadata['hidden'] if 'hidden' in self.metadata else False

    @hidden.setter
    def hidden(self, value):
        self.metadata['hidden'] = value

    @property
    def units(self):
        dat = SurveyUnit.objects(referenced = self)
        return [_.repr for _ in dat if not _.hidden]

    @property
    def unit_count(self):
        return SurveyUnit.objects(referenced = self).count()

    @property
    def units_as_objects(self):
        dat = SurveyUnit.objects(referenced = self)
        return [_ for _ in dat if not _.hidden]

    def save(self, **kwargs):
        self.metadata['modified'] = datetime.datetime.now()
        super(Survey, self).save(**kwargs)

    @queryset_manager
    def objects(doc_cls, queryset):
        return queryset.filter()

    @queryset_manager
    def root(doc_cls, queryset):
        return queryset.filter(_cls = 'Survey')

    #: DEPRECATION WARNING: WILL BE CHANGED.
    @property
    def repr(self):
        return {
            'id': str(self),
            'name': self.metadata['name'],
            'ext': self.metadata.get('external', []),
            'is_gamified': self.gamified_enabled,
            'uri_simple': '/survey/s:{0}/simple'.format(str(self)),
            'uri_game': '/survey/s:{0}/gamified'.format(str(self)),
            'uri_edit': '/survey/s:{0}/edit'.format(str(self)),
            'uri_responses': '/survey/s:{0}/analysis'.format(str(self)),
            'is_paused': self.paused,
            'is_active': self.active,
            'imgs': self.img_uploads,
            'units': self.units,
            'has_response_cap': self.response_cap,
            'has_obtained_responses': self.obtained_responses,
            'has_expired': self.expires <= datetime.datetime.now(),
            'expires': str(self.expires),
            'created_on': str(self.added),
            'last_modified': str(self.modified),
        }

    @property
    def repr_sm(self):
        return {
            'id': str(self),
            'meta': {
                'name': self.metadata['name'],
                'type': self._cls,
            },
            'status': {
                'paused': self.paused,
                'active': self.active,
                'response_cap': self.response_cap,
                'response_count': self.obtained_responses,
                'expired': self.expires <= datetime.datetime.now(),
                'unit_count': self.unit_count,
            },
            'access': {
                'accessible': [_.repr for _ in self.created_by],
                'editable': True, #: Root Survey
                'owner': True,
            },
            'info': {
                'expires': str(self.expires),
                'added': str(self.added),
                'modified': str(self.modified),
            }
        }

    @property
    def tiny_repr(self):
        return {
            'id':       str(self),
            'name':     self.metadata['name'],
            'active':   self.active,
        }

    #: DEPRECATED
    @property
    def render_json(self):
        #: DEPRECATION WARNING: This method will be removed.
        rt = {}
        rt['fields'] = []
        rt['game_title'] = ""
        rt['game_description'] = ""
        rt['game_footer'] = ""
        rt['survey_logo'] = ""
        rt['WARNING'] = "This Feature has been deprecated.\
            It will be removed in coming versions.\
            This API Call has been preserved for backwards\
            compatibility."
        return rt

    @property
    def render_deepjson(self):

        rt = {}
        cp = self.struct['fields']

        def logic(id_next):
            return {
                'va': id_next
            }

        for i in range(len(cp)):
            option_len = len(cp[i]['field_options'].get('options', []))
            for j in range(option_len):
                img = cp[i]['field_options']['options'][j].get('img_uri', None)
                if img is not None:
                    cp[i]['field_options']['options'][j]['img_uri'] = Uploads.url_for_surveyimg(img)
            cp[i]['next'] = logic('end' if (i + 1) >= len(cp) else cp[i + 1]['cid'])

        rt['fields'] = cp
        rt['survey_title'] = self.struct['screens'][0]

        give_img = len(self.struct['screens']) >= 4 and len(self.struct['screens'][3]) > 1

        rt['survey_logo'] = Uploads.url_for_surveyimg(self.struct['screens'][3]) if give_img else False
        rt['survey_description'] = self.struct['screens'][1]
        rt['survey_footer'] = self.struct['screens'][2]
        return rt

class SurveyUnit(Survey):
    referenced = db.ReferenceField(Survey, required = True)
    unit_name  = db.StringField()

    def __init__(self, **kwargs):
        super(SurveyUnit, self).__init__(**kwargs)
        if self.referenced:
            self.structure = self.referenced.structure
            self.metadata.update(self.referenced.metadata)

    @property
    def units(self):
        "SurveyUnits cannot have Units."
        return None

    @property
    def resolved_root(self):
        return self.referenced.resolved_root

    @property
    def repr(self):
        return {
            'id': str(self),
            'unit_name': self.unit_name,
            'name': self.metadata['name'],
            'is_gamified': self.gamified_enabled,
            'uri_simple': '/survey/s:{0}/simple'.format(str(self)),
            'uri_game': '/survey/s:{0}/gamified'.format(str(self)),
            'uri_edit': '/survey/s:{0}/edit'.format(str(self)),
            'uri_responses': '/survey/s:{0}/analysis'.format(str(self)),
            'is_paused': self.paused,
            'is_active': self.active,
            'has_response_cap': self.response_cap,
            'has_obtained_responses': self.obtained_responses,
            'has_expired': self.expires <= datetime.datetime.now(),
            'expires': str(self.expires),
            'created_on': str(self.added),
            'last_modified': str(self.modified),
        }

    @property
    def repr_sm(self):
        return {
            'id': str(self),
            'rootid': str(self.resolved_root),
            'meta': {
                'name': self.unit_name,
                'rootname': self.resolved_root.metadata['name'],
                'type': self._cls,
            },
            'status': {
                'paused': self.paused,
                'active': self.active,
                'response_cap': self.response_cap,
                'response_count': self.obtained_responses,
                'expired': self.expires <= datetime.datetime.now(),
                'unit_count': False,
            },
            'access': {
                'accessible': [_.repr for _ in self.created_by],
                'editable': False, #: Unit Survey
                'owner': current_user() in self.resolved_root.created_by,
            },
            'info': {
                'expires': str(self.expires),
                'added': str(self.added),
                'modified': str(self.modified),
            }
        }

    @property
    def tiny_repr(self):
        return {
            'id':       str(self),
            'name':     self.unit_name,
            'active':   self.active,
        }

    @queryset_manager
    def objects(doc_cls, queryset):
        return queryset.filter()

class Response(db.Document):
    parent_survey   = db.ReferenceField(Survey)

    metadata        = db.DictField()
    responses       = db.DictField()

    def __unicode__(self):
        return HashId.encode(self.id)

    def add(self, qid, qres):
        if qid in self.parent_survey.cols:
            self.responses[qid] = qres
            self.metadata['modified'] = datetime.datetime.now()
            self.save()
        else:
            raise TypeError("Question ID is invalid")

        if qid in self.parent_survey.notification_hooks:
            for hook in qres.split('###'):
                if hook in self.parent_survey.notification_hooks[qid]:
                    survey_response_notify.send(self.parent_survey,
                                                response = self,
                                                qid = qid,
                                                qres = qres)

    @property
    def added(self):
        return self.metadata['started'] if 'started' in self.metadata else datetime.datetime.min

class ResponseSession(object):

    @staticmethod
    def start(survey_id, response_id):
        #: Payload: [Survey ID, Start Time, End Time, Finished?]
        expires = datetime.datetime.now() + datetime.timedelta(days=1)
        payload = {
            str(survey_id): [expires.isoformat(), str(response_id), False]
        }

        g.SRPL.update(payload)

    @staticmethod
    def get_running_id(survey_id):
        s_id = str(survey_id)
        if s_id in g.SRPL:
            res_id = g.SRPL[s_id][1]
            return res_id

    @staticmethod
    def is_running(survey_id):
        s_id = str(survey_id)
        if s_id in g.SRPL:
            return all([
                dateutil.parser.parse(g.SRPL[s_id][0]) > datetime.datetime.now(),
                g.SRPL[s_id][2] is False
            ])

        return False

    @staticmethod
    def finish_running(survey_id):
        s_id = str(survey_id)
        if s_id in g.SRPL:
            del g.SRPL[s_id]

class ResponseAggregation(object):
    def __init__(self, survey):
        self.survey = survey

    def flat(self):
        responses = Response.objects(parent_survey = self.survey)

        cols = ["response_id", "added"] + self.survey.cols

        rows = []

        for response in responses:
            row = [str(response), str(response.added)]
            for qid in self.survey.cols:
                if qid in response.responses:
                    row.append(response.responses[qid])
                else:
                    row.append(None)
            rows.append(row)

        return {
            "page": 0,
            "columns": cols,
            "questions": self.survey.questions,
            "rows": rows,
            "len": self.count,
            "survey_id": str(self.survey)
        }

    def nested(self):
        responses = Response.objects(parent_survey = self.survey)

        questions = self.survey.questions

        rows = []
        cols = [['Question', None]]
        ps = True

        for q in questions:
            row = []
            row.append(q[1])
            for response in responses:
                if ps:
                    cols.append([str(response.id), str(response.added)])
                if q[0] in response.responses:
                    row.append(response.responses[q[0]])
                else:
                    row.append(None)
            rows.append(row)
            ps = False

        return {
            "page": 0,
            "columns": cols,
            "questions": self.survey.questions,
            "rows": rows,
            "len": self.count,
            "survey_id": str(self.survey)
        }

    @property
    def count(self):
        return Response.objects(parent_survey = self.survey).count()
# Zurez
import pymongo
from bson.json_util import dumps
def d(data):return json.loads(dumps(data))

connection= pymongo.MongoClient('localhost', 27017)
db = connection['qwer']
survey= db.response
class IrapiData(object):
    """docstring for IrapiData"""
    def __init__(self, survey_id,start,end,aggregate):
        self.sid= survey_id
        self.start=start
        self.end=end
        self.agg= aggregate
    def flag(self):
        # raw= db.survey.find({"_id":ObjectId(self.sid)})
        # js= d(raw)
        dat = SurveyUnit.objects(referenced = self.sid)
        js= [_.repr for _ in dat if not _.hidden]
        if len(js)!=0:
            children=[]
            for i in js:
                children.append(i['id'])
            return children
        else:
            return False

    def get_multi_data(self,aList):
        js=[]
        # return aLists
        for i in aList:
            i= HashId.decode(i)
            raw= db.response.find({"parent_survey":ObjectId(i)})
            js= js +d(raw)
        return js
    def get_child_data(self,survey_id):
        raw= db.survey.find({"_id":ObjectId(self.sid)})
        return d(raw)
    def get_data(self):
        dat = SurveyUnit.objects(referenced = self.sid)
        # return [_.repr for _ in dat if not _.hidden]
        flag= self.flag()
        #return "ggg"
        if flag==False:
            raw= db.response.find({"parent_survey":ObjectId(self.sid)})
            js= d(raw)

            return js
        else:
            if self.agg=="true":

                "WIll return all the responses "
                raw= db.response.find({"parent_survey":ObjectId(self.sid)})
                js= d(raw)
                js = js+ self.get_multi_data(flag)
                return js
            else:

                raw= db.response.find({"parent_survey":ObjectId(self.sid)})
                js= d(raw)
                return js
    def get_parent(self):
        raw= db.survey.find({"_id":ObjectId(self.sid)})
        js= d(raw)[0]
        # return js['referenced']
        if "referenced" in js:#Needs 0
            return js['referenced']['$oid']
        else:
            return False
    def get_uuid_labels(self):
        raw= db.survey.find({"_id":ObjectId(self.sid)})

        m= int(self.start)-1
        n=int(self.end)
        # return d(raw)[0]['structure']['fields'][a:b]

        if "fields" in d(raw)[0]['structure']:
            # raw= db.survey.find({"_id":ObjectId(self.sid)
            a= d(db.survey.find({"_id":ObjectId(self.sid)}))[0]
            if m==-1 and n==0:
                return a['structure']['fields']
            else: return a['structure']['fields'][m:n]
            a= db.survey.find({"_id":ObjectId(self.sid)})
            return d(a)[0]['structure']['fields'][m:n]

        return d(db.survey.find({"_id":ObjectId(self.sid)}))
    def survey_strct(self):

        raw= db.survey.find({"_id":ObjectId(self.sid)})
        # raw= db.survey.find({"$and":[{"_id":ObjectId(self.sid)},{"structure.fields.field_options.options.label":"Room Service"}]})
        # return d(raw)
        js=d(raw)[0]['structure']['fields']
        # js= d(raw)
        return js
    def ret(self):
        try:
            raw= db.survey.find({"_id":ObjectId(self.sid)})
            return d(raw)
        except:return "Errors"

class Dashboard(IrapiData):
    """docstring for Dashboard"""
    def __init__(self,survey_id):
        self.sid= survey_id



class DataSort(object):
    """docstring for DataSort"""

    def __init__(self,survey_id,uuid,aggregate):
        self.sid= survey_id
        # self.sid="56582299857c5616113814ae"
        self.uuid= uuid
        self.agg= aggregate
    def get_survey(self):
        survey= db.survey.find({"_id":ObjectId(self.sid)}) #Got the particular survey.
        return d(survey)
    def get_response(self):
        response= db.response.find({"parent_survey":ObjectId(self.sid)})
        return d(response)
    def flag(self):
        # raw= db.survey.find({"_id":ObjectId(self.sid)})
        # js= d(raw)
        dat = SurveyUnit.objects(referenced = self.sid)
        js= [_.repr for _ in dat if not _.hidden]
        if len(js)!=0:
            children=[]
            for i in js:
                children.append(i['id'])
            return children
        else:
            return False

    def get_multi_data(self,aList):
        js=[]
        # return aLists
        for i in aList:
            i= HashId.decode(i)
            raw= db.response.find({"parent_survey":ObjectId(i)})
            js= js +d(raw)
        return js
    def get_child_data(self,survey_id):
        raw= db.survey.find({"_id":ObjectId(self.sid)})
        return d(raw)
    def get_data(self):
        dat = SurveyUnit.objects(referenced = self.sid)
        # return [_.repr for _ in dat if not _.hidden]
        flag= self.flag()
        # return flag
        if flag==False:
            raw= db.response.find({"parent_survey":ObjectId(self.sid)})
            js= d(raw)

            return js
        else:
            if self.agg=="true":
                "WIll return all the responses "
                raw= db.response.find({"parent_survey":ObjectId(self.sid)})
                js= d(raw)
                js = js+ self.get_multi_data(flag)
                return js
            else:
                raw= db.response.find({"parent_survey":ObjectId(self.sid)})
                js= d(raw)
                return js


    def get_uuid_label(self):
        """labels: question text ; options ; etc"""
        #Extract the particular cid from the survey structure
        raw_label=db.survey.find() #returns empty
        raw_label=db.survey.find({"_id":ObjectId(self.sid)})
        aList= d(raw_label)[0]['structure']['fields'] #A backup liseturn aList
        # aList= d(raw_label)
        # return aList
        for i in aList:
            if i['cid']==self.uuid:
                return i
                # Zurez
