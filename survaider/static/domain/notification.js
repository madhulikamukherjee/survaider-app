(function() {
  var NotificationHelper;

  NotificationHelper = {
    notification_tiles: {
      init: function() {
        this.container = $('#card_dock');
        return this.container.masonry({
          columnWidth: 1,
          itemSelector: "div[data-card=parent]",
          isFitWidth: true
        });
      },
      append: function(dat) {
        var attrs, el, template;
        template = Survaider.Templates['notification.survey.response.tile'];
        attrs = {
          expand: true ? 'expanded' : '',
          narrow: true ? '' : 'narrow'
        };
        el = $(template({
          dat: dat,
          attrs: attrs
        }));
        this.container.append(el).masonry('appended', el, true).masonry();
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
      }, 500)
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
    NotificationHelper.notification_tiles.init();
    Waves.init();
    $.getJSON('/api/notification/surveyresponsenotification', function(data) {
      var dat, i, len, ref, results;
      ref = data.data.reverse();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dat = ref[i];
        results.push(NotificationHelper.notification_tiles.append(dat));
      }
      return results;
    });
    return NotificationHelper.nav_menu();
  });

  window.NotificationHelper = NotificationHelper;

}).call(this);
