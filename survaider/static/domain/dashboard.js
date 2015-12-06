(function() {
  var DashboardHelper;

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
        var attrs, cnt, el, subunit, template, units;
        units = dat.units.length > 0;
        template = Survaider.Templates['dashboard.tiles'];
        attrs = {
          expand: units ? 'expandeds' : '',
          narrow: units ? 'narrow' : 'narrow'
        };
        el = $(template({
          dat: dat,
          attrs: attrs
        }));
        this.container.append(el).masonry('appended', el, true);
        if (units) {
          subunit = this.units;
          cnt = this.container.find(el).find('.subunit-container');
          subunit.init(cnt, dat, _.bind(this.reload, this));
        }
        Waves.attach(el.find('.parent-unit'));
        el.on('click', function() {
          if (el.hasClass('narrow')) {
            return el.find('a.more').click();
          }
        });
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
        return el.find("a.less").on('click', (function(_this) {
          return function(e) {
            el.addClass('narrow');
            if (units) {
              el.removeClass('expanded');
            }
            e.stopPropagation();
            return _this.reload();
          };
        })(this));
      },
      reload: function(now) {
        var reset;
        reset = _.bind((function(_this) {
          return function() {
            return _this.container.masonry();
          };
        })(this), this);
        _.delay(reset, 500);
        _.delay(reset, 1500);
        if (now) {
          return _.delay(reset, 50);
        }
      },
      units: {
        init: function(parent_container, data, parent_reload) {
          var dat, el, i, len, ref, template;
          template = Survaider.Templates['dashboard.unit'];
          el = $(template({
            dat: data
          }));
          parent_container.append(el);
          console.log(parent_reload());
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
          this.container.append(el).masonry('appended', el, true);
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
        reload: function(now) {
          var reset;
          reset = _.bind((function(_this) {
            return function() {
              return _this.container.masonry();
            };
          })(this), this);
          return _.delay(reset, 600);
        }
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

  $(document).ready(function() {
    DashboardHelper.survey_tiles.init();
    Waves.init();
    $.getJSON('/api/survey', function(data) {
      var dat, i, len, ref, results;
      $('.spinner').hide();
      if (data.data.length === 0) {
        $('.alt-text').fadeIn();
      }
      ref = data.data.reverse();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dat = ref[i];
        results.push(DashboardHelper.survey_tiles.append(dat));
      }
      return results;
    });
    $('#survaider_form').submit(function(e) {
      e.preventDefault();
      return DashboardHelper.create_survey();
    });
    return DashboardHelper.nav_menu();
  });

  window.DashboardHelper = DashboardHelper;

}).call(this);
