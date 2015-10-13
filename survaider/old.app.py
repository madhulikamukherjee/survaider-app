from flask import Flask, render_template
from flask.ext.mongoengine import MongoEngine
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required, current_user
from flask_admin import Admin
from flask_admin.contrib.mongoengine import ModelView
from flask_admin import helpers as admin_helpers

# Create app
app = Flask(__name__, template_folder='templates')
app.config.from_pyfile('config.py')

# Create database connection object
db = MongoEngine(app)

class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)

class User(db.Document, UserMixin):
    username = db.StringField(max_length=40)
    email = db.StringField(max_length=255)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])
    tags = db.ListField(db.ReferenceField('Tag'))

# Setup Flask-Security
user_datastore = MongoEngineUserDatastore(db, User, Role)

# # Create a user to test with
# @app.before_first_request
# def create_user():
#     user_datastore.create_user(email='matt@nobien.net', password='password')

# Views
@app.route('/')
@login_required
def home():
    return render_template('index.html')

admin = Admin(app, name='BioDB Admin', template_mode='bootstrap3', base_template='my_master.html')
security = Security(app, user_datastore)

class Software(db.Document):
    name = db.StringField(max_length=40)
    tags = db.ListField(db.ReferenceField('Tag'))

class Tag(db.Document):
    name = db.StringField(max_length=40)

    def __unicode__(self):
        return self.name

class File(db.Document):
    name = db.StringField(max_length=20)
    data = db.FileField()

class UserView(ModelView):
    column_filters = ['name']
    def is_accessible(self):
        return current_user.is_authenticated()
    # column_searchable_list = ('name')

@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
    )

admin.add_view(UserView(Software))
# admin.add_view(ModelView(User))
# admin.add_view(ModelView(Role))
admin.add_view(ModelView(Tag))
admin.add_view(ModelView(File))

if __name__ == '__main__':
    app.run()
