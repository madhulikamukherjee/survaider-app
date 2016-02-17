#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from datetime import datetime, timedelta
from flask_restful import Resource
from mongoengine.queryset import DoesNotExist, MultipleObjectsReturned

from survaider import db, app
from survaider.minions.helpers import HashId, api_get_object
from survaider.survey.model import Survey
from survaider.user.model import User
from survaider.minions.exceptions import (APIException, MethodUnavailable,
                                          ViewException)

def timeout(ttl=3):
    return lambda x=ttl: datetime.now() + timedelta(days=ttl)


class Future(db.Document):
    executed = db.BooleanField(default = False)
    meta = {'allow_inheritance': True, 'strict': False}
    expires = db.DateTimeField(default = timeout())

    def __unicode__(self):
        return HashId.encode(self.id)

    @property
    def active(self):
        return self.executed is False and datetime.now() <= self.expires

    @property
    def url(self):
        return '/api/promise/{0}'.format(str(self))

    def routine(self):
        pass

class SurveySharePromise(Future):
    """
    Adds the User Credential after they Sign Up.
    """

    future_email = db.StringField(required=True)
    future_survey = db.ReferenceField(Survey)

    def routine(self):
        if not self.active:
            raise MethodUnavailable()
        usr = User.objects.get(email = self.future_email)
        grp = set(self.future_survey.created_by)
        grp.add(usr)
        self.future_survey.created_by = list(grp)
        self.future_survey.save()
        self.executed = True
        self.save()
        return self.repr

    @property
    def repr(self):
        return {
            'id': str(self),
            'future_email': self.future_email,
            'future_survey': self.future_survey.tiny_repr,
            'active': self.active,
            'executed': self.executed,
            'expires': str(self.expires),
            'url': self.url,
        }

class SurveySharePromiseController(Resource):
    def get(self, f_id):
        try:
            obj = api_get_object(SurveySharePromise.objects, f_id)
            return obj.routine()
        except DoesNotExist:
            raise APIException("User did not Sign Up yet.", 403)
        except MethodUnavailable:
            raise ViewException("This URL is no longer available", 403)
