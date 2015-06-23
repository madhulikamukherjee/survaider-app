#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

web = Blueprint('web', __name__, template_folder='templates')

@web.route('/')
def get():
    return render_template("master_full.html")

