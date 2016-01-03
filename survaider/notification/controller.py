#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser

from blinker import signal
from flask import Flask, Blueprint, render_template, request, jsonify
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required

from survaider import app
from survaider.minions.helpers import api_get_object
from survaider.minions.decorators import api_login_required
from survaider.minions.exceptions import APIException, ViewException
from survaider.notification.model import (SurveyResponseNotification,
                                          Notification as Notification)
from survaider.notification.signals import survey_response_notify
from survaider.notification.signals import survey_response_transmit

notification = Blueprint('notify', __name__, template_folder = 'templates')

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

def create_ticket_notification(response):
    pass

def register():
    survey_response_notify.connect(create_response_notification)
    survey_response_transmit.connect(transmit_response_notification)

class NotificationController(Resource):
    @api_login_required
    def get(self, notification_id):
        notf = api_get_object(Notification.objects, notification_id)
        return notf.repr

    @api_login_required
    def post(self, notification_id):
        notf = api_get_object(Notification.objects, notification_id)
        pass

class NotificationAggregation(Resource):

    @api_login_required
    def get(self, kind = None, time_offset = None):
        if time_offset is None:
            time_offset = str(datetime.datetime.now())

        try:
            time_begin = dateutil.parser.parse(time_offset)
        except ValueError:
            raise APIException("Invalid Offset Time", 400)

        if kind is None:
            notifications = Notification.past(
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

        raise APIException("Must specify a valid option", 400,
            usage = {'surveyresponsenotification': 'Survey Responses'}
        )

    @api_login_required
    def post(self):
        pass

@notification.route('/')
def notification_home():
    return render_template("index.html", title = "Notification")
