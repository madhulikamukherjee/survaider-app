from flask import Flask
from user import usr
from user import model as user_model
from game import game, model as game_model
from survey import survey, model as survey_model
from config import config

app = Flask(__name__)
app.register_blueprint(usr, url_prefix = '/usr')
app.register_blueprint(game, url_prefix = '/game')
app.register_blueprint(survey, url_prefix = '/survey')

a = survey_model.Filter()
a.age = range(0, 18)
a.sex = ['MALE', 'FEMALE', 'NERD']
a.profession = ['Does nothing', 'School Teacher']
b = survey_model.Scheme()
b.client_name = "Acme Inc."
b.description = "How often do you see Woody here? Help. -coyote"
c = survey_model.Survey()

print(survey_model.Manage.add(b, ['cartoon', 'humour'], 300, c, a))
