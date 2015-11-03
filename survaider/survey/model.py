#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser
import uuid
import random
import json

from flask import request, g
from bson.objectid import ObjectId

from survaider.minions.helpers import HashId, Obfuscate
from survaider.user.model import User
from survaider import db

class Survey(db.Document):
    default_struct = {
        'fields': [
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
    }

    added       = db.DateTimeField(default = datetime.datetime.now)

    metadata    = db.DictField()
    structure   = db.DictField(default = default_struct)

    created_by  = db.ListField(db.ReferenceField(User))

    def __unicode__(self):
        return HashId.encode(self.id)

class Response(db.Document):
    parent_survey   = db.ReferenceField(Survey)

    metadata        = db.DictField()
    responses       = db.DictField()

    def __unicode__(self):
        return HashId.encode(self.id)

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
        # self.cols   =

    def get(self, page = 0):
        limit = 10
        skip = page * limit
        responses = Response.objects[skip:limit](parent_survey = self.survey)

        qcol = self._squeeze_cols()
        cols = ["response_id"] + qcol

        rows = []

        for response in responses:
            row = [str(response)]
            for qid in qcol:
                if qid in response.responses:
                    row.append(response.responses[qid])
                else:
                    row.append(None)
            rows.append(row)

        return {
            "page": page,
            "columns": cols,
            "rows": rows,
            "survey_id": str(self.survey)
        }

    def _squeeze_cols(self):
        return [_['cid'] for _ in self.survey.structure['fields']]

class Helper(object):

    @staticmethod
    def process_render_json(struct):
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

        rt = {}
        cp = struct['fields']

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
                op_len = len(field['field_options'])
                games = []

                for game, constr in game_map[typ].items():
                    if constr[0] <= op_len <= constr[1]:
                        games.append(game)

                return random.choice(games)


        for i in range(len(cp)):
            cp[i]['field_options'] = field_options(cp[i]['field_options'])
            cp[i]['gametype'] = game(cp[i])
            cp[i]['next'] = logic('end' if (i + 1) >= len(cp) else cp[i + 1]['cid'])

        rt['fields'] = cp
        return rt
