#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import jsonify
from flask_restful import Resource, Api

from survaider import app
from survaider.minions.exceptions import APIException
from survaider.survey.controller import SurveyController, ResponseController
from survaider.survey.controller import SurveyMetaController, ResponseAggregationController

api = Api(app, prefix = '/api')

api.add_resource(SurveyController,      '/survey')
api.add_resource(SurveyMetaController,  '/survey/<string:survey_id>/<string:action>')
api.add_resource(ResponseController,    '/survey/<string:survey_id>/response')
# api.add_resource(ResponseController,    '/survey/<string:survey_id>/response/<string:response_id>')
api.add_resource(ResponseAggregationController, '/survey/<string:survey_id>/response/aggregate')

@app.errorhandler(APIException)
def handle_api_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
