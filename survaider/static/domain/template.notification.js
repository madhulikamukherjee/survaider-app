this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["notification.dock"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class=""></ul>\n<a href="javascript:void(0)" data-backbone-call="next">Next</a>\n';

}
return __p
};

this["Survaider"]["Templates"]["notification.survey.response.tile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<li class="notification survey-response" data-card="parent">\n  <section class="title">\n    <i class="fa fa-bolt icon"></i>\n    <p>Subscribed Notification</p>\n    <p>\n      <i class="fa fa-clock-o"></i>\n      <span data-livestamp="' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'">' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'</span>\n    </p>\n    <button><i class="fa fa-times"></i></button>\n  </section>\n\n  <section class="main">\n    <h2>Response at <strong>' +
((__t = ( dat.survey.name )) == null ? '' : __t) +
'</strong>.</h2>\n    ';
 if (dat.root.id !== dat.survey.id) { ;
__p += '\n    <h3>Main Survey: ' +
((__t = ( dat.root.name )) == null ? '' : __t) +
'</h3>\n    ';
 }; ;
__p += '\n\n    <ul>\n      <table>\n      ';
 _.each(dat.payload, function(doc) { ;
__p += '\n          <tr>\n            <td class="details">\n              A response "' +
((__t = ( doc.res_label )) == null ? '' : __t) +
'" to the question "' +
((__t = ( doc.label )) == null ? '' : __t) +
'" at outlet\n            </td>\n            <td class="buttons">\n              <a href=""><button>Analytics</button></a>\n              <a href=""><button>More Details</button></a>\n            </td>\n          </tr>\n      ';
 }); ;
__p += '\n    </table>\n    </ul>\n            <ul role="comments">\n              ';
 _.each(dat.comments, function(doc) { ;
__p += '\n              <li data-user-id="' +
((__t = ( doc.user.id )) == null ? '' : __t) +
'">\n                <i class="fa fa-clock-o"></i>\n                <!-- <span data-livestamp="' +
((__t = ( doc.added )) == null ? '' : __t) +
'">' +
((__t = ( doc.added )) == null ? '' : __t) +
'</span> -->\n\n                <!-- <span>' +
((__t = ( doc.user.email )) == null ? '' : __t) +
'</span> -->\n                ';
 if (dat.origin == doc.user.id) { ;
__p += '\n                <span>Owner</span>\n                ';
 } ;
__p += '\n                <p class="message">' +
((__t = ( doc.text )) == null ? '' : __t) +
'</p>\n              </li>\n              ';
 }); ;
__p += '\n              <li>\n                <span data-action="add_comment">Add a Comment</span>\n                <input type="text" data-input="add_comment"></input>\n\n              </li>\n            </ul>\n  </section>\n</li>\n';

}
return __p
};

this["Survaider"]["Templates"]["notification.survey.ticket.tile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<li class="notification survey-ticket" data-card="parent" data-collapse="' +
((__t = ( dat.collapse )) == null ? '' : __t) +
'">\n  <section class="title">\n    <i class="fa fa-bookmark icon"></i>\n    <p>Ticket ID: <strong>' +
((__t = ( dat.id )) == null ? '' : __t) +
'</strong></p>\n    <p>\n      <i class="fa fa-clock-o"></i>\n      <span data-livestamp="' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'">' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'</span>\n    </p>\n    <button><i class="fa fa-times"></i></button>\n  </section>\n\n  <section class="main">\n    <h2>\n      ';
 if (dat.origin == dat.targets.id) { ;
__p += '\n        <p data-survey-id="' +
((__t = ( dat.root_survey.id )) == null ? '' : __t) +
'">The task "' +
((__t = ( dat.payload.original_msg )) == null ? '' : __t) +
'" is assigned to</p>\n      ';
 } else { ;
__p += '\n        <p data-survey-id="' +
((__t = ( dat.root_survey.id )) == null ? '' : __t) +
'">You have been assigned a task "' +
((__t = ( dat.payload.original_msg )) == null ? '' : __t) +
'"</p>\n      ';
 } ;
__p += '\n    </h2>\n\n    <ul>\n      <table>\n        <tr>\n          <td class="details">\n            <ul>\n              ';
 if (dat.origin == dat.root_survey.id) { ;
__p += '\n              To : \n              ';
 } else { ;
__p += '\n              Assigned to : \n              ';
 } ;
__p += '\n\n              ';
 _.each(dat.survey_unit, function(doc) { ;
__p += '\n              <ul class="units">\n                <span>' +
((__t = ( doc.name )) == null ? '' : __t) +
'</span>\n                <!-- <small>' +
((__t = ( doc.id )) == null ? '' : __t) +
'</small> -->\n              </ul>\n              ';
 }); ;
__p += '\n            </ul>\n            <!--   by : ' +
((__t = ( dat.root_survey.name )) == null ? '' : __t) +
'\n               <ul>\n                ';
 _.each(dat.targets, function(doc) { ;
__p += '\n                  <li data-user-id="' +
((__t = ( doc.id )) == null ? '' : __t) +
'">\n                    <span>' +
((__t = ( doc.email )) == null ? '' : __t) +
'</span>\n                    ';
 if (dat.origin == doc.id) { ;
__p += '\n                      <span>Owner</span>\n                    ';
 } ;
__p += '\n                  </li>\n                ';
 }); ;
__p += '\n              </ul> -->\n            <ul role="comments">\n              ';
 _.each(dat.payload.comments, function(doc) { ;
__p += '\n              <li data-user-id="' +
((__t = ( doc.user.id )) == null ? '' : __t) +
'">\n                <i class="fa fa-clock-o"></i>\n                <!-- <span data-livestamp="' +
((__t = ( doc.added )) == null ? '' : __t) +
'">' +
((__t = ( doc.added )) == null ? '' : __t) +
'</span> -->\n\n                <!-- <span>' +
((__t = ( doc.user.email )) == null ? '' : __t) +
'</span> -->\n                ';
 if (dat.origin == doc.user.id) { ;
__p += '\n                <span>Owner</span>\n                ';
 } ;
__p += '\n                <p class="message">' +
((__t = ( doc.text )) == null ? '' : __t) +
'</p>\n              </li>\n              ';
 }); ;
__p += '\n              <li>\n                <span data-action="add_comment">Add a Comment</span>\n                <input type="text" data-input="add_comment"></input>\n                \n              </li>\n            </ul>\n          </td>\n          <td class="buttons">\n\n            ';
 if (dat.flagged) {;
__p += '\n            <span data-action="mark_finished"><button>Mark Finished</button></span>\n            <span data-action="send_to_cc"><button>Send to Customer Care</button></span>\n            ';
 } else { ;
__p += '\n            <span data-action="expand"><button>Expand/Collapse</button></span>\n            ';
 } ;
__p += '\n          </td>\n        </tr>\n      </table>\n    </ul>\n  </section>\n</li>\n';

}
return __p
};