#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser

from blinker import signal
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required

from survaider import app
from survaider.minions.exceptions import APIException, ViewException
from survaider.notification.model import SurveyResponseNotification, Notification
from survaider.notification.signals import survey_response_notify
from survaider.notification.signals import survey_response_transmit

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
    survey_response_transmit.connect(transmit_response_notification)

class NotificationAggregation(Resource):
    def get(self, kind, time_offset = None):
        if not current_user.is_authenticated():
            raise APIException("Login Required", 401)

        if time_offset is None:
            time_offset = str(datetime.datetime.now())

        try:
            time_begin = dateutil.parser.parse(time_offset)
        except ValueError:
            raise APIException("Invalid Offset Time", 400)

        if kind == 'surveyresponsenotification':
            notifications = SurveyResponseNotification.past(
                destined = current_user.id,
                acquired__lt = time_begin
            )

            notif_list = [_.repr for _ in notifications.limit(5)]
            next_page = False
            try:
                next_page = notif_list[-1]['acquired']
            except Exception:
                "No next page URI"
                pass

            doc = {
                'remaininglen': notifications.count(),
                'next': next_page,
                'data': notif_list,
                'new': Notification.unflagged_count()
            }
            return doc

        raise APIException("Must specify a valid option", 400)

    def post(self):
        pass
