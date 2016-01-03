(function() {
  var NotificationHelper;

  NotificationHelper = {
    notification_tiles: {
      init: function() {
        return this.container = $('#card_dock');
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
        this.container.append(el);
        return Waves.attach(el.find('.parent-unit'));
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
    NotificationHelper.notification_tiles.init();
    Waves.init();
    $.getJSON('/api/notifications/surveyresponsenotification', function(data) {
      var dat, i, len, ref, results;
      ref = data.data;
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
