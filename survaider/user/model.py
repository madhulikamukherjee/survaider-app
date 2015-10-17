#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from bson.objectid import ObjectId
from flask.ext.security import UserMixin, RoleMixin

from survaider.minions.helpers import HashId
from survaider import db

class Role(db.Document, RoleMixin):
    name        = db.StringField(unique = True)
    description = db.StringField()

    metadata    = db.DictField()

    def __unicode__(self):
        return self.name

class User(db.Document, UserMixin):
    email           = db.EmailField(unique = True, required = True)
    password        = db.StringField(required = True)

    metadata        = db.DictField()

    active          = db.BooleanField(default = True)
    added           = db.DateTimeField(default = datetime.datetime.now)
    confirmed_at    = db.DateTimeField()

    roles           = db.ListField(db.ReferenceField(Role), default = [])

    def __unicode__(self):
        return self.email
