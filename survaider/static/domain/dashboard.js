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
        this.container.masonry({
          columnWidth: 1,
          itemSelector: "div[data-card=parent]",
          isFitWidth: true
        });
        return this.count = 0;
      },
      append: function(dat) {
        var attrs, cnt, el, subunit, template, units;
        this.count += 1;
        template = Survaider.Templates['dashboard.tiles'];
        attrs = {
          narrow: dat.has_response_cap === Math.pow(2, 32) ? '' : '',
          expand: this.count === 1 && this.narrow === '' ? 'expanded' : 'expanded'
        };
        el = $(template({
          dat: dat,
          attrs: attrs
        }));
        this.container.append(el).masonry('appended', el, true);
        units = dat.units.length !== 0;
        if (units) {
          subunit = this.units;
          cnt = this.container.find(el).find('.subunit-container');
          subunit.init(cnt, dat.units);
        }
        Waves.attach(el.find('.parent-unit'));
        el.on('click', function() {
          if (el.hasClass('narrow')) {
            return el.find('a.more').click();
          }
        });
        el.find("a.more").on('click', (function(_this) {
          return function() {
            el.removeClass('narrow');
            if (units) {
              el.addClass('expanded');
              subunit.reload();
            }
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
        _.delay(reset, 700);
        if (now) {
          return _.delay(reset, 50);
        }
      },
      units: {
        init: function(parent_container, data) {
          var dat, el, i, len, ref, results, template;
          template = Survaider.Templates['dashboard.unit'];
          el = $(template({
            dat: data
          }));
          parent_container.append(el);
          this.parent_container = parent_container;
          this.container = parent_container.find('.subunitdock');
          this.container.masonry({
            columnWidth: 1,
            itemSelector: "div[data-card=unit]",
            isFitWidth: true
          });
          ref = data.reverse();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            dat = ref[i];
            results.push(this.append(dat));
          }
          return results;
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
            width: '100%',
            height: '50px',
            chartRangeMin: 0,
            drawNormalOnTop: false,
            disableInteraction: true
          });
        },
        reload: function(now) {
          var reset;
          reset = _.bind((function(_this) {
            return function() {
              return _this.container.masonry();
            };
          })(this), this);
          _.delay(reset, 700);
          if (now) {
            return _.delay(reset, 50);
          }
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
