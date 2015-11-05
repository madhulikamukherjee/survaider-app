#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import uuid

from flask.ext.social.views import connect_handler
from flask.ext.social.utils import get_connection_values_from_oauth_response
from flask.ext.security import login_user

from survaider import db
from survaider.user.model import User
from survaider.minions.helpers import HashId

class Connection(db.Document):
    user_id  = db.ReferenceField(User)

    provider_id = db.StringField()
    display_name = db.StringField()
    full_name = db.StringField()
    secret = db.StringField()
    email = db.StringField()
    provider_user_id = db.StringField()
    profile_url = db.StringField()
    image_url = db.StringField()
    access_token = db.StringField()

    def __unicode__(self):
        return HashId.encode(self.id)

    @property
    def user(self):
        return User.objects(email = self.user_id.id).first()

class Routines(object):
    @staticmethod
    def register_new_user(**kwargs):
        from survaider.security.controller import user_datastore

        reg_dat = get_connection_values_from_oauth_response(kwargs['provider'], kwargs['oauth_response'])

        user = user_datastore.create_user(email = reg_dat['email'], password = str(uuid.uuid4()))
        user.metadata['full_name'] = reg_dat['full_name'] if 'full_name' in reg_dat else reg_dat['display_name'] if 'display_name' in reg_dat else None

        user.save()

        reg_dat['user_id'] = str(user)
        connect_handler(reg_dat, kwargs['provider'])
        login_user(user)

        return True
