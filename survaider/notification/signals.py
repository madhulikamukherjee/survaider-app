#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from blinker import signal

survey_response_notify   = signal('notification.survey_response')
survey_response_transmit = signal('notification.survey_response.transmit')
