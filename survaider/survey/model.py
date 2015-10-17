#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from bson.objectid import ObjectId

from survaider.minions.helpers import HashId
from survaider.user.model import User
from survaider import db

class Survey(db.Document):
    added       = db.DateTimeField(default = datetime.datetime.now)

    metadata    = db.DictField()
    structure   = db.DictField()

    created_by  = db.ListField(db.ReferenceField(User))

    def __unicode__(self):
        return HashId.encode(self.id)

class Response(db.Document):
    parent_survey   = db.ReferenceField(Survey)

    metadata        = db.DictField()
    responses       = db.DictField()

    def __unicode__(self):
        return HashId.encode(self.id)
