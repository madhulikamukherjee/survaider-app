from mongoengine import *

class Test(Document):
	survey_id= StringField()
	child=StringField()
	status= StringField()
	init= StringField()