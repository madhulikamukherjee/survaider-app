#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import jsonify
from flask_restful import Resource, Api

from survaider import app
from survaider.minions.exceptions import APIException
from survaider.survey.controller import SurveyController, ResponseController
from survaider.survey.controller import SurveyMetaController, ResponseAggregationController
from survaider.survey.controller import ResponseDocumentController
from survaider.survey.controller import ResponseAPIController
from survaider.notification.controller import NotificationAggregation


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

api.add_resource(NotificationAggregation,
                 '/notification',
                 '/notification/<string:kind>',
                 '/notification/<string:kind>/<string:time_offset>')
# API FOR DATA RESPONSES --- Creating New Classes //Zurez
# api.add_resource(NewResponseController,'/survey/<string:survey_id>/response/<string:c_id>/data')

api.add_resource(ResponseAPIController,"/rapi/<string:survey_id>/<string:uuid>/response")
class Amazing(Resource):
    """docstring for Amazing"""
    def get(self):
        return "lol"

api.add_resource(Amazing,"/zurez")


        

###############################


def handle_api_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
