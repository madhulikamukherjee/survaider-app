#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from survaider.minions.helpers import HashId
from survaider.user.model import User
from survaider import db

class Survey(db.Document):
    survey_id   = db.StringField(unique = True, default = str(uuid.uuid4()))
    added       = db.DateTimeField(default = datetime.datetime.now)

    metadata    = db.DictField()
    structure   = db.DictField()

    created_by  = db.ListField(db.ReferenceField(User), default = [])

    def __unicode__(self):
        return HashId.encode(self.survey_id)

class Response(db.Document):
    response_id = db.StringField(unique = True, default = str(uuid.uuid4()))
    survey_id   = db.ReferenceField(Survey)

    metadata    = db.DictField()
    responses   = db.DictField()

    def __unicode__(self):
        return HashId.encode(self.response_id)
