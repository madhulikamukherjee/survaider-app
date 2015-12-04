this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["dashboard.tiles"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="card ' +
((__t = ( attrs.narrow )) == null ? '' : __t) +
' ' +
((__t = ( attrs.expand )) == null ? '' : __t) +
'">\n  <div class="parent-unit">\n    <section class="frontmatter">\n      <h1>' +
((__t = ( dat.name )) == null ? '' : __t) +
'</h1>\n\n      <a href="javascript:void(0)" class="expand">\n        <i class="fa fa-arrow-circle-left"></i>expand\n      </a>\n\n      <small>\n        <span class="status-expanded">\n          Created\n          <strong>\n            <span data-livestamp="' +
((__t = ( dat.created_on )) == null ? '' : __t) +
'">(Loading)</span>\n          </strong>\n        </span>\n        <ul class="status-narrow">\n          <li><i class="fa fa-circle-o idle"></i>Active</li>\n          <li><i class="fa fa-rss alert"></i>10 critical alerts</li>\n        </ul>\n      </small>\n\n      <ul class="statistics">\n        <li>\n          <h1>Responses</h1>\n          <h2>\n            ' +
((__t = ( numeral(dat.has_obtained_responses).format('0[.]00a') )) == null ? '' : __t) +
'\n          </h2>\n        </li>\n        <li>\n          ';
 if (dat.has_response_cap !== Math.pow(2,32)) { ;
__p += '\n          <h1>Goal</h1>\n          <h2>' +
((__t = ( numeral(dat.has_response_cap).format('0[.]00a') )) == null ? '' : __t) +
'</h2>\n          ';
 } ;
__p += '\n        </li>\n      </ul>\n      <a href="javascript:void(0)" class="more">\n        <i class="fa fa-arrow-circle-down"></i>More\n      </a>\n    </section>\n    <section class="status">\n      <h1>\n        Status\n        <a href="javascript:void(0)" class="less">\n          <i class="fa fa-arrow-circle-up"></i>Show Less\n        </a>\n      </h1>\n\n      <ul>\n        <li><i class="fa fa-circle-o idle"></i>Active</li>\n        <li>\n          <i class="fa fa-clock-o primary"></i>\n          Modified\n          <strong>\n          <span data-livestamp="' +
((__t = ( dat.last_modified )) == null ? '' : __t) +
'">(Loading)</span>\n          </strong>\n        </li>\n        <li><i class="fa fa-rss alert"></i>10 critical alerts</li>\n      </ul>\n    </section>\n    <section class="footer">\n      <section class="destinations">\n        <ul>\n          <a href="' +
((__t = ( dat.uri_responses )) == null ? '' : __t) +
'">\n            <li><i class="fa fa-area-chart"></i> Analytics</li>\n          </a>\n          <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'">\n            <li><i class="fa fa-edit"></i> Edit</li>\n          </a>\n        </ul>\n      </section>\n      <section class="actions">\n        <ul>\n          <li>\n            <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#settings">\n              <i class="fa fa-cog"></i> Settings\n            </a>\n          </li>\n          <li>\n            <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#share">\n              <i class="fa fa-share-alt"></i> Share\n            </a>\n          </li>\n          <li>\n            <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#share">\n              <i class="fa fa-star"></i> Preview\n            </a>\n          </li>\n        </ul>\n      </section>\n    </section>\n  </div>\n  <div class="subunit-container">\n    LOL?\n  </div>\n</div>\n';

}
return __p
};