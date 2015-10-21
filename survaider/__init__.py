#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, render_template, g, request
from flask.ext.mongoengine import MongoEngine
from flask.ext.security import current_user

app = Flask(__name__, template_folder='templates')
app.config.from_pyfile('config.py')

db = MongoEngine(app)

def create_app():
    from .user.controller import usr
    from .security.controller import security
    from .admin.controller import admin
    from .dashboard.controller import dashboard
    from .survey.controller import srvy
    from .REST.controller import api
    from .minions.helpers import Routines

    app.register_blueprint(usr, url_prefix = '/usr')
    app.register_blueprint(dashboard, url_prefix = '/dashboard')
    app.register_blueprint(srvy, url_prefix = '/survey')

    @app.before_request
    def do_important_stuff():
        g.user = current_user
        g.SRPL = Routines.gather_obfuscated_cookie('SRPL')

    @app.after_request
    def do_more_important_stuff(response):
        response.set_cookie('SRPL', Routines.update_obfuscated_cookie('SRPL'))
        return response

    @app.route('/')
    def home():
        return render_template("nav.container.html")

if __name__ == '__main__':
    create_app()
