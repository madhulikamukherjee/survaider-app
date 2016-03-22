import json
from bson.objectid import ObjectId
from bson.json_util import dumps
from survaider.survey.controller import SurveyMetaController
# helper

from survaider.minions.helpers import HashId

def d(data):return json.loads(dumps(data))

class Data(object):
	"""docstring for Data"""
	def __init__(self,survey_id):
		self.sid= HashId.decode(survey_id)
	def ext(self):
		dat = SurveyMetaController().get(self.sid)


		# js= [_.repr for _ in dat if not _.hidden]
		# return js
		return dat



		
		