#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

"""
REST API End Points
"""

import datetime
import dateutil.parser
import requests
import json

from bson.objectid import ObjectId
from uuid import uuid4
from flask import request, Blueprint, render_template, g,jsonify, make_response
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required
from mongoengine.queryset import DoesNotExist, MultipleObjectsReturned
from textblob import TextBlob
from survaider import app
from survaider.minions.decorators import api_login_required
from survaider.minions.exceptions import APIException, ViewException
from survaider.minions.attachment import Image as AttachmentImage
from survaider.minions.helpers import api_get_object
from survaider.minions.helpers import HashId, Uploads
from survaider.user.model import User
from survaider.survey.structuretemplate import starter_template
from survaider.survey.model import Survey, Response, ResponseSession, ResponseAggregation, SurveyUnit, JupiterData, ClientAspects

from survaider.survey.model import DataSort, IrapiData, Dashboard, WordCloudD, Reviews, Relation, AspectData, InsightsAggregator, LeaderboardAggregator
from survaider.minions.future import SurveySharePromise
from survaider.security.controller import user_datastore
import ast
from survaider.survey.test_models import Test
from survaider.config import MG_URL, MG_API, MG_VIA,authorization_key,task_url
from survaider.survey.keywordcount import KeywordCount
from survaider.survey.constantsFile import Providers, Aspects
from datetime import datetime as dt

task_header= {"Authorization":"c6b6ab1e-cab4-43e4-9a33-52df602340cc"}

