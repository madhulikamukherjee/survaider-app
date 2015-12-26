#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import uuid

from mongoengine.queryset import queryset_manager
from flask.ext.security import current_user
from flask.ext.uploads import UploadSet, IMAGES, configure_uploads,\
                              patch_request_class

from survaider.user.model import User
from survaider.minions.helpers import HashId
from survaider import db, app

class Attachment(db.Document):
    added    = db.DateTimeField(default = datetime.datetime.now)
    modified = db.DateTimeField()
    filename = db.StringField(required = True)
    owner    = db.ReferenceField(User)
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
    def file(self):
        base_u = app.config['UPLOADS_DEFAULT_URL']
        return "{0}/surveyimg/{1}".format(base_u, self.filename)

    @file.setter
    def file(self, file_content):
        uploader = UploadSet('surveyimg', IMAGES)
        configure_uploads(app, (uploader))
        patch_request_class(app, 16 * 1024 * 1024) #: 16 MB limit.
        self.filename = uploader.save(file_content,
                                      name = "{0}.".format(str(self)))

    @property
    def repr(self):
        doc = {
            'id':       str(self),
            'added':    str(self.added),
            'cu_owner': current_user == self.owner,
            'owner':    str(self.owner),    #: Should be disabled
            'modified': str(self.modified),
            'name':     self.filename,
            'uri':      self.file,
            'type':     self.__class__.__name__,
        }

        return doc
