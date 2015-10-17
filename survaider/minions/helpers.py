#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from bson.objectid import ObjectId
from hashids import Hashids
from binascii import hexlify, unhexlify

from flask import current_app, g, request

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
            b = hex(HashId.hashids.decode(hid)[0])[2:]
            return ObjectId(b)
        except Exception:
            raise TypeError

class CheckSum():
    pass

class Obfuscate(object):
    pswd = current_app.config.get('COOKIE_PSWD')

    def _obfuscate(byt):
        # Use same function in both directions.  Input and output are bytes
        # objects.
        mask = Obfuscate.pswd.encode()
        lmask = len(mask)
        return bytes(c ^ mask[i % lmask] for i, c in enumerate(byt))

    @staticmethod
    def encode(s):
        ciphertext = Obfuscate._obfuscate(s.encode('utf8'))
        return hexlify(ciphertext).decode('utf8')

    @staticmethod
    def decode(s):
        ciphertext = unhexlify(s.encode('utf8'))
        return Obfuscate._obfuscate(ciphertext).decode('utf8')


class Routines(object):

    @staticmethod
    def gather_obfuscated_cookie(name):
        try:
            cookies = request.cookies.get('SRPL')
            serial  = Obfuscate.decode(cookies)
            return json.loads(serial)
        except Exception:
            return dict()

    @staticmethod
    def update_obfuscated_cookie(name):
        try:
            payload = g.get(name)
            dat = Obfuscate.encode(json.dumps(payload))
            return dat
        except Exception:
            pass

