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
    'max_life': 10,
    'levels': [
        (0, "Beginner"),
        (10, "Starter"),
        (100, "Goes just fine"),
        (500, "Now we're talking!"),
        (1000, "Probably too much?"),
        (1500, "Okay that's just too much."),
        (3000, "Okay, you can stop."),
        (5000, "STAHP, Bruh."),
        (10000, "Dude? Are you okay?"),
        (100000, "You have no life."),
        (10000000, "You the God.")
    ],
    'medals': {
        'ID1': "Identity One",
        'ID2': "Identity Two"
    },
    'badges': {
        'ID1': "No life badge",
        'ID2': "Virginity badge"
    }
}

encryption_keys = {
    'game_key': b'f657a11b6f1f73e374f13a5e950d4c2d36d82618716fef8a06e474f084795a27a2ba4f8b664e4f44736387a61ad92e92f977db9a678ccc0103995462e6ef658c',
    'user_key': None
}

user_sexes = ['MALE', 'FEMALE' 'OTHER', 'UNKNOWN', 'NERD', 'RAINBOWS']

static_route_prefix = os.getenv('OPENSHIFT_NODEJS_PORT', '//localhost:99')

# STAHP BRUH.
# The followings are not generally "configuration" settings, for they
# require the source code to be modified with decorators.
# The reason they're here is just so that they can be enabled and disabled
# as and when required.
# NOT RECOMMENDED FOR MAINTAINERS AND REVIEWERS TO MODIFY BELOW THIS LINE.

security_clearance_levels = {
    'ADMIN': True,
    'AUTHOR': True,
    'VIRGINITYPROTECTOR': False
}