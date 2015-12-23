this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["notification.survey.response.tile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="notification survey-response" data-card="parent">\n    <small><span data-livestamp="' +
((__t = ( dat.acquired )) == null ? '' : __t) +
'">(Loading)</span></small>\n    <small>' +
((__t = ( dat.survey )) == null ? '' : __t) +
'</small>\n</div>\n';

}
return __p
};