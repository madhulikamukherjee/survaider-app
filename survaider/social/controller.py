#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask.ext.social import Social
from flask.ext.social.datastore import MongoEngineConnectionDatastore
from flask.ext.social import connection_created, connection_failed, connection_removed, login_failed, login_completed

from survaider import db, app
from survaider.social.model import Connection
from survaider.minions.signals import Social as Signal_Social

social = Social(app, MongoEngineConnectionDatastore(db, Connection))

@connection_created.connect_via(app)
def on_connection_created(sender, **kwargs):
    app.logger.debug('Connection Created')

@connection_failed.connect_via(app)
def on_login_failed1(sender, provider, oauth_response):
    app.logger.debug('Social Login Failed via %s; '
                     '&oauth_response=%s' % (provider.name, oauth_response))

@connection_removed.connect_via(app)
def on_login_failed4(sender, provider, oauth_response):
    app.logger.debug('Social Login Failed via %s; '
                     '&oauth_response=%s' % (provider.name, oauth_response))

@login_failed.connect_via(app)
def on_login_failed3(sender, provider, oauth_response):
    app.logger.debug('Social Login Failed via %s; '
                     '&oauth_response=%s' % (provider.name, oauth_response))

@login_completed.connect_via(app)
def on_login_failed33(sender, provider, oauth_response):
    app.logger.debug('Social Login Failed via %s; '
                     '&oauth_response=%s' % (provider.name, oauth_response))
