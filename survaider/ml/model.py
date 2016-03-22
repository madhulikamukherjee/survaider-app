import json
from bson.objectid import ObjectId
from bson.json_util import dumps
from survaider.survey.model import SurveyUnit
# helper

from survaider.minions.helpers import HashId

def d(data):return json.loads(dumps(data))

class Data(object):
	"""docstring for Data"""
	def __init__(self,survey_id):
		self.sid= HashId.decode(survey_id)
	def ext(self):
		dat = SurveyUnit.objects(referenced = self.sid)
		return d(dat)



		
		