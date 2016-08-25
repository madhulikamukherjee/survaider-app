#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import uuid
from datetime import datetime, timedelta

from survaider import db, app
from survaider.user.model import User
from survaider.minions.helpers import HashId
from survaider.survey.model import Survey, SurveyUnit
# from survaider.minions.contextresolver import current_user

class Reviews(db.Document):
    provider = db.StringField()
    survey_id = db.StringField()
    rating = db.StringField()
    review = db.StringField()
    sentiment = db.StringField()
    review_identifier=db.StringField(unique=True)
    date_added=db.DateTimeField()
    review_link=db.StringField()
    datetime=db.DateTimeField()
    meta = {'strict': False}

class ReviewsAggregator(object):
    def __init__(self, survey_id):
        self.sid = survey_id

    def get(self):
        
        survey = Survey.objects(created_by=self.sid).first()

        if survey._cls == 'Survey.SurveyUnit':
            raw_data = Reviews.objects(survey_id = self.sid)

        elif survey._cls == 'Survey':
            raw_data = []
            
            dat = SurveyUnit.objects(referenced = survey)
            js = [_.repr for _ in dat if not _.hidden]
            if len(js) != 0:
                for i in js:
                    
                    raw_data += Reviews.objects(survey_id = i['id'])

        return raw_data