"""from flask import Flask
from user import usr
from config import config

app = Flask(__name__)
app.register_blueprint(usr)

if __name__ == "__main__":
    app.run(host = config['HOST'], port = config['PORT'])"""