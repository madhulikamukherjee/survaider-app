#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import click
import meinheld

from flask.ext.script import Manager
from survaider import create_app, app

manager = Manager(app)

@manager.command
def runserver():
    "Runs the App"
    create_app()
    if app.config['MEINHELD']:
        meinheld.listen((app.config['SERVE_HOST'],
                         app.config['SERVE_PORT']))
        meinheld.run(app)
    else:
        app.run(host     = app.config['SERVE_HOST'],
                port     = app.config['SERVE_PORT'],
                threaded = app.config['THREADED'])

@manager.command
def migrate_db():
    "Against Commit: c46d853c2949cc78ba86c0a8a618cf3ba0a3e44b"
    create_app()
    from survaider.survey.model import Survey
    from survaider.minions.attachment import Image
    c2 = 0
    for svey in Survey.objects():
        #: Take the Old Uploaded images and move them to the Images DB
        old_img = svey.metadata.get('img_uploads', [])
        u = svey.created_by[0]
        c1 = 0
        for img in old_img:
            i = Image()
            i.owner = u
            i.filename = img
            i.save()
            svey.attachments.append(i)
            c1 += 1
        if 'img_uploads' in svey.metadata:
            del svey.metadata['img_uploads']
        svey.save()
        c2 += 1
        print("Updated {0} entries in Survey {1}".format(c1, c2))

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
    create_user()

if __name__ == "__main__":
    manager.run()
