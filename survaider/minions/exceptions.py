#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

class APIException(Exception):
    def __init__(self, message, status_code, **kwargs):
        Exception.__init__(self)
        self.message     = message
        self.status_code = status_code
        self.payload     = kwargs

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['error']   = True
        rv['message'] = self.message
        return rv

class ViewException(Exception):
    def __init__(self, message, status_code, payload = None):
        Exception.__init__(self)
        self.message     = message
        self.status_code = status_code
        self.payload     = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['error']   = True
        rv['message'] = self.message
        return rv

class MethodUnavailable(Exception):
    pass
