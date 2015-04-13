from flask import Flask
from user import usr
from game import game, model as game_model
from config import config

app = Flask(__name__)
app.register_blueprint(usr, url_prefix = '/usr')
app.register_blueprint(game, url_prefix = '/game')
pragya = game_model.Points('pragya')
pragya.badges = "ID1"
print(pragya.badges)
#print(pragya.level)
#pragya.karma = 1000, 'Tester'
print(pragya.level)
#print(pragya.karma)