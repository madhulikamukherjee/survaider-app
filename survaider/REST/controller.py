#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask_restful import Resource, Api

from survaider import app
from survaider.survey.controller import Survey, Response

api = Api(app, prefix = '/api')

api.add_resource(Survey,   '/survey')
api.add_resource(Response, '/survey/response')