import os

config = {
    'PORT': os.getenv('OPENSHIFT_NODEJS_PORT', 9000),
    'HOST': os.getenv('OPENSHIFT_NODEJS_IP', 'localhost'),
    'MONGODB_URL':  os.getenv('OPENSHIFT_MONGODB_DB_URL', 'mongodb://localhost:27017/'),
    'Database': "survaider",
    'DEBUG': True
}

game_config = {
    'karma_multiplier': 10,
    'max_life': 10
}

encryption_keys = {
    'game_key': b'f657a11b6f1f73e374f13a5e950d4c2d36d82618716fef8a06e474f084795a27a2ba4f8b664e4f44736387a61ad92e92f977db9a678ccc0103995462e6ef658c',
}