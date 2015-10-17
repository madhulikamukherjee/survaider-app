#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

"""
REST API End Points
"""

from flask import request
from flask_restful import Resource
from flask.ext.security import current_user

from survaider.minions.helpers import HashId
from survaider.survey.model import Survey, Response

class SurveyController(Resource):
    def get(self):
        return {'lol':1123}

    def put(self):
        return

    def post(self):
        return

    def delete(self):
        return

class ResponseController(Resource):
    def get(self, survey_id):
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(survey_id = s_id).first()

        resp = Response(survey_id = svey)
        resp.responses['c1'] = 'SOME ANSWER'

        resp.save()

        return {}

    def put(self, survey_id):
        if 'resp_id' in request.cookies:
            pass
        return

    def post(self, survey_id):
        return

    def delete(self, survey_id):
        return

