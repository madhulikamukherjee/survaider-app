#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask_admin import Admin
from flask_admin.contrib.mongoengine import ModelView
from flask_admin import helpers as admin_helpers

from survaider.user.model import Role, User
from survaider.survey.model import Survey, Response
from survaider.social.model import Connection
from survaider.admin.model import BaseView

from survaider import app

admin = Admin(app, name='Survaider', base_template='my_master.html')

class UserView(BaseView):
    can_create = False
    can_view_details = True
    column_searchable_list = ['email']
    column_exclude_list = ['password', 'added']

class SurveyView(BaseView):
    can_view_details = True

admin.add_view(UserView(User))
admin.add_view(BaseView(Role))
admin.add_view(BaseView(Connection))
admin.add_view(SurveyView(Survey))
admin.add_view(BaseView(Response))
