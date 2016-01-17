this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["dashboard.tiles"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div data-card="parent" role="survey">\n  <h1 class="hr" role="card-title"><span>' +
((__t = ( dat.name )) == null ? '' : __t) +
'</span></h1>\n\n  <section role="row">\n    <section role="parent-card">\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n    </section>\n    <section role="unit-dock">\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n\n      <div role="card">\n        <ul role="info">\n          <li role="survey-name">Name</li>\n          <li role="date">Name</li>\n        </ul>\n        <ul role="analytics">\n          <li role="response-count">200</li>\n          <li role="status"><span class="tag">Active</span></li>\n        </ul>\n        <ul role="buttons">\n          <li><a href="#">Preview</a></li>\n          <li><a href="#">Analytics</a></li>\n          <li><a href="#">Settings</a></li>\n        </ul>\n      </div>\n    </section>\n  </section>\n\n<!--   <div class="parent-unit">\n    <section class="frontmatter">\n      <h1>' +
((__t = ( dat.name )) == null ? '' : __t) +
'</h1>\n\n      <small>\n        <span class="status-expanded">\n          Created\n          <strong>\n            <span data-livestamp="' +
((__t = ( dat.created_on )) == null ? '' : __t) +
'">(Loading)</span>\n          </strong>\n        </span>\n        <ul class="status-narrow">\n          <li><i class="fa fa-circle-o idle"></i>Active</li>\n          <li><i class="fa fa-rss alert"></i>10 critical alerts</li>\n        </ul>\n      </small>\n\n      <ul class="statistics clear">\n        <li>\n          <h1>Responses</h1>\n          <h2>\n            ' +
((__t = ( numeral(dat.has_obtained_responses).format('0[.]00a') )) == null ? '' : __t) +
'\n          </h2>\n        </li>\n        <li>\n          ';
 if (dat.has_response_cap !== Math.pow(2,32)) { ;
__p += '\n          <h1>Goal</h1>\n          <h2>' +
((__t = ( numeral(dat.has_response_cap).format('0[.]00a') )) == null ? '' : __t) +
'</h2>\n          ';
 } ;
__p += '\n        </li>\n      </ul>\n      <a href="javascript:void(0)" class="more">\n        <i class="fa fa-arrow-circle-down"></i>More\n      </a>\n    </section>\n    <section class="status">\n      <h1>\n        Status\n        <a href="javascript:void(0)" class="less">\n          <i class="fa fa-arrow-circle-up"></i>Show Less\n        </a>\n      </h1>\n\n      <ul>\n        <li><i class="fa fa-circle-o idle"></i>Active</li>\n        <li>\n          <i class="fa fa-clock-o primary"></i>\n          Modified\n          <strong>\n          <span data-livestamp="' +
((__t = ( dat.last_modified )) == null ? '' : __t) +
'">(Loading)</span>\n          </strong>\n        </li>\n        <li><i class="fa fa-rss alert"></i>10 critical alerts</li>\n        ';
 if (dat.units.length == 0) { ;
__p += '\n        <li><a href="javascript:void(0)" class="survey-unit-btn">Add Survey Unit</a></li>\n        ';
 } ;
__p += '\n      </ul>\n    </section>\n    <section class="footer">\n      <section class="destinations">\n        <ul class="clear">\n          <a href="' +
((__t = ( dat.uri_responses )) == null ? '' : __t) +
'">\n            <li><i class="fa fa-area-chart"></i> Analytics</li>\n          </a>\n          <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'">\n            <li><i class="fa fa-edit"></i> Edit</li>\n          </a>\n        </ul>\n      </section>\n      <section class="actions">\n        <ul class="clear">\n          <li>\n            <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#settings">\n              <i class="fa fa-cog"></i> Settings\n            </a>\n          </li>\n          <li>\n            <a href="javascript:void(0)" class="share-btn">\n              <i class="fa fa-share-alt"></i> Share\n            </a>\n          </li>\n          <li>\n            <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#share">\n              <i class="fa fa-star"></i> Preview\n            </a>\n          </li>\n        </ul>\n      </section>\n    </section>\n  </div>\n  <div class="subunit-container">\n  </div> -->\n</div>\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.unit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 class="hr"><span>Units</span></h1>\n<button class="btn-subunit">Add</button>\n<div class="subunitdock">\n\n</div>\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.unit.tiles"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="card unit" data-card="unit">\n  <section class="matter">\n    <h2>' +
((__t = ( dat.unit_name )) == null ? '' : __t) +
'</h2>\n    <ul class="statistics clear">\n      <li>\n        <h1>Responses</h1>\n        <h2>' +
((__t = ( numeral(dat.has_obtained_responses).format('0[.]00a') )) == null ? '' : __t) +
'</h2>\n      </li>\n      <li>\n        <h1>QSR</h1>\n        <h2>' +
((__t = ( numeral(10).format('0[.]00a') )) == null ? '' : __t) +
'</h2>\n      </li>\n    </ul>\n  </section>\n  <section>\n    <div class="sparkline"></div>\n  </section>\n  <section class="foot">\n    <ul class="clear">\n      <li>\n        <a href="' +
((__t = ( dat.uri_edit )) == null ? '' : __t) +
'#share">\n          <i class="fa fa-cog"></i> Share\n        </a>\n      </li>\n      <li>\n        <a href="' +
((__t = ( dat.uri_responses )) == null ? '' : __t) +
'">\n          <i class="fa fa-area-chart"></i> Analytics\n        </a>\n      </li>\n    </ul>\n  </section>\n</div>\n';

}
return __p
};