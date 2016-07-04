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
from survaider.survey.model import Survey, Response, ResponseSession, ResponseAggregation, SurveyUnit
from survaider.survey.model import DataSort,IrapiData,Dashboard,Aspect,WordCloudD,Reviews,Relation,AspectData
from survaider.minions.future import SurveySharePromise
from survaider.security.controller import user_datastore
import ast
from survaider.survey.test_models import Test
from survaider.config import MG_URL, MG_API, MG_VIA,authorization_key,task_url
from survaider.survey.keywordcount import KeywordCount
from survaider.survey import data
P=data.Providers()
A=data.Aspects()
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
        #This portion of the code does the magic after onboarding
        svey = Survey()
        usr  = User.objects(id = current_user.id).first()
        svey.created_by.append(usr)
        ret = {}
        #This whole piece of code is in try catch else finally block. Where everything written under the final clause will run
        #And among the try except else. any one will run.
        #So I added a put request where Prashy had asked me to
        try:
            args = self.post_args()
            Test(init="1").save() # the value init is the identifier.
        except Exception as e:
            args = self.post_args_bulk()

            payload = json.loads(args['payload'])
            name = payload['create']['survey_name']
            tags = payload['create']['key_aspects']

            #: Do whatever we want with metadata here.
            svey.metadata['social'] = payload['social']
            svey.save()
            ret['partial'] = False

            #: Create units.
            for unit in payload['units']:
                Test(init="2").save()  #this ran
                usvey = SurveyUnit()
                usvey.unit_name = unit['unit_name']
                usvey.referenced = svey

                if unit['unit_name'] in payload['services']:
                    usvey.metadata['services'] = payload['services'][unit['unit_name']]

                usvey.created_by.append(usr)
                usvey.save()
                child= HashId.encode(usvey.id)
                Test(init=HashId.encode(usvey.id)).save()
                try:
                    shuser = User.objects.get(email = unit['owner_mail'])
                    Test(init="7").save()
                except DoesNotExist:
                    upswd = HashId.hashids.encode(
                        int(datetime.datetime.now().timestamp())
                    )
                    user_datastore.create_user(
                        email=unit['owner_mail'],
                        password=upswd
                    )
                    # ftract = SurveySharePromise()
                    # ftract.future_email = unit['owner_mail']
                    # ftract.future_survey = usvey
                    # ftract.save()
                    # Send email here.
                    # ret['partial'] = True
                    #Here the TASK + webhookLOGIC WOULD BE ADDED !
                    #Prashant told me here to put the code for task.
                    try:
                        for prov in payload['services'][unit["unit_name"]]:
                            data={"survey_id":HashId.encode(svey.id),"access_url":payload["services"][unit["unit_name"]][prov],"provider":prov,"children":child}
                            r= requests.put(task_url,data=data,headers=task_header)
                            Relation(parent=HashId.encode(svey.id),survey_id=child,provider=prov).save()
                            Test(init=str(r.content)).save()
                    except Exception as e:
                        print (e)
                        Test(init=str(e)).save()
                    Test(init="6").save()
                    requests.post(MG_URL, auth=MG_API, data={
                        'from': MG_VIA,
                        'to': unit['owner_mail'],
                        'subject': 'Survaider | Unit Credential',
                        'text': (
                            "Hello,\n\r"
                            "You have been given access to {0} of {1}. You may"
                            "login to Survaider using the following credentials:\n\r"
                            "Username: {2}\n\r"
                            "password: {3}\n\r"
                            "Thanks,\n\r"
                            "Survaider"
                        ).format(unit['unit_name'], name, unit['owner_mail'],upswd)
                    })
                    shuser = User.objects.get(email = unit['owner_mail'])
                finally:
                    Test(init="3").save() #this too
                    usvey.created_by.append(shuser)
                    usvey.save()
        else:
            Test(init="4").save()
            name = args['s_name']
            tags = args['s_tags']
        finally:
            #Will always , run . I meant Finally
            """
            Anything written under the finally clause will run for sure. It sends back the success status.
            Now you may ask , how I am so sure that none of the other blocks are running.
            I created a document in database and saved some values if a particular block ran well/ let me show you
            So by referring to the number I would have an idea of which block of code ran successfully.
            """
            Test(init="5").save()
            svey.metadata['name'] = name

            struct_dict = starter_template
            opt = []
            for option in tags:
                opt.append({
                    'checked': False,
                    'label': option
                })

            struct_dict['fields'][0]['field_options']['options'] = opt
            svey.struct = struct_dict
            svey.save()
            ret['pl'] = payload
            ret.update(svey.repr)

            return ret, 200 + int(ret.get('partial', 0))


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

    def post_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('q_id',  type = str, required = True)
        parser.add_argument('q_res', type = str, required = True)
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

        return json.loads(res.to_json()), 201


# Zurez
import pymongo
from bson.json_util import dumps
def d(data):return json.loads(dumps(data))
def prettify(ugly): return ' '.join([word.title() for word in ugly.split('_')]) # Haha '_'
class AspectR(object):
    """docstring for AspectController"""
    def __init__(self,survey_id,provider):
        self.sid= HashId.encode(survey_id)
        self.p= provider

    # def output(self,survey_id,provider):
    aspects=A.get()
    def get(self):
        if self.p!="all":
            aspect_data= AspectData.objects(survey_id=self.sid,provider=self.p)
        else:
            aspect_data= AspectData.objects(survey_id=self.sid)
        print(aspects)
        return d(aspects)
        response={}
        for aspect in aspects:
            response[aspect]=0
        if len(aspect_data)==0:
            return response
        for aspect in aspects:
            i=0
            for j in aspect_data:
                if j.name==aspect:
                    response[aspect]+=float(j.value)
                    i=i+1
            response[aspect]=round(float(response[aspect])/i)
        return response
# class AspectR(object):
#     """docstring for AspectController"""
#     def __init__(self,survey_id,provider):
#         self.sid= HashId.encode(survey_id)
#         self.p= provider
#
#     # def output(self,survey_id,provider):
#     def get(self):
#         if self.p!="all":
#             aspects= Aspect.objects(survey_id=self.sid,provider=self.p)
#         else:
#             aspects= Aspect.objects(survey_id=self.sid)
#         print(aspects)
#         return d(aspects)
#         if len(aspects)==0:
#             response={"ambience":0,'value_for_money':0,'room_service':0,'cleanliness':0,'amenities':0,"overall":0}
#             return response
#             #return json.dumps({"status":"failure","message":"No Aspect Found"})
#         div= float(len(aspects))
#         ambience=0
#         value_for_money=0
#         room_service=0
#         cleanliness=0
#         amenities=0
#         overall=0
#         for i in aspects:
#             ambience+= float(i.ambience)
#             value_for_money+=float(i.value_for_money)
#             room_service+=float(i.room_service)
#             cleanliness+= float(i.cleanliness)
#             amenities+= float(i.amenities)
#             overall+=float(i.overall)
#         ambience=round(float(ambience)/div,2)
#         value_for_money=round(float(i.value_for_money)/div,2)
#         room_service=round(float(i.room_service)/div,2)
#         cleanliness=round(float(i.cleanliness)/div,2)
#         amenities=round(float(i.amenities)/div,2)
#         overall=round(float(overall)/div,2)
#         response={"ambience":ambience,"value_for_money":value_for_money,"room_service":room_service,"cleanliness":cleanliness,"amenities":amenities,"overall":overall}
#         return response
        #return (food,service,price,overall)
class Sentiment_OverallPolarity(object):
    def __init__(self,survey_id, from_child, provider="all", children_list=[]):
        self.sid=HashId.encode(survey_id)
        self.p= provider
        self.from_child = from_child
        self.children_list = children_list
    def get(self):
        providers=P.get()
        sents=["Positive","Negative","Neutral"]
        overall = {}
        reviews = {}
        if self.from_child:
            # Coming directly from child. Calculate overall sentiments as well as reviews.
            if self.p=="all":
                for i in providers:
                    overall[i] = {}
                    reviews[i] = {}
                    for j in sents:
                        result= Reviews.objects(survey_id = self.sid, provider=i, sentiment= j)
                        for obj in result:
                            reviews[i][obj.review] = obj.sentiment
                        overall[i][j]=len(result)
            else:
                overall[self.p]={}
                for j in sents:
                        result= Reviews.objects(survey_id= self.sid,provider=self.p,sentiment= j)
                        if isparent:
                            for obj in result:
                                reviews[self.p][obj.review] = obj.sentiment
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

# class Sentiment_Reviews(object):
#     def __init__(self,survey_id,provider="all"):
#         self.sid=HashId.encode(survey_id)
#         self.p= provider
#     def get(self):
#         providers=["zomato","tripadvisor"]
#         sents=["Positive","Negative","Neutral"]
#         response= {}
#         if self.p=="all":
#             for i in providers:
#                 response[i]={}
#                 for j in sents:
#                     result= Reviews.objects(survey_id = self.sid, provider=i, sentiment= j)
#                     response[i][j]=len(result)
#         else:
#             response[self.p]={}
#             for j in sents:
#                     result= Reviews.objects(survey_id= self.sid,provider=self.p,sentiment= j)
#                     response[self.p][j]=len(result)
#         return response


class WordCloud(object):
    """docstring for WordCloud"""
    def __init__(self, survey_id, provider, from_child, children_list):

        self.sid= HashId.encode(survey_id)
        self.p=provider
        self.from_child = from_child
        self.children_list = children_list

    def get(self):
        new_wc={}
        if self.from_child:
            # API call coming directly from child. Calculate wordcloud.
            if self.p!="all":
                provider=self.p
                wc= WordCloudD.objects(survey_id=self.sid,provider=self.p)
                new_wc[provider]={}
                for i in wc:
                    new_wc[provider].update(i.wc)
            else:
                providers= providers.get()
                for x in providers:
                    wc= WordCloudD.objects(survey_id=self.sid,provider=x)
                    new_wc[x]={}
                    for i in wc:
                        new_wc[x].update(i.wc)
            return new_wc

        if not self.from_child:
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
                else:
                    providers= P.get()
                    for x in providers:
                        wc = []
                        for child in self.children_list:
                            wc += WordCloudD.objects(survey_id=child,provider=x)
                        new_wc[x]={}
                        for i in wc:
                            new_wc[x].update(i.wc)
            return new_wc

            if len(self.children_list) == 0:
                #do nothing
                return []

