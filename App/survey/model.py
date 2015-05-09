#!/usr/bin/env python
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from bson.objectid import ObjectId

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

class _Utils(object):
    """
    Survey Management Utilities. Leverages repeated functions.
    """

    def survey_exists(survey_id):
        """
        Checks if the Survey exists in Database.
        """
        return utils.Database().survey.find_one({"_id": ObjectId(survey_id)}) is not None
