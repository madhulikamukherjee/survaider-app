#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from datetime import datetime, timedelta
from mongoengine.queryset import queryset_manager

from survaider.minions.helpers import HashId
from survaider.user.model import User
from survaider.survey.model import Survey, Response
from survaider import db, app

class Notification(db.Document):
    destined = db.ReferenceField(User)
    acquired = db.DateTimeField(default = datetime.now)
    released = db.DateTimeField(default = datetime.max)
    payload  = db.DictField()

    #: Enables Inheritance.
    meta = {'allow_inheritance': True}

    def __unicode__(self):
        return HashId.encode(self.id)

    @property
    def flagged(self):
        return datetime.now() > self.released

    @flagged.setter
    def flagged(self, value):
        if value is True:
            self.released = datetime.max
        else:
            #: Sets time two seconds behind, to eliminate ANY possibility of
            #  race conditions and prevents other bugs, in general.
            self.released = datetime.now() - timedelta(seconds = 2)

    @queryset_manager
    def past(doc_cls, queryset):
        return queryset.order_by('-acquired')

class SurveyResponseNotification(Notification):
    survey   = db.ReferenceField(Survey, required = True)
    response = db.ReferenceField(Response, required = True)
    transmit = db.BooleanField(default = False)

    @property
    def repr(self):
        doc = {
            'id':           str(self),
            'acquired':     str(self.acquired),
            'flagged':      self.flagged,
            'survey':       str(self.survey),
            'root_survey':  str(self.survey.resolved_root),
            'response':     str(self.response),
            'payload':      self.payload,
            'type':         self.__class__.__name__,
        }
        return doc
