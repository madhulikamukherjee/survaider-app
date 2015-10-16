#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

"""
REST API End Points
"""

from flask_restful import Resource

from survaider.survey.model import Survey, Response

class Survey(Resource):
    def get(self):
        return {'lol':1123}

    def put(self):
        return

    def post(self):
        return

    def delete(self):
        return

class Response(Resource):
    def get(self):
        return {}

    def put(self):
        return

    def post(self):
        return

    def delete(self):
        return

