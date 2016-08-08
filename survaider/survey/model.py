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
        check = []
        for field in self.structure['fields']:
            if field.get('notifications', False) is True:
                store = []
                fieldType = field.get('field_type')
                if fieldType == 'rating':
                    options = enumerate(field['field_options'].get('notifications', []))
                    for i,option in options :
                     store.append("a_"+option)

                if fieldType == 'yes_no' or fieldType == 'single_choice':
                    options = enumerate(field['field_options'].get('options', []))
                    for i, option in options:
                        if option.get('notify', False) is True:
                            val = "a_{0}".format(i + 1)
                            store.append(val)
                            for j in range(0, 5):
                                 if option.get("notify_{0}".format(j)):
                                     store.append("a_{0}##{1}".format(i + 1, j ))


                if fieldType == 'group_rating':
                    options = enumerate(field['field_options'].get('options', []))
                    for i, option in options:
                        if option.get('notify', False) is True:

                            for j in range(0, 5):
                                 if option.get("notify_{0}".format(j)):
                                     store.append("a_{0}##{1}".format(i + 1, j ))


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

    def add(self, q_id, q_res, q_res_plain, q_unit_id = None):
        if q_id in self.parent_survey.cols:
            self.responses[q_id] = {'raw': q_res, 'pretty': q_res_plain, 'unit_id' : q_unit_id}
            self.metadata['modified'] = datetime.datetime.now()
            self.save()
        else:
            raise TypeError("Question ID is invalid")

        if q_id in self.parent_survey.notification_hooks:
            for hook in q_res.split('###'):
                if hook in self.parent_survey.notification_hooks[q_id]:
                    survey_response_notify.send(self.parent_survey,
                                                response = self,
                                                qid = q_id,
                                                qres = hook)

    @property
    def added(self):
        return self.metadata['started'] if 'started' in self.metadata else datetime.datetime.min

    @property
    def response_sm(self):
        questions = dict(self.parent_survey.questions)
        res = []
        for k, v in self.responses.items():
            res.append({
                'id': k,
                'label': questions[k],
                'response': v['pretty']
            })

        return {
            'id': str(self),
            # 'meta': self.metadata,
            'parent_survey': self.parent_survey.repr_sm,
            'responses': res
        }

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
                    row.append(response.responses[qid]['raw'])
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
                    row.append(response.responses[q[0]]['raw'])
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

    def csv(self):
        # Columns
        # Question ID | Question | Response ID 1 ... n
        responses = Response.objects(parent_survey = self.survey)
        questions = self.survey.questions

        header = ['question_id']
        for r in responses:
            header.append(str(r))

        yield ','.join(header)

        for q in questions:
            row = []
            row.append(q[0])
            row.append('"{0}"'.format(q[1]))
            for r in responses:
                row.append('"{0}"'.format(r.responses.get(q[0], '')['pretty']))
            yield ','.join(row)

    @property
    def count(self):
        return Response.objects(parent_survey = self.survey).count()
# Zurez
from bson.json_util import dumps

def d(data):return json.loads(dumps(data))

class AspectData(db.Document):
    """doc string for Aspect"""
    name=db.StringField()
    provider=db.StringField()
    survey_id=db.StringField()
    value=db.StringField()
    meta = {'strict': False}

class IrapiData(object):
    """docstring for IrapiData"""
    def __init__(self, survey_id,start,end,aggregate):
        self.sid= survey_id
        self.start=start
        self.end=end
        self.agg= aggregate

    def flag(self):
        dat = SurveyUnit.objects(referenced = self.sid)
        # return d(dat)
        js= [_.repr for _ in dat if not _.hidden]
        if len(js)!=0:
            children=[]
            for i in js:
                children.append(i['id'])
            return children
        else:
            return False

    def get_multi_data(self, aList):
        js=[]
        for i in aList:
            child_id= HashId.decode(i)
            # print (child_id)
            raw = Response.objects(parent_survey=child_id)
            raw_temp=[]
            for i in raw:
                temp_j=[]
                temp_j.append(i.responses)
                temp_j.append(i.metadata)
                raw_temp.append(temp_j)
            js= js + raw_temp

        return js

    def get_child_data(self,survey_id):

        raw=SurveyUnit.objects(id = survey_id)
        return raw

    def get_data(self):
        dat = Survey.objects(id = self.sid)
        flag= self.flag()

        if flag==False:
            raw= Response.objects(parent_survey=self.sid)
            raw_temp=[]
            for i in raw:
                temp_j=[]
                temp_j.append(i.responses)
                temp_j.append(i.metadata)
                raw_temp.append(temp_j)
            return raw_temp
        else:
            if self.agg=="true":

                "WIll return all the responses "

                raw = Response.objects(parent_survey = self.sid)
                raw_temp=[]
                for i in raw:
                    temp_j=[]
                    temp_j.append(i.responses)
                    temp_j.append(i.metadata)
                    raw_temp.append(temp_j)

                js = raw_temp + self.get_multi_data(flag)
                return js
            else:

                raw=Response.objects(parent_survey=self.sid)
                js= d(raw)
                return js

    def get_parent(self):

        raw = Survey.objects(id = self.sid)
        js = [_.repr_sm for _ in raw if not _.hidden]

        if 'rootid' in js[0]:
            return js[0]['rootid']
        else:
            return False

    def get_uuid_labels(self):
        raw=Survey.objects(id = self.sid)

        m = int(self.start)-1
        n = int(self.end)

        if "fields" in d(raw[0].structure):
            a= raw[0]
            if m==-1 and n==0:
                return a.structure['fields']

            else:
                return a.structure['fields'][m:n]

        return d(raw[0].structure['fields']) # fallback

    def survey_strct(self):
        try:
            raw=Survey.objects(id = HashId.decode(self.sid))
        except:
            raw=Survey.objects(id = self.sid)

        js=raw[0]['structure']['fields']
        # js=raw[0]

        return js

    def ret(self):
        try:
            raw=SurveyUnit.objects(referenced = self.sid)
            return d(raw)
        except:return "Errors"

