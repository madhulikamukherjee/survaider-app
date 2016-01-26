#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from mongoengine.queryset import DoesNotExist as DoesNotExistException
from flask.ext.security import current_user as security_cu

from survaider.user.model import User

def current_user():
    try:
        return User.objects.get(id = security_cu.id)
    except (DoesNotExistException, AttributeError) as e:
        return None
