#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask_restful import Resource, Api

from survaider import app
from survaider.survey.controller import SurveyController, ResponseController
from survaider.survey.controller import SurveyMetaController

api = Api(app, prefix = '/api')

api.add_resource(SurveyController,      '/survey')
api.add_resource(SurveyMetaController,  '/survey/<string:survey_id>')
api.add_resource(ResponseController,    '/survey/<string:survey_id>/response')
