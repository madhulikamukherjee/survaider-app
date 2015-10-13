#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import click

from flask.ext.script import Manager
from survaider import create_app, app

manager = Manager(app)

@manager.command
def runserver():
    "Runs the App"
    create_app()
    app.run()

@manager.command
def create_admin():
    from survaider.security.controller import user_datastore

    def add_user():
        email    = click.prompt('Email?', type = str)
        password = click.prompt('Password?', type = str, hide_input=True, confirmation_prompt=True)
        r = user_datastore.find_or_create_role("admin")
        u = user_datastore.create_user(email = email, password = password)
        user_datastore.add_role_to_user(u, "admin")

    while True:
        try:
            add_user()
            click.echo("Added the User.")
            break
        except:
            click.echo("Possible Error: Email Invalid or Exists.")

if __name__ == "__main__":
    manager.run()
