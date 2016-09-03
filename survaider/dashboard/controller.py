#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify, redirect, url_for
import requests

from survaider.dashboard.model import facebookDetails
from survaider.minions.contextresolver import current_user
from survaider.survey.model import Survey
import json
dashboard = Blueprint('dashboard', __name__, template_folder = 'templates')
all_user_pages={}
@dashboard.route('/')
def dashboard_home():
    facebook=request.args.get("facebook")
    try:
        survey = Survey.objects(created_by=current_user()).first()
        if survey is None:
            raise ValueError
        url = "/survey/s:{0}/analysis".format(str(survey))
        if not survey._cls == 'Survey.SurveyUnit':
            url += "?parent=true"
            if facebook:
                url+="&facebook=true"
        else:
            url+="?facebook=true"
        return redirect(url)

    except ValueError:
        return render_template("onboarding.html", title="Onboarding")

    # return render_template("dash.beta.html", title = "Dashboard")
@dashboard.route('/auth/facebook/pages')
def pages():
    print(all_user_pages)
    return jsonify(all_user_pages)
@dashboard.route('/old')
def dashboard_old():
    return render_template("dash.beta.html", title = "Dashboard")
