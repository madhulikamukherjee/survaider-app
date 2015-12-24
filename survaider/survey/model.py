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
from survaider.user.model import User
from survaider.notification.signals import survey_response_notify
from survaider import db, app

class Survey(db.Document):
    default_fields = [
        {
            'required': True,
            'field_options': {},
            'label': 'What is your name?',
            'cid': 'c2',
            'field_type': 'short_text',
        }, {
            'required': True,
            'field_options': {'options': [{'label': 'Yes', 'checked': False},
                              {'label': 'No', 'checked': False}]},
            'label': 'Have you gone on Facebook ever before?',
            'cid': 'c6',
            'field_type': 'yes_no',
        }, {
            'required': True,
            'field_options': {'options': [{'label': 'Reading about friends',
                              'checked': False},
                              {'label': 'Chatting with friends',
                              'checked': False}, {'label': 'Finding new people'
                              , 'checked': False},
                              {'label': 'Reading (news, articles)',
                              'checked': False}, {'label': 'Shopping',
                              'checked': False}]},
            'label': 'What do you primarily use Facebook for?',
            'cid': 'c10',
            'field_type': 'multiple_choice',
        }
    ]
    default_screens = [
        'Default Title',
        'Default Description',
        'Default Footer',
    ]
    default_links = None

    added       = db.DateTimeField(default = datetime.datetime.now)

    metadata    = db.DictField()
    structure   = db.DictField()

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
                        store.append("a_{0}".format(i + 1))
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
        ret['fields'] = self.structure['fields'] if 'fields' in self.structure else self.default_fields
        ret['screens'] = self.structure['screens'] if 'screens' in self.structure else self.default_screens
        ret['links'] = self.structure['links'] if 'links' in self.structure else self.default_links
        return ret

    @struct.setter
    def struct(self, value):
        schema = {
            "$schema": "http://json-schema.org/draft-04/schema#",

            "type": "object",
            "properties": {
                "fields": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "cid": {
                                "type": "string"
                            },
                            "field_options": {
                                "type": "object",
                                "properties": {
                                    "options": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "checked": {
                                                    "type": "boolean"
                                                },
                                                "img_enabled": {
                                                    "type": "boolean"
                                                },
                                                "img_uri": {
                                                    "type": "string"
                                                },
                                                "notify": {
                                                    "type": "boolean"
                                                },
                                                "label": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": ["label"]
                                        }
                                    }
                                }
                            },
                            "field_type": {
                                "type": "string"
                            },
                            "label": {
                                "type": "string"
                            },
                            "required": {
                                "type": "boolean"
                            },
                            "notifications": {
                                "type": "boolean"
                            },
                            "richtext": {
                                "type": "boolean"
                            },
                        },
                        "required": ["cid", "field_type", "label", "required"]
                    }
                },
                "links": {
                    "type": "null"
                },
                "screens": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": ["fields", "screens"]
        }
        try:
            validate(value, schema)
            self.structure.update(value)
        except ValidationError as e:
            raise TypeError('Struct value invalid' + str(e))

    @property
    def gamified_enabled(self):
        field_lim = {
            'yes_no': [2, 3],
            'single_choice': [2, 5],
            'multiple_choice': [2, 5],
            'ranking': [2, 6],
            'group_rating': [2, 3],
        }
        for field in self.struct['fields']:
            if field['field_type'] in field_lim:
                if not 'options' in field['field_options']:
                    return False
                count = len(field['field_options']['options'])
                lower, upper = field_lim[field['field_type']]
                if not lower <= count <= upper:
                    return False
        return True

    @property
    def modified(self):
        return self.metadata['modified'] if 'modified' in self.metadata else self.added

    @property
    def img_uploads(self):
        dat = self.metadata['img_uploads'] if 'img_uploads' in self.metadata else []
        ret = lambda x: {'uri': Uploads.url_for_surveyimg(x), 'name': x}
        return [ret(_) for _ in dat]

    @img_uploads.setter
    def img_uploads(self, value):
        if 'img_uploads' in self.metadata:
            self.metadata['img_uploads'].append(value)
        else:
            self.metadata['img_uploads'] = []
            self.metadata['img_uploads'].append(value)

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

    def save(self, **kwargs):
        self.metadata['modified'] = datetime.datetime.now()
        super(Survey, self).save(**kwargs)

    @queryset_manager
    def objects(doc_cls, queryset):
        return queryset.filter()

    @queryset_manager
    def root(doc_cls, queryset):
        return queryset.filter(_cls = 'Survey')

    @property
    def repr(self):
        return {
            'id': str(self),
            'name': self.metadata['name'],
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
            'r': self.notification_hooks
        }

    @property
    def render_json(self):
        game_map = {
            'short_text': {
                'text_scene': [0, 0]
            },
            'long_text': {
                'suggestions': [0, 0]
            },
            'yes_no': {
                'car': [2, 2],
                'happy_or_sad': [3, 3]
            },
            'single_choice': {
                'catapult': [2, 4],
                'fish_scene_one': [2, 5],
                'bird_tunnel': [2, 4]
            },
            'multiple_choice': {
                'balloon': [2, 5],
                'fish_scene_two': [2, 5]
            },
            'ranking': {
                'stairs': [2, 6]
            },
            'rating': {
                'scroll_scene': [0, 0]
            },
            'group_rating': {
                'star_game': [2, 3]
            }
        }

        if not self.gamified_enabled:
            raise TypeError("This survey does not have a Gamified Representation.")

        rt = {}
        cp = self.struct['fields']

        def field_options(opt):
            options = []
            if 'options' in opt:
                for op in opt['options']:
                    options.append(op['label'])
            return options
        def logic(id_next):
            return {
                'va': id_next
            }
        def game(field):
            typ = field['field_type']
            if typ in game_map:
                op = field['field_options'].get('options', [])

                op_len = len(op)
                games = []

                for game, constr in game_map[typ].items():
                    if constr[0] <= op_len <= constr[1]:
                        games.append(game)

                return random.choice(games)

        for i in range(len(cp)):
            # cp[i]['field_options'] = field_options(cp[i]['field_options'])
            cp[i]['gametype'] = game(cp[i])
            cp[i]['next'] = logic('end' if (i + 1) >= len(cp) else cp[i + 1]['cid'])

        rt['fields'] = cp
        rt['game_title'] = self.struct['screens'][0]
        rt['game_description'] = self.struct['screens'][1]
        rt['game_footer'] = self.struct['screens'][2]

        give_img = len(self.struct['screens']) >= 4 and len(self.struct['screens'][3]) > 1

        rt['survey_logo'] = Uploads.url_for_surveyimg(self.struct['screens'][3]) if give_img else False

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
            if qres in self.parent_survey.notification_hooks[qid]:
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
