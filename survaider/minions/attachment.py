#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from mongoengine.queryset import queryset_manager
from flask.ext.uploads import UploadSet, IMAGES, configure_uploads,\
                              patch_request_class

from survaider.user.model import User
from survaider.minions.helpers import HashId
from survaider import db, app

class Attachment(db.Document):
    added    = db.DateTimeField(default = datetime.datetime.now)
    modified = db.DateTimeField()
    owner    = db.ListField(db.ReferenceField(User))
    hidden   = db.BooleanField(default = False)

    meta = {'allow_inheritance': True, 'strict': False}

    def __unicode__(self):
        return HashId.encode(self.id)

    def save(self, **kwargs):
        self.modified = datetime.datetime.now()
        super(Attachment, self).save(**kwargs)

    @queryset_manager
    def files(doc_cls, queryset):
        return queryset.filter(hidden = False)

class Image(Attachment):

    @property
    def url(self):
        pass

    @property
    def file(self):
        pass

    @file.setter
    def file(self, value):
        uploader = UploadSet('surveyimg', IMAGES)
        configure_uploads(app, (uploader))
        patch_request_class(app, 16 * 1024 * 1024) #: 16 MB limit.
