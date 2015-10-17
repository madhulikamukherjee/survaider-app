#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify

dashboard = Blueprint('dashboard', __name__, template_folder = 'templates')

@dashboard.route('/')
def get_index():
    return render_template("dash.index.html")
