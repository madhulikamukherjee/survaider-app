#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template

user = Blueprint("user", __name__, template_folder = "view")

class User:
    def get(self):
        pass


class Session:
    def create(self, user_id):
        """Creates a new session for the user."""
        pass

    def verify(self, user_id, session_id):
        """Checks the session ID, validity, and integrity."""
        pass

    def delete(self, user_id, session_id = False):
        """Deletes the session ID, and logs a log-out event."""
        pass


