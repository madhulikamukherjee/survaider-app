import datetime
import dateutil.parser
import json

from bson.objectid import ObjectId
from uuid import uuid4
from flask import request, Blueprint, render_template, g
from flask_restful import Resource, reqparse
from flask.ext.security import current_user, login_required
from mongoengine.queryset import DoesNotExist, MultipleObjectsReturned

from survaider import app
from survaider.minions.decorators import api_login_required
from survaider.minions.exceptions import APIException, ViewException
from survaider.minions.attachment import Image as AttachmentImage
from survaider.minions.helpers import api_get_object
from survaider.minions.helpers import HashId, Uploads
from survaider.user.model import User
from survaider.survey.structuretemplate import starter_template
from survaider.survey.model import Survey, Response, ResponseSession, ResponseAggregation, SurveyUnit
from survaider.survey.model import DataSort,IrapiData,Dashboard
from survaider.minions.future import SurveySharePromise
from survaider.ml.datum import DatumBox
from survaider.ml.tripadvisor import TripAdvisor
from survaider.ml.zomato import Zomato
from survaider.ml.model import Data
import pymongo

# connection= pymongo.MongoClient('localhost', 27017)
# db = connection['wordcloud']
class WordCloud(Resource):
	"""docstring for WordCloud
	@params
	action : set /get , set will send server the url , get will return the Response
	@output
	set : key to get response . The key will relate to the db where WordCloud is stored
	get: WordCloud

	"""
	def tripadvisor(self):
		t=TripAdvisor(self.url)


	def zomato(self):
		pass
	def save_words(self):
		#Get a 
		collection= db[self.sid]
		wc = db.wc
		

	def get(self,url,action,survey_id):
		self.url = url
		self.sid=str(survey_id) 
		if action=="set":
			if "tripadvisor" in url:pass
class Aspect(Resource):
	"""docstring for Aspect"""
	def get(self,survey_id,provider):
		self.provider=provider
		if provider=="all":
			pass
		elif provider=="zomato":
			pass
		elif provider=="trip":
			self.tripadvisor()
		elif provider=="twitter":
			pass
		elif provider=="facebook":
			pass
		elif provider=="test":
			d= Data(survey_id)
			return d.ext()
		else:
			return json.dumps({"status":"failed","error":"bad provider"})
	def get_url(self):
		pass
	def tripadvisor(self):
		pass
	def facebook(self):
		pass
	def twitter(self):
		pass
	def all(self):
		pass
	def zomato(self):
		pass

				

		