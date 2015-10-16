#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import current_app

from hashids import Hashids

class HashId(object):
    hashids = Hashids(salt = current_app.config.get('HASHIDS_SALT'))

    @staticmethod
    def encode(uid):
        """
        Encodes a UUID String to Hashid.
        """
        w = '0x' + uid[0:8] + uid[9:13] + uid[14:18] + uid[19:23] + uid[24:]
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
