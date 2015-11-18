(function() {
  var Builder, BuilderSettingsView, BuilderShareView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BuilderShareView = (function(superClass) {
    extend(BuilderShareView, superClass);

    function BuilderShareView() {
      return BuilderShareView.__super__.constructor.apply(this, arguments);
    }

    BuilderShareView.prototype.initialize = function(options) {
      return this.setElement($('#survey_export_modal'));
    };

    return BuilderShareView;

  })(Backbone.View);

  BuilderSettingsView = (function(superClass) {
    extend(BuilderSettingsView, superClass);

    function BuilderSettingsView() {
      return BuilderSettingsView.__super__.constructor.apply(this, arguments);
    }

    BuilderSettingsView.prototype.events = {
      'click .builder-save': 'update_sequence',
      'click #builder-delete': 'survey_delete',
      'input #builder-date': 'builder_date',
      'input #builder-limit': 'builder_limit',
      'click #builder-date-check': 'builder_date_toggle',
      'click #builder-limit-check': 'builder_limit_toggle',
      'change #builder-date': 'builder_date',
      'change #builder-name': 'builder_name',
      'click #builder-pause': 'builder_paused'
    };

    BuilderSettingsView.prototype.initialize = function(options) {
      this.setElement($('#survey_settings_modal'));
      this.s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
      this.el_date = $('#builder-date');
      this.el_limit = $('#builder-limit');
      this.save_btn = Ladda.create(document.querySelector('#builder-save'));
      this.builder_date_init();
      this.builder_limit_init();
      this.builder_paused_init();
      return $("#builder-project-title").html($('#builder-name').val());
    };

    BuilderSettingsView.prototype.builder_date_init = function() {
      var ex_date;
      ex_date = moment(this.el_date.val());
      if (ex_date.isAfter('9000-01-01', 'year')) {
        ex_date = moment().endOf("year");
        $('#builder-date-check').attr('checked', false);
        this.el_date.hide();
      } else {
        $('#builder-date-check').attr('checked', true);
        this.el_date.show();
      }
      return this.el_date.val(ex_date.format('YYYY MM DD'));
    };

    BuilderSettingsView.prototype.builder_date_toggle = _.debounce(function() {
      var ed;
      if ($('#builder-date-check').is(':checked')) {
        ed = moment().endOf("year");
        this.el_date.val(ed.format('YYYY MM DD'));
        this.update('expires', ed.toISOString());
        return this.el_date.show();
      } else {
        this.el_date.hide();
        return this.update('expires', moment('9999 01 01').toISOString());
      }
    }, 500);

    BuilderSettingsView.prototype.builder_date = _.debounce(function() {
      var date;
      date = moment(this.el_date.val());
      if (date.isValid()) {
        return this.update('expires', date.toISOString());
      }
    }, 500);

    BuilderSettingsView.prototype.builder_limit_init = function() {
      var ex_limit;
      ex_limit = parseInt(this.el_limit.val());
      if (ex_limit === Math.pow(2, 32)) {
        $('#builder-limit-check').attr('checked', false);
        this.el_limit.hide();
      } else {
        $('#builder-limit-check').attr('checked', true);
        this.el_limit.show();
      }
      return this.el_limit.val(ex_limit);
    };

    BuilderSettingsView.prototype.builder_limit_toggle = _.debounce(function() {
      if ($('#builder-limit-check').is(':checked')) {
        this.el_limit.val(1000);
        this.update('response_cap', 1000);
        return this.el_limit.show();
      } else {
        this.el_limit.hide();
        return this.update('response_cap', Math.pow(2, 32));
      }
    }, 500);

    BuilderSettingsView.prototype.builder_limit = _.debounce(function() {
      var limit;
      limit = parseInt(this.el_limit.val());
      if (limit) {
        return this.update('response_cap', limit);
      }
    }, 500);

    BuilderSettingsView.prototype.builder_name = _.debounce(function() {
      var date;
      date = $('#builder-name').val();
      $("#builder-project-title").html($('#builder-name').val());
      if (date) {
        return this.update('survey_name', date);
      }
    }, 500);

    BuilderSettingsView.prototype.builder_paused_init = function() {
      var d;
      d = $('#builder-pause').attr('data-paused');
      if (d === 'True') {
        return $('#builder-pause .target').html('Resume');
      } else {
        return $('#builder-pause .target').html('Pause');
      }
    };

    BuilderSettingsView.prototype.builder_paused = function() {
      var d;
      d = $('#builder-pause').attr('data-paused');
      if (d === 'True') {
        $('#builder-pause .target').html('Pause');
        $('#builder-pause').attr('data-paused', 'False');
        return this.update('paused', 'false');
      } else {
        $('#builder-pause .target').html('Resume');
        $('#builder-pause').attr('data-paused', 'True');
        return this.update('paused', 'true');
      }
    };

    BuilderSettingsView.prototype.survey_delete = function() {
      return swal({
        title: "Are you sure you want to delete this Survey?",
        text: "It's not possible to recover a deleted survey.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      }, (function(_this) {
        return function() {
          return $.ajax({
            url: "/api/survey/" + _this.s_id,
            method: 'DELETE'
          }).done(function() {
            return swal({
              title: "Succesfully Deleted",
              type: "success",
              confirmButtonText: 'Proceed',
              closeOnConfirm: false,
              showCancelButton: false
            }, function() {
              return window.location = '/';
            });
          }).fail(function() {
            return swal({
              title: "Sorry, something went wrong. Please try again, or contact Support.",
              type: "error"
            });
          });
        };
      })(this));
    };

    BuilderSettingsView.prototype.update_sequence = function() {
      var i, j, len, q, results, task, tasks;
      tasks = [
        {
          field: 'survey_name',
          value: $('#builder-name').val()
        }, {
          field: 'expires',
          value: moment(this.el_date.val()).toISOString()
        }, {
          field: 'response_cap',
          value: parseInt(this.el_limit.val())
        }
      ];
      q = $.Deferred().resolve();
      results = [];
      for (i = j = 0, len = tasks.length; j < len; i = ++j) {
        task = tasks[i];
        results.push(q = q.then(this.update(task.field, task.value, (i + 1) / tasks.length)));
      }
      return results;
    };

    BuilderSettingsView.prototype.update = function(field, value, promise) {
      if (!(promise || promise === 0)) {
        this.save_btn.start();
      }
      return $.ajax({
        url: "/api/survey/" + this.s_id + "/" + field,
        method: 'POST',
        data: {
          swag: value
        }
      }).done((function(_this) {
        return function() {
          if (promise && promise === 1) {
            _this.save_btn.stop();
          } else if (promise) {
            _this.save_btn.setProgress(promise);
          } else {
            _this.save_btn.stop();
          }
          $('#builder-updated').attr('data-livestamp', moment().toISOString());
          return true;
        };
      })(this)).fail((function(_this) {
        return function() {
          if (!promise) {
            _this.save_btn.stop();
            return swal({
              title: "Error while saving. Please check the input data.",
              type: "error"
            });
          } else {
            throw "Error while saving";
          }
        };
      })(this));
    };

    return BuilderSettingsView;

  })(Backbone.View);

  Builder = (function() {
    function Builder(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        builder: this
      });
      this.builderView = new BuilderSettingsView(args);
      this.shareView = new BuilderShareView(args);
    }

    return Builder;

  })();

  window.Builder = Builder;

  $(document).ready(function() {
    var im_list_uri, im_upload_uri, json_uri, payload_update_uri, s_id;
    s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
    json_uri = UriTemplate.expand('/api/survey/{s_id}/json?editing=true', {
      s_id: s_id
    });
    payload_update_uri = UriTemplate.expand('/api/survey/{s_id}/struct', {
      s_id: s_id
    });
    im_upload_uri = UriTemplate.expand('/api/survey/{s_id}/img_upload', {
      s_id: s_id
    });
    im_list_uri = UriTemplate.expand('/api/survey/{s_id}/repr', {
      s_id: s_id
    });
    return $.getJSON(json_uri, function(data) {
      var builder, fb;
      fb = new Formbuilder({
        selector: '.sb-main',
        bootstrapData: data.fields,
        screens: data.screens,
        endpoints: {
          img_upload: im_upload_uri,
          img_list: im_list_uri
        }
      });
      fb.on('save', function(payload) {
        return $.post(payload_update_uri, {
          swag: payload
        }, function(data) {});
      });
      builder = new Builder();
      if (window.location.hash === '#share') {
        return $('#survey_export_modal').modal('show');
      } else if (window.location.hash === '#settings') {
        return $('#survey_settings_modal').modal('show');
      }
    });
  });

}).call(this);
