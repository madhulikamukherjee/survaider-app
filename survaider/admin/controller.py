#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask_admin import Admin
from flask_admin.contrib.mongoengine import ModelView
from flask_admin import helpers as admin_helpers

from survaider.user.model import Role, User
from survaider.admin.model import BaseView

from survaider import app

admin = Admin(app, name='BioDB Admin', template_mode='bootstrap3', base_template='my_master.html')

class UserView(BaseView):
    can_create = False
    column_searchable_list = ('username', 'email')
    column_exclude_list = ['password', 'added']

admin.add_view(UserView(User))
admin.add_view(BaseView(Role))
