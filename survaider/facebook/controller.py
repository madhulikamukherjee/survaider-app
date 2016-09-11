#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.
from flask import Flask, Blueprint, render_template, request, jsonify, redirect, url_for, send_from_directory
from survaider.config import FACEBOOK_APP_ID as APP_ID
import requests
import json
from flask_restful import Resource
from survaider.facebook.model import facebookDetails
import os
from survaider.minions.contextresolver import current_user
facebook = Blueprint('facebook', __name__, template_folder = 'templates')
@facebook.route('/s:<survey_id>')
def facebook_auth(survey_id):
   # parent=request.args.get('parent')
   # print(survey_id,current_user())
   # if survey_id==str(current_user()):
    REDIRECT_URL="http://localhost:5000/facebook/config?s="+survey_id
    user_access_token_url="https://www.facebook.com/dialog/oauth?client_id="+APP_ID+"&redirect_uri="+REDIRECT_URL+"&scope=manage_pages"
    return redirect(user_access_token_url)
   # else if parent=:
   #         print("else parent /////////")
   #         REDIRECT_URL="http://localhost:5000/facebook/config?s="+survey_id
   #         user_access_token_url="https://www.facebook.com/dialog/oauth?client_id="+APP_ID+"&redirect_uri="+REDIRECT_URL+"&scope=manage_pages"
   #         return redirect(user_access_token_url)
   # else:
   #     return redirect("/")
@facebook.route('/config')
def auth_config():

    APP_ID="176485242755051"
    CLIENT_SECRET="13488380ae4ec837cde82e66f4956d6d"
    code=request.args.get('code')
    survey_id=request.args.get('s')
    REDIRECT_URL="http://localhost:5000/facebook/config?s="+survey_id
    params = {
        'client_id': APP_ID,
        'redirect_uri': REDIRECT_URL,
        'client_secret': CLIENT_SECRET,
        'code': code
    }
    try:
        short_lived_access_token_url="https://graph.facebook.com/oauth/access_token"
        short_token=requests.get(short_lived_access_token_url,params=params)
        short_token.raise_for_status()
        short_token_list=short_token.text.split('&')
    except Exception as e:
        print("following exception occur",e)
    access_token={}
    for i in short_token_list:
        p=i.split('=')
        print(p)
        access_token[p[0]]=p[1]
    access_token_long_url="https://graph.facebook.com/oauth/access_token"
    params_for_long={
    'grant_type':"fb_exchange_token",
    'client_id': APP_ID,
    'client_secret':CLIENT_SECRET,
    'fb_exchange_token':access_token['access_token']
    }
    try:
        long_response=requests.get(access_token_long_url,params=params_for_long)
        long_response.raise_for_status()
        long_response_list=long_response.text.split('&')
    except Exception as e:
        print("following error occur will making request",e)
    for i in long_response_list:
        p=i.split('=')
        access_token[p[0]]=p[1]
    page_access_url="https://graph.facebook.com/me/accounts"
    params_page={
	'access_token':access_token['access_token'],
        'field':'access_token'
	}
    try:
        page_token=requests.get(page_access_url,params=params_page)
        page_token.raise_for_status()
    except Exception as e:
        print("following error occur will making request",e)
    all_user_pages=page_token.json()
    print(all_user_pages)
    path=os.path.abspath(os.path.dirname(__file__))
    with open(path+"/json/pages.json","w") as outfile:
        json.dump(dict(all_user_pages),outfile)
    final_url="/survey/s:"+survey_id+"/analysis?facebook=true"
    return redirect(final_url)
@facebook.route('/pages')
class FacebookPagesController(Resource):
    def get(self):
        path=os.path.abspath(os.path.dirname(__file__))
        with open(path+'/json/pages.json') as infile:
            pages=json.load(infile)
        return pages
class SaveFacebookController(Resource):
    def post(self):
        json_object=request.get_json(force=True)
        access_token=json_object['accesstoken']
        page_id=json_object['id']
        user_id=json_object['userid']
        try:
            obj=facebookDetails()
            obj.access_token=access_token
            obj.facebook_page_id=page_id
            obj.user_id=user_id
            obj.save()
            return {"msg":"your facebook is configured."}
        except Exception as e :
            print(e)
        return jsonify({"msg":"some error occur"})
