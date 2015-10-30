#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser
import uuid
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

class ResponseSession():

    @staticmethod
    def start(survey_id, response_id):
        #: Payload: [Survey ID, Start Time, End Time, Finished?]
        expires = datetime.datetime.now() + datetime.timedelta(days=1)
        payload = {
            survey_id: [expires.isoformat(), response_id, False]
        }

        g.SRPL.update(payload)

    @staticmethod
    def get_running_id(survey_id):
        if survey_id in g.SRPL:
            res_id = HashId.decode(g.SRPL[survey_id][1])
            return res_id

    @staticmethod
    def is_running(survey_id):
        #: Check if survey_id in user's payload.
        print(g.SRPL, survey_id)
        if survey_id in g.SRPL:
            return all([
                dateutil.parser.parse(g.SRPL[survey_id][0]) > datetime.datetime.now(),
                g.SRPL[survey_id][2] is False
            ])

        return False

    @staticmethod
    def finish_running(survey_id):
        if survey_id in g.SRPL:
            del g.SRPL[survey_id]
            print(g.SRPL)
