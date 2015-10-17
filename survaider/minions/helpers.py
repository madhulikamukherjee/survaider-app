#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from bson.objectid import ObjectId
from hashids import Hashids

from flask import current_app

class HashId(object):
    hashids = Hashids(salt = current_app.config.get('HASHIDS_SALT'))

    @staticmethod
    def encode(uid):
        """
        Encodes a UUID String to Hashid.
        """
        w = str(ObjectId(uid))
        return HashId.hashids.encode(int(w, 16))

    @staticmethod
    def decode(hid):
        """
        """
        try:
            b = hex(HashId.hashids.decode(hid)[0])
            c = [b[2:10], b[10:14], b[14:18], b[18:22], b[22:]]
            return '{0}-{1}-{2}-{3}-{4}'.format(*c)
        except Exception:
            raise TypeError
