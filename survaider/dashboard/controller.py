#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify, redirect
import requests
from survaider.minions.contextresolver import current_user
from survaider.survey.model import Survey
import json
dashboard = Blueprint('dashboard', __name__, template_folder = 'templates')

@dashboard.route('/')
def dashboard_home():
    try:
        survey = Survey.objects(created_by=current_user()).first()
        if survey is None:
            raise ValueError
        url = "/survey/s:{0}/analysis".format(str(survey))
        if not survey._cls == 'Survey.SurveyUnit':
            url += "?parent=true"

        return redirect(url)

    except ValueError:
        return render_template("onboarding.html", title="Onboarding")

    # return render_template("dash.beta.html", title = "Dashboard")
@dashboard.route('/auth/facebook')
def facebook_auth():
    APP_ID="176485242755051"
    REDIRECT_URL="http://localhost:5000/dashboard/auth/config"
    user_access_token_url="https://www.facebook.com/dialog/oauth?client_id="+APP_ID+"&redirect_uri="+REDIRECT_URL+"&scope=manage_pages"
    return redirect(user_access_token_url)
@dashboard.route('/auth/config')
def auth_config():

    APP_ID="176485242755051"
    CLIENT_SECRET="13488380ae4ec837cde82e66f4956d6d"
    code=request.args.get('code')

    REDIRECT_URL="http://localhost:5000/dashboard/auth/config"
    params = {
        'client_id': APP_ID,
        'redirect_uri': REDIRECT_URL,
        'client_secret': CLIENT_SECRET,
        'code': code
    }
    short_lived_access_token_url="https://graph.facebook.com/oauth/access_token"
    short_token=requests.get(short_lived_access_token_url,params=params).text.split('&')
    access_token={}
    for i in short_token:
        p=i.split('=')
        access_token[p[0]]=p[1]
    print(access_token)
    access_token_long_url="https://graph.facebook.com/oauth/access_token"
    params_for_long={
    'grant_type':"fb_exchange_token",
    'client_id': APP_ID,
    'client_secret':CLIENT_SECRET,
    'fb_exchange_token':access_token['access_token']
    }
    long_response=requests.get(access_token_long_url,params=params_for_long).text.split('&')
    for i in long_response:
        p=i.split('=')
        access_token[p[0]]=p[1]
    print(access_token)
    page_access_url="https://graph.facebook.com/me/accounts"
    params_page={
	'access_token':access_token['access_token'],
        'field':'access_token'
	}
    page_token=requests.get(page_access_url,params=params_page)
    url="https://graph.facebook.com/me/accounts/1564400757201826?fields=name,access_token"
    print(page_token.text)
    return redirect('/dashboard/old')
@dashboard.route('/old')
def dashboard_old():
    return render_template("dash.beta.html", title = "Dashboard")