#The key and the url.
class SurveyController(Resource):
    def post_args_bulk(self):
        parser = reqparse.RequestParser()
        parser.add_argument('bulk', type = bool, required = True)
        parser.add_argument('payload', type = str, required = True)
        return parser.parse_args()

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('s_name', type = str, required = True)
        parser.add_argument('s_tags', type = str, required = True, action = 'append')
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
        """Saves onboarding data to database."""
        # TODO: Add additional info about collections used in docstring for this function.

        # Collections' initializations.
        survey = Survey()
        client_aspects = ClientAspects()

        parent_user  = User.objects(id = current_user.id).first()
        survey.created_by.append(parent_user)

        ret = {}

        try:
            args = self.post_args()
        except Exception as e:
            args = self.post_args_bulk()

            payload = json.loads(args['payload'])
            name = payload['create']['survey_name']
            aspects = payload['create']['key_aspects']

            survey.metadata['social'] = payload['social']
            survey.save()
            ret['partial'] = False

            # Create units.
            for unit in payload['units']:
                survey_unit = SurveyUnit()
                survey_unit.unit_name = unit['unit_name']
                survey_unit.referenced = survey
                if unit['unit_name'] in payload['services']:
                    survey_unit.metadata['services'] = payload['services'][unit['unit_name']]
                survey_unit.created_by.append(parent_user)
                survey_unit.save()

                unit_survey_id = HashId.encode(survey_unit.id)
                unit['id'] = unit_survey_id

                try:    # Check if unit manager has an account.
                    child_user = User.objects.get(email = unit['owner_mail'])
                except DoesNotExist:    # If unit manager's account doesn't exist,
                    unit_pswd = HashId.hashids.encode(
                        int(datetime.datetime.now().timestamp())
                    )
                    # create unit manager's account and
                    user_datastore.create_user(
                        email=unit['owner_mail'],
                        password=unit_pswd
                    )
                    child_user = User.objects.get(email = unit['owner_mail'])

                    # send mail to unit manager.
                    requests.post(MG_URL, auth=MG_API, data={
                        'from': MG_VIA,
                        'to': unit['owner_mail'],
                        'subject': 'Survaider | Unit Credential',
                        'text': (
                            "Hello,\n\r"
                            "You have been given access to {0} of {1}. You may "
                            "login to Survaider using the following credentials:\n\r"
                            "Username: {2}\n\r"
                            "password: {3}\n\r"
                            "Thanks,\n\r"
                            "Survaider"
                        ).format(unit['unit_name'], name, unit['owner_mail'], unit_pswd)
                    })
                finally:
                    relation = Relation(
                        survey_id=unit_survey_id,
                        parent=HashId.encode(survey.id)
                    )
                    relation.provider = []
                    for provider in payload['services'][unit['unit_name']]:
                        relation.provider.append(provider)
                    relation.save()
                    survey_unit.created_by.append(child_user)
                    survey_unit.save()
        else:
            name = args['s_name']
            aspects = args['s_tags']
        finally:
            survey.metadata['name'] = name

            struct_dict = starter_template
            aspects_opt = []
            for aspect in aspects:
                aspects_opt.append({'checked': False, 'label': aspect})

            # struct_dict['fields'][0]['field_options']['options'] = opt
            unit_details = []
            for unit in payload['units']:
                unit_details.append([unit['unit_name'], unit['id']])

            units_opt = []
            for unit_detail in unit_details:
                units_opt.append({
                    'checked': False,
                    'label': unit_detail[0],
                    'unit_id': unit_detail[1]
                })

            # Populating single_choice question
            struct_dict['fields'][0]['field_options']['options'] = units_opt

            # Populating group_rating question
            struct_dict['fields'][1]['field_options']['options'] = aspects_opt

            survey.struct = struct_dict
            survey.save()

            # `survey.save()` should be called before saving client_aspects because
            # it needs survey.id.
            client_aspects.parent_id = HashId.encode(survey.id)
            client_aspects.aspects = aspects
            client_aspects.save()

            ret['pl'] = payload
            ret.update(survey.repr)

            return ret, 200 + int(ret.get('partial', 0))

    # @api_login_required
    # def post(self):
    #     # This portion of the code does the magic after onboarding
    #     svey = Survey()
    #     usr  = User.objects(id = current_user.id).first()
    #     us = User.objects()
    #     svey.created_by.append(usr)
    #     ret = {}
    #     #This whole piece of code is in try catch else finally block. Where everything written under the final clause will run
    #     #And among the try except else. any one will run.
    #     #So I added a put request where Prashy had asked me to
    #     try:
    #         args = self.post_args()
    #         Test(init="1").save() # the value init is the identifier.
    #     except Exception as e:
    #         args = self.post_args_bulk()
    #
    #         payload = json.loads(args['payload'])
    #         name = payload['create']['survey_name']
    #         tags = payload['create']['key_aspects']
    #
    #         #: Do whatever we want with metadata here.
    #         svey.metadata['social'] = payload['social']
    #         svey.save()
    #         ret['partial'] = False
    #
    #         #: Create units.
    #         for unit in payload['units']:
    #             Test(init="2").save()  #this ran
    #             usvey = SurveyUnit()
    #             usvey.unit_name = unit['unit_name']
    #             usvey.referenced = svey
    #
    #             if unit['unit_name'] in payload['services']:
    #                 usvey.metadata['services'] = payload['services'][unit['unit_name']]
    #
    #             usvey.created_by.append(usr)
    #             usvey.save()
    #             child= HashId.encode(usvey.id)
    #             unit['id']=child
    #             Test(init=HashId.encode(usvey.id)).save()
    #             try:
    #                 shuser = User.objects.get(email = unit['owner_mail'])
    #                 Test(init="7").save()
    #             except DoesNotExist:
    #                 upswd = HashId.hashids.encode(
    #                     int(datetime.datetime.now().timestamp())
    #                 )
    #                 user_datastore.create_user(
    #                     email=unit['owner_mail'],
    #                     password=upswd
    #                 )
    #                 # ftract = SurveySharePromise()
    #                 # ftract.future_email = unit['owner_mail']
    #                 # ftract.future_survey = usvey
    #                 # ftract.save()
    #                 # Send email here.
    #                 # ret['partial'] = True
    #                 #Here the TASK + webhookLOGIC WOULD BE ADDED !
    #                 #Prashant told me here to put the code for task.
    #                 try:
    #                     for prov in payload['services'][unit["unit_name"]]:
    #                         data={"survey_id":HashId.encode(svey.id),"access_url":payload["services"][unit["unit_name"]][prov],"provider":prov,"children":child}
    #                         r= requests.put(task_url,data=data,headers=task_header)
    #                         Relation(parent=HashId.encode(svey.id),survey_id=child,provider=prov).save()
    #                         Test(init=str(r.content)).save()
    #                 except Exception as e:
    #                     print (e)
    #                     Test(init=str(e)).save()
    #                 Test(init="6").save()
    #                 requests.post(MG_URL, auth=MG_API, data={
    #                     'from': MG_VIA,
    #                     'to': unit['owner_mail'],
    #                     'subject': 'Survaider | Unit Credential',
    #                     'text': (
    #                         "Hello,\n\r"
    #                         "You have been given access to {0} of {1}. You may"
    #                         "login to Survaider using the following credentials:\n\r"
    #                         "Username: {2}\n\r"
    #                         "password: {3}\n\r"
    #                         "Thanks,\n\r"
    #                         "Survaider"
    #                     ).format(unit['unit_name'], name, unit['owner_mail'],upswd)
    #                 })
    #                 shuser = User.objects.get(email = unit['owner_mail'])
    #             finally:
    #                 Test(init="3").save() #this too
    #                 usvey.created_by.append(shuser)
    #                 usvey.save()
    #     else:
    #         Test(init="4").save()
    #         name = args['s_name']
    #         tags = args['s_tags']
    #     finally:
    #         #Will always , run . I meant Finally
    #         """
    #         Anything written under the finally clause will run for sure. It sends back the success status.
    #         Now you may ask , how I am so sure that none of the other blocks are running.
    #         I created a document in database and saved some values if a particular block ran well/ let me show you
    #         So by referring to the number I would have an idea of which block of code ran successfully.
    #         """
    #         Test(init="5").save()
    #         svey.metadata['name'] = name
    #
    #         struct_dict = starter_template
    #         aspects_opt = []
    #         for option in tags:
    #             aspects_opt.append({
    #                 'checked': False,
    #                 'label': option
    #             })
    #
    #         # struct_dict['fields'][0]['field_options']['options'] = opt
    #         unit_details = []
    #         for unit in payload['units']:
    #             unit_details.append([unit['unit_name'], unit['id']])
    #
    #         units_opt = []
    #         for unit_detail in unit_details:
    #             units_opt.append({
    #                 'checked': False,
    #                 'label': unit_detail[0],
    #                 'unit_id': unit_detail[1]
    #                 })
    #
    #         # Populating single_choice question
    #         struct_dict['fields'][0]['field_options']['options'] = units_opt
    #
    #         # Populating group_rating question
    #         struct_dict['fields'][1]['field_options']['options'] = aspects_opt
    #
    #         svey.struct = struct_dict
    #         svey.save()
    #         ret['pl'] = payload
    #         ret.update(svey.repr)
    #
    #         return ret, 200 + int(ret.get('partial', 0))

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
                'unit': usvey.repr_sm,
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

        elif action == 'share':
            args = self.post_args()
            dat = args['swag']
            try:
                usr = User.objects.get(email = dat)
                grp = set(svey.created_by)
                grp.add(usr)
                svey.created_by = list(grp)
                svey.save()
                ret = {
                    'id': str(svey),
                    'action': action,
                    'user': usr.repr,
                    'survey': svey.repr_sm
                }
                return ret, 200
            except DoesNotExist:
                try:
                    ftract = SurveySharePromise.objects(
                        future_email = dat,
                        future_survey = svey
                    ).first()
                    if not ftract or ftract.active is False:
                        raise ValueError
                except ValueError:
                    ftract = SurveySharePromise()
                    ftract.future_email = dat
                    ftract.future_survey = svey
                    ftract.save()
                    #: Send the Email Here. Send the URL by `ftract.url` attr.
                finally:
                    ret = {
                        'id': str(svey),
                        'action': action,
                        'scheduled': True,
                        'message': ('The user will be added to the survey after '
                                    'they sign up on the website.'),
                        'promise': ftract.repr
                    }
                return ret, 201

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
    def __init__(self):
        self.r_unit_id = None

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('q_id',  type = str, required = True)
        parser.add_argument('q_res', type = str, required = True)
        parser.add_argument('q_unit_id', type = str, required = True)
        parser.add_argument('q_res_plain', type = str, required = True)
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

            sv = Survey.objects(id = s_id)

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
                resp_id = ResponseSession.get_running_id(s_id)
                resp = Response.objects(id = resp_id).first()
                ResponseSession.finish_running(s_id)
                ret['will_accept_response'] = False
                ret['will_end_session'] = True

                res = resp['responses']
                for key in res:
                    a=res[key]
                    for val in a:
                        if val == "unit_id":
                            if a[val] != None:
                                self.r_unit_id = a[val]
                                R_id=HashId.decode(self.r_unit_id)
                                svey1 = Survey.objects(id = R_id).first()

                    if self.r_unit_id != None :
                        new_resp = Response()
                        new_resp = resp
                        new_resp.parent_survey = svey1
                        new_resp.save()

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
            q_res_plain (str): Pretty Response
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
            resp.add(**args)
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
        elif action == 'csv':
            csv = '\n'.join(responses.csv())
            res = make_response(csv)
            res.headers['content-type'] = 'text/csv'
            return res

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

        return res.response_sm, 201


