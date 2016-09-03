
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import uuid

from flask.ext.social.views import connect_handler
from flask.ext.social.utils import get_connection_values_from_oauth_response
from flask.ext.security import login_user

from survaider import db
from survaider.minions.helpers import HashId

class facebookDetails(db.Document):
    access_token=db.StringField()
    user_id=db.StringField()
    facebook_page_id=db.StringField()
    def _unicode__(self):
        return HashId.encode(self.id)
