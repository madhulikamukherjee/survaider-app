#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from blinker import signal

from survaider.notification.signals import survey_response_notify

@survey_response_notify.connect
def create_response_notification(**kwarg):
    # notify = SurveyResponseNotification()
    # notify.survey = survey.resolved_root
    # notify.response = response
    # notify.transmit = False

    print(kwarg)
