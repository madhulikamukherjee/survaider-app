#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, render_template, g, request, jsonify
from flask.ext.mongoengine import MongoEngine
from flask.ext.security import current_user
from flask.ext.security.views import login as security_login

app = Flask(__name__, template_folder='templates')
app.config.from_pyfile('config.py')

db = MongoEngine(app)

def create_app():
    from .user.controller import usr
    from .user.model import User
    from .security.controller import security
    from .social.controller import social
    from .social.model import Connection
    from .admin.controller import admin
    from .dashboard.controller import dashboard, dashboard_home
    from .survey.controller import srvy
    from .REST.controller import api, handle_api_exception
    from survaider.minions.exceptions import ViewException, APIException
    from .minions.helpers import Routines
    from .notification.controller import (notification,
                                          register as register_notifications)

    app.register_blueprint(usr, url_prefix = '/usr')
    app.register_blueprint(dashboard, url_prefix = '/dashboard')
    app.register_blueprint(srvy, url_prefix = '/survey')
    app.register_blueprint(notification, url_prefix = '/notification')

    register_notifications()

    @app.before_request
    def do_important_stuff():
        g.user = current_user
        g.host = app.config['HOST']
        g.SRPL = Routines.gather_obfuscated_cookie('SRPL')

    @app.after_request
    def do_more_important_stuff(response):
        response.set_cookie('SRPL', Routines.update_obfuscated_cookie('SRPL'))
        if 'gzip' in g:
            response.headers.add('Content-Type', 'application/javascript')
            response.headers.add('Content-Encoding', 'gzip')
        return response

    @app.errorhandler(500)
    def handle_internal_server_error(e):
        dat = {
            'error_code': 500,
            'error_msg': str(e),
            'error_dsc': "Some highly trained monkeys have been dispached to fix this error."
        }
        return render_template('error_splash.html', dat = dat), 500

    @app.errorhandler(404)
    def handle_not_found_error(e):
        dat = {
            'error_code': 404,
            'error_msg': str(e),
            'error_dsc': None
        }
        return render_template('error_splash.html', dat = dat), 404

    @app.errorhandler(ViewException)
    def handle_raised_exceptions(e):
        dat = {
            'error_code': e.status_code,
            'error_msg': e.message,
            'error_dsc': e.to_dict()
        }
        return render_template('error_splash.html', dat = dat), e.status_code

    @app.errorhandler(APIException)
    def handle_api_exception(e):
        dat = {
            'error_code': e.status_code,
            'error_msg': e.message,
            'error_dsc': e.to_dict()
        }
        return jsonify(dat), e.status_code

    @app.route('/')
    def home():
        if current_user.is_authenticated():
            "Load the dashboard"
            return dashboard_home()
        # return security_login()
        return render_template('index.homepage.pages.html')

if __name__ == '__main__':
    create_app()