# Zurez
import pymongo
from bson.json_util import dumps
def d(data):return json.loads(dumps(data))
def prettify(ugly): return ' '.join([word.title() for word in ugly.split('_')]) # Haha '_'

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, dt):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

class Sentiment_OverallPolarity(object):
    def __init__(self,survey_id, from_child, provider="all", children_list=[]):
        self.sid=HashId.encode(survey_id)
        self.p= provider
        self.from_child = from_child
        self.children_list = children_list

    def get(self, parent_survey):
        P = Providers()
        providers=P.get(parent_survey)
        sents=["Positive","Negative","Neutral"]
        overall = {}
        reviews = {}
        if self.from_child:
            # Coming directly from child. Calculate overall sentiments as well as reviews.
            if self.p=="all":
                for i in providers:
                    overall[i] = {}
                    reviews[i] = []
                    for j in sents:
                        result= Reviews.objects(survey_id = self.sid, provider=i, sentiment= j)
                        for obj in result:
                            review_obj = {}
                            review_obj["text"] = obj.review
                            review_obj["rating"] = obj.rating
                            review_obj["link"] = obj.review_link
                            review_obj["original_date"] = json.dumps(obj.date_added, cls=DateTimeEncoder)
                            review_obj["sentiment"] = obj.sentiment
                            reviews[i].append(review_obj)
                        overall[i][j]=len(result)
            else:
                overall[self.p]={}
                for j in sents:
                        result= Reviews.objects(survey_id= self.sid,provider=self.p,sentiment= j)
                        if isparent:
                            for obj in result:
                                review_obj = {}
                                review_obj["text"] = obj.review
                                review_obj["rating"] = obj.rating
                                review_obj["link"] = obj.review_link
                                review_obj["original_date"] = json.dumps(obj.date_added, cls=DateTimeEncoder)
                                review_obj["sentiment"] = obj.sentiment
                                reviews[self.p].append(review_obj)
                        overall[self.p][j]=len(result)

            return [overall, reviews]

        if not self.from_child:

            # this call is coming from parent dashboard. Survey ID could be parent or derivative child.
            # if its a parent, then children list is provided. If not parent, then children list is empty.

            if len(self.children_list) !=0 :
                # then its obviously parent. Dont calculate reviews. Just overall sentiments of parent, for all children combined.
                if self.p=="all":
                    for i in providers:
                        overall[i] = {}
                        for j in sents:
                            result = []
                            for child in self.children_list:
                                result += Reviews.objects(survey_id = child, provider=i, sentiment= j)
                            overall[i][j]=len(result)
                else:
                    overall[self.p]={}
                    for j in sents:
                        for child in self.children_list:
                            result += Reviews.objects(survey_id= child, provider=self.p, sentiment= j)
                        overall[self.p][j]=len(result)
                return overall

            if len(self.children_list) == 0:
                # do nothing
                return []

class WordCloud(object):
    """docstring for WordCloud"""
    def __init__(self, survey_id, provider, from_child, children_list):

        self.sid= HashId.encode(survey_id)
        self.p=provider
        self.from_child = from_child
        self.children_list = children_list

    def get(self, parent_survey):
        new_wc={}
        if self.from_child:
            temp2 = {}
            final = {}
            # API call coming directly from child. Calculate wordcloud.
            if self.p!="all":
                provider=self.p
                wc= WordCloudD.objects(survey_id=self.sid,provider=self.p)
                new_wc[provider]={}
                for i in wc:
                    new_wc[provider].update(i.wc)
                temp2 = { str(provider) : []}
                y = str(provider)
                for key, val in new_wc.items():
                    for key1, val1 in val.items():
                        temp = {
                            "text": str(key1),
                            "size": float(val1)
                        }
                        temp2[y].append(temp)
                final.update(temp2)

            else:
                P = Providers()
                providers= P.get(parent_survey)
                for x in providers:
                    wc= WordCloudD.objects(survey_id=self.sid,provider=x)
                    new_wc[x]={}
                    for i in wc:
                        new_wc[x].update(i.wc)

                    temp2 = { str(x) : []}
                    y = str(x)
                    for key, val in new_wc.items():
                        for key1, val1 in val.items():
                            temp = {
                                "text": str(key1),
                                "size": float(val1)
                            }
                            temp2[y].append(temp)
                    final.update(temp2)
            # return new_wc
            return final

        if not self.from_child:
            temp2 = {}
            final = {}

            #API call could be coming from parent or child. If parent, then children list is provided, otherwise its empty.
            if len(self.children_list) != 0:
                #Then its obviously parent. Calculate wordcloud for all children combined.
                if self.p!="all":
                    provider=self.p
                    wc = []
                    for child in self.children_list:
                        wc += WordCloudD.objects(survey_id=child,provider=self.p)
                    new_wc[provider]={}
                    for i in wc:
                        new_wc[provider].update(i.wc)
                    temp2 = { str(provider) : []}
                    y = str(provider)
                    for key, val in new_wc.items():
                        for key1, val1 in val.items():
                            temp = {
                                "text": str(key1),
                                "size": float(val1)
                            }
                            temp2[y].append(temp)
                    final.update(temp2)

                else:
                    P = Providers()
                    providers= P.get(parent_survey)
                    for x in providers:
                        wc = []
                        for child in self.children_list:
                            wc += WordCloudD.objects(survey_id=child,provider=x)
                        new_wc[x]={}
                        for i in wc:
                            new_wc[x].update(i.wc)
                        temp2 = { str(x) : []}
                        y = str(x)
                        for key, val in new_wc.items():
                            for key1, val1 in val.items():
                                temp = {
                                    "text": str(key1),
                                    "size": float(val1)
                                }
                                temp2[y].append(temp)
                        final.update(temp2)
            # return new_wc
            return final

            if len(self.children_list) == 0:
                #do nothing
                return []

