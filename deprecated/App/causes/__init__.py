#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

from . import model as causes_model

causes = Blueprint('causes', __name__, template_folder='templates')

@causes.route('/')
def get():
    return "Test"
