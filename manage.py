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
    app.run(host = app.config['SERVE_HOST'],
            port = app.config['SERVE_PORT'])

@manager.command
def create_user():
    from survaider.security.controller import user_datastore

    def add_user():
        email    = click.prompt('Email?', type = str)
        password = click.prompt('Password?', type = str, hide_input = True, confirmation_prompt = True)
        r = user_datastore.find_or_create_role("admin")
        u = user_datastore.create_user(email = email, password = password)
        if click.confirm("Admin User?"):
            user_datastore.add_role_to_user(u, "admin")
        else:
            click.echo("Regular User.")

    while True:
        try:
            add_user()
            click.echo("Added the User.")
            break
        except:
            click.echo("Possible Error: Email Invalid or Exists.")

@manager.command
def setup_db():
    from pymongo import MongoClient
    from survaider.config import MONGODB_DB, MONGODB_HOST, MONGODB_PORT
    client = MongoClient(MONGODB_HOST, MONGODB_PORT)
    client.drop_database(MONGODB_DB)
    create_admin()

if __name__ == "__main__":
    manager.run()
