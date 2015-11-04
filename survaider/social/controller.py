#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask.ext.social import Social

from survaider import app
from survaider.social.model import Connection

social = Social(app, Connection)
