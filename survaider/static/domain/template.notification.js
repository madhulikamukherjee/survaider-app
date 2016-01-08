this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["notification.dock"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul></ul>\n<a href="#">Next</a>\n';

}
return __p
};

this["Survaider"]["Templates"]["notification.survey.response.tile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<li class="notification survey-response" data-card="parent">\n  <small><span data-livestamp="' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'">(Loading)</span></small>\n  <h1>' +
((__t = ( dat.root.name )) == null ? '' : __t) +
'</h1>\n  <small>' +
((__t = ( dat.root.id )) == null ? '' : __t) +
'</small>\n  <small>' +
((__t = ( dat.survey )) == null ? '' : __t) +
'</small>\n  ';
 if (dat.flagged){ ;
__p += '\n    Read\n  ';
 } else { ;
__p += '\n    Unread\n  ';
 } ;
__p += '\n\n  ';
 if (dat.root.active){ ;
__p += '\n    Active\n  ';
 } else { ;
__p += '\n    Inactive\n  ';
 } ;
__p += '\n\n  <ul>\n    ';
 _.each(dat.payload, function(doc) { ;
__p += '\n      <li>\n        <h2>' +
((__t = ( doc.label )) == null ? '' : __t) +
'</h2>\n        <small>' +
((__t = ( doc.cid )) == null ? '' : __t) +
'</small>\n        <p>' +
((__t = ( doc.response )) == null ? '' : __t) +
'</p>\n      </li>\n    ';
 }); ;
__p += '\n  </ul>\n</li>\n';

}
return __p
};

this["Survaider"]["Templates"]["notification.survey.ticket.tile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<li class="notification survey-response" data-card="parent">\n  <small><span data-livestamp="' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'">(Loading)</span></small>\n  <small>' +
((__t = ( dat.origin.id )) == null ? '' : __t) +
'</small>\n  <small>' +
((__t = ( dat.origin.email )) == null ? '' : __t) +
'</small>\n\n  <ul>\n    ';
 _.each(dat.survey_unit, function(doc) { ;
__p += '\n      <li>\n        <h2>' +
((__t = ( doc.name )) == null ? '' : __t) +
'</h2>\n        <small>' +
((__t = ( doc.id )) == null ? '' : __t) +
'</small>\n      </li>\n    ';
 }); ;
__p += '\n  </ul>\n  <p>' +
((__t = ( dat.payload.original_msg )) == null ? '' : __t) +
'</p>\n</li>\n';

}
return __p
};