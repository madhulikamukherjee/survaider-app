#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#.--. .-. ... .... -. - ... .-.-.- .. -.

from datetime import datetime, timedelta
from mongoengine.queryset import queryset_manager

from flask.ext.security import current_user

from survaider.minions.helpers import HashId
from survaider.user.model import User
from survaider.survey.model import Survey, SurveyUnit, Response
from survaider import db, app


class Notification(db.Document):
    destined = db.ListField(db.ReferenceField(User))
    acquired = db.DateTimeField(default = datetime.now)
    released = db.DateTimeField(default = datetime.max)
    payload  = db.DictField()

    #: Enables Inheritance.
    meta = {'allow_inheritance': True}

    def __unicode__(self):
        return HashId.encode(self.id)

    @property
    def flagged(self):
        return datetime.now() < self.released

    @flagged.setter
    def flagged(self, value):
        if value is True:
            self.released = datetime.max
        else:
            #: Sets time two seconds behind, to eliminate ANY possibility of
            #  race conditions and prevents other bugs, in general.
            self.released = datetime.now() - timedelta(seconds = 2)

    @queryset_manager
    def past(doc_cls, queryset):
        return queryset.order_by('-acquired')

    @staticmethod
    def unflagged_count():
        return Notification.past(released__gt = datetime.now()).count()

    def add_comment(self, text, user):
        if 'comments' not in self.payload:
            self.payload['comments'] = []
        comment_doc = {
            'user': user,
            'text': text,
            'added': datetime.now(),
            'id': int(datetime.now().timestamp())
        }
        self.payload['comments'].append(comment_doc)
        return comment_doc['id']

class SurveyResponseNotification(Notification):
    survey   = db.ReferenceField(Survey, required = True)
    response = db.ReferenceField(Response, required = True)
    transmit = db.BooleanField(default = False)

    @property
    def resolved_payload(self):
        fields = self.survey.resolved_root.struct.get('fields', [])
        payload = []
        
        flat_payload = [_ for _ in self.payload]
        for field in fields:
            
            Fieldtype = field.get('field_type')
            "Look for matching questions, resolve options"
            "Todo: Resolve Answers "
            if field.get('cid') in flat_payload:
                if Fieldtype == "rating":
                    q_field = field.get('field_options', {}).get('notifications', [])

                    try:
                        res = self.payload.get(field['cid'])[2:]
                        
                        res_label = res
                        # print (res_label)
                    except Exception:
                        res_label = [""]
                if Fieldtype == "group_rating":
                    q_field = field.get('field_options', {}).get('options', [])
                    
                    
                   
                    try:
                        res = self.payload.get(field['cid']).split('###')
                        editString = res[0]
                        indexValue = editString.index("##") 
                           
                           
                        questionRating = editString[indexValue+2:indexValue+3]
                        questionNumber = editString[indexValue-1:indexValue]
                        questionNumber = int(questionNumber)
                        no = questionNumber -1
                        val = q_field[no].get('label')
                        


                        labelValue = "of  "+ questionRating + " for  " + '"' +val + '"'
                        res_label = labelValue
                            # print (res_label)
                    except Exception:
                        res_label = [""]
                if Fieldtype == 'yes_no' or Fieldtype == 'single_choice':
         
                        q_field = field.get('field_options', {}).get('options', [])
                        try:
                            res = self.payload.get(field['cid'])[2:].split('###')
                            
                            res_label = [q_field[int(_) - 1].get('label') for _ in res]
                            # print (res_label)
                        except Exception:
                            res_label = [""]
                payload.append({
                    'cid':      field.get('cid'),
                    'label':    field.get('label'),
                    'response': self.payload.get(field['cid']),
                    'res_label': res_label,
                })
        return payload

    @property
    def comments(self):
        comments = []
        for comment in self.payload.get('comments', []):
            comments.append({
                'user': comment['user'].repr,
                'text': comment['text'],
                'added': str(comment['added']),
                'id': str(comment['id']),
            })
        return comments

    @property
    def repr(self):
        doc = {
            'id':       str(self),
            'acquired': str(self.acquired),
            'flagged':  self.flagged,
            'survey':   self.survey.tiny_repr,
            'root':     self.survey.resolved_root.tiny_repr,
            'response': str(self.response),
            'payload':  self.resolved_payload,
            'comments': self.comments,
            'type':     self.__class__.__name__,
        }
        return doc

class SurveyTicket(Notification):
    origin      = db.ReferenceField(User)
    survey_unit = db.ListField(db.ReferenceField(SurveyUnit))

    def resolve(self):
        self.flagged = False

    @property
    def resolved_payload(self):
        pld = self.payload
        comments = []
        for comment in self.payload.get('comments', []):
            comments.append({
                'user': comment['user'].repr,
                'text': comment['text'],
                'added': str(comment['added']),
                'id': str(comment['id']),
            })
        pld['comments'] = comments
        return pld

    @property
    def repr(self):

        doc = {
            'id':           str(self),
            'acquired':     str(self.acquired),
            'flagged':      self.flagged,
            'root_survey':  self.survey_unit[-1].resolved_root.tiny_repr,
            'survey_unit':  [_.tiny_repr for _ in self.survey_unit],
            'origin':       str(self.origin),
            'cur_is_orgn':  current_user.id == self.origin.id,
            'targets':      [_.repr for _ in self.destined],
            'payload':      self.resolved_payload,
            'type':         self.__class__.__name__,
        }
        return doc