#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask.ext.security import Security, MongoEngineUserDatastore
from flask_admin import helpers as admin_helpers

from entry import app, db
from user.model import User, Role
from admin.controller import admin

user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore)
