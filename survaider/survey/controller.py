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
from mongoengine.queryset import DoesNotExist, MultipleObjectsReturned

from survaider import app
from survaider.minions.decorators import api_login_required
from survaider.minions.exceptions import APIException, ViewException
from survaider.minions.attachment import Image as AttachmentImage
from survaider.minions.helpers import api_get_object
from survaider.minions.helpers import HashId, Uploads
from survaider.user.model import User
from survaider.survey.structuretemplate import starter_template
from survaider.survey.model import Survey, Response, ResponseSession, ResponseAggregation, SurveyUnit
from survaider.survey.model import DataSort,IrapiData,Dashboard
from survaider.minions.future import SurveySharePromise

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


# Zurez
import pymongo
from bson.json_util import dumps
def d(data):return json.loads(dumps(data))
class DashboardAPIController(Resource):
    """docstring for DashboardAPIController"""
    def logic(self,survey_id,parent_survey,aggregate):
        """
        Logic : The child needs to copy their parents survey structure , pass the parent survey strc
        """


        lol= IrapiData(survey_id,1,1,aggregate)
        csi= lol.get_child_data(survey_id)[0]#child survey info

        response_data= d(lol.get_data())
        #return response_data
        # survey_strct= d(lol.survey_strct())
        if parent_survey==survey_id:
            survey_strct= d(lol.survey_strct())

        elif parent_survey!=survey_id:
            s= IrapiData(parent_survey,1,1,aggregate)
            survey_strct=d(s.survey_strct())

        try:
            survey_name= csi['unit_name']
            # return survey_name
            created_by=csi['created_by'][0]['$oid']
            # return csi

        except:
            survey_name="Parent Survey"
            created_by="Not Applicable"
        # else:pass
        #return survey_strct
        """ALT"""
        cids= []
        # return survey_strct
        for i in survey_strct:
            # return i
            x= i['field_options']
            if "deletable" in x:
                # return x['options']

                cids.append(i['cid'])

        #


        """ END"""
        res=[]
        r= {}
        for cid in cids:
            alol = DataSort(parent_survey,cid,aggregate)
            survey_data= alol.get_uuid_label()#?So wrong
            # return survey_data
            #I have the total responses
            j_data= d(survey_data)

            # return survey_data[0]['field_options']
            if "options" in survey_data['field_options']:

                try:
                    options=[]
                    option_code={}
                    for i in range(len(j_data['field_options']['options'])):
                        options.append(j_data['field_options']['options'][i]['label'])
                        option_code["a_"+str(i+1)]=j_data['field_options']['options'][i]['label']
                except :
                    pass
            #Response Count
            else:pass
            # return option_code
            temp= []

            for i in response_data:
                # temp.append(i)
                if cid in i['responses']:
                    temp.append(i['responses'][cid])
            # return temp
            options_count={}

            if j_data['field_type']=="group_rating":

                for i in temp:
                    # return i
                    aTempList= i.split("###")
                    # return aTempList
                    for j in aTempList:
                        bTempList= j.split("##")

                        l= bTempList[0]
                        k= bTempList[1]
                        if l in options_count:
                            if k in options_count[l]:
                                options_count[l][k]+=1
                            else:
                                options_count[l][k]=1
                        else:
                            options_count[l]={}
                            options_count[l][k]=1
                avg={}
                for key in options_count:
                    counter=0
                    for bkey in options_count[key]:

                        if int(bkey)!=0:
                            counter+= float(bkey) * options_count[key][bkey]
                        else:pass
                        avg[key]= round(float(counter)/len(temp),2)

            #return option_code, options_count
            # for i in range(len(response_data)):
            #     temp.append(response_data[i]['responses'][cid])
            # return temp[9]
            elif j_data['field_type']=="rating":
                for i in temp:
                    if str(i) in options_count:
                        options_count[str(i)]+=1
                    else:
                        options_count[str(i)]=1
                # avg= 0.0
                ll= 0
                for j in temp:ll= float(ll)+float(j)

                # avg = round(float(avg)/float(len(temp)))
                avg=round(ll/len(temp),2)
                # return avg
            response={}
            response['cid']= cid
            try:
                response['avg_rating']=avg

            except:pass
            if j_data['field_type']=="group_rating":
                response['options_code']=option_code
            else:pass
            # response['survey_id']=survey_id
            response['options_count']=options_count
            response['label']=survey_data['label']
            try:
                response['unit_name']=survey_name
                response['created_by']=created_by
            except:pass
            response['total_resp']=len(response_data)
            res.append(response)
        # try:
        #     res['unit_name']=survey_name
        #     res['created_by']=created_by
        # except:pass

        return res
    def get(self,survey_id,aggregate="false"):
        ##First get for all surveys
        survey_id=HashId.decode(survey_id)
        # survey_id=HashId.decode("goojkg5jyVnGj9V6Lnw")
        # parent_survey=survey_id
        # survey_id= HashId.decode("3NNl87yvoZXN4lypAjq")

        parent_survey= survey_id
        l = IrapiData(survey_id,1,1,aggregate)
        # survey_strct= l.survey_strct()



        #Check if survey has children.
        #Check for parent too.
        flag0= l.get_parent()

        if flag0!=False:
            """There is a parent"""
            parent_survey= flag0

        flag= l.flag()

        if flag ==False:
            r= {}

            r['parent_survey']= self.logic(survey_id,parent_survey,aggregate)
            return r
        else:
            if aggregate=="true":

                response={}
                response['parent_survey']= self.logic(survey_id,parent_survey,aggregate)

                units=[]
                for i in flag:
                    units.append(self.logic(HashId.decode(i),parent_survey,aggregate))
                # return response
                units.append(self.logic(survey_id,parent_survey,"false"))
                response['units']=units

                return response
            else:
                r= {}
                r['parent_survey']= self.logic(survey_id,parent_survey,aggregate)
                return r







