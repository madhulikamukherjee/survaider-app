#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from flask.ext.security import UserMixin, RoleMixin
from survaider import db

class Role(db.Document, RoleMixin):
    #: Fine user permission control.
    # id          = db.StringField()
    name        = db.StringField(max_length = 80, unique = True)
    description = db.StringField(max_length = 255)

    def __unicode__(self):
        return self.name

class User(db.Document, UserMixin):
    # id              = db.StringField()
    username        = db.StringField(max_length = 40, unique = True, default = str(uuid.uuid4()))
    email           = db.EmailField(max_length = 255, unique = True, required = True)
    password        = db.StringField(max_length = 255, required = True)
    active          = db.BooleanField(default = True)
    added           = db.DateTimeField(default = datetime.datetime.now)
    confirmed_at    = db.DateTimeField()
    roles           = db.ListField(db.ReferenceField(Role), default=[])
