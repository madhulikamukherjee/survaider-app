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
      this.settings = bind(this.settings, this);
      this.surveys = [];
      this.surveys.settings = this.settings;
    }

    Survey.prototype.settings = function(e, tile) {
      vex.dialog.open({
        message: 'Edit your Survaider',
        className: 'vex-theme-default',
        input: Survaider.Templates['dashboard.survey.settings']()
      });
      return console.log(e, f, this.surveys);
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
      this.rv_container = rivets.bind($('#surveys'), this.dashboard);
      this.fetch();
      return this.bind_events();
    };

    Dashboard.prototype.bind_events = function() {
      return $("#build_survey").on('click', this.create_survey);
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
