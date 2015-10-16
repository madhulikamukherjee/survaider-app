#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask.ext.security import Security, MongoEngineUserDatastore

from survaider import app, db
from survaider.user.model import User, Role
from survaider.admin.controller import admin

user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore)