class Leaderboard(db.Document):
    survey_ID = db.StringField()
    competitors = db.DictField()

class LeaderboardAggregator(object):
    def __init__(self, survey_id):
        self.sid = survey_id

    def getLeaderboard(self):
        raw_data = Leaderboard.objects(survey_ID = HashId.encode(self.sid))
        if len(raw_data) == 0:
            return None
        ordered_leaderboard_list = []
        unordered_leaderboard_dict = d(raw_data[0].competitors)

        ordered_scores_list = sorted(unordered_leaderboard_dict, key = unordered_leaderboard_dict.get, reverse=True)

        for i in ordered_scores_list:
            ordered_leaderboard_list.append([i, unordered_leaderboard_dict[i]])

        return ordered_leaderboard_list

class Insights(db.Document):
    survey_id = db.StringField()
    insights = db.DictField()

class InsightsAggregator(object):
    def __init__(self, survey_id):
        self.sid = survey_id

    def getInsights(self):
        raw_data = Insights.objects(survey_id = HashId.encode(self.sid))
        if len(raw_data) == 0:
            return None
        unordered_insight_dict = d(raw_data[0].insights)
        ordered_dates_list = sorted(unordered_insight_dict, key = lambda t: datetime.datetime.strptime(t, '%d-%m-%Y'), reverse=True)
        ordered_insights_list = []
        for i in ordered_dates_list:
            ordered_insights_list.append([i, list(unordered_insight_dict[i].values())])
        return ordered_insights_list

class Dashboard(IrapiData):
    """docstring for Dashboard"""
    def __init__(self,survey_id):
        self.sid= survey_id

class WordCloudD(db.Document):
    """docstring for WordCloud"""
    provider = db.StringField()
    survey_id = db.StringField()
    wc = db.DictField()

class Reviews(db.Document):
    provider = db.StringField()
    survey_id = db.StringField()
    rating = db.StringField()
    review = db.StringField()
    sentiment = db.StringField()
    review_identifier=db.StringField(unique=True)
    date_added=db.StringField()
    datetime=db.DateTimeField()
    meta = {'strict': False}

class DataSort(object):
    """docstring for DataSort"""

    def __init__(self,survey_id,uuid,aggregate):
        self.sid= survey_id
        self.uuid= uuid
        self.agg= aggregate
    def get_survey(self):
        survey=SurveyUnit.objects(referenced=self.sid)
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
        # raw= db.survey.find({"_id":ObjectId(self.sid)})
        raw=SurveyUnit.objects(referenced = self.sid)
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
        # raw_label=db.survey.find() #returns empty
        # raw_label=db.survey.find({"_id":ObjectId(self.sid)})
        try:
            raw_label=Survey.objects(id = HashId.decode(self.sid))
        except:
            raw_label=Survey.objects(id = self.sid)
        # return d(raw_label)

        aList= raw_label[0].structure['fields'] #A backup liseturn aList
        # return aList
        # aList= d(raw_label)
        # return aList
        for i in aList:
            if i['cid']==self.uuid:
                return i
                # Zurez

class Relation(db.Document):
    """docstring for Relation"""
    survey_id = db.StringField()
    provider = db.StringField()
    parent = db.StringField()

class ClientAspects(db.Document):
    parent_id = db.StringField(required = True)
    aspects = db.ListField()

class ClientProviders(db.Document):
    parent_id = db.StringField(required = True)
    providers = db.ListField()

class TimedDash(db.Document):
    dash_value= db.StringField()
    time= db.DateTimeField(default = datetime.datetime.now)

# class JupiterData(db.Document):
#     owner_aspects = db.DictField()
#     units_aspects = db.DictField()
#     last_updated = db.DateTimeField(default=datetime.datetime.now)
#     survey_id = db.StringField()
#     temp={}
#     unit = {}
#     def add(self,j_data,s_id):
        
