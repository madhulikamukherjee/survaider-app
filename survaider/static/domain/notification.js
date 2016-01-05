(function() {
  var Notification, NotificationCollection, NotificationDock, NotificationHelper, NotificationView, SurveyResponseNotification, SurveyTicketNotification,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SurveyTicketNotification = (function(superClass) {
    extend(SurveyTicketNotification, superClass);

    function SurveyTicketNotification() {
      return SurveyTicketNotification.__super__.constructor.apply(this, arguments);
    }

    SurveyTicketNotification.prototype.defaults = {
      type: 'SurveyTicket'
    };

    return SurveyTicketNotification;

  })(Backbone.Model);

  SurveyResponseNotification = (function(superClass) {
    extend(SurveyResponseNotification, superClass);

    function SurveyResponseNotification() {
      return SurveyResponseNotification.__super__.constructor.apply(this, arguments);
    }

    SurveyResponseNotification.prototype.defaults = {
      type: 'SurveyResponseNotification'
    };

    SurveyResponseNotification.prototype.initialize = function() {
      return this.template = Survaider.Templates['notification.survey.response.tile'];
    };

    return SurveyResponseNotification;

  })(Backbone.Model);

  NotificationCollection = (function(superClass) {
    extend(NotificationCollection, superClass);

    function NotificationCollection() {
      return NotificationCollection.__super__.constructor.apply(this, arguments);
    }

    NotificationCollection.prototype.model = function(attr, options) {
      switch (attr.type) {
        case 'SurveyTicket':
          return new SurveyTicketNotification(attr, options);
        case 'SurveyResponseNotification':
          return new SurveyResponseNotification(attr, options);
      }
    };

    return NotificationCollection;

  })(Backbone.Collection);

  NotificationView = (function(superClass) {
    extend(NotificationView, superClass);

    function NotificationView() {
      return NotificationView.__super__.constructor.apply(this, arguments);
    }

    NotificationView.prototype.initialize = function(options) {
      return this.parentView = options.parentView, options;
    };

    NotificationView.prototype.render = function() {
      this.$el.html(this.model.template({
        dat: this.model.attributes
      }));
      return this;
    };

    return NotificationView;

  })(Backbone.View);

  NotificationDock = (function(superClass) {
    extend(NotificationDock, superClass);

    function NotificationDock() {
      return NotificationDock.__super__.constructor.apply(this, arguments);
    }

    NotificationDock.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.notif = options.notif, this.bootstrapData = options.bootstrapData;
      this.collection = new NotificationCollection;
      this.collection.reset(this.bootstrapData);
      this.setElement($(selector));
      this.render();
      return this.addAll();
    };

    NotificationDock.prototype.render = function() {
      return this.$el.html('');
    };

    NotificationDock.prototype.addOne = function(fieldDat, _, options) {
      var view;
      view = new NotificationView({
        model: fieldDat,
        parentView: this
      });
      return this.$el.append(view.render().el);
    };

    NotificationDock.prototype.addAll = function() {
      return this.collection.each(this.addOne, this);
    };

    return NotificationDock;

  })(Backbone.View);

  Notification = (function() {
    function Notification(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        notif: this
      });
      this.mainView = new NotificationDock(args);
    }

    return Notification;

  })();

  window.Notification = Notification;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Notification;
  } else {
    window.Notification = Notification;
  }

  NotificationHelper = {
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
          if (!$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span')) {
            return stretchyNavs.removeClass('nav-is-visible');
          }
        });
      }
    }
  };

  $(document).ready(function() {
    $.getJSON('/api/notifications/surveyresponsenotification', function(data) {
      var notif;
      return notif = new Notification({
        selector: '#card_dock',
        bootstrapData: data.data
      });
    });
    return NotificationHelper.nav_menu();
  });

  window.NotificationHelper = NotificationHelper;

}).call(this);
