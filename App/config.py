import os

config = {
    'PORT': os.getenv('OPENSHIFT_NODEJS_PORT', 9000),
    'HOST': os.getenv('OPENSHIFT_NODEJS_IP', 'localhost'),
    'MONGODB_URL':  os.getenv('OPENSHIFT_MONGODB_DB_URL', 'mongodb://localhost:27017/'),
    'Database': "survaider",
    'DEBUG': True
}