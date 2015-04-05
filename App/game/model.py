#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

# Global imports
import bcrypt
import datetime
from hashids import Hashids
from functools import wraps
from flask import request, jsonify

# Local imports
import utils
from config import game_config
from user import model as user_model

class Points(object):
    def __init__(self, user_name):
        self._usr = user_model.Instance(user_name)
        if self._usr.k is True:
            self.k = True
            self._game = self._usr.game
        else:
            self.k = False

    @property
    def karma(self):
        return self._game['karma'] if 'karma' in self._game else [0, []]

    @karma.setter
    def karma(self, value):
        try:
            multiply, source = value

            # update current points
            old_value = self.karma
            old_value[0] += multiply * game_config['karma_multiplier']
            old_value[1].append((datetime.datetime.utcnow(), source))

            # update database
            old_game_value = self._usr.game
            old_game_value['karma'] = old_value
            self._usr.game = old_game_value
        except ValueError:
            raise ValueError("Pass an iterable with two items")

