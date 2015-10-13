#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify
from user.model import Role, User

usr = Blueprint('usr', __name__, template_folder='templates')

@usr.route('/')
def get_index():
    return "Test"
