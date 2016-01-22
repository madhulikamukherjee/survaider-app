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
from uuid import uuid4
from flask import request, Blueprint, render_template, g
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required

from survaider import app
from survaider.minions.decorators import api_login_required
from survaider.minions.exceptions import APIException, ViewException
from survaider.minions.attachment import Image as AttachmentImage
from survaider.minions.helpers import api_get_object
from survaider.minions.helpers import HashId, Uploads
from survaider.user.model import User
from survaider.survey.structuretemplate import starter_template
from survaider.survey.model import Survey, Response, ResponseSession, ResponseAggregation, SurveyUnit

class SurveyController(Resource):

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('s_name', type = str, required = True)
        parser.add_argument('s_tags', type = str, required = True,
                            action = 'append')
        return parser.parse_args()

    @api_login_required
    def get(self):
        svey = Survey.objects(created_by = current_user.id)

        survey_list = [_.repr_sm for _ in svey if not _.hidden]

        ret = {
            "data": survey_list,
            "survey_count": len(survey_list),
        }

        return ret, 200

    @api_login_required
    def post(self):
        args = self.post_args()
        svey = Survey()
        usr  = User.objects(id = current_user.id).first()
        svey.metadata['name'] = args['s_name']

        struct_dict = starter_template
        opt = []
        for option in args['s_tags']:
            opt.append({
                'checked': False,
                'label': option
            })

        struct_dict['fields'][0]['field_options']['options'] = opt
        svey.struct = struct_dict
        svey.created_by.append(usr)
        svey.save()

        return svey.repr, 200

class SurveyMetaController(Resource):

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('swag', type = str, required = True)
        return parser.parse_args()

    def get_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('editing', type = str)
        return parser.parse_args()

    def get(self, survey_id, action = 'repr'):
        args = self.get_args()

        try:
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if svey is None:
                raise TypeError

            if svey.hidden:
                raise APIException("This Survey has been deleted", 404)

        except TypeError:
            raise APIException("Invalid Survey ID", 404)

        if action == 'json':
            if args['editing'] == 'true':
                return svey.struct
            try:
                return svey.render_json
            except TypeError as e:
                raise APIException(str(e), 400)

        elif action == 'deepjson':
            return svey.render_deepjson

        elif action == 'repr':
            return svey.repr

        raise APIException("Must specify a valid option", 400)

    @api_login_required
    def post(self, survey_id, action):
        svey = api_get_object(Survey.objects, survey_id)

        if svey.hidden:
            raise APIException("This Survey has been deleted", 404)

        if action == 'struct':
            args = self.post_args()
            svey.struct = json.loads(args['swag'])
            svey.save()

            ret = {
                'id': str(svey),
                'saved': True,
            }

            return ret, 200

        elif action == 'expires':
            args = self.post_args()
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
            args = self.post_args()
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
            raise APIException("TypeError: Invalid swag value.", 400)

        elif action == 'response_cap':
            args = self.post_args()
            dat = json.loads(args['swag'])
            if type(dat) is int:
                svey.response_cap = dat
                svey.save()

                ret = {
                    'id': str(svey),
                    'field': action,
                    'saved': True,
                }
                return ret, 200
            raise APIException("TypeError: Invalid swag value.", 400)

        elif action == 'unit_name':
            if type(svey) is not SurveyUnit:
                raise APIException("Action valid for Survey Units only.", 400)

            args = self.post_args()
            dat = args['swag']

            if not len(dat) > 0:
                raise APIException("TypeError: Invalid swag value.", 400)

            svey.unit_name = dat
            svey.save()

            ret = {
                'id': str(svey),
                'field': action,
                'saved': True,
            }

            return ret, 200

        elif action == 'unit_addition':
            if type(svey) is SurveyUnit:
                raise APIException("Action valid for Root Survey only.", 400)

            args = self.post_args()
            dat = args['swag']

            if not len(dat) > 0:
                raise APIException("TypeError: Invalid swag value.", 400)

            usvey = SurveyUnit()
            usr   = User.objects(id = current_user.id).first()
            usvey.unit_name = dat
            usvey.referenced = svey
            usvey.created_by.append(usr)
            usvey.save()
            usvey.reload()

            ret = {
                'id': str(svey),
                'unit': usvey.repr,
                'saved': True,
            }

            return ret, 200

        elif action == 'survey_name':
            args = self.post_args()
            dat = args['swag']
            if len(dat) > 0:
                svey.metadata['name'] = dat
                svey.save()

                ret = {
                    'id': str(svey),
                    'field': action,
                    'saved': True,
                }
                return ret, 200
            raise APIException("TypeError: Invalid swag value.", 400)

        elif action == 'img_upload':
            try:
                uploaded_img = AttachmentImage()
                usr = User.objects(id = current_user.id).first()
                uploaded_img.owner = usr
                uploaded_img.file = request.files['swag']
                uploaded_img.save()
                svey.attachments.append(uploaded_img)
                svey.save()

                ret = {
                    'id': str(svey),
                    'field': action,
                    'access_id': str(uploaded_img),
                    'temp_uri': uploaded_img.file,
                    'metadata': uploaded_img.repr,
                    'saved': True,
                }
                return ret, 200
            except Exception as e:
                raise APIException("Upload Error; {0}".format(str(e)), 400)

        raise APIException("Must specify a valid option", 400)

    def delete(self, survey_id, action = 'self'):
        if current_user.is_authenticated():
            try:
                s_id = HashId.decode(survey_id)
                svey = Survey.objects(id = s_id).first()

                if svey is None:
                    raise TypeError

                if svey.hidden:
                    raise APIException("This Survey has already been deleted", 404)

            except TypeError:
                raise APIException("Invalid Survey ID", 404)

            if action == 'self':
                svey.hidden = True
                svey.save()

                ret = {
                    'id': str(svey),
                    'field': action,
                    'saved': True,
                }
                return ret, 200

            elif action == 'img':
                args = self.post_args()
                dat = args['swag']

                try:
                    im_id = HashId.decode(dat)
                    img = AttachmentImage.objects(id = im_id).first()

                    if img is None:
                        raise TypeError

                    if img.hidden:
                        raise APIException("This Image has already been deleted", 404)

                    img.hidden = True
                    svey.attachments.remove(img)
                    img.save()
                    svey.save()

                    ret = {
                        'id': str(svey),
                        'img_id': str(img),
                        'field': action,
                        'saved': True,
                    }
                    return ret, 200

                except (TypeError, ValueError):
                    raise APIException("Invalid Image ID", 404)

        else:
            raise APIException("Login Required", 401)

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
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if svey is None:
                raise TypeError

            if svey.hidden:
                raise APIException("This Survey has been deleted", 404)

        except TypeError:
            raise APIException("Invalid Survey ID", 404)

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

        try:
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if svey is None:
                raise TypeError

            if svey.hidden:
                raise APIException("This Survey has been deleted", 404)

        except TypeError:
            raise APIException("Invalid Survey ID", 404)

        if not svey.active:
            raise APIException("This Survey is Inactive or is not accepting responses anymore.", 403)

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

        try:
            resp.add(args['q_id'], args['q_res'])
            ret['will_add_id'] = args['q_id']
        except TypeError as te:
            raise APIException(str(te), 400)

        return ret, 200

