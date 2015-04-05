#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

#from flask import Flask, Blueprint, render_template

#user = Blueprint("user", __name__, template_folder = "view")

# Global imports
import bcrypt
import datetime
import re
import uuid
import codecs
import json
from hashids import Hashids
from functools import wraps
from flask import request, jsonify

# Local imports
import utils

class Instance(object):
    """
    The User Instance. An instance is an object of user properties that exposes
    the associated informations about the user.
    Associated Properties-
    - email -> string (setter allowed) The email of the user.
    - user_name -> string The User Name of the user.
    - session -> hash (setter allowed) The session hash - contains various session information.
    - pswd -> bcrypt string (setter allowed) The password.
    - status -> int (setter allowed) The user account status.
    """

    def __init__(self, user_name):
        """
        Initializes the Instance Object. Its status should be checked through the
        property `k`.
        """
        if _Utils.user_exists(user_name) is False:
            self.k = False
            return None
        self.k = True
        self.udb = utils.Database().user
        self._user_dat = self.udb.find_one({"user_name": user_name})
        self._updates = set()

    @property
    def email(self):
        """Gets the user email id."""
        return self._user_dat['email']

    @email.setter
    def email(self, value):
        """Sets the user email id."""
        if _Utils.validate_email(value) is True:
            self._updates.add('email')
            self._user_dat['email'] = value
        else:
            pass

    @property
    def user_name(self):
        """Gets the user name."""
        return self._user_dat['email']

    @property
    def session(self):
        """Gets the session information."""
        return self._user_dat['session'] if 'session' in self._user_dat else {}

    @session.setter
    def session(self, value):
        """Updates the session information."""
        self._updates.add('session')
        self._user_dat['session'] = value

    @property
    def pswd(self):
        """Gets the user password."""
        return self._user_dat['pswd']

    @pswd.setter
    def pswd(self, value):
        """Sets the user password."""
        if _Utils.validate_password(value) is True:
            self._updates.add('pswd')
            self._user_dat['pswd'] = Password.get_hashed_password(value)
        else:
            pass

    @property
    def status(self):
        """Gets the account status."""
        return self._status if 'status' in self._user_dat else 0

    @status.setter
    def status(self, value):
        """Sets the account status."""
        if value in [0, 1, 2, 3]:
            self._updates.add('status')
            self._user_dat['status'] = value
        else:
            pass

    def update(self):
        """Updates the DB with changes made to the User Instance."""
        if self.k is True:
            for change in self._updates:
                self.udb.update(
                    {'user_name': self._user_dat['user_name']},
                    {'$set': {change: self._user_dat[change]}},
                    upsert = False,
                    multi = False)

    def __del__(self):
        """Called when instance object moves out of scope."""
        self.update();

class _Utils(object):
    """
    User Management Utilities. Leverages repeated functions.
    """

    def user_exists(user_name):
        """
        Checks if the User exists in Database.
        """
        return utils.Database().user.find_one({"user_name": user_name}) is not None

    def email_exists(email_id):
        """
        Checks if the Email exists in Database.
        """
        return utils.Database().user.find_one({"email": email_id})

    def validate_username(user_name):
        """
        Validates the username criteria of [3, 32] length, alphanumeric, {+, _, -}.
        """
        with open('./user/blacklist.json') as minion:    
            data = json.load(minion)
            if user_name in data:
                return False
        min_len = 3
        max_len = 32
        pattern = r"^(?i)[a-z0-9_-]{%s,%s}$" %(min_len, max_len)
        return bool(re.match(pattern, user_name)) == True

    def validate_password(password):
        """
        Validates the password criteria of its length > 5.
        """
        return len(password) > 5

    def validate_email(email_id):
        """
        Validates the email id.
        """
        pattern = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        return bool(re.match(pattern, email_id)) == True