class DashboardAPIController(Resource):
    """docstring for DashboardAPIController"""

    def logic(self,survey_id,parent_survey, from_child, provider,aggregate="false", jupiter_data = [], children_list=[]):

        """
        Logic : The child needs to copy their parents survey structure , pass the parent survey strc
        """
        # print (jupiter_data)
        print ("CALLED DASHBOARD LOGIC", HashId.encode(survey_id))
        # print ("\n\n",jupiter_data["owner_aspects"])

        lol= IrapiData(survey_id,1,1,aggregate)
        csi= lol.get_child_data(survey_id)#child survey info

        try:
            wordcloud= d(WordCloud(survey_id,provider,from_child,children_list).get(HashId.encode(parent_survey)))
        except:
            wordcloud= d(WordCloud(survey_id,provider,from_child,children_list).get(parent_survey))

        company_name=Survey.objects(id = survey_id).first().metadata['name']

        response_data= lol.get_data()
        result= {}

        if parent_survey==survey_id:

            survey_strct= d(lol.survey_strct())
            aspect_data = jupiter_data["owner_aspects"]
            insight_data = InsightsAggregator(survey_id).getInsights()
            if insight_data!= None:
                result['insights'] = insight_data
            leaderboard = LeaderboardAggregator(survey_id).getLeaderboard()
            if leaderboard!=None:
                result['leaderboard'] = leaderboard


        elif parent_survey!=survey_id:
            s= IrapiData(parent_survey,1,1,aggregate)
            survey_strct=d(s.survey_strct())

            aspect_data = jupiter_data["units_aspects"][HashId.encode(survey_id)]

        try:
            returned_sentiment= Sentiment_OverallPolarity(survey_id,from_child,provider,children_list).get(HashId.encode(parent_survey))
        except:
            returned_sentiment= Sentiment_OverallPolarity(survey_id,from_child,provider,children_list).get(parent_survey)


        if from_child:
            overall_sentiments = returned_sentiment[0]
            review_sentiments = returned_sentiment[1]
        else:
            overall_sentiments = returned_sentiment

        sentiment = {}

        for channel in overall_sentiments:
            sentiment[channel] = {}
            sentiment[channel]["sentiment_segg"] = wordcloud[channel]

            for sent in overall_sentiments[channel]:
                sentiment[channel][sent] = overall_sentiments[channel][sent]

            if from_child:
                sentiment[channel]["options_count"] = review_sentiments[channel]

        try:
            survey_name= csi[0].unit_name
            created_by= d(csi[0].created_by[0].id)["$oid"]

        except:
            survey_name="Parent Survey"
            created_by="Not Applicable"

        """ALT"""
        cids= []

        for i in survey_strct:

            x= i['field_options']
            if (("deletable" in x) and (i["field_type"] == "rating")):
                cids.append(i['cid'])

        """ END"""
        res=[]
        r= {}
        for cid in cids:
            alol = DataSort(parent_survey,cid,aggregate)
            survey_data= alol.get_uuid_label()#?So wrong

            j_data= d(survey_data)

            if "options" in survey_data['field_options']:
                try:
                    # options=[]
                    option_code={}

                    for i in range(len(j_data['field_options']['options'])):
                        # options.append(j_data['field_options']['options'][i]['label'])
                        option_code["a_"+str(i+1)]=j_data['field_options']['options'][i]['label']
                except :
                    pass

            else:pass

            temp= []
            timed={}
            import time

            for i in response_data:
                if cid in i[0]:

                    temp.append(i[0][cid]['raw'])
                    timestamp= d(i[1]['modified'])['$date']/1000
                    timestamp=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp))
                    timed[timestamp]=i[0][cid]

            options_count={}

            timed_agg={}
            timed_agg_counter={}

            # elif j_data['field_type']=="rating":
            if j_data['field_type']=="rating":
                for i in temp:
                    # return i
                    if str(i[2:]) in options_count:
                        options_count[str(i[2:])]+=1
                    else:
                        options_count[str(i[2:])]=1

                ll= 0
                for j in temp:
                    ll= float(ll)+float(j[2:])

                if len(temp) != 0:
                    avg=round(ll/len(temp),2)
                else:
                    avg=0


                for time , value in timed.items():

                    if time[:10] not in timed_agg_counter:
                        timed_agg_counter[time[:10]]=0
                    if time[:10] in timed_agg:
                        timed_agg[time[:10]]+=int(value['raw'][2:])
                        timed_agg_counter[time[:10]]+=1

                    else:
                        timed_agg[time[:10]]=int(value['raw'][2:])
                        timed_agg_counter[time[:10]]=1
                timed_final={}
                for time,value in timed_agg.items():
                    avg = round(float(timed_agg[time])/float(timed_agg_counter[time]),2)
                    timed_final[time]=avg

                # TAKING AVERAGE FROM EXTERNAL APP DATA

                # avg+=aspect['overall']*2
                # avg=round(avg/2,2)

            response={}
            response['cid']= cid

            try:
                response['avg_rating']=avg

            except:pass



            if j_data['field_type']=='rating':
                response['timed_agg']=timed_final
                response['timed']=timed
            if j_data['field_type']=="group_rating":
                response['options_code']=option_code
            else:pass

            response['options_count']=options_count
            response['label']=survey_data['label']

            # response['total_resp']=aspect_data['total_resp']

            res.append(response)

        if parent_survey==survey_id:
            time_unified = jupiter_data['owner_aspects']['time_unified']
            final_val = {}
            for i in time_unified:
                for key in i :
                    final_val[key] = i[key]

            result['time_unified'] = final_val
        elif parent_survey!=survey_id:
            time_unified = jupiter_data['units_aspects'][HashId.encode(survey_id)]['time_unified']
            final_val = {}
            for i in time_unified:
                for key in i :
                    final_val[key] = i[key]

            result['time_unified'] = final_val


        # Preparing feature_circles variable
        res.append({})
        feature_circles = {'avg_rating' : {}, 'options_code' : {}}

        i = 1
        for aspect in aspect_data['overall_aspects']:
            feature_circles['avg_rating']['a_' + str(i)] = aspect_data['overall_aspects'][aspect]
            feature_circles['options_code']['a_' + str(i)] = prettify(aspect)
            i += 1

        res[1] = feature_circles

        res[0]["avg_rating"] = aspect_data["unified"]
        # Done with both sets of inputs for dashboard - line graph and feature circles


        result["responses"]=res
        result["sentiment"]=sentiment
        result["meta"]={"total_resp": aspect_data['total_resp'],"created_by":created_by,"unit_name":survey_name,"company":company_name,"id":HashId.encode(survey_id)}
        return result

    def get(self,survey_id,provider,aggregate="false"):
        print ("CALLED DASHBOARD", survey_id)
        survey_id=HashId.decode(survey_id)

        parent_survey= survey_id
        l = IrapiData(survey_id,1,1,aggregate)

        flag0= l.get_parent()

        if flag0!=False:
            """There is a parent"""
            parent_survey= flag0

        flag = l.flag()

        from_child = 0

        # get the latest object from the collection
        print ("survey id", survey_id)
        print ("parent id", parent_survey)
        ju_obj_temp = JupiterData.objects(survey_id = HashId.encode(survey_id))

        # safety net for Lilac group
        lilac = False
        try :
            if HashId.encode(parent_survey) == "7jBazdjgwjjepnjypk9":
                lilac = True
        except :
            if parent_survey == "7jBazdjgwjjepnjypk9":
                lilac = True

        # check if it is a new entry
        if len(ju_obj_temp) == 0:
            print("\nNEW ENTRY")
            # jupiter_data1 = Dash(HashId.encode(parent_survey)).get(HashId.encode(parent_survey))
            try:
                jupiter_data1 = Dash(HashId.encode(parent_survey)).get(HashId.encode(parent_survey))
            except:
                jupiter_data1 = Dash(parent_survey).get(parent_survey)
            jobj = JupiterData()
            print ("\n\nJUPITER_DATA1", jupiter_data1)
            jobj.update(jupiter_data1, survey_id)
            jobj.save()

        elif lilac == False: # safety net for Lilac group
            print("\nOLD ENTRY EXISTS")
            print ("JupiterData for survey_id", HashId.encode(survey_id))

            # find the time difference
            a = ju_obj_temp[0]['last_updated']
            print ("last updated - ", a)
            b = datetime.datetime.now()
            c = b-a
            datetime.timedelta(0, 8, 562000)
            d = divmod(c.days * 86400 + c.seconds, 60)

            # if the diff is more than 24hrs then update the DB value
            if d[0] > 1200 :
                try:
                    jupiter_data1 = Dash(HashId.encode(parent_survey)).get(HashId.encode(parent_survey))
                except:
                    jupiter_data1 = Dash(parent_survey).get(parent_survey)
                jobj = JupiterData()
                jobj = ju_obj_temp[0]
                jobj.update(jupiter_data1,survey_id)
                jobj['last_updated'] = datetime.datetime.now()
                jobj.save()

        # get the latest updated jupiter data
        ju_obj_temp1 = JupiterData.objects(survey_id = HashId.encode(survey_id))

        jupiter_data = ju_obj_temp1[0]
        # print ("\nJUPITER DATA: ", jupiter_data)

        if flag ==False:
            r= {}
            from_child = 1
            r['parent_survey']= self.logic(survey_id, parent_survey, from_child, provider, aggregate, jupiter_data)
            return r
        else:
            if aggregate=="true":
                # return HashId.encode(survey_id)
                children_list = flag
                response={}
                response['parent_survey']= self.logic(survey_id,parent_survey, from_child, provider, aggregate, jupiter_data, children_list)
                # return response

                units=[]
                pwc=[]
                npwc={}
                for i in flag:
                    units.append(self.logic(HashId.decode(i),parent_survey, from_child, provider,aggregate, jupiter_data))

                response['units']=units

                return response
            else:
                r= {}
                r['parent_survey']= self.logic(survey_id,parent_survey, from_child, provider, aggregate, jupiter_data)
                return r

