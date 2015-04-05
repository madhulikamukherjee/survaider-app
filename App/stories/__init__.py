#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

from . import model as stories_model

stories = Blueprint('stories', __name__, template_folder='templates')

@stories.route('/')
def get():
    return "Test"