class Manage(object):
    """
    Leverages user management functions.
    """

    def add(user_name, password, confirm_password, email_id):
        """Adds the User into Database."""
        errors = []

        if _Utils.validate_username(user_name) is False:
            errors.append("BadUserName")

        if _Utils.validate_email(email_id) is False:
            errors.append("BadEmailID")

        if _Utils.validate_password(password) is False:
            errors.append("ShortPassword")

        if _Utils.user_exists(user_name):
            errors.append("UsernameExist")

        if _Utils.email_exists(email_id):
            errors.append("EmailExist")

        if password != confirm_password:
            errors.append("PasswordNoMatch")

        if len(errors) is not 0:
            return (False, errors)
        else:
            user = {
                'user_name': user_name,
                'pswd': Password.get_hashed_password(password),
                'email': email_id,
                'status': 1,
                'meta': {
                    'added': datetime.datetime.utcnow()
                }
            }

            utils.Database().user.insert_one(user).inserted_id

            return (True, )

    def delete(user_name):
        """Deletes the User from Database."""
        user = Instance(user_name)
        if user.k is True:
            # 0 is a code for Deleted user.
            user.status = 0

class Session(object):
    """
    Manages the User Session and exposes Login, Verify and Logout methods.
    """

    def login(user_name, pswd):
        """
        Logs in the user, and returns the Session Identification Information.
        """
        user = Instance(user_name)
        if user.k is True:
            if Password.check_password(pswd, user.pswd) is True:
                # create a session
                session_id = codecs.encode(user_name, "rot-13")
                session_key = Hashids().encode(int(uuid.uuid4()))
                prev_session = user.session
                prev_session[session_key] = {
                    'start': datetime.datetime.utcnow(),
                    'alive': True
                }
                user.session = prev_session
                return (True, session_id, session_key)

        return (False, None, None)

    def logout(session_id, session_key):
        """
        Marks the existing session as inactive.
        """
        user_name = codecs.encode(session_id, "rot-13")
        user = Instance(user_name)
        if user.k is True:
            prev_session = user.session
            if all([
                session_key in prev_session,
                'alive' in prev_session[session_key],
                prev_session[session_key]['alive'] is True,
            ]):
                prev_session[session_key]['alive'] = False
                user.session = prev_session
                return True
        return False

    def check(session_id, session_key):
        """
        Checks if the session exists, and is alive.
        """
        user_name = codecs.encode(session_id, "rot-13")
        user = Instance(user_name)
        return all([
            session_key in user.session,
            'alive' in user.session[session_key],
            user.session[session_key]['alive'] is True,
        ]) if user.k is True else False

class Authorized(object):
    pass

class Password(object):
    """
    Exposes bcrypt hashes of the password.
    """

    def get_hashed_password(plain_text_password):
        # Hash a password for the first time
        #   (Using bcrypt, the salt is saved into the hash itself)
        return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())

    def check_password(plain_text_password, hashed_password):
        # Check hashed password. Using bcrypt, the salt is saved into the hash itself
        return bcrypt.checkpw(plain_text_password, hashed_password)

def must_login(f):
    @wraps(f)
    def decoration(*args, **kwargs):
        if Session.check(
                request.headers.get("user_id", ""),
                request.headers.get("user_key", "")
            ) is True:
            return f(*args, **kwargs)
        else:
            response = {
                'error': True,
                'message': 'Login Required'
            }
            return jsonify(response), 401
    return decoration

def must_not_login(f):
    @wraps(f)
    def decoration(*args, **kwargs):
        if Session.check(
                request.headers.get("user_id", ""),
                request.headers.get("user_key", "")
            ) is True:
            response = {
                'error': True,
                'message': 'Should Not be Logged In'
            }
            return jsonify(response), 401
        else:
            return f(*args, **kwargs)
    return decoration

def owns_token(hotdog):
    def decorator(fn):
        def wrapped_function(*args, **kwargs):
            # First check if user is authenticated.
            if not logged_in():
                return redirect(url_for('login'))
            # For authorization error it is better to return status code 403
            # and handle it in errorhandler separately, because the user could
            # be already authenticated, but lack the privileges.
            if not authorizeowner(hotdog):
                abort(403)
            return fn(*args, **kwargs)
        return update_wrapper(wrapped_function, fn)
    return decorator
