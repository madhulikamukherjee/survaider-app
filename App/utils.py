#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from pymongo import MongoClient
from config import config
from flask import jsonify

class Database:
    """
    This class gets the database instance, and exposes the collections.
    """

    def __init__(self, uri = False):
        if type(uri) is str:
            self.client = MongoClient(uri)
        else:
            self.client = MongoClient(config['MONGODB_URL'])

        self.db = self.client[config['Database']]

    @property
    def user(self):
        """
        Returns the User Database collection
        """
        return self.db['user']