def to_json(data):return json.loads(dumps(data))
"""InclusiveResponse"""
class IRAPI(Resource):
    """
    docstring for IRAPI-  Inclusive-RAPI
    returns json response
    """

    def wc_to_dict(self,alist):
        v= 10
        alist=alist[0:v]
        adict={}
        for i in alist:
            adict[i[0]]=i[1]

        return adict

    def get(self,survey_id,start=None,end=None,aggregate="false"):
        try:
            survey_id=HashId.decode(survey_id)

        except ValueError:
            return "No survey_id or uuid provided"


        lol = IrapiData(survey_id,start,end,aggregate)

        all_responses= lol.get_data()

        all_survey= lol.get_uuid_labels()

        ret=[]

        for i in range(len(all_survey)):

            j_data=all_survey[i]

            uuid= j_data['cid']

            response_data=all_responses

            try:
                options=[]
                option_code={}
                for i in range(len(j_data['field_options']['options'])):
                    options.append(j_data['field_options']['options'][i]['label'])
                    option_code["a_"+str(i+1)]=j_data['field_options']['options'][i]['label']
            except:pass
            # return option_code
            """Response Count """
            temp=[]
            # return to_json(response_data[2][0])
            for a in range(len(response_data)):
                try:
                    temp.append(response_data[a][0][uuid])
                except:
                    pass
            # return temp
            """Option Count"""
            options_count={}
            options_count_segg={}
            sentiment={'positive':0,'negative':0,'neutral':0}
            long_text=""

            if j_data['field_type'] not in ["ranking","rating","group_rating"]:
                for b in temp:
                    if j_data['field_type']=='long_text':

                        blob = TextBlob(b['raw'])
                        try:
                            sentence_sentiment = blob.sentences[0].sentiment.polarity
                        except IndexError:
                            sentence_sentiment = 0

                        if sentence_sentiment > 0:
                            sent = 'positive'
                        if sentence_sentiment == 0:
                            sent = 'neutral'
                        if sentence_sentiment < 0:
                            sent = 'negative'

                        sentiment[sent]+=1
                        options_count_segg[b['raw']]=sent
                        long_text+=" "+b['raw']

                    if j_data['field_type']=='multiple_choice':
                            split_b= b['raw'].split('###')
                            if len(split_b)==0:
                                if split_b[0] in options_count_segg:
                                    options_count_segg[split_b[0]]+=1
                                else:options_count_segg[split_b[0]]=1
                            elif len(split_b)!=0:

                                for i in split_b:
                                    if i in options_count_segg:
                                        options_count_segg[i]+=1
                                    else:options_count_segg[i]=1

                    if j_data['field_type'] in["yes_no", "single_choice", "multiple_choice", "short_text"]:
                        if b['raw'] in options_count:
                            pass
                        else:
                            options_count[b['raw']]= sum(1 for d in temp if d.get('raw') == b['raw'])

                if j_data['field_type'] == "long_text":
                    keywordcounts = KeywordCount()
                    keywords = keywordcounts.run(long_text)
                    wc = self.wc_to_dict(keywords)

            elif j_data['field_type'] in ["ranking"]:
                values={}
                for c in temp:
                    # return c
                    aTempList=c['raw'].split("###") #split a##2###b##1### [ "a_1##2", "a_2##1", "a_3##3"]
                    for d in aTempList:
                        # return d
                        bTempList=d.split("##") #["a_1","2"]
                        # return bTempList ["a_1", "2"]
                        e = bTempList[0] #Values are a_1 ,a_2
                        rank_key= bTempList[1] #values are 1,2,3,4
                        # return values
                        if e in values:
                            if rank_key in values[e]:
                                values[e][rank_key]+=1
                            else:
                                values[e][rank_key]=1

                        else:
                            values[e]={}
                            values[e][rank_key]=1

                        if e in options_count:
                            """
                            e is for eg : a_1 or a_2
                            aTempList is the total options
                            bTempList is option:value pair
                            """
                            options_count[e]=int(options_count[e])+len(aTempList)-int(bTempList[1])
                        else:
                            options_count[e]=len(aTempList)-int(bTempList[1])

            elif j_data['field_type']=="group_rating":
                for f in temp:
                    # return f
                    aTempList=f['raw'].split("###")
                    for g in aTempList:
                        bTempList=g.split("##")
                        l= bTempList[0]
                        k=bTempList[1]
                        if l in options_count:
                            if k in options_count[l]:
                                options_count[l][k]+=1
                            else:options_count[l][k]=1
                        else:
                            options_count[l]={}
                            options_count[l][k]=1
            elif j_data['field_type']=="rating":
                for i in temp:
                    i = str(i['raw'])
                    if i in options_count:
                        options_count[i]+=1
                    else:options_count[i]=1

            response={}
            response['cid']=uuid
            response['label']=j_data['label']
            response['type']=j_data['field_type']
            response['options_code']=option_code
            response['options_count']=options_count

            if j_data['field_type']=='long_text':
                response['sentiment']=sentiment
                response['options_count']=options_count_segg
                # response['sentiment_segg']=options_count_segg
                keywords=wc
                response['keywords']=keywords
            #response['garbage']=temp
            if j_data['field_type']=='ranking':
                response['ranking_count']=values
            if j_data['field_type']=='multiple_choice':
                response['options_count_segg']=options_count_segg
            response['total_resp']= len(temp)
            if j_data['field_type']=="rating":
                # response['options_count'] = options_count
                avg=0
                for i in temp:
                    # return i
                    avg+=int(i['raw'][2:])
                # response['avg_rating']= float(avg)/float(len(temp))
                response['avg_rating']= float(avg)/len(temp)

                # return options_count
            if j_data['field_type']=="group_rating":
                avg={}
                for key in options_count:
                    counter=0
                    for bkey in options_count[key]:
                        if int(bkey)!=0:
                            counter+=float(bkey)*options_count[key][bkey]
                        else:pass
                    avg[key]= round(float(counter)/len(temp),2)
                response['avg_rating']=avg


            ret.append(response)
            # if uuid == "a957b9fe-864c-4391-8c80-ba90a19b92ea":
            #     return options_count
        return ret

