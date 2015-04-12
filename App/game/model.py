#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

# Global imports
import json
import datetime
import uuid
import base64
from hashids import Hashids
from functools import wraps
from simplecrypt import encrypt, decrypt
from flask import request, jsonify

# Local imports
import utils
from config import game_config, encryption_keys
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
            old_value[1].append((datetime.datetime.utcnow(), source, old_value[0]))

            # update database
            old_game_value = self._usr.game
            old_game_value['karma'] = old_value
            self._usr.game = old_game_value
        except ValueError:
            raise ValueError("Multiplier and Source must be passed in.")

    @property
    def coins(self):
        return self._game['coins'] if 'coins' in self._game else [0, []]

    @coins.setter
    def coins(self, value):
        try:
            amount, source = value

            # update current points using the rule
            old_value = self.coins
            old_value[0] += amount
            old_value[1].append((datetime.datetime.utcnow(), source, amount))

            # update database
            old_game_value = self._usr.game
            old_game_value['coins'] = old_value
            self._usr.game = old_game_value
        except ValueError:
            raise ValueError("Amount and Source must be passed in.")

    @property
    def _life(self):
        return self._game['life'] if 'life' in self._game else 0

    @_life.setter
    def _life(self, value):
        # update current points
        if value <= game_config['max_life']:
            old_value = self._life
            new_value = old_value + value
            if all([
                new_value <= game_config['max_life'],
                new_value > 0
            ]):
                # update database
                old_game_value = self._usr.game
                old_game_value['life'] = new_value
                self._usr.game = old_game_value
            elif new_value < 0:
                # update database
                old_game_value = self._usr.game
                old_game_value['life'] = 0
                self._usr.game = old_game_value

        return None

    def add_life(self, value = 1):
        "Add life with 1."
        self._life = value
        return True

    def take_life(self, value = 1):
        "Removes life with 1, or the value."
        self._life = -value
        return True

    @property
    def level(self):
        return self._game['level'] if 'level' in self._game else 0

    @level.setter
    def level(self, value):
        
    

class _Utils(object):
    def encode(user_name, target, points):
        "Generates a validation key for karma, coin, and life increments or decrements."
        entropy = str(uuid.uuid4())

        data = {
            'user_name': user_name,
            'target': target,
            'points': points,
            'entropy': entropy
        }

        plain_text = json.dumps(data)

        ciphertext = encrypt(encryption_keys['game_key'], plain_text)

        return base64.b64encode(ciphertext).decode()
        #return ciphertext

    def decode(cipher):
        "Decodes the validation key."
        # Decryption
        c_text = base64.b64decode(bytes(cipher, 'utf-8'))
        json_str = decrypt(encryption_keys['game_key'], c_text).decode()

        return json.loads(json_str)
