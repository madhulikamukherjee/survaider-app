#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from flask import Flask, Blueprint, render_template, request, jsonify
from survaider.user.model import Role, User
import requests

usr = Blueprint('usr', __name__, template_folder='templates')

@usr.route('/')
def get_index():
    return "Test"

@usr.route('/thankyou' , methods=['POST'])
def some_name():
	if request.method == 'POST':
		r = requests.post(
			"https://api.mailgun.net/v3/sandbox5d4604e611c54873b7eb557e1393ef79.mailgun.org/messages",
			auth = ("api", "key-3e1ac26b280f0006fcefb105256342d1"),
			data = {
			"from": "Mailgun Sandbox <postmaster@sandbox5d4604e611c54873b7eb557e1393ef79.mailgun.org>",
			"to": "Madhulika Mukherjee <madhulika.91@gmail.com>",
			"subject": "Survaider New Subscription",
			"text": "Hello.\n\rYou have new Subscription by `{0}`, from organisation {1}. Email ID: {2}".format(request.form['name'],request.form['organisation'],request.form['email_signup'])
			}
			)
	return render_template("thankyou.html")

@usr.route('/contact')
def some_name2():
	return render_template("contact.html")