#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from functools import wraps

from flask.ext.security import current_user
from survaider.minions.exceptions import APIException, ViewException
from survaider.minions.helpers import HashId

def api_login_required(func):
    @wraps(func)
    def returned_wrapper(*args, **kwargs):
        if not current_user.is_authenticated():
            raise APIException("Login Required", 401)
        return func(*args, **kwargs)
    return returned_wrapper
