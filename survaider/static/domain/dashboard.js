(function() {
  var Dashboard, DashboardHelper, Survey,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DashboardHelper = {
    create_survey: function() {
      'use strict';
      var dat;
      dat = $('#survaider_form').serialize();
      $('#exec_create_survaider').attr('disabled', true).text('Processing');
      return $.ajax({
        type: 'POST',
        url: '/api/survey',
        data: dat
      }).done(function(data) {
        return swal({
          title: 'Built!',
          text: 'Proceed to adding the stuff.',
          type: 'success',
          confirmButtonText: 'Edit Structure',
          closeOnConfirm: true
        }, function() {
          return window.location = data.uri_edit;
        });
      }).fail(function(data) {
        return swal({
          title: 'Error',
          type: 'error'
        });
      });
    },
    survey_tiles: {
      init: function() {
        this.container = $('#card_dock');
        return this.container.masonry({
          columnWidth: 1,
          itemSelector: "div[data-card=parent]",
          isFitWidth: true
        });
      },
      append: function(dat) {
        var attrs, el, subroutine, template, units;
        units = dat.units.length > 0;
        template = Survaider.Templates['dashboard.tiles'];
        attrs = {
          expand: units ? 'expanded' : '',
          narrow: units ? '' : 'narrow'
        };
        el = $(template({
          dat: dat,
          attrs: attrs
        }));
        this.container.append(el).masonry('appended', el, true).masonry();
        subroutine = (function(_this) {
          return function(dat) {
            var cnt, subunit;
            subunit = _this.units;
            cnt = _this.container.find(el).find('.subunit-container');
            return subunit.init(cnt, dat, _.bind(_this.reload, _this));
          };
        })(this);
        if (units) {
          subroutine(dat);
        }
        Waves.attach(el.find('.parent-unit'));
        el.on('click', function() {
          if (el.hasClass('narrow')) {
            return el.find('a.more').click();
          }
        });
        el.find("a.more").on('click', (function(_this) {
          return function() {
            return el.removeClass('narrow');
          };
        })(this));
        el.find("a.more").on('click', (function(_this) {
          return function() {
            var fn;
            el.removeClass('narrow');
            if (units) {
              el.addClass('expanded');
            }
            fn = _.bind(function() {
              if (units) {
                subunit.reload();
                return this.reload();
              }
            }, _this);
            _.delay(fn, 1000);
            return _this.reload();
          };
        })(this));
        el.find("a.share-btn").on('click', (function(_this) {
          return function(e) {
            return vex.dialog.confirm({
              message: 'Are you absolutely sure you want to destroy the alien planet?',
              className: 'vex-theme-default',
              callback: function(value) {
                return console.log(value ? 'Successfully destroyed the planet.' : 'Chicken.');
              }
            });
          };
        })(this));
        el.find("a.less").on('click', (function(_this) {
          return function(e) {
            el.addClass('narrow');
            if (units) {
              el.removeClass('expanded');
            }
            e.stopPropagation();
            return _this.reload();
          };
        })(this));
        return el.find("a.survey-unit-btn").on('click', (function(_this) {
          return function() {
            return _this.units.add(dat, function(data) {
              dat.units.push(data.unit);
              el.addClass('expanded');
              subroutine(dat);
              el.find("a.survey-unit-btn").hide();
              return _this.reload();
            });
          };
        })(this));
      },
      reload: _.debounce(function(now) {
        var reset;
        reset = _.bind((function(_this) {
          return function() {
            return _this.container.masonry();
          };
        })(this), this);
        _.delay(reset, 500);
        _.delay(reset, 1500);
        _.delay(reset, 2500);
        if (now) {
          return _.delay(reset, 50);
        }
      }, 500),
      units: {
        init: function(parent_container, data, parent_reload) {
          var dat, el, i, len, ref, template;
          template = Survaider.Templates['dashboard.unit'];
          el = $(template({
            dat: data
          }));
          parent_container.append(el);
          parent_reload();
          this.parent_container = parent_container;
          this.container = parent_container.find('.subunitdock');
          this.container.masonry({
            columnWidth: 1,
            itemSelector: "div[data-card=unit]",
            isFitWidth: true
          });
          ref = data.units.reverse();
          for (i = 0, len = ref.length; i < len; i++) {
            dat = ref[i];
            this.append(dat);
          }
          return parent_container.find('.btn-subunit').on('click', (function(_this) {
            return function() {
              return _this.add(data, function(dat) {
                _this.append(dat.unit);
                return parent_reload();
              });
            };
          })(this));
        },
        append: function(dat) {
          var el, template;
          template = Survaider.Templates['dashboard.unit.tiles'];
          el = $(template({
            dat: dat
          }));
          this.container.append(el).masonry('appended', el, true).masonry();
          return el.find(".sparkline").sparkline(_.shuffle([15, 16, 17, 19, 19, 15, 13, 12, 12, 14, 16, 17, 19, 30, 13, 35, 40, 30, 35, 35, 35, 22]), {
            type: 'line',
            lineColor: '#333333',
            fillColor: '#00bfbf',
            spotColor: '#7f007f',
            width: '200px',
            height: '50px',
            chartRangeMin: 0,
            drawNormalOnTop: false,
            disableInteraction: true
          });
        },
        add: function(binding, callback) {
          return swal({
            title: "Create a Survey Unit",
            text: "Please provide Survey Unit name for '" + binding.name + "'.",
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            inputPlaceholder: 'Unit Name'
          }, function(inputValue) {
            if (inputValue === false) {
              return false;
            }
            if (inputValue === '') {
              swal.showInputError('You need to write something!');
              return false;
            }
            return $.ajax({
              url: "/api/survey/" + binding.id + "/unit_addition",
              data: {
                swag: inputValue
              },
              method: 'POST'
            }).done(function(dat) {
              return swal({
                title: "Unit Created!",
                type: "success",
                confirmButtonText: 'Done',
                closeOnConfirm: true,
                showCancelButton: false
              }, function() {
                return callback(dat);
              });
            }).fail(function() {
              return swal({
                title: "Sorry, something went wrong. Please try again, or contact Support.",
                type: "error"
              });
            });
          });
        },
        reload: _.debounce(function(now) {
          var reset;
          reset = _.bind((function(_this) {
            return function() {
              return _this.container.masonry();
            };
          })(this), this);
          _.delay(reset, 600);
          _.delay(reset, 1000);
          _.delay(reset, 2000);
          return _.delay(reset, 3000);
        }, 100)
      }
    },
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
      return this.fetch();
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
      $.getJSON('/api/survey').success((function(_this) {
        return function(data) {
          if (data.data.length === 0) {
            $('.alt-text').fadeIn();
          }
          return _this.process_data(data);
        };
      })(this));
      return console.log(this.dashboard.surveys);
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
