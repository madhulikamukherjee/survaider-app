from flask import Flask
from user import usr
from game import game
from survey import survey
from config import config

app = Flask(__name__)
app.register_blueprint(usr, url_prefix = '/usr')
app.register_blueprint(game, url_prefix = '/game')
app.register_blueprint(survey, url_prefix = '/survey')

if __name__ == "__main__":
    app.run(host = config['HOST'], port = config['PORT'], debug = config['DEBUG'])
