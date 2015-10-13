#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from survaider import db

class Survey(db.Document):
    s_id        = db.StringField(unique = True, default = str(uuid.uuid4()))
    added       = db.DateTimeField(default = datetime.datetime.now)

    structure   = db.DictField()

    name        = db.StringField(max_length = 80)
    description = db.StringField(max_length = 255)

    def __unicode__(self):
        return self.s_id

class Response(db.Document):
    r_id        = db.StringField(unique = True, default = str(uuid.uuid4()))
    s_id        = db.ReferenceField(Survey)

    responses   = db.DictField()
