#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

from user import user_model
from config import static_route_prefix

web = Blueprint('web', __name__, template_folder='templates')

@web.route('/')
def get():
    return render_template("master_partial.html", master = "test")

@web.route('/login')
def login_ui():
    return render_template("social_login.html",
        title = "Login"
    )
