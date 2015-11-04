#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

"""
REST API End Points
"""

import datetime
import dateutil.parser
import json

from bson.objectid import ObjectId
from flask import request, Blueprint, render_template
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required

from survaider import app
from survaider.minions.helpers import HashId
from survaider.user.model import User
from survaider.survey.model import Survey, Response, ResponseSession, Helper, ResponseAggregation

class SurveyController(Resource):

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('s_name', type = str, required = True)
        parser.add_argument('s_desc', type = str)
        return parser.parse_args()

    def get(self):
        if current_user.is_authenticated():
            svey = Survey.objects(created_by = current_user.id)

            survey_list = []

            for sv in svey:
                survey_list.append({
                    'id': str(sv),
                    'name': sv.metadata['name'],
                    'uri': '/survey/s:{0}/simple'.format(str(sv)),
                    'uri_edit': '/survey/s:{0}/edit'.format(str(sv)),
                    'uri_responses': '/survey/s:{0}/analysis'.format(str(sv)),
                    'is_paused': sv.paused,
                    'is_active': sv.active,
                    'is_expired': sv.expires <= datetime.datetime.now(),
                    'expires': str(sv.expires),
                })

            ret = {
                "data": survey_list,
                "owner": str(current_user.id),
                "survey_count": len(survey_list),
            }

            return ret, 200
        else:
            return "NOPE!", 401

    def post(self):
        if current_user.is_authenticated():
            args = self.post_args()
            svey = Survey()
            usr  = User.objects(id = current_user.id).first()
            svey.metadata['name'] = args['s_name']
            svey.metadata['desc'] = args['s_desc']
            svey.created_by.append(usr)
            svey.save()

            ret = {
                'id': str(svey),
                'uri': '/survey/s:{0}'.format(str(svey)),
                'uri_edit': '/survey/s:{0}/edit'.format(str(svey)),
            }

            return ret, 200
        else:
            return "NOPE!", 401

class SurveyMetaController(Resource):

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('swag', type = str, required = True)
        return parser.parse_args()

    def get_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('editing', type = str)
        return parser.parse_args()

    def get(self, survey_id, action):
        args = self.get_args()
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if action == 'json':
            if args['editing'] == 'true':
                return svey.structure
            return Helper.process_render_json(svey.structure)

        elif action == 'paused':
            pass

        return "No action"

    def post(self, survey_id, action):
        if current_user.is_authenticated():
            args = self.post_args()
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if action == 'struct':
                svey.structure = json.loads(args['swag'])
                svey.save()

                ret = {
                    'id': str(svey),
                    'saved': True,
                }

                return ret, 200

            elif action == 'expires':
                dat = args['swag']
                svey.expires = dateutil.parser.parse(dat)
                svey.save()

                ret = {
                    'id': str(svey),
                    'field': action,
                    'saved': True,
                }
                return ret, 200

            elif action == 'paused':
                dat = json.loads(args['swag'])
                if type(dat) is bool:
                    svey.paused = dat
                    svey.save()

                    ret = {
                        'id': str(svey),
                        'field': action,
                        'saved': True,
                    }
                    return ret, 200
                raise Exception("TypeError")

            raise Exception("Unauthorized User")
        else:
            return "NOPE!", 401

    def delete(self, survey_id):
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

        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()
        args = self.get_args()
        is_running = ResponseSession.is_running(s_id)

        ret = {
            'response_session_running': is_running,
            'will_accept_response': svey.active,
            'will_end_session': False,
            'is_expired': svey.expires <= datetime.datetime.now(),
            'is_paused': svey.paused,
            'is_active': svey.active,
            'expires': str(svey.expires),
        }

        if is_running:
            "End The Existing Survey."
            if args['new']:
                ResponseSession.finish_running(s_id)
                ret['will_accept_response'] = False
                ret['will_end_session'] = True

        return ret, 201

    def post(self, survey_id):
        """
        POST /api/survey/<survey_id>/response
        Saves the Question Responses. The responses are saved atomically.
        Aggregate saving of the responses is NOT implemented yet, since the
        game requires atomic response storage.

        Appends to the existing response document if it exists, otherwise
        creats a new document.

        Args:
            q_id (str):  Question ID, as generated in the survey structure.
            q_res (str): Response.
        """

        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if not svey.active:
            raise Exception("Inactive")

        resp = None

        ret = {
            "existing_response_session": False,
            "new_response_session": False,
            "will_add_id": None,
        }

        if ResponseSession.is_running(svey.id):
            "Uses existing Response Session."
            ret['existing_response_session'] = True
            resp_id = ResponseSession.get_running_id(s_id)
            resp = Response.objects(id = resp_id).first()
        else:
            "Creates a New Response Session."
            ret['new_response_session'] = True
            resp = Response(parent_survey = svey)
            resp.metadata['started'] = datetime.datetime.now()
            resp.save()
            ResponseSession.start(s_id, resp.id)

        args = self.post_args()

        if any([len(args['q_id']) < 1, len(args['q_res']) < 1]):
            raise Exception("Input data not valid.")

        resp.add(args['q_id'], args['q_res'])
        ret['will_add_id'] = args['q_id']

        return ret, 200

class ResponseAggregationController(Resource):

    def get(self, survey_id):
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        responses = ResponseAggregation(svey)

        return responses.get(), 201

srvy = Blueprint('srvy', __name__, template_folder = 'templates')

@srvy.route('/s:<survey_id>/edit')
def get_index(survey_id):
    return render_template('srvy.index.html')

@srvy.route('/s:<survey_id>/analysis')
def get_analysis_page(survey_id):
    render_dat = {
        'id': survey_id
    }
    return render_template('srvy.analysis.html', dat = render_dat)

@srvy.route('/s:<survey_id>/simple')
def get_simple_survey(survey_id):
    print(dir(app))
    return app.send_static_file('simplesurvey/index.simplesurvey.html')
