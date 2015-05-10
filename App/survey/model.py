#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from bson.objectid import ObjectId
from config import user_sexes as USER_SEXES

class Instance(object):
    """
    """
    def __init__(self, survey_id):
        """
        Initializes the Instance Object. Its status should be checked through the
        property `k`.
        """
        if _Utils.survey_exists(survey_id) is False:
            self.k = False
            return None
        self.k = True
        self.sdb = utils.Database().survey
        self._survey_dat = self.sdb.find_one({"_id": ObjectId(survey_id)})
        self._updates = set()

    def update(self):
        """Updates the DB with changes made to the Survey Instance."""
        if self.k is True:
            for change in self._updates:
                self.sdb.update(
                    {'_id': self._survey_dat['_id']},
                    {'$set': {change: self._survey_dat[change]}},
                    upsert = False,
                    multi = False)
            self._updates = set()

    def __del__(self):
        """Called when instance object moves out of scope."""
        self.update();

class Manage(object):
    def add(scheme, tags, target, survey, filters):
        push_data = {
            'scheme': scheme(),
            'tags': tags,
            'target': target,
            'survey': survey(),
            'filters': filters(),
            'meta': {
                'added': datetime.datetime.utcnow()
            }
        }

        return (True, utils.Database().survey.insert_one(push_data).inserted_id)

class Filter(object):
    def __init__(self):
        self._filters = {}

    @property
    def age(self):
        return self._filters['age']

    @age.setter
    def age(self, age_rng):
        self._filters['age'] = age_rng

    @property
    def sex(self):
        return self._filters['sex']

    @sex.setter #MUST. RESIST. Sex Joke.
    def sex(self, values):
        self._filters['sex'] = []
        for string in values:
            if string in USER_SEXES:
                self._filters['sex'].append(string)

    @property
    def profession(self):
        return self._filters['profession']

    @profession.setter
    def profession(self, values):
        self._filters['profession'] = []
        for string in values:
            self._filters['profession'].append(string)

    def __call__(self):
        return self._filters
    
class Scheme(object):
    def __init__(self, scheme_dat = None):
        if scheme_dat is not None:
            self._scheme = scheme_dat
        else:
            self._scheme = {}

    @property
    def client_name(self):
        return self._scheme['client_name'] if 'client_name' in self._scheme else ''

    @client_name.setter
    def client_name(self, value):
        self._scheme['client_name'] = value

    @property
    def description(self):
        return self._scheme['description'] if 'description' in self._scheme else ''

    @description.setter
    def description(self, value):
        self._scheme['description'] = value

    def __call__(self):
        return self._scheme

class Survey(object):
    def __init__(self):
        pass

    def __call__(self):
        return ["not", "implemented", "yet"]

class _Utils(object):
    """
    Survey Management Utilities. Leverages repeated functions.
    """

    def survey_exists(survey_id):
        """
        Checks if the Survey exists in Database.
        """
        return utils.Database().survey.find_one({"_id": ObjectId(survey_id)}) is not None
