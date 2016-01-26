#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

survey_struct_schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",

    "type": "object",
    "properties": {
        "fields": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "cid": {
                        "type": "string"
                    },
                    "field_options": {
                        "type": "object",
                        "properties": {
                            "options": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "checked": {
                                            "type": "boolean"
                                        },
                                        "img_enabled": {
                                            "type": "boolean"
                                        },
                                        "img_uri": {
                                            "type": "string"
                                        },
                                        "notify": {
                                            "type": "boolean"
                                        },
                                        "label": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["label"]
                                }
                            }
                        }
                    },
                    "field_type": {
                        "type": "string"
                    },
                    "label": {
                        "type": "string"
                    },
                    "required": {
                        "type": "boolean"
                    },
                    "notifications": {
                        "type": "boolean"
                    },
                    "richtext": {
                        "type": "boolean"
                    },
                    "deletable": {
                        "type": "boolean"
                    }
                },
                "required": ["cid", "field_type", "label", "required"]
            }
        },
        "links": {
            "type": "null"
        },
        "screens": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": ["fields", "screens"]
}

starter_template = {
    "fields": [
        {
            "cid": "73cc8a14-9cff-4a55-a9dc-d723ce382eb5",
            "field_options": {
                "options": [
                ],
                "deletable": False,
            },
            "field_type": "group_rating",
            "label": "Rate your experience on the following parameters",
            "required": True,
        },
        {
            "cid": "9ca9c60c-587c-4848-8002-31708b5dcbf1",
            "field_options": {
                "deletable": False,
            },
            "field_type": "rating",
            "label": "How likely, on a scale of 0 to 10, are you to recommend our services to a friend or colleague?",
            "required": True,
        }
    ],
    "screens": [
        'Default Title',
        'Default Description',
        'Default Footer',
    ]
}