class ResponseAPIController(Resource):
    """docstring for RAPI"""
    def get(self,survey_id,uuid,aggregate="false"):
        survey_id=HashId.decode(survey_id)  #Uncomment on Production
        # survey_id="IamASurveyId"

        lol= DataSort(survey_id,uuid,aggregate)
        all_survey= lol.get_survey()
        if "referenced" in all_survey[0]:
           # return "reference"
            parent_survey= all_survey[0]['referenced']['$oid']

            # parent_survey= HashId.decode(parent_survey)
            s= DataSort(parent_survey,uuid,aggregate)
            survey_data= s.get_uuid_label()

        else:
            survey_data= lol.get_uuid_label()
        j_data= d(survey_data)
        #return j_data
        # Get Responses for  a cid
        response_data= lol.get_data()
        #return j_data['field_options']['options'][0]['label']
        # Options

        try:
            options=[]
            option_code={}
            for i in range(len(j_data['field_options']['options'])):

                options.append(j_data['field_options']['options'][i]['label'])
                option_code["a_"+str(i+1)]=j_data['field_options']['options'][i]['label']

        except:
            return "error"

        #Response Count
        temp= []

        for i in range(len(response_data)):
            temp.append(response_data[i]['responses'][uuid])

        #eturn j_data['field_type']
        options_count={}
        if j_data['field_type'] not in ["ranking","rating","group_rating"]:
            for i in temp:
                if i in options_count:pass
                else:options_count[i]= temp.count(i)

        elif j_data['field_type'] in ["ranking"]:
            for i in temp:
                aTempList= i.split("###")
                for j in aTempList:
                    bTempList= j.split("##")
                    l = bTempList[0]
                    if l in options_count:

                        options_count[l]= int(options_count[l])+len(aTempList)-int(bTempList[1])
                    else:
                        options_count[l]=len(aTempList)-int(bTempList[1])

        # elif j_data['field_type']=="rating":
        #   for i in temp:
        #       aTempList= i.split("###") #Check if this breaks the logic
        #       for j in aTempList:
        #           bTempList= j.split("##")
        #           if j in options_count:
        #               options_count[j]= int(options_count[j])+ int(bTempList[1])
        #           else:
        #               options_count[j]= int(bTempList[1])
        elif j_data['field_type']=="group_rating":
            for i in temp:
                aTempList= i.split("###")
                #options_count={}

                for j in aTempList:
                    bTempList= j.split("##")
                    l = bTempList[0]

                    #o_c= {a_1:}
                    k= bTempList[1]
                    if l in options_count:

                        if k in options_count[l]:
                            options_count[l][k]+=1
                        else:
                            options_count[l][k]=1
                    else:
                        options_count[l]={}
                        options_count[l][k]=1


        elif j_data['field_type']=="rating":
            for i in temp:
                if str(i) in options_count:
                    options_count[str(i)] +=1
                else:
                    options_count[str(i)]=1
                # if int(i)>6:
                #   if "above_5" in options_count:
                #       options_count["above_5"]= options_count["above_5"]+1
                #   else:
                #       options_count["above_5"]=1
                # elif int(i)<6 and int(i)>3 :
                #   if "above_3" in options_count:
                #       options_count["above_3"]= options_count["above_3"]+1
                #   else:
                #       options_count["above_3"]=1
                # elif int(i)<=3:
                #   if "below_3" in options_count:
                #       options_count["below_3"]= options_count["below_3"]+1
                #   else:
                #       options_count["below_3"]=1


        # elif j_data['field_type']=="short_text":
        #     return "lol"

        response= {}
        if j_data['field_type']=="rating":
            avg= 0
            for i in temp: avg= avg + int(i)
            response['avg_rating']= round(float(avg)/float(len(temp)))
        if j_data['field_type']=="group_rating":
            avg={}
            for key in options_count:
                counter=0
                for bkey in options_count[key]:
                    if int(bkey)!=0:
                        counter+= float(bkey) * options_count[key][bkey]
                    else:
                        pass
                avg[key]= round(float(counter)/len(temp),2)

                # avg[key]=float(sum(options_count[key].values()))/float(len(temp))
            response['avg_rating']=avg

        response['cid']= uuid
        # survey_id= j_data['survey_id']
        response['survey_id']=survey_id
        response['label']=j_data['label']
        response['type']=j_data['field_type']
        response['options_code']=option_code
        response['options_count']=options_count
        #return option_code
        response['total_resp']=len(temp)
        response['garbage']= temp

        return d(response)

