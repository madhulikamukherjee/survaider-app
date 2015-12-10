#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

def create(survey, response):
    notify = SurveyResponseNotification()
    notify.survey = survey.resolved_root
    notify.response = response
    notify.transmit = False
