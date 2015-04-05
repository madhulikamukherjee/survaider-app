#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

from . import model as survey_model

survey = Blueprint('survey', __name__, template_folder='templates')

@survey.route('/')
def get():
    return "Test"