verbose = False

class Dash(Resource):
    """docstring for Dash -marker"""
    def __init__(self, parent_survey_id):
        self.parent_survey_id = parent_survey_id
        P = Providers()
        self.providers = P.get(self.parent_survey_id)
        A = Aspects()
        self.aspects = A.get(self.parent_survey_id)

    def get_child(self,survey_id):
        # print ("GETTING CHILDREN FOR", survey_id)
        objects= Relation.objects(parent=survey_id)
        return objects

    def get_reviews_count(self,survey_id,parent_survey_id,provider="all"):
        result = {}
        if provider=="all":
            # P = Providers()
            # providers = P.get(parent_survey_id)
            providers = self.providers

            for j in providers:
                reviews = Reviews.objects(survey_id= survey_id, provider = j)
                result[j] = len(reviews)

        if provider!="all":
            reviews=Reviews.objects(survey_id=survey_id,provider=provider)
            result[provider] = len(reviews)

        return result

    def get_avg_aspect(self,survey_id,parent_survey_id,provider="all"):
        # A = Aspects()
        # P = Providers()

        # aspects=A.get(parent_survey_id)
        # providers=P.get(parent_survey_id)
        aspects = self.aspects
        providers = self.providers

        response= {}
        if provider=="all":
            for j in providers:
                objects= AspectData.objects(survey_id=survey_id, provider=j)
                # print ("FINDING ASPECTS FOR: ", survey_id)
                length_objects = len(objects)
                # print ("NUMBER OF ASPECTS", length_objects)
                if length_objects!=0:
                    temp={}
                    for aspect in aspects:
                        temp[aspect]=0
                        for obj in objects:
                            if obj.name==aspect:
                                temp[aspect]+=float(obj.value)
                    #Average below
                    for aspect in aspects:
                        temp[aspect]=round((temp[aspect]/length_objects)*len(aspects), 2)
                    # temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
                    # temp['room_service']=round(temp['room_service']/length_objects, 2)
                    # temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
                    # temp['amenities']=round(temp['amenities']/length_objects, 2)
                    # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
                    response[j]=temp
                else:
                    response[j]={}

        else :
            objects = AspectData.objects(survey_id=survey_id,provider=provider)
            # print ("FINDING ASPECTS FOR: ", survey_id)
            length_objects = len(objects)
            # print("NUMBER OF ASPECTS", length_objects)
            if length_objects!=0:
                temp={}
                for aspect in aspects:
                    temp[aspect]=0
                    for obj in objects:
                        if obj.name==aspect:
                            temp[aspect]+=float(obj.value)
                #Average below
                for aspect in aspects:
                    temp[aspect]=round((temp[aspect]/length_objects)*len(aspects), 2)
                # temp['ambience']=round(temp['ambience']/length_objects, 2)
                # temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
                # temp['room_service']=round(temp['room_service']/length_objects, 2)
                # temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
                # temp['amenities']=round(temp['amenities']/length_objects, 2)
                # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
                response[provider]=temp

            else:
                response[provider] = {}
        return response

    def unified_rating(self,survey_id,parent_survey_id,NUMBER_OF_CHANNELS, num_reviews_channel, ASPECTS):
        avg_of_aspects = {}
        # P = Providers()
        # providers = P.get(parent_survey_id)
        providers = self.providers

        channel_contribution = {}

        for provider in providers:
            try:
                avg_of_aspects[provider] = sum(ASPECTS[survey_id][provider].values())/float(len(ASPECTS[survey_id][provider]))
            except ZeroDivisionError:
                avg_of_aspects[provider] = 0

        total_reviews_survey = sum(num_reviews_channel[survey_id].values())

        for p in providers:
            try:
                channel_contribution[p] = (num_reviews_channel[survey_id][p]*100/total_reviews_survey)*avg_of_aspects[p]/5
            except ZeroDivisionError:
                channel_contribution[p] = 0

        uni = round(sum(channel_contribution.values()), 2)
        return uni

    def sum_for_all_channels(self, all_channel_data):
        overall = {}
        if verbose: print ("all_channel_data", all_channel_data, "\n")
        all_channel_data = all_channel_data["providers"]
        for channel in all_channel_data:
            channel_data = all_channel_data[channel]
            for aspect in channel_data:
                if aspect not in overall:
                    overall[aspect] = channel_data[aspect]
                else:
                    overall[aspect] += channel_data[aspect]
        return overall

    def sum_for_all_units(self, units_averaged):
        overall = {}
        if verbose: print ("all units data", units_averaged, "\n")
        for unit in units_averaged:
            unit_overall = units_averaged[unit]["overall_aspects"]
            for aspect in unit_overall:
                if aspect not in overall:
                    overall[aspect] = unit_overall[aspect]
                else:
                    overall[aspect] += unit_overall[aspect]
        return overall

    def unified_avg_aspect(self,parent_survey_id):
        objects= self.get_child(parent_survey_id)
        # print ("NUMBER OF CHILDREN", len(objects))
        response={}
        resp= {}
        avg={}
        owner_aspects = {}
        owner_unified = 0
        owner_time_unified = []
        # P = Providers()
        # print("\nP for ", parent_survey_id)
        # providers=P.get(parent_survey_id)
        # print ("Providers fetched : ", providers)
        providers = self.providers

        NUMBER_OF_CHANNELS = len(providers)
        num_reviews_channel = {}
        num_reviews_children = {}
        ASPECTS = {}

        child_vs_provider = {}

        for obj in objects:
            survey_id=obj.survey_id
            raw_data=self.get_avg_aspect(obj.survey_id, parent_survey_id) # all aspects, for this survey, for all channels
            if verbose: print ("RAW DATA", raw_data, "\n")

            avg[obj.survey_id] = {}

            avg[obj.survey_id]["providers"]=raw_data

            review_count_channels = self.get_reviews_count(survey_id, parent_survey_id)
            if verbose: print ("REVIEW COUNT CHANNELS", review_count_channels, "\n")

            # List of providers for a particular child
            list_providers = []
            for provider in providers:
                if review_count_channels[provider] != 0:
                    list_providers.append(provider)
            child_vs_provider[survey_id] = list_providers

            ASPECTS[survey_id] = raw_data
            for p in review_count_channels:
                num_reviews_channel[survey_id] = review_count_channels

        if verbose: print ("CHILD VS PROVIDERS", child_vs_provider, "\n")
        for obj in objects:
            survey_id = obj.survey_id
            num_reviews_children[survey_id] = sum(num_reviews_channel[survey_id].values())
            response[survey_id] = self.unified_rating(survey_id,parent_survey_id,NUMBER_OF_CHANNELS,num_reviews_channel,ASPECTS)
        if verbose: print ("UNIFIED RATING:", response, "\n")

        # Averaging unified scores of units
        if len(response) == 0:
            owner_unified = 0
            owner_time_unified.append(owner_unified)
        else:
            owner_unified = round(sum(response.values())/len(response), 2)
            owner_time_unified.append(owner_unified)

        # Averaging aspect scores of units
        owner_aspects["providers"] = {}

        for provider in providers:
            owner_aspects["providers"][provider] = {}
            for child in avg:
                if verbose: print ("child: ", child)
                provider_data = avg[child]["providers"][provider]
                # adding for all aspects
                for aspect in provider_data:
                    if aspect not in owner_aspects["providers"][provider]:
                        owner_aspects["providers"][provider][aspect] =  provider_data[aspect]
                    else:
                        owner_aspects["providers"][provider][aspect] += provider_data[aspect]

            provider_count = 0
            for key in child_vs_provider:
                if provider in child_vs_provider[key]:
                    provider_count = provider_count + 1

            for key in owner_aspects["providers"][provider]:
                owner_aspects["providers"][provider][key] = round(owner_aspects["providers"][provider][key]/provider_count, 2)

            if verbose: print ("owner_aspects[provider]", provider, owner_aspects["providers"][provider], "\n")

            # dividing for all aspects with number of units
            # calculated_provider_data = owner_aspects["provider_data"][provider]
            # for key in calculated_provider_data:
            #     calculated_provider_data[key] =  round(calculated_provider_data[key]/len(response), 2)

        # Averaging computed aspects for all channels, for all units
        for unit in avg:
            overall_unit = self.sum_for_all_channels(avg[unit])
            for key in overall_unit:
                overall_unit[key] = round(overall_unit[key]/len(child_vs_provider[unit]),2)
            avg[unit]["overall_aspects"] = overall_unit
            if verbose: print ("OVERALL_UNIT", unit, overall_unit, "\n")

        # Averaging computed aspects for all channels, for the owner
        overall_owner = self.sum_for_all_units(avg)
        for aspect in overall_owner:
            overall_owner[aspect] = round(overall_owner[aspect]/len(objects),2)
        owner_aspects["overall_aspects"] = overall_owner
        if verbose: print ("OVERALL_OWNER", overall_owner, "\n")

        # Appending unified score for owner, and total channel responses for owner, in the final structure
        owner_aspects["unified"] = owner_unified
        owner_aspects["time_unified"] = owner_time_unified
        owner_aspects["total_resp"] = sum(num_reviews_children.values())

        # Appending unified score for units, and total channel responses for units, in the final structure
        for unit in avg:
            if unit in response:
                avg[unit]["unified"] = response[unit]
                temp = []
                temp.append(avg[unit]["unified"])
                avg[unit]["time_unified"] = temp
            if unit in num_reviews_children:
                avg[unit]["total_resp"] = num_reviews_children[unit]

        return {"units_aspects":avg, "owner_aspects": owner_aspects}

    def get(self,parent_survey_id):
        # print ("CALLED DASH", parent_survey_id)

        # return HashId.encode(parent_survey_id)

        # print ("ASPECTQ", len(AspectQ.objects))
        return self.unified_avg_aspect(parent_survey_id)

# //Zurez

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

    return render_template('survaiderdashboard/index.analysis.html', title = "Analytics", survey = svey.repr)

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
