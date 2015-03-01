#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, render_template
#import config
#import survaider

app = Flask("survaider")

@app.route('/')
def index():
    return render_template('index.html', name="LOL")

if __name__ == '__main__':
    app.run()