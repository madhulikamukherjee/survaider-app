(function() {
  var NotificationHelper;

  NotificationHelper = {
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
        return Waves.attach(el.find('.parent-unit'));
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

  $(document).ready(function() {
    NotificationHelper.survey_tiles.init();
    Waves.init();
    $.getJSON('/api/notification', function(data) {});
    return NotificationHelper.nav_menu();
  });

  window.NotificationHelper = NotificationHelper;

}).call(this);
