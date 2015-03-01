#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, render_template
import config
import survaider

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', name="LOL")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)