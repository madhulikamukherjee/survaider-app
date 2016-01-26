#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.
import requests

from flask import jsonify
from flask_restful import Resource, Api

from survaider import app
from survaider.minions.exceptions import APIException
from survaider.survey.controller import SurveyController, ResponseController
from survaider.survey.controller import (SurveyMetaController,
                                         ResponseAggregationController)
from survaider.survey.controller import ResponseDocumentController
from survaider.notification.controller import (NotificationController,
                                               NotificationAggregation,
                                               SurveyTicketController)

from survaider.survey.controller import ResponseAPIController


api = Api(app, prefix = '/api')

api.add_resource(SurveyController,
                 '/survey'
                )
api.add_resource(SurveyMetaController,
                 '/survey/<string:survey_id>',
                 '/survey/<string:survey_id>/<string:action>'
                )
api.add_resource(ResponseController,
                 '/survey/<string:survey_id>/response'
                )
api.add_resource(ResponseAggregationController,
                 '/survey/<string:survey_id>/response/aggregate',
                 '/survey/<string:survey_id>/response/aggregate/<string:action>'
                )
api.add_resource(ResponseDocumentController,
                 '/survey/<string:survey_id>/response/<string:response_id>'
                )

api.add_resource(NotificationController,
                 '/notification/<string:notification_id>',
                 '/notification/<string:notification_id>/<string:action>')

api.add_resource(SurveyTicketController,
                 '/surveyticket',
                 '/surveyticket/<string:ticket_id>',
                 '/surveyticket/<string:ticket_id>/<string:action>')

api.add_resource(NotificationAggregation,
                 '/notification',
                 '/notification/<string:kind>',
                 '/notification/<string:kind>/<string:time_offset>')

# API FOR DATA RESPONSES --- Creating New Classes //Zurez
# api.add_resource(NewResponseController,'/survey/<string:survey_id>/response/<string:c_id>/data')

api.add_resource(ResponseAPIController,"/rapi/<string:survey_id>/<string:uuid>/response")

###############################

class TemporaryEmailHandler(Resource):
    def get(self, u_email_id):
        r = requests.post(
            "https://api.mailgun.net/v3/sandbox5d4604e611c54873b7eb557e1393ef79.mailgun.org/messages",
            auth = ("api", "key-3e1ac26b280f0006fcefb105256342d1"),
            data = {
                "from": "Mailgun Sandbox <postmaster@sandbox5d4604e611c54873b7eb557e1393ef79.mailgun.org>",
                "to": "Madhulika Mukherjee <madhulika.91@gmail.com>",
                "subject": "Survaider New Subscription",
                "text": "Hello.\n\rYou have new Subscription by `{0}`.".format(u_email_id)
            }
        )
        return r.json()

api.add_resource(TemporaryEmailHandler,
                 '/subscribe/email:<string:u_email_id>')

def handle_api_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
