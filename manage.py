#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask.ext.script import Manager
from survaider import create_app, app

manager = Manager(app)

@manager.command
def run():
    "Runs the App"
    create_app()
    app.run()

if __name__ == "__main__":
    manager.run()