#         self.survey_id = HashId.encode(s_id)
#         temp = j_data['owner_aspects']
#         self.updateOwner(temp,self.survey_id)
      
#         unit  = j_data['units_aspects']
       
#         for key in unit :
#             self.updateUnits(key,unit[key],self.survey_id)

#     def updateOwner(self,data,s_id):
        
#         ownerfinal = []
#         ownerTime_temp = {}
#         self.owner_aspects['overall_aspects'] = data['overall_aspects']
        
#         self.owner_aspects['total_resp'] = data['total_resp']
#         self.owner_aspects['providers'] = data['providers']
#         self.owner_aspects['unified'] = data['unified']
#         time = str(datetime.datetime.now().date())
#         ownerTime_temp[time] = data['unified']

#         ju_obj_temp1 = JupiterData.objects(survey_id = str(s_id))
#         if len(ju_obj_temp1)-1 <0 :
#             ownerfinal.append(ownerTime_temp)
#         else :
#             ju_obj_temp1 = JupiterData.objects(survey_id = str(s_id))
#             ju_obj1 = ju_obj_temp1[len(ju_obj_temp1)-1]
#             t=ju_obj1['owner_aspects']
#             p = t['time_unified']
#             ownerfinal = p
#             ownerfinal.append(ownerTime_temp)
#         self.owner_aspects['time_unified'] = ownerfinal

#     def updateUnits(self,u_id,data,s_id):
        
#         unitTemp = {}
#         unitfinal = []
#         unitTime_temp = {}
#         unitTemp['overall_aspects'] = data['overall_aspects']
#         unitTemp['total_resp'] = data['total_resp'] 
#         unitTemp['providers'] = data['providers'] 
#         unitTemp['unified'] = data['unified']
#         time = str(datetime.datetime.now().date())
#         unitTime_temp[time] = data['unified'] 

#         ju_obj_temp1 = JupiterData.objects(survey_id = s_id)
        
#         if len(ju_obj_temp1)-2 <0 :
#             unitfinal.append(unitTime_temp)
#         else :
#             ju_obj1 = ju_obj_temp1[len(ju_obj_temp1)-2]
#             t=ju_obj1['units_aspects']
#             p = t[u_id]
#             k = p['time_unified']
#             unitfinal = k
#             unitfinal.append(unitTime_temp)
#         unitTemp['time_unified'] = unitfinal
#         self.units_aspects[u_id] = unitTemp

class JupiterData(db.Document):
    owner_aspects = db.DictField()
    units_aspects = db.DictField()
    last_updated = db.DateTimeField(default=datetime.datetime.now)
    survey_id = db.StringField()
    temp={}
    unit = {}
    def update(self,j_data,s_id):
        
        self.survey_id = HashId.encode(s_id)
        temp = j_data['owner_aspects']
        self.updateOwner(temp,self.survey_id)
      
        unit  = j_data['units_aspects']
       
        for key in unit :
            self.updateUnits(key,unit[key],self.survey_id)

    def updateOwner(self,data,s_id):
        
        ownerfinal = []
        ownerTime_temp = {}
        self.owner_aspects['overall_aspects'] = data['overall_aspects']
        
        self.owner_aspects['total_resp'] = data['total_resp']
        self.owner_aspects['providers'] = data['providers']
        self.owner_aspects['unified'] = data['unified']
        time = str(datetime.datetime.now().date())
        ownerTime_temp[time] = data['unified']

        ju_obj_temp1 = JupiterData.objects(survey_id = str(s_id))
        if len(ju_obj_temp1)-1 <0 :
            ownerfinal.append(ownerTime_temp)
        else :
            ju_obj_temp1 = JupiterData.objects(survey_id = str(s_id))
            ju_obj1 = ju_obj_temp1[len(ju_obj_temp1)-1]
            t=ju_obj1['owner_aspects']
            p = t['time_unified']
            ownerfinal = p
            ownerfinal.append(ownerTime_temp)
        self.owner_aspects['time_unified'] = ownerfinal

    def updateUnits(self,u_id,data,s_id):
        
        unitTemp = {}
        unitfinal = []
        unitTime_temp = {}
        unitTemp['overall_aspects'] = data['overall_aspects']
        unitTemp['total_resp'] = data['total_resp'] 
        unitTemp['providers'] = data['providers'] 
        unitTemp['unified'] = data['unified']
        time = str(datetime.datetime.now().date())
        unitTime_temp[time] = data['unified'] 

        ju_obj_temp1 = JupiterData.objects(survey_id = u_id)
        
        if len(ju_obj_temp1)-2 <0 :
            unitfinal.append(unitTime_temp)
        else :
            ju_obj1 = ju_obj_temp1[len(ju_obj_temp1)-2]
            t=ju_obj1['units_aspects']
            p = t[u_id]
            k = p['time_unified']
            unitfinal = k
            unitfinal.append(unitTime_temp)
        unitTemp['time_unified'] = unitfinal
        self.units_aspects[u_id] = unitTemp