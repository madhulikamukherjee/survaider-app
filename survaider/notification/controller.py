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
from survaider.user.model import User
from survaider.survey.model import Survey, SurveyUnit
from survaider.notification.model import (SurveyResponseNotification,
                                          Notification,
                                          SurveyTicket)
from survaider.notification.signals import survey_response_notify
from survaider.notification.signals import survey_response_transmit

notification = Blueprint('notify', __name__, template_folder = 'templates')

def create_response_notification(survey, **kwargs):
    doc = SurveyResponseNotification.objects(
        response = kwargs['response']
    ).modify(
        upsert  = True,
        new     = True,
        set__acquired   = datetime.datetime.now(),
        set__response   = kwargs['response'],
        set__survey     = survey,
        set__destined   = survey.created_by
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

class SurveyTicketController(Resource):
    @api_login_required
    def get(self, ticket_id = None, action = None):
        tkt = api_get_object(SurveyTicket.objects, ticket_id)
        return tkt.repr

    def create_tkt_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('tkt_msg', type = str, required = True)
        parser.add_argument('srvy_id', type = str, required = True)
        parser.add_argument('unit_ids', type = str, required = True)
        return parser.parse_args()

    @api_login_required
    def post(self, ticket_id = None, action = None):
        if ticket_id is None:
            "Create a new Survey Ticket"

            args = self.create_tkt_args()
            u_ids = args.get('unit_ids', '').split(',')

            if len(u_ids) == 0:
                raise APIException("Survey Units MUST be specified", 400)

            root_svey = api_get_object(Survey.root, args.get('srvy_id'))
            c_user = User.objects(id = current_user.id).first()

            if not c_user in root_svey.created_by:
                raise APIException("Only Root Survey owner may create", 400)

            units = [api_get_object(SurveyUnit.objects, _) for _ in u_ids]

            if not set(units).issubset(root_svey.units_as_objects):
                raise APIException("Must be Units of the Parent Survey", 400)

            tkt = SurveyTicket()
            tkt.destined = list(set(sum([_.created_by for _ in units], [])))
            tkt.origin = User.objects(id = current_user.id).first()
            tkt.survey_unit = list(set(units))

            tkt.payload = {
                'original_msg': args.get('tkt_msg'),
                'complete': {},
            }

            tkt.save()
            return tkt.repr

        tkt = api_get_object(SurveyTicket.objects, ticket_id)

        if action == "mark_done":
            pass

        raise APIException("Must specify valid option", 400)

class NotificationController(Resource):
    @api_login_required
    def get(self, notification_id, action = None):
        notf = api_get_object(Notification.objects, notification_id)
        return notf.repr

    @api_login_required
    def post(self, notification_id, action):
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
