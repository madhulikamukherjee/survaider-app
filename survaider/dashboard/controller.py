#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

dashboard = Blueprint('dashboard', __name__, template_folder = 'templates')

@dashboard.route('/')
def dashboard_home():
    return render_template("dash.beta.html", title = "Dashboard")

@dashboard.route('/onboarding')
def dashboard_onboard():
    return render_template("onboarding.html", title="Onboarding")
