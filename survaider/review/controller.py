#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from datetime import datetime
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
import json

review = Blueprint('review', __name__, template_folder = 'templates')

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


class ReviewAggregation(Resource):

    @api_login_required
    def get(self):
    	reviews = ReviewsAggregator(current_user.id).get()
    	return_reviews = []
    	obj = {}
    	for review in reviews:
            obj = {}
            obj['survey_id'] = review.survey_id
            obj['rating'] = review.rating
            obj['review'] = review.review
            obj['provider'] = review.provider
            obj['sentiment'] = review.sentiment
            obj['date_added'] = json.dumps(review.date_added, cls=DateTimeEncoder)
            obj['review_link'] = review.review_link
            return_reviews.append(obj)
    	return return_reviews

    @api_login_required
    def post(self):
        pass

@review.route('/')
def review_home():
    return render_template("reviewspage.html", title = "Review")