#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

DEBUG                   = True
SECRET_KEY              = 'super-secret'

# MongoDB Config
MONGODB_DB              = 'qwer'
MONGODB_HOST            = 'localhost'
MONGODB_PORT            = 27017


# Flask_Security
SECURITY_PASSWORD_HASH  = 'pbkdf2_sha512'
SECURITY_PASSWORD_SALT  = 'SUPER!'
SECURITY_REGISTERABLE   = True
SECURITY_CONFIRMABLE    = False
# SECURITY_RECOVERABLE    = True
