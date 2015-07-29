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

@web.route('/connect/email')
def email_connect():
    return render_template("email_validation.html",
        title = "Validate Email",
        u_dat = {"name": "Sherlock Holmes", "email": "prashant@ducic.ac.in"}
    )

@web.route('/dev/causes')
def dev_causes():
    return render_template("causes.html",
        pg = {"title": "Causes"}
    )

@web.route('/dev/profile')
def dev_profile():
    return render_template("profile.html",
        pg = {"title": "Profile"},
        u_dat = {"name": "Sherlsssock Holmes", "medal_top": "Virgisssnity over 9000"}
    )

@web.route('/dev/story')
def dev_story():
    return render_template("story.html",
        pg = {"title": "Story"},
        u_dat = {"name": "Sherlodcck Holmes", "medal_top": "Virginity over 9000"}
    )

@web.route('/dev/svg')
def dev_test_svg():
    return render_template("test_svg.html",
        pg = {"title": "Story"},
    )

@web.route('/dev/tour')
def dev_tour():
    return render_template("tour.html",
        pg = {"title": "Tour"},
    )