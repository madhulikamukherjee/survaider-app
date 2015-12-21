#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from blinker import signal

from survaider import app
from survaider.notification.model import SurveyResponseNotification
from survaider.notification.signals import survey_response_notify

def create_response_notification(survey, **kwargs):
    for user in survey.created_by:
        doc = SurveyResponseNotification.objects(
            response = kwargs['response']
        ).modify(
            upsert  = True,
            new     = True,
            set__response   = kwargs['response'],
            set__survey     = survey,
            set__destined   = user
        )

        doc.payload.update({kwargs['qid']: kwargs['qres']})
        doc.transmit = False
        doc.save()

def transmit_response_notification(response):
    pass

def register():
    survey_response_notify.connect(create_response_notification)
