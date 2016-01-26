this["Survaider"] = this["Survaider"] || {};
this["Survaider"]["Templates"] = this["Survaider"]["Templates"] || {};

this["Survaider"]["Templates"]["dashboard.build.dropdown"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n  <section>\n    <h1>Lets get started with measuring customer satisfaction!</h1>\n    <p>\n      <span class=\'orb\'>1</span>\n      Identify the key parameters that will affect your customer satisfaction, and add them here so that your visitors can rate you on it.</p>\n    <p class="small">For example, Hotel ABC may identify four parameters like "Room Service", "Checkout process", "Cleanliness", "WiFi".</p>\n  </section>\n  <section>\n    <select multiple="multiple" required name="s_tags" style="width: 100%">\n      <option value="Room Service">Room Service</option>\n      <option value="WiFi">WiFi</option>\n    </select>\n    <br>\n    <br>\n    <p>\n      <span class=\'orb\'>2</span>\n      <label>Give your Survey a memorable Name</label>\n      <input type="text" name="s_name" required placeholder="Survey Name">\n    </p>\n  </section>\n</div>\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.dock"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section role="survey-list" id="surveys">\n\n  <div data-card="parent" role="survey" rv-each-survey="surveys">\n    <h1 class="hr" role="card-title">\n      <span rv-text="survey.meta.name"></span>\n    </h1>\n\n    <section role="row">\n      <section role="parent-card" rv-show="survey.access.owner">\n        <div role="card">\n          <ul role="info">\n            <li role="survey-name" rv-text="survey.meta.name"></li>\n            <li role="date" rv-data-livestamp="survey.info.added"></li>\n          </ul>\n          <ul role="analytics">\n            <li role="response-count"\n                rv-hide="survey.status.unit_count"\n                rv-text="survey.status.response_count"></li>\n\n            <li role="response-count"\n                rv-show="survey.status.unit_count"\n                rv-text="survey.status.response_count_agg"></li>\n\n            <li role="status">\n              <span class="tag" rv-show="survey.status.active">Active</span>\n              <span class="tag" rv-show="survey.status.expired">Expired</span>\n              <span class="tag" rv-show="survey.status.paused">Paused</span>\n            </li>\n          </ul>\n          <ul role="buttons">\n            <li><a rv-href="survey.id | survey_uri">Preview</a></li>\n            <li><a rv-href="survey.id | analytics_uri">Analytics</a></li>\n            <li><a href="javascript:void(0);" rv-on-click="surveys.settings">Settings</a></li>\n          </ul>\n        </div>\n      </section>\n      <section role="unit-dock">\n        <div role="card" rv-each-unit="survey.units">\n          <ul role="info">\n            <li role="survey-name" rv-text="unit.meta.name"></li>\n            <!-- <li role="date" rv-data-livestamp="unit.info.added"></li> -->\n            <li rv-show="unit.fake">(Parent Survey)</li>\n          </ul>\n          <ul role="analytics">\n            <li role="response-count" rv-text="unit.status.response_count"></li>\n            <li role="status">\n              <span class="tag" rv-show="unit.status.active">Active</span>\n              <span class="tag" rv-show="unit.status.expired">Expired</span>\n              <span class="tag" rv-show="unit.status.paused">Paused</span>\n            </li>\n          </ul>\n          <ul role="buttons">\n            <li><a rv-href="unit.id | survey_uri">Preview</a></li>\n            <li><a rv-href="unit.id | analytics_uri">Analytics</a></li>\n            <li><a href="javascript:void(0);" rv-on-click="unit.settings">Settings</a></li>\n          </ul>\n        </div>\n      </section>\n    </section>\n  </div>\n</section>\n\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.survey.settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="settings">\n  <section role="title">\n    <h5>Modify your <strong>Survaider</strong></h5>\n  </section>\n  <section role="body">\n    <div>\n      <div>\n        <label rv-text="survey.id">Name</label>\n        <input type="text" rv-value="survey.meta.name">\n      </div>\n      <div>\n        <div>\n          <div>\n            <input type="checkbox" rv-checked="survey.info.expires | check_expires">\n            <label>Set an Expiry Date</label>\n            <input type="text"\n              class="date"\n              rv-show="survey.info.expires | check_expires"\n              rv-value="survey.info.expires | expires"\n              data-provide="datepicker"\n              data-date-format="yyyy mm dd">\n          </div>\n        </div>\n        <div>\n          <div>\n            <input type="checkbox">\n            <label>Set Response Limit</label>\n            <input type="number">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div>\n      <div>\n        <div>\n          <div class="pull-left">\n            <a href="#">\n              <span class="label">\n                <i class="fa fa-pause"></i>\n                <i class="fa fa-play"></i>\n                <span>Pause</span>\n              </span>\n            </a>\n            <a href="#">\n              <span class="label">\n                <i class="fa fa-trash"></i>\n                <span>Delete</span>\n              </span>\n            </a>\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 m-t-10 sm-m-t-10 text-right">\n        <a href="#" class="ladda-button" data-style="expand-left">\n          <span class="ladda-label">Save</span>\n        </a>\n        <br>\n        <p>\n          Saved\n          <span data-livestamp=""></span>\n        </p>\n      </div>\n    </div>\n  </section>\n</div>\n';

}
return __p
};

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