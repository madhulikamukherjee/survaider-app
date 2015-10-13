#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from entry import db

class Survey(db.Document):
    s_id        = db.StringField()
    added       = db.

    structure   =

    name        = db.StringField(max_length = 80)
    description = db.StringField(max_length = 255)

class Response(db.Document):
    r_id        =
    s_id        =

    responses   =
