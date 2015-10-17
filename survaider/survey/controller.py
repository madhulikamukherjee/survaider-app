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

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('s_name', type = str, required = True)
        parser.add_argument('s_desc', type = str)
        return parser.parse_args()

    def get(self):
        return

    def post(self):
        return

class SurveyMetaController(Resource):
    def get(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass

class ResponseController(Resource):
    """
    REST Api Endpoint Controller for Response Collections.
    """

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
        """
        GET /api/survey/<survey_id>/response
        Returns whether any valid response object for the <survey_id> exists
        in the Collection.
        It is up to the Client Code to implement saving of the responses so that
        the survey can be continued even after it is terminated pre-maturely.
        For security, the responses are NOT returned.

        Args:
            new (bool): Send a True GET parameter in URL to end the currently
                        running response.
                        Example: GET /api/survey/<survey_id>/response?new=true
        """

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
        """
        POST /api/survey/<survey_id>/response
        Saves the Question Responses. The responses are saved atomically.
        Aggregate saving of the responses is NOT implemented yet, since the
        game requires atomic response storage.

        TODO: Aggregate response handelling.

        Appends to the existing response document if it exists, otherwise
        creats a new document.

        Args:
            q_id (str):  Question ID, as generated in the survey structure.
            q_res (str): Response.
        """

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
