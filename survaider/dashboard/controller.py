#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify, redirect

from survaider.minions.contextresolver import current_user
from survaider.survey.model import Survey

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

@dashboard.route('/old')
def dashboard_old():
    return render_template("dash.beta.html", title = "Dashboard")
