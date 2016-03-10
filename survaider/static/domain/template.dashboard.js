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
__p += '<section role="survey-list" id="surveys">\n\n  <div data-card="parent" role="survey" rv-each-survey="surveys">\n    <h1 class="hr" role="card-title">\n      <span rv-text="survey.meta.name"></span>\n    </h1>\n\n    <section role="row">\n      <section role="parent-card" rv-show="survey.access.owner">\n        <div role="card">\n          <ul role="info">\n            <li role="survey-name" rv-text="survey.meta.name"></li>\n            <li role="date" rv-data-livestamp="survey.info.added"></li>\n          </ul>\n          <ul role="analytics">\n            <li role="response-count"\n                rv-hide="survey.status.unit_count"\n                rv-text="survey.status.response_count"></li>\n\n            <li role="response-count"\n                rv-show="survey.status.unit_count"\n                rv-text="survey.status.response_count_agg"></li>\n\n            <li role="status">\n              <span class="tag" rv-show="survey.status.active">Active</span>\n              <span class="tag" rv-show="survey.info.expires | expire_label">Expired</span>\n              <span class="tag" rv-show="survey.status.paused">Paused</span>\n            </li>\n          </ul>\n          <ul role="buttons">\n            <li><a rv-href="survey.id | edit_uri">Edit</a></li>\n            <li><a rv-href="survey.id | survey_uri" rv-hide="survey.status.unit_count">Preview</a></li>\n\n            <li><a rv-href="survey.id | analytics_uri"\n                   rv-hide="survey.status.unit_count">Analytics</a>\n            </li>\n            <li><a rv-href="survey.id | analytics_parent_uri"\n                   rv-show="survey.status.unit_count">Aggregate Analytics</a>\n            </li>\n\n            <li><a href="javascript:void(0);" rv-on-click="surveys.add_unit">Add Unit</a></li>\n            <li><a href="javascript:void(0);" rv-on-click="surveys.settings">Settings</a></li>\n          </ul>\n        </div>\n      </section>\n      <section role="unit-dock">\n        <div role="card" rv-each-unit="survey.units">\n          <ul role="info">\n            <li role="survey-name" rv-text="unit.meta.name"></li>\n            <!-- <li role="date" rv-data-livestamp="unit.info.added"></li> -->\n            <li rv-show="unit.fake">(Parent Survey)</li>\n          </ul>\n          <ul role="analytics">\n            <li role="response-count" rv-text="unit.status.response_count"></li>\n            <li role="status">\n              <span class="tag" rv-show="unit.status.active">Active</span>\n              <span class="tag" rv-show="unit.status.expired">Expired</span>\n              <span class="tag" rv-show="unit.status.paused">Paused</span>\n            </li>\n          </ul>\n          <ul role="buttons">\n            <li><a rv-href="unit.id | survey_uri">Preview</a></li>\n            <li><a rv-href="unit.id | analytics_uri">Analytics</a></li>\n            <li><a href="javascript:void(0);" rv-on-click="unit.settings">Settings</a></li>\n          </ul>\n        </div>\n      </section>\n    </section>\n  </div>\n</section>\n\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.onboarding.dock"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div role="dock">\n  <section role="intro">\n    <h1>Setup your Dashboard</h1>\n    <p>Get started with measuring customer satisfaction. Step one, add the key aspects important to your business.</p>\n  </section>\n  <section role="wizard">\n    <div role="tabs">\n      <ul>\n        <li role="header">Setup primary surver</li>\n        <li data-slide-title="key-aspect">Add key aspects</li>\n        <li data-slide-title="business-units">Add Business Units</li>\n        <li role="header">Configure Accounts</li>\n        <li data-slide-title="facebook">Facebook</li>\n        <li data-slide-title="twitter">Twitter</li>\n        <li data-slide-title="websites">Review websites</li>\n      </ul>\n    </div>\n    <div role="interaction">\n      <div role="input" data-slides>\n        <div data-slide="key-aspect">\n          <p>It is important for an enterprise to be able to accurately measure the aspects of their business that are worthy of quantifying customer satisfaction.</p>\n          <p>And Survaider helps in doing just that!</p>\n          <hr>\n          <p><em>Add the key aspects that you’d like to measure. Don’t bother about the “how” part, we take care of that!</em></p>\n\n          <select multiple="multiple" required name="s_tags" data-onboarding-input style="width: 100%">\n            <option value="Room Service">Room Service</option>\n            <option value="WiFi">WiFi</option>\n          </select>\n\n          <p><small>For e.g, a hotel business could list “Cleanliness”, “Room Service”, and “Hospitality” as their key aspects.</small></p>\n        </div>\n        <div data-slide="business-units">\n          <p>Build a robust analytics platform with insights pouring in from every physical touch-point where your customers interact with your business.</p>\n          <hr>\n          <p><em>Add your business units, and emails of those who will be handling the unit dashboards. You can always come back and edit these later.</em></p>\n\n          <ul role="unit-input">\n            <li class="header">\n              <span>Unit Name</span>\n              <span>Unit Owner\'s Email</span>\n            </li>\n            <li role="template">\n              <input type="text" placeholder="eg. Hauz Khas"></input>\n              <input type="email" placeholder="foo@bar"></input>\n              <a href="#" class="button" role="deleteorb">&times;</a>\n            </li>\n          </ul>\n          <a href="#" class="button" role="add">Add unit</a>\n\n          <p><small>For e.g, an automobile company may list their dealerships with names “Lajpat Ngaar New Delhi”, and “Manhattan New York”</small></p>\n        </div>\n        <div data-slide="facebook">\n          <p>Your customers are talking about you on social media. Harness those opinions made and conversations had.  And not only that, find out about issues and topics being talked about at each of your units.</p>\n          <hr>\n          <p><em>If you have Facebook pages for all your units separately, the unit managers will link them up, after which you will be able to view the insights.</em></p>\n          <p><em>If you have ONE Facebook page for your entire business, you can link it here.</em></p>\n        </div>\n        <div data-slide="twitter">\n          <p>Your customers are tweeting inecessantly about their experience with your business. Find the temperature of these discussions and see if they are in your favour!</p>\n          <hr>\n          <p><em>If you have Twitter pages for all your units separately, the unit managers will link them up, after which you will be able to view the insights.</em></p>\n          <p><em>If you have ONE Twitter page for your entire business, you can link it here.</em></p>\n        </div>\n        <div data-slide="websites">\n          <p>Delve into insights on your reviews from various other sources.</p>\n          <p><em>In our version 1, you can integrate with </em></p>\n        </div>\n      </div>\n      <div role="nav">\n        <a href="javascript:void(0)" class="button" role="prev">Previous</a>\n        <a href="javascript:void(0)" class="button" role="next">Next</a>\n        <a href="javascript:void(0)" class="button" role="skip">Skip</a>\n      </div>\n    </div>\n  </section>\n</div>\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.survey.settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="settings">\n  <section role="title">\n    <h5>Modify your <strong>Survaider</strong></h5>\n  </section>\n  <section role="body">\n    <div>\n      <div>\n        <label>Name\n          <input type="text" rv-value="survey.meta.name">\n        </label>\n      </div>\n      <div>\n        <div>\n          <div>\n            <label>\n              <input type="checkbox" rv-checked="survey.info.expires | check_expires">\n              Set an Expiry Date</label>\n            <input type="text"\n              class="date"\n              rv-show="survey.info.expires | check_expires"\n              rv-value="survey.info.expires | expires"\n              data-provide="datepicker"\n              data-date-format="yyyy mm dd">\n          </div>\n        </div>\n        <div>\n          <div>\n            <label>\n              <input type="checkbox" rv-checked="survey.status.response_cap | check_response_cap">\n              Set Response Limit\n            </label>\n            <input type="number"\n              rv-show="survey.status.response_cap | check_response_cap"\n              rv-value="survey.status.response_cap">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div>\n      <div>\n        <div>\n          <div class="pull-left">\n            <label>\n              <input type="checkbox" rv-checked="survey.status.paused">\n              <span class="label" rv-hide="survey.status.paused">\n                <i class="fa fa-pause"></i>\n                <span>Pause</span>\n              </span>\n              <span class="label" rv-show="survey.status.paused">\n                <i class="fa fa-play"></i>\n                <span>Unpause</span>\n              </span>\n            </label>\n\n<!--             <a href="#">\n              <span class="label">\n                <i class="fa fa-trash"></i>\n                <span>Delete</span>\n              </span>\n            </a> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n</div>\n';

}
return __p
};

this["Survaider"]["Templates"]["dashboard.survey.unit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="unit_modal">\n  <section>\n    <h1>Add a new Survey Unit</h1>\n    <p>\n      Survey Units lets you have granular control over analytics and access across your various outlets.</p>\n    <p class="small">Your current survey will turn into a survey group.</p>\n  </section>\n  <section>\n    <p>\n      <span class=\'orb\'>*</span>\n      <label>Give this Unit a Name.</label>\n      <input type="text" name="swag" required placeholder="Unit Name">\n    </p>\n  </section>\n</div>\n';

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