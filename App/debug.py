from flask import Flask
from user import usr
from user import model as user_model
from game import game, model as game_model
from config import config

app = Flask(__name__)
app.register_blueprint(usr, url_prefix = '/usr')
app.register_blueprint(game, url_prefix = '/game')
pr = user_model.Instance('pragya')

print(user_model.Authorization.check_token(pr, 'JJJ'))