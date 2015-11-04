#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from survaider import db
from survaider.user.model import User
from survaider.minions.helpers import HashId

class Connection(db.Document):
    user_id  = db.ReferenceField(User)

    provider_id = db.StringField()
    provider_user_id = db.StringField()
    access_token = db.StringField()
    secret = db.StringField()
    display_name = db.StringField()
    profile_url = db.StringField()
    image_url = db.StringField()
    rank = db.IntField()

    def __unicode__(self):
        return HashId.encode(self.id)