"""InclusiveResponse"""
class IRAPI(Resource):
    """
    docstring for IRAPI-  Inclusive-RAPI
    returns json response
    """
    def get(self,survey_id,start=None,end=None,aggregate="false"):
        try:
            survey_id=HashId.decode(survey_id)

        except ValueError:
            return "No survey_id or uuid provided"

        lol = IrapiData(survey_id,start,end,aggregate)
        all_responses= lol.get_data()
        #return all_responses
        all_survey= lol.get_uuid_labels()

        if "referenced" in all_survey[0]:

            parent_survey= all_survey[0]['referenced']['$oid']

            # parent_survey= HashId.decode(parent_survey)
            s= IrapiData(parent_survey,start,end)
            all_survey=s.get_uuid_labels()



        else:

            all_survey= lol.get_uuid_labels()
        # return all_responses

        # try:
        #     all_survey=all_survey[0]
        # except :
        #     pass
        ret=[]
        # return all_survey
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
            """Response Count """
            temp=[]

            for a in range(len(response_data)):
                temp.append(response_data[a]['responses'][uuid])

            """Option Count"""
            options_count={}
            if j_data['field_type'] not in ["ranking","rating","group_rating"]:
                for b in temp:
                    if b in options_count:pass
                    else:options_count[b]=temp.count(b)

            elif j_data['field_type'] in ["ranking"]:
                for c in temp:
                    aTempList=c.split("###")
                    for d in aTempList:
                        bTempList=d.split("##")
                        e= bTempList[0]
                        if e in options_count:
                            options_count[e]=int(options_count[e])+len(aTempList)-int(bTempList[1])
                        else:
                            options_count[e]=len(aTempList)-int(bTempList[1])
            elif j_data['field_type']=="group_rating":
                for f in temp:
                    aTempList=f.split("###")
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
                    i = str(i)
                    if i in options_count:
                        options_count[i]+=1
                    else:options_count[i]=1
            #return options_count
            response={}
            response['cid']=uuid
            response['label']=j_data['label']
            response['type']=j_data['field_type']
            response['option_code']=option_code
            response['options_count']=options_count
            response['total_resp']= len(temp)
            if j_data['field_type']=="rating":
                avg=0
                for i in temp: avg+=int(i)
                # response['avg_rating']= float(avg)/float(len(temp))
                response['avg_rating']= float(avg)/len(temp)
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
            s= DataSort(parent_survey,uuid)
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
        response['option_code']=option_code
        response['option_count']=options_count
        #return option_code
        response['total_resp']=len(temp)
        response['garbage']= temp

        return d(response)
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