class ResponseAggregationController(Resource):

    def get(self, survey_id, action = 'flat'):
        try:
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if svey is None:
                raise TypeError

            if svey.hidden:
                raise APIException("This Survey has been deleted", 404)

        except TypeError:
            raise APIException("Invalid Survey ID", 404)

        responses = ResponseAggregation(svey)

        if action == 'flat':
            return responses.flat(), 201
        elif action == 'nested':
            return responses.nested(), 201

        raise APIException("Must specify a valid option", 400)

class ResponseDocumentController(Resource):

    def get(self, survey_id, response_id):
        try:
            s_id = HashId.decode(survey_id)
            svey = Survey.objects(id = s_id).first()

            if svey is None:
                raise TypeError("Invalid Survey ID")

            if svey.hidden:
                raise APIException("This Survey has been deleted", 404)

            r_id = HashId.decode(response_id)
            res  = Response.objects(id = r_id, parent_survey = s_id).first()

            if res is None:
                raise TypeError("Invalid Response ID")

        except TypeError as e:
            ret = str(e) if len(str(e)) > 0 else "Invalid Hash ID"
            raise APIException(ret, 404)

        return json.loads(res.to_json()), 201

srvy = Blueprint('srvy', __name__, template_folder = 'templates')

@srvy.route('/s:<survey_id>/edit')
def get_index(survey_id):
    try:
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if svey is None:
            raise TypeError

        if svey.hidden:
            raise ViewException("This Survey has been deleted.", 404)

    except TypeError:
        raise ViewException("Invalid Survey ID", 404)

    return render_template('srvy.index.html', title = "Editing Survaider", survey = svey)

@srvy.route('/s:<survey_id>/analysis')
def get_analysis_page(survey_id):
    try:
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if svey is None:
            raise TypeError

    except TypeError:
        raise ViewException("Invalid Survey ID", 404)

    return render_template('srvy.analysis.html', title = "Analytics", survey = svey.repr)

@srvy.route('/s:<survey_id>/simple')
def get_simple_survey(survey_id):
    try:
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if svey is None:
            raise TypeError

        if not svey.active:
            raise ViewException("This Survey is not accepting Responses at this moment", 403)

    except TypeError:
        raise ViewException("Invalid Survey ID", 404)

    return app.send_static_file('simplesurvey/index.simplesurvey.html')

@srvy.route('/s:<survey_id>/gamified')
def get_gamified_survey(survey_id):
    try:
        s_id = HashId.decode(survey_id)
        svey = Survey.objects(id = s_id).first()

        if svey is None:
            raise TypeError

        if not svey.active:
            raise ViewException("This Survey is not accepting Responses at this moment", 403)

        if not svey.gamified_enabled:
            raise ViewException("This Survey cannot be rendered as a Game.", 403)

    except TypeError:
        raise ViewException("Invalid Survey ID", 404)

    return app.send_static_file('gamified/index.html')

@srvy.route('/s:<survey_id>/Release/<filename>')
def gamified_assets(survey_id, filename):
    new_path = 'gamified/Compressed/{0}gz'.format(filename)
    print(new_path)
    g.gzip = True
    return app.send_static_file(new_path)

@srvy.route('/s:<survey_id>/TemplateData/<filename>')
def gamified_assets_2(survey_id, filename):
    new_path = 'gamified/TemplateData/{0}'.format(filename)
    return app.send_static_file(new_path)
