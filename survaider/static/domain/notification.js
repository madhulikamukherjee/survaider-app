(function() {
  var Notification, NotificationCollection, NotificationDock, NotificationHelper, NotificationRouter, NotificationView, SurveyResponseNotification, SurveyTicketNotification,
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

    SurveyTicketNotification.prototype.initialize = function() {
      return this.template = Survaider.Templates['notification.survey.ticket.tile'];
    };

    SurveyTicketNotification.prototype.add_comment = function(e) {
      var msg;
      msg = $(e.target.parentElement).find("[data-input=add_comment]").val();
      if (msg.length < 2) {
        swal({
          type: 'error',
          title: 'Please Enter a valid comment.'
        });
      }
      return $.post("/api/surveyticket/" + (this.get('id')) + "/add_comment", {
        msg: msg
      }).done((function(_this) {
        return function(dat) {
          return _this.set({
            payload: dat.payload
          });
        };
      })(this)).fail(function() {
        return swal({
          type: 'error',
          title: 'Server error. Please try again.'
        });
      });
    };

    SurveyTicketNotification.prototype.mark_finished = function(e) {
      return $.post("/api/surveyticket/" + (this.get('id')) + "/resolve").done((function(_this) {
        return function(dat) {
          return _this.set({
            flagged: dat.flagged,
            collapse: !dat.flagged
          });
        };
      })(this)).fail(function() {
        return swal({
          type: 'error',
          title: 'Server error. Please try again.'
        });
      });
    };

    SurveyTicketNotification.prototype.expand = function(e) {
      return this.set({
        collapse: !this.get('collapse')
      });
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

    SurveyResponseNotification.prototype.mark_finished = function(e) {
      return $.post("/api/notification/" + (this.get('id')) + "/resolve").done((function(_this) {
        return function(dat) {
          return _this.set({
            flagged: dat.flagged,
            collapse: !dat.flagged
          });
        };
      })(this)).fail(function() {
        return swal({
          type: 'error',
          title: 'Server error. Please try again.'
        });
      });
    };

    SurveyResponseNotification.prototype.add_comment = function(e) {
      var msg;
      msg = $(e.target.parentElement).find("[data-input=add_comment]").val();
      if (msg.length < 2) {
        swal({
          type: 'error',
          title: 'Please Enter a valid comment.'
        });
      }
      return $.post("/api/notification/" + (this.get('id')) + "/add_comment", {
        msg: msg
      }).done((function(_this) {
        return function(dat) {
          return _this.set({
            payload: dat.payload
          });
        };
      })(this)).fail(function() {
        return swal({
          type: 'error',
          title: 'Server error. Please try again.'
        });
      });
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
          attr.collapse = !attr.flagged;
          return new SurveyTicketNotification(attr, options);
        case 'SurveyResponseNotification':
          attr.collapse = !attr.flagged;
          return new SurveyResponseNotification(attr, options);
      }
    };

    NotificationCollection.prototype.comparator = function(model) {
      return moment(model.get('acquired')).unix();
    };

    return NotificationCollection;

  })(Backbone.Collection);

  NotificationView = (function(superClass) {
    extend(NotificationView, superClass);

    function NotificationView() {
      return NotificationView.__super__.constructor.apply(this, arguments);
    }

    NotificationView.prototype.events = {
      'click [data-action]': 'notificationaction'
    };

    NotificationView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      return this.listenTo(this.model, 'change', this.render);
    };

    NotificationView.prototype.render = function() {
      this.$el.html(this.model.template({
        dat: this.model.toJSON()
      }));
      return this;
    };

    NotificationView.prototype.notificationaction = function(e) {
      var func;
      console.log(e);
      func = $(e.target).attr("data-action");
      console.log(func);
      return this.model[func](e);
    };

    return NotificationView;

  })(Backbone.View);

  NotificationDock = (function(superClass) {
    extend(NotificationDock, superClass);

    function NotificationDock() {
      return NotificationDock.__super__.constructor.apply(this, arguments);
    }

    NotificationDock.prototype.events = {
      'click [data-backbone-call=next]': 'load_notifications'
    };

    NotificationDock.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.notif = options.notif, this.bootstrapData = options.bootstrapData;
      this.collection = new NotificationCollection;
      this.collection.bind('add', this.addOne, this);
      this.setElement($(selector));
      this.render();
      this.load_old_disable = false;
      return this.load_notifications();
    };

    NotificationDock.prototype.template = Survaider.Templates['notification.dock'];

    NotificationDock.prototype.load_notifications = function() {
      var uri;
      uri = '/api/notifications';
      if (this.time_end != null) {
        uri += "/" + this.time_end;
      }
      if (this.load_old_disable === true) {
        return;
      }
      return $.getJSON(uri).done((function(_this) {
        return function(data) {
          _this.collection.add(data.data);
          _this.time_end = data.next;
          if (data.next === false) {
            return _this.load_old_disable = true;
          }
        };
      })(this)).fail((function(_this) {
        return function(data) {
          return console.log(data);
        };
      })(this));
    };

    NotificationDock.prototype.render = function() {
      this.$el.html(this.template());
      this.view_dock = this.$el.find('ul');
      return this;
    };

    NotificationDock.prototype.addOne = function(fieldDat, _, options) {
      var view;
      view = new NotificationView({
        model: fieldDat,
        parentView: this
      });
      return this.view_dock.append(view.render().el);
    };

    return NotificationDock;

  })(Backbone.View);

  NotificationRouter = (function(superClass) {
    extend(NotificationRouter, superClass);

    function NotificationRouter() {
      return NotificationRouter.__super__.constructor.apply(this, arguments);
    }

    NotificationRouter.prototype.routes = {
      '': 'init',
      ':time': 'timeappend'
    };

    NotificationRouter.prototype.init = function() {};

    NotificationRouter.prototype.timeappend = function(time) {};

    return NotificationRouter;

  })(Backbone.Router);

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
    var notif;
    notif = new Notification({
      selector: '#card_dock'
    });
    return NotificationHelper.nav_menu();
  });

  window.Notification = Notification;

  window.NotificationHelper = NotificationHelper;

}).call(this);