class DashboardAPIController(Resource):
    """docstring for DashboardAPIController"""

    # def logic(self,survey_id,parent_survey,provider,aggregate="false"):
    #     """
    #     Logic : The child needs to copy their parents survey structure , pass the parent survey strc
    #     """
    #     # return parent_survey
    #     lol= IrapiData(survey_id,1,1,aggregate)
    #     csi= lol.get_child_data(survey_id)#child survey info

    #     # aspect= AspectR(survey_id,provider).get()
    #     # return aspect

    #     # aspects = Dash().get(HashId.encode(survey_id))
    #     # return aspects

    #     wordcloud= d(WordCloud(survey_id,provider).get())
    #     sentiment= Sentiment(survey_id,provider).get()
    #     company_name=Survey.objects(id = survey_id).first().metadata['name']
    #     # return d(company_name)
    #     response_data= lol.get_data()
    #     # return response_data

    #     # return HashId.encode(survey_id)
    #     # return d(parent_survey)
    #     if parent_survey==survey_id:
    #         # return True
    #         survey_strct= d(lol.survey_strct())
    #         jupiter_data = Dash().get(HashId.encode(survey_id))

    #     elif parent_survey!=survey_id:
    #         s= IrapiData(parent_survey,1,1,aggregate)
    #         survey_strct=d(s.survey_strct())
    #         jupiter_data = Dash().get(HashId.encode(parent_survey))

    #     # return jupiter_data
    #     try:
    #         survey_name= csi[0].unit_name
    #         created_by= d(csi[0].created_by[0].id)["$oid"]

    #     except:
    #         survey_name="Parent Survey"
    #         created_by="Not Applicable"

    #     """ALT"""
    #     cids= []
    #     # return d(survey_strct)
    #     for i in survey_strct:
    #         # return d(i)
    #         x= i['field_options']
    #         if "deletable" in x:
    #             cids.append(i['cid'])

    #     """ END"""
    #     res=[]
    #     r= {}
    #     for cid in cids:
    #         alol = DataSort(parent_survey,cid,aggregate)
    #         survey_data= alol.get_uuid_label()#?So wrong
    #         # return survey_data

    #         j_data= d(survey_data)

    #         if "options" in survey_data['field_options']:
    #             try:
    #                 # options=[]
    #                 option_code={}

    #                 for i in range(len(j_data['field_options']['options'])):
    #                     # options.append(j_data['field_options']['options'][i]['label'])
    #                     option_code["a_"+str(i+1)]=j_data['field_options']['options'][i]['label']
    #             except :
    #                 pass

    #         else:pass

    #         temp= []
    #         timed={}
    #         import time
    #         # return d(response_data)
    #         for i in response_data:
    #             if cid in i[0]:
    #                 # return cid
    #                 temp.append(i[0][cid]['raw'])
    #                 timestamp= d(i[1]['modified'])['$date']/1000
    #                 timestamp=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp))
    #                 timed[timestamp]=i[0][cid]

    #         options_count={}

    #         timed_agg={}
    #         timed_agg_counter={}


    #         if j_data['field_type']=="group_rating":
    #             # return temp
    #             for i in temp:
    #                 # return i
    #                 aTempList= i.split("###")
    #                 for j in aTempList:
    #                     bTempList= j.split("##")

    #                     l= bTempList[0]
    #                     k= bTempList[1]
    #                     if l in options_count:
    #                         if k in options_count[l]:
    #                             options_count[l][k]+=1
    #                         else:
    #                             options_count[l][k]=1
    #                     else:
    #                         options_count[l]={}
    #                         options_count[l][k]=1
    #             avg={}
    #             # return options_count
    #             for key in options_count:
    #                 # return key
    #                 counter=0

    #                 for bkey in options_count[key]:
    #                     if int(bkey)!=0:
    #                         counter+= float(bkey) * options_count[key][bkey]
    #                     else:pass

    #                 avg[key]= round(float(counter)/len(temp),2)

    #                 new_key= option_code[key]
    #                 survey_avg = avg[key]

    #                 #############################################################
    #                 # WE NEED THE FOLLOWING TWO LINES BEFORE QIKSTAY DEPLOYMENT #
    #                 #############################################################

    #                 ## CURRENTLY THIS GIVES KEYERROR 'FOOD'
    #                 # return "hello   "
    #                 # avg[key]=survey_avg+float(aspect[new_key])
    #                 # avg[key]=round(avg[key]/2,2)

    #         elif j_data['field_type']=="rating":
    #             # return temp
    #             for i in temp:
    #                 # return i
    #                 if str(i[2:]) in options_count:
    #                     options_count[str(i[2:])]+=1
    #                 else:
    #                     options_count[str(i[2:])]=1

    #             ll= 0
    #             for j in temp:
    #                 ll= float(ll)+float(j[2:])

    #             if len(temp) != 0:
    #                 avg=round(ll/len(temp),2)
    #             else:
    #                 avg=0


    #             for time , value in timed.items():

    #                 if time[:10] not in timed_agg_counter:
    #                     timed_agg_counter[time[:10]]=0
    #                 if time[:10] in timed_agg:
    #                     timed_agg[time[:10]]+=int(value['raw'][2:])
    #                     timed_agg_counter[time[:10]]+=1

    #                 else:
    #                     timed_agg[time[:10]]=int(value['raw'][2:])
    #                     timed_agg_counter[time[:10]]=1
    #             timed_final={}
    #             for time,value in timed_agg.items():
    #                 avg = round(float(timed_agg[time])/float(timed_agg_counter[time]),2)
    #                 timed_final[time]=avg

    #             # TAKING AVERAGE FROM EXTERNAL APP DATA

    #             # avg+=aspect['overall']*2
    #             # avg=round(avg/2,2)

    #         response={}
    #         response['cid']= cid

    #         aspects=Aspect(survey_id)
    #         try:
    #             response['avg_rating']=avg

    #         except:pass
    #         if j_data['field_type']=='rating':
    #             response['timed_agg']=timed_final
    #             response['timed']=timed
    #         if j_data['field_type']=="group_rating":
    #             response['options_code']=option_code
    #         else:pass
    #         # response['survey_id']=survey_id
    #         response['options_count']=options_count
    #         response['label']=survey_data['label']
    #         # try:
    #         #     response['unit_name']=survey_name
    #         #     response['created_by']=created_by
    #         # except:pass
    #         response['total_resp']=len(response_data)
    #         # response['aspects']=aspect
    #         res.append(response)
    #     result= {}
    #     result["responses"]=res
    #     result["wordcloud"]=wordcloud
    #     result["sentiment"]=sentiment
    #     result["meta"]={"created_by":created_by,"unit_name":survey_name,"company":company_name,"id":HashId.encode(survey_id)}
    #     return result
    #     if len(wordcloud)!=0:
    #         res.append({"wordcloud":wordcloud})
    #     res.append({"sentiment":sentiment})
    #     res.append({"meta":{"created_by":created_by,"unit_name":survey_name,"company":company_name,"id":HashId.encode(survey_id)}})
    #     # res.append({"company":company_name})
    #     # res.append({'id':HashId.encode(survey_id)})
    #     # res.append ({})
    #     return res

    def logic(self,survey_id,parent_survey, from_child, provider,aggregate="false",children_list=[]):
        """
        Logic : The child needs to copy their parents survey structure , pass the parent survey strc
        """
        # return parent_survey
        lol= IrapiData(survey_id,1,1,aggregate)
        csi= lol.get_child_data(survey_id)#child survey info

        wordcloud= d(WordCloud(survey_id,provider,from_child,children_list).get())
        # return wordcloud

        company_name=Survey.objects(id = survey_id).first().metadata['name']
        # return d(company_name)
        response_data= lol.get_data()
        # return response_data

        # return HashId.encode(survey_id)
        # return d(parent_survey)
        if parent_survey==survey_id:
            survey_strct= d(lol.survey_strct())
            jupiter_data = Dash().get(HashId.encode(survey_id))
            # return jupiter_data
            aspect_data = jupiter_data["owner_aspects"]


        elif parent_survey!=survey_id:
            s= IrapiData(parent_survey,1,1,aggregate)
            survey_strct=d(s.survey_strct())
            try:
                jupiter_data = Dash().get(HashId.encode(parent_survey))
            except:
                jupiter_data = Dash().get(parent_survey)
            # return jupiter_data
            aspect_data = jupiter_data["units_aspects"][HashId.encode(survey_id)]


        returned_sentiment= Sentiment_OverallPolarity(survey_id,from_child,provider,children_list).get()
        # return returned_sentiment

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

        # return sentiment

        try:
            survey_name= csi[0].unit_name
            created_by= d(csi[0].created_by[0].id)["$oid"]

        except:
            survey_name="Parent Survey"
            created_by="Not Applicable"

        """ALT"""
        cids= []
        # return d(survey_strct)
        for i in survey_strct:
            # return d(i)
            x= i['field_options']
            if (("deletable" in x) and (i["field_type"] == "rating")):
                cids.append(i['cid'])

        # return cids

        """ END"""
        res=[]
        r= {}
        for cid in cids:
            alol = DataSort(parent_survey,cid,aggregate)
            survey_data= alol.get_uuid_label()#?So wrong
            # return survey_data

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


            # if j_data['field_type']=="group_rating":
            #     # return temp
            #     for i in temp:
            #         # return i
            #         aTempList= i.split("###")
            #         for j in aTempList:
            #             bTempList= j.split("##")

            #             l= bTempList[0]
            #             k= bTempList[1]
            #             if l in options_count:
            #                 if k in options_count[l]:
            #                     options_count[l][k]+=1
            #                 else:
            #                     options_count[l][k]=1
            #             else:
            #                 options_count[l]={}
            #                 options_count[l][k]=1
            #     avg={}
            #     # return options_count
            #     for key in options_count:
            #         # return key
            #         counter=0

            #         for bkey in options_count[key]:
            #             if int(bkey)!=0:
            #                 counter+= float(bkey) * options_count[key][bkey]
            #             else:pass

            #         avg[key]= round(float(counter)/len(temp),2)

            #         new_key= option_code[key]
            #         survey_avg = avg[key]

            #         #############################################################
            #         # WE NEED THE FOLLOWING TWO LINES BEFORE QIKSTAY DEPLOYMENT #
            #         #############################################################

            #         ## CURRENTLY THIS GIVES KEYERROR 'FOOD'
            #         # return "hello   "
            #         # avg[key]=survey_avg+float(aspect[new_key])
            #         # avg[key]=round(avg[key]/2,2)


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

        result= {}
        result["responses"]=res

        result["sentiment"]=sentiment

        result["meta"]={"total_resp": aspect_data['total_resp'],"created_by":created_by,"unit_name":survey_name,"company":company_name,"id":HashId.encode(survey_id)}
        return result

        # if len(wordcloud)!=0:
        #     res.append({"wordcloud":wordcloud})
        # res.append({"sentiment":sentiment})
        # res.append({"meta":{"created_by":created_by,"unit_name":survey_name,"company":company_name,"id":HashId.encode(survey_id)}})

        # return res
    def com(self,pwc):
        pwc_keys=P.get()
        npwc={}
        wc={}
        for i in pwc_keys:
            npwc[i]={}
        for x in pwc :
            # npwc["zomato"].update(x["zomato"])
            # npwc["tripadvisor"].update(x['tripadvisor'])
            for i in pwc_keys:
                print(i)
                try:
                    npwc[i].update(x[i])
                except:
                    print(i+'update fail')
        for i in pwc_keys:
            try:
                print("\n\n\n\n\ncom"+i)
                com = list(npwc[i].values())
                if len(com)!=0:
                    t= sorted(com,reverse= True)[0:10]
                    for keyword,value in npwc[i].items():
                        for v in t:
                            if v == value:
                                wc[keyword]=value
            except:
                print("fail to add keyword for"+i)
        return wc

    # def com(self,pwc):
    #     pwc_keys= P.get()
    #     npwc={}
    #     wc={}
    #     for i in pwc_keys:
    #         npwc[i]={}
    #     for x in pwc :
    #         npwc["zomato"].update(x["zomato"])
    #         npwc["tripadvisor"].update(x['tripadvisor'])
    #
    #     trip = list(npwc["tripadvisor"].values())
    #     if len(trip)!=0:
    #         t= sorted(trip,reverse= True)[0:10]
    #         for keyword,value in npwc["tripadvisor"].items():
    #             for v in t:
    #                 if v == value:
    #                     wc[keyword]=value
    #     zoma= list(npwc["zomato"].values())
    #     if len(zoma)!=0:
    #         z=sorted(zoma,reverse= True)[0:10]
    #         for keyword,value in npwc["zomato"].items():
    #             for v in z:
    #                 if v == value:
    #                     # return v
    #                     wc[keyword]=value
    #     return wc


    def get(self,survey_id,provider,aggregate="false"):

        ##First get for all surveys
        # return survey_id
        survey_id=HashId.decode(survey_id)
        # return d(survey_id)

        parent_survey= survey_id
        l = IrapiData(survey_id,1,1,aggregate)

        #Check if survey has children.
        #Check for parent too.
        flag0= l.get_parent()
        # return flag0



        if flag0!=False:
            """There is a parent"""
            parent_survey= flag0

        flag= l.flag()
        # return flag
        # return parent_survey

        from_child = 0

        if flag ==False:
            r= {}
            from_child = 1
            r['parent_survey']= self.logic(survey_id, parent_survey, from_child, provider, aggregate)
            return r
        else:
            if aggregate=="true":
                # return HashId.encode(survey_id)
                children_list = flag
                response={}
                response['parent_survey']= self.logic(survey_id,parent_survey, from_child, provider,aggregate,children_list)
                # return response
                units=[]
                pwc=[]
                npwc={}
                for i in flag:
                    units.append(self.logic(HashId.decode(i),parent_survey, from_child, provider,aggregate))
                    # wc= WordCloud(HashId.decode(i),provider, from_child, children_list).get()
                    # pwc.append(wc)

                # wc= self.com(pwc)

                # response['wordcloud']=wc
                response['units']=units

                return response
            else:
                r= {}
                r['parent_survey']= self.logic(survey_id,parent_survey, from_child, provider, aggregate)
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



    #       response= {}
    #       if j_data['field_type']=="rating":
    #           avg= 0
    #           for i in temp: avg= avg + int(i)
    #           response['avg_rating']= float(avg)/float(len(temp))
    #       if j_data['field_type']=="group_rating":
    #           avg={}
    #           for key in options_count:
    #               counter=0
    #               for bkey in options_count[key]:
    #                   if int(bkey)!=0:
    #                       counter+= float(bkey) * options_count[key][bkey]
    #                   else:
    #                       pass
    #               avg[key]= float(counter)/len(temp)

    #               # avg[key]=float(sum(options_count[key].values()))/float(len(temp))
    #           response['avg_rating']=avg

    #       response['cid']= uuid
    #       # survey_id= j_data['survey_id']
    #       response['survey_id']=survey_id
    #       response['label']=j_data['label']
    #       response['type']=j_data['field_type']
    #       response['option_code']=option_code
    #       response['option_count']=options_count
    #       response['total_resp']=len(temp)
    #       response['garbage']= temp

    #       ret.append(response)
    # #return ret

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
"""
Had to rewrite again Damn you git pull and merge conflict!
"""
class Dash(Resource):
    """docstring for Dash -marker"""

    def get_child(self,survey_id):
        objects= Relation.objects(parent=survey_id)
        return objects
    def get_reviews_count(self,survey_id,provider="all"):
        result = {}
        if provider=="all":
            providers = P.get()
            for j in providers:
                reviews = Reviews.objects(survey_id= survey_id, provider = j)
                result[j] = len(reviews)

        if provider!="all":
            reviews=Reviews.objects(survey_id=survey_id,provider=provider)
            result[provider] = len(reviews)

        return result

    # def get_avg_aspect(self,survey_id,provider="all",aspect="all"):
    #     # return "lol"
    #     aspects=["ambience","value_for_money","room_service","cleanliness","amenities"]
    #     providers=["facebook","zomato","tripadvisor","twitter"]
    #     # providers=["tripadvisor"]
    #     response= {}
    #     if aspect=="all" and provider=="all":
    #         for j in providers:
    #             objects= Aspect.objects(survey_id=survey_id,provider=j)
    #             length_objects = len(objects)
    #             if length_objects!=0:
    #                 # temp= {"food":0,"service":0,"price":0}
    #                 temp={"ambience":0,'value_for_money':0,'room_service':0,'cleanliness':0, 'amenities':0}
    #                 for obj in objects:
    #                     temp['ambience']+=float(obj.ambience)
    #                     temp['value_for_money']+=float(obj.value_for_money)
    #                     temp['room_service']+=float(obj.room_service)
    #                     temp['cleanliness']+=float(obj.cleanliness)
    #                     temp['amenities']+=float(obj.amenities)
    #                 #Average below
    #                 temp['ambience']=round(temp['ambience']/length_objects, 2)
    #                 temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
    #                 temp['room_service']=round(temp['room_service']/length_objects, 2)
    #                 temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
    #                 temp['amenities']=round(temp['amenities']/length_objects, 2)
    #                 # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
    #                 response[j]=temp
    #             else:

    #                 for i in providers:
    #                     temp={}
    #                     for j in aspects:
    #                         temp[j]=0
    #                     response[i]=temp


    #     return response
    #     # Will return {"zomato":{"food":3,""}}

    def get_avg_aspect(self,survey_id,provider="all"):

        aspects=A.get()
        providers=P.get()
        # providers=["tripadvisor"]
        response= {}
        if provider=="all":
            for j in providers:
                objects= AspectData.objects(survey_id=survey_id, provider=j)
                length_objects = len(objects)
                if length_objects!=0:
                    temp={}
                    for aspect in aspects:
                        temp[aspect]=0
                        for obj in objects:
                            if obj.name==aspect:
                                temp[aspect]+=float(obj.value)
                    #Average below
                    for aspect in aspects:
                        temp[aspect]=round(temp[aspect]/length_objects, 2)
                    # temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
                    # temp['room_service']=round(temp['room_service']/length_objects, 2)
                    # temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
                    # temp['amenities']=round(temp['amenities']/length_objects, 2)
                    # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
                    response[j]=temp
                else:
                    response[j]={}

        else :
            objects = Aspect.objects(survey_id=survey_id,provider=provider)
            length_objects = len(objects)
            if length_objects!=0:
                temp={}
                for aspect in aspects:
                    temp[aspect]=0
                    for obj in objects:
                        if obj.name==aspect:
                            temp[aspect]+=float(obj.value)
                #Average below
                for aspect in aspects:
                    temp[aspect]=round(temp[aspect]/length_objects, 2)
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

        # Will return {"zomato":{"food":3,""}}

    # def get_avg_aspect(self,survey_id,provider="all"):
    #
    #     aspects=["ambience","value_for_money","room_service","cleanliness","amenities"]
    #     providers=P.get()
    #     # providers=["tripadvisor"]
    #     response= {}
    #     if provider=="all":
    #         for j in providers:
    #             objects= Aspect.objects(survey_id=survey_id, provider=j)
    #             length_objects = len(objects)
    #             if length_objects!=0:
    #                 temp={"ambience":0,'value_for_money':0,'room_service':0,'cleanliness':0, 'amenities':0}
    #                 for obj in objects:
    #                     temp['ambience']+=float(obj.ambience)
    #                     temp['value_for_money']+=float(obj.value_for_money)
    #                     temp['room_service']+=float(obj.room_service)
    #                     temp['cleanliness']+=float(obj.cleanliness)
    #                     temp['amenities']+=float(obj.amenities)
    #                 #Average below
    #                 temp['ambience']=round(temp['ambience']/length_objects, 2)
    #                 temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
    #                 temp['room_service']=round(temp['room_service']/length_objects, 2)
    #                 temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
    #                 temp['amenities']=round(temp['amenities']/length_objects, 2)
    #                 # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
    #                 response[j]=temp
    #             else:
    #                 response[j]={}
    #
    #     else :
    #         objects = Aspect.objects(survey_id=survey_id,provider=provider)
    #         length_objects = len(objects)
    #         if length_objects!=0:
    #             temp={"ambience":0,'value_for_money':0,'room_service':0,'cleanliness':0, 'amenities':0}
    #             for obj in objects:
    #                 temp['ambience']+=float(obj.ambience)
    #                 temp['value_for_money']+=float(obj.value_for_money)
    #                 temp['room_service']+=float(obj.room_service)
    #                 temp['cleanliness']+=float(obj.cleanliness)
    #                 temp['amenities']+=float(obj.amenities)
    #             #Average below
    #             temp['ambience']=round(temp['ambience']/length_objects, 2)
    #             temp['value_for_money']=round(temp['value_for_money']/length_objects, 2)
    #             temp['room_service']=round(temp['room_service']/length_objects, 2)
    #             temp['cleanliness']=round(temp['cleanliness']/length_objects, 2)
    #             temp['amenities']=round(temp['amenities']/length_objects, 2)
    #             # temp['overall'] = round(sum(temp.values())/len(aspects), 2)
    #             response[provider]=temp
    #
    #         else:
    #             response[provider] = {}
    #     return response

        # Will return {"zomato":{"food":3,""}}

    def data_form(self,survey_id,raw_data):
        # Convert Data to fit in unified rating
        providers=P.get()
        aspects=A.get()
        ASPECT=[]
        NUMBER_OF_REVIEWS=[]
        for i in providers:
            temp1=[]
            for x in aspects:
                temp1.append(raw_data[i][x])

            ASPECT.append(temp1)

            temp2=self.get_reviews_count(survey_id,i)

            NUMBER_OF_REVIEWS.append(temp2)


        return [ASPECT,NUMBER_OF_REVIEWS]

    # def data_form(self,survey_id,raw_data):
    #     # Convert Data to fit in unified rating
    #     providers=P.get()
    #     aspects=['ambience',"value_for_money",'room_service','cleanliness','amenities']
    #     ASPECT=[]
    #     NUMBER_OF_REVIEWS=[]
    #     for i in providers:
    #         temp1=[]
    #         for x in aspects:
    #             temp1.append(raw_data[i][x])
    #
    #         ASPECT.append(temp1)
    #
    #         temp2=self.get_reviews_count(survey_id,i)
    #
    #         NUMBER_OF_REVIEWS.append(temp2)
    #
    #
    #     return [ASPECT,NUMBER_OF_REVIEWS]

    # def unified_rating(self,survey_id,NUMBER_OF_CHANNELS, num_reviews_children, ASPECTS):
    #     avg_of_aspects = []
    #     for i in range(0,NUMBER_OF_CHANNELS):
    #         avg_of_aspects.append(sum(ASPECTS[i])/float(len(ASPECTS[i])))

    #     total_reviews = sum(num_reviews_children)
    #     aspect_contribution = []

    #     for i in range(0,NUMBER_OF_CHANNELS):
    #         aspect_contribution.append((NUMBER_OF_REVIEWS[i]*100/total_reviews)*avg_of_aspects[i]/5)

    #     uni = round(sum(aspect_contribution), 2)
    #     return uni

    def unified_rating(self,survey_id,NUMBER_OF_CHANNELS, num_reviews_channel, ASPECTS):
        avg_of_aspects = {}
        # print (ASPECTS)
        providers = P.get()
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

    def average_for_all_channels(self, all_channel_data):
        overall = {}

        for channel in all_channel_data:
            channel_data = all_channel_data[channel]
            for aspect in channel_data:
                if aspect not in overall:
                    overall[aspect] = channel_data[aspect]
                else:
                    overall[aspect] += channel_data[aspect]
        return overall

    # def unified_avg_aspect(self,parent_survey_id):
    #     objects= self.get_child(parent_survey_id)
    #     response={}
    #     resp= {}
    #     avg={}
    #     owner_aspects = {}
    #     owner_unified = 0
    #     providers=["tripadvisor","zomato"]
    #     num_reviews_children = {}

    #     for obj in objects:
    #         survey_id=obj.survey_id
    #         raw_data=self.get_avg_aspect(obj.survey_id)
    #         avg[obj.survey_id]=raw_data
    #         pr_data=self.data_form(survey_id,raw_data)
    #         ASPECTS= pr_data[0]
    #         NUMBER_OF_REVIEWS= pr_data[1]


    #         num_reviews_children[survey_id] = NUMBER_OF_REVIEWS[0]

    #         NUMBER_OF_CHANNELS=1
    #         response[survey_id] = self.unified_rating(survey_id,NUMBER_OF_CHANNELS,NUMBER_OF_REVIEWS,ASPECTS)

    #     # return num_reviews_children

    #     # Averaging unified scores of units
    #     if len(response) == 0:
    #         owner_unified = 0
    #     else:
    #         owner_unified = round(sum(response.values())/len(response), 2)

    #     # Averaging aspect scores of units
    #     for provider in providers:
    #         owner_aspects[provider] = {}
    #         for child in avg:
    #             provider_data = avg[child][provider]
    #             # adding for all aspects
    #             # return owner_aspects[provider]
    #             for aspect in provider_data:
    #                 if aspect not in owner_aspects[provider]:
    #                     owner_aspects[provider][aspect] =  provider_data[aspect]
    #                 else:
    #                     owner_aspects[provider][aspect] += provider_data[aspect]

    #         # dividing for all aspects with number of units
    #         calculated_provider_data = owner_aspects[provider]
    #         for key in calculated_provider_data:
    #             calculated_provider_data[key] =  round(calculated_provider_data[key]/len(response), 2)


    #     # Averaging computed aspects for all channels, for the owner

    #     overall_owner = self.average_for_all_channels(owner_aspects)
    #     owner_aspects["overall_aspects"] = overall_owner

    #     # Averaging computed aspects for all channels, for all units

    #     for unit in avg:
    #         overall_unit = self.average_for_all_channels(avg[unit])
    #         avg[unit]["overall_aspects"] = overall_unit

    #     # Appending unified score for owner, and total channel responses for owner, in the final structure
    #     owner_aspects["unified"] = owner_unified
    #     owner_aspects["total_resp"] = sum(num_reviews_children.values())

    #     # Appending unified score for units, and total channel responses for units, in the final structure
    #     for unit in avg:
    #         if unit in response:
    #             avg[unit]["unified"] = response[unit]
    #         if unit in num_reviews_children:
    #             avg[unit]["total_resp"] = num_reviews_children[unit]

    #     return {"units_aspects":avg, "owner_aspects": owner_aspects}

    def unified_avg_aspect(self,parent_survey_id):
        objects= self.get_child(parent_survey_id)
        NUMBER_OF_CHANNELS=2
        response={}
        resp= {}
        avg={}
        owner_aspects = {}
        owner_unified = 0
        providers=P.get()
        num_reviews_channel = {}
        num_reviews_children = {}
        ASPECTS = {}

        for obj in objects:
            survey_id=obj.survey_id
            raw_data=self.get_avg_aspect(obj.survey_id) # all aspects, for this survey, for all channels
            avg[obj.survey_id]=raw_data
            review_count_channels = self.get_reviews_count(survey_id)
            ASPECTS[survey_id] = raw_data
            for p in review_count_channels:
                num_reviews_channel[survey_id] = review_count_channels

        for obj in objects:
            survey_id = obj.survey_id
            num_reviews_children[survey_id] = sum(num_reviews_channel[survey_id].values())
            response[survey_id] = self.unified_rating(survey_id,NUMBER_OF_CHANNELS,num_reviews_channel,ASPECTS)

        # Averaging unified scores of units
        if len(response) == 0:
            owner_unified = 0
        else:
            owner_unified = round(sum(response.values())/len(response), 2)

        # Averaging aspect scores of units
        for provider in providers:
            owner_aspects[provider] = {}
            for child in avg:
                provider_data = avg[child][provider]
                # adding for all aspects
                # return owner_aspects[provider]
                for aspect in provider_data:
                    if aspect not in owner_aspects[provider]:
                        owner_aspects[provider][aspect] =  provider_data[aspect]
                    else:
                        owner_aspects[provider][aspect] += provider_data[aspect]

            # dividing for all aspects with number of units
            calculated_provider_data = owner_aspects[provider]
            for key in calculated_provider_data:
                calculated_provider_data[key] =  round(calculated_provider_data[key]/len(response), 2)


        # Averaging computed aspects for all channels, for the owner

        overall_owner = self.average_for_all_channels(owner_aspects)
        owner_aspects["overall_aspects"] = overall_owner

        # Averaging computed aspects for all channels, for all units

        for unit in avg:
            overall_unit = self.average_for_all_channels(avg[unit])
            avg[unit]["overall_aspects"] = overall_unit

        # Appending unified score for owner, and total channel responses for owner, in the final structure
        owner_aspects["unified"] = owner_unified
        owner_aspects["total_resp"] = sum(num_reviews_children.values())

        # Appending unified score for units, and total channel responses for units, in the final structure
        for unit in avg:
            if unit in response:
                avg[unit]["unified"] = response[unit]
            if unit in num_reviews_children:
                avg[unit]["total_resp"] = num_reviews_children[unit]

        return {"units_aspects":avg, "owner_aspects": owner_aspects}
    def get(self,parent_survey_id):
        # return HashId.encode(parent_survey_id)
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
