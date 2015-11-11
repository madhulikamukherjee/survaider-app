#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

DEBUG       = True
SECRET_KEY  = 'super-secret'
HOST        = 'http://localhost:5000'
SERVE_HOST  = 'localhost'
SERVE_PORT  = 5000

# MongoDB Config
MONGODB_DB      = 'qwer'
MONGODB_HOST    = 'localhost'
MONGODB_PORT    = 27017

# Flask_Security
SECURITY_PASSWORD_HASH  = 'pbkdf2_sha512'
SECURITY_PASSWORD_SALT  = 'SUPER!'
SECURITY_REGISTERABLE   = True
SECURITY_CONFIRMABLE    = False
SECURITY_RECOVERABLE    = False
WTF_CSRF_ENABLED        = False

# IMPORTANT! Security tokens, salts.
HASHIDS_SALT    = '708ffe47-b119-d1c5-b5c5-ab9eca777fcb'
COOKIE_PSWD     = '816-D1C5'

# Mail Settings
MAIL_SERVER     = 'smtp.gmail.com'
MAIL_PORT       = 465
MAIL_USE_SSL    = True
MAIL_USERNAME   = 'prashantinq@gmail.com'
MAIL_PASSWORD   = 'TROLL'

# Social
SOCIAL_FACEBOOK = {
    'consumer_key': 'TROLL',
    'consumer_secret': 'TROLL',
}

# Exceptions
PROPAGATE_EXCEPTIONS = True
