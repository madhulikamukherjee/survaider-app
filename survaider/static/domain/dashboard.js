(function() {
  var Dashboard, DashboardHelper, Survey,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DashboardHelper = {
    nav_menu: function() {
      var stretchyNavs;
      if ($('.cd-stretchy-nav').length > 0) {
        stretchyNavs = $('.cd-stretchy-nav');
        stretchyNavs.each(function() {
          var stretchyNav, stretchyNavTrigger;
          stretchyNav = $(this);
          stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');
          return stretchyNavTrigger.on('click', function(event) {
            event.preventDefault();
            return stretchyNav.toggleClass('nav-is-visible');
          });
        });
        return $(document).on('click', function(event) {
          return !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') && stretchyNavs.removeClass('nav-is-visible');
        });
      }
    }
  };

  Survey = (function() {
    function Survey() {
      this.add_unit = bind(this.add_unit, this);
      this.settings = bind(this.settings, this);
      this.surveys = [];
      this.surveys.settings = this.settings;
      this.surveys.add_unit = this.add_unit;
    }

    Survey.prototype.settings = function(e, tile) {
      var self;
      self = this;
      vex.dialog.buttons.YES.text = 'Done';
      return vex.dialog.open({
        className: 'vex-theme-top',
        message: Survaider.Templates['dashboard.survey.settings'](),
        showCloseButton: false,
        escapeButtonCloses: false,
        overlayClosesOnClick: false,
        afterOpen: (function(_this) {
          return function() {
            return rivets.bind($('#settings'), {
              survey: _this.surveys[tile.index]
            });
          };
        })(this),
        onSubmit: function() {
          var $vexContent;
          event.preventDefault();
          event.stopPropagation();
          $vexContent = $(this).parent();
          return console.log("final", self.surveys[tile.index]);
        }
      });
    };

    Survey.prototype.add_unit = function(e, tile) {
      var self;
      self = this;
      vex.dialog.buttons.YES.text = 'Done';
      return vex.dialog.open({
        className: 'vex-theme-top',
        showCloseButton: false,
        escapeButtonCloses: false,
        overlayClosesOnClick: false,
        message: Survaider.Templates['dashboard.survey.unit'](),
        afterOpen: (function(_this) {
          return function() {
            return rivets.bind($('#unit_modal'), {
              survey: _this.surveys[tile.index]
            });
          };
        })(this),
        onSubmit: function(event) {
          var $vexContent;
          event.preventDefault();
          event.stopPropagation();
          $vexContent = $(this).parent();
          return $.post("/api/survey/" + self.surveys[tile.index].id + "/unit_addition", $(".vex-dialog-form").serialize()).done(function(data) {
            var cpy;
            vex.close($vexContent.data().vex.id);
            if (self.surveys[tile.index].units.length === 0) {
              cpy = _.extend(JSON.parse(JSON.stringify(data.unit)), {
                meta: {
                  name: data.unit.meta.rootname
                },
                fake: true
              });
              self.surveys[tile.index].units.push(cpy);
              self.surveys[tile.index].units.push(data.unit);
              self.surveys[tile.index].contains_fake = true;
            } else {
              self.surveys[tile.index].units.push(data.unit);
            }
            return vex.dialog.alert({
              className: 'vex-theme-default',
              message: 'Created a new Unit.'
            });
          }).fail(function(data) {
            vex.close($vexContent.data().vex.id);
            return vex.dialog.alert({
              className: 'vex-theme-default',
              message: 'Server Error. Please try again.'
            });
          });
        }
      });
    };

    return Survey;

  })();

  Dashboard = (function() {
    function Dashboard() {
      this.container = $('#card_dock');
      this.container.html(Survaider.Templates['dashboard.dock']());
      this.dashboard = new Survey;
    }

    Dashboard.prototype.init = function() {
      this.init_formatters();
      this.rv_container = rivets.bind($('#surveys'), this.dashboard);
      this.fetch();
      return this.bind_events();
    };

    Dashboard.prototype.init_formatters = function() {
      rivets.formatters.edit_uri = function(v) {
        return "/survey/s:" + v + "/edit";
      };
      rivets.formatters.analytics_uri = function(v) {
        return "/survey/s:" + v + "/analysis";
      };
      rivets.formatters.analytics_parent_uri = function(v) {
        return "/survey/s:" + v + "/analysis?parent=true";
      };
      rivets.formatters.survey_uri = function(v) {
        return "/survey/s:" + v + "/simple";
      };
      rivets.formatters.expires = {
        read: function(v) {
          return moment(v).format('YYYY MM DD');
        },
        publish: function(v) {
          return moment(v).toISOString();
        }
      };
      rivets.formatters.check_expires = {
        read: function(v) {
          var ex_date;
          console.log(v, "check_expires");
          ex_date = moment(v);
          if (ex_date.isAfter('9000-01-01', 'year')) {
            return false;
          } else {
            return true;
          }
        },
        publish: function(v) {
          if (!v) {
            return "9999-12-31 23:59:59.999999";
          } else {
            return moment().endOf('month').add(1, 'months').toISOString();
          }
        }
      };
      rivets.formatters.expire_label = function(v) {
        return moment(v).isBefore(moment());
      };
      return rivets.formatters.check_response_cap = {
        read: function(v) {
          if (v === Math.pow(2, 32)) {
            return false;
          } else {
            return true;
          }
        },
        publish: function(v) {
          if (!v) {
            return Math.pow(2, 32);
          } else {
            return 2000;
          }
        }
      };
    };

    Dashboard.prototype.bind_events = function() {
      $("#build_survey").on('click', this.create_survey);
      return $("body").on('changeDate', function(v) {
        return console.log($('.date').change());
      });
    };

    Dashboard.prototype.process_data = function(dat) {
      var cpy, i, index, index_unit, len, p_c, ref, results, s;
      ref = dat.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        switch (s.meta.type) {
          case "Survey":
            index = _.findIndex(this.dashboard.surveys, function(d) {
              return (d != null ? d.id : void 0) === s.id;
            });
            if (index > -1) {
              this.dashboard.surveys[index] = _.extend(this.dashboard.surveys[index], s);
            } else {
              this.dashboard.surveys.push(_.extend({
                units: []
              }, s));
            }
            if (s.status.unit_count > 0) {
              index = _.findIndex(this.dashboard.surveys, function(d) {
                return (d != null ? d.id : void 0) === s.id;
              });
              this.dashboard.surveys[index].units.push(_.extend(s, {
                fake: true
              }));
              results.push(this.dashboard.surveys[index].contains_fake = true);
            } else {
              results.push(void 0);
            }
            break;
          case "Survey.SurveyUnit":
            index = _.findIndex(this.dashboard.surveys, function(d) {
              return (d != null ? d.id : void 0) === s.rootid;
            });
            if (index > -1) {
              index_unit = _.findIndex(this.dashboard.surveys[index].units, function(d) {
                return (d != null ? d.id : void 0) === s.id;
              });
              if (index_unit === -1) {
                this.dashboard.surveys[index].units.push(s);
              }
              p_c = _.reduce(this.dashboard.surveys[index].units, function(m, v) {
                return m + v.status.response_count;
              }, 0);
              results.push(this.dashboard.surveys[index].status.response_count_agg = p_c);
            } else {
              cpy = _.extend(JSON.parse(JSON.stringify(s)), {
                meta: {
                  name: s.meta.rootname
                }
              });
              cpy.units = [s];
              results.push(this.dashboard.surveys.push(cpy));
            }
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    Dashboard.prototype.fetch = function() {
      return $.getJSON('/api/survey').success((function(_this) {
        return function(data) {
          if (data.data.length === 0) {
            $('.alt-text').fadeIn();
          }
          return _this.process_data(data);
        };
      })(this));
    };

    Dashboard.prototype.create_survey = function() {
      vex.dialog.buttons.YES.text = 'Proceed';
      vex.dialog.buttons.NO.text = 'Cancel';
      return vex.dialog.open({
        className: 'vex-theme-top',
        message: Survaider.Templates['dashboard.build.dropdown'](),
        afterOpen: function() {
          return $("select[name='s_tags']").select2({
            tags: true,
            tokenSeparators: [',', ' ', ';']
          });
        },
        showCloseButton: true,
        escapeButtonCloses: false,
        overlayClosesOnClick: false,
        onSubmit: function(event) {
          var $vexContent;
          event.preventDefault();
          event.stopPropagation();
          $vexContent = $(this).parent();
          return $.post('/api/survey', $(".vex-dialog-form").serialize()).done(function(data) {
            vex.close($vexContent.data().vex.id);
            return vex.dialog.alert({
              className: 'vex-theme-default',
              message: 'Created. Proceed here',
              callback: function(value) {
                return window.location = data.uri_edit;
              }
            });
          }).fail(function(data) {
            vex.close($vexContent.data().vex.id);
            return vex.dialog.alert({
              className: 'vex-theme-default',
              message: 'Server Error. Please try again.'
            });
          });
        }
      });
    };

    return Dashboard;

  })();

  $(document).ready(function() {
    var dbd;
    dbd = new Dashboard;
    dbd.init();
    return DashboardHelper.nav_menu();
  });

  window.Dashboard = Dashboard;

  window.DashboardHelper = DashboardHelper;

}).call(this);
