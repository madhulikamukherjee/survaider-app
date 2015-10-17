#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

"""
REST API End Points
"""

from bson.objectid import ObjectId
from flask import request
from flask_restful import Resource, reqparse
from flask.ext.security import current_user

from survaider.minions.helpers import HashId
from survaider.survey.model import Survey, Response, ResponseSession

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
    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('q_id',  type = str, required = True)
        parser.add_argument('q_res', type = str, required = True)
        return parser.parse_args()

    def get_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('new',  type = bool)
        return parser.parse_args()

    def get(self, survey_id):
        try:
            args = self.get_args()
            args['responses_exist'] = ResponseSession.is_running(survey_id)

            if args['responses_exist']:
                "End The Existing Survey."
                if args['new']:
                    ResponseSession.finish_running(survey_id)
                    args['will_accept_response'] = False

            return args, 201

        except Exception:
            raise Exception

    def post(self, survey_id):
        try:
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            resp = None

            if ResponseSession.is_running(str(svey)):
                "Uses existing Response Session."
                resp_id = ResponseSession.get_running_id(str(svey))
                resp = Response.objects(id = resp_id).first()
            else:
                "Creates a New Response Session."
                resp = Response(parent_survey = svey)
                resp.save()
                ResponseSession.start(str(svey), str(resp))

            args = self.post_args()

            # if args['q_id'] in svey.struct : TO BE IMPLEMENTED.

            if any([len(args['q_id']) < 1, len(args['q_res']) < 1]):
                raise Exception

            resp.responses[args['q_id']] = args['q_res']
            resp.save()

            return args, 200

        except Exception:
            raise Exception
