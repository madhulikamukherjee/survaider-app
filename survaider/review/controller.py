#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

import datetime
import dateutil.parser
import requests

from blinker import signal
from functools import reduce
from flask import Flask, Blueprint, render_template, request, jsonify
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required

from survaider import app
from survaider.minions.decorators import api_login_required
from survaider.review.model import ReviewsAggregator

review = Blueprint('review', __name__, template_folder = 'templates')

class ReviewAggregation(Resource):

    @api_login_required
    def get(self):
    	# print ("current user: ", current_user.id)
    	reviews = ReviewsAggregator(current_user.id).get()
    	return len(reviews)

    @api_login_required
    def post(self):
        pass

@review.route('/')
def review_home():
    return render_template("reviewspage.html", title = "Review")