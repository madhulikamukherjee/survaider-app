#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask_admin.contrib.mongoengine import ModelView
from flask.ext.security import current_user

class BaseView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated()
