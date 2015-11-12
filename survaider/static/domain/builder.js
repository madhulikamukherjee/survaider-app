(function() {
  var Builder, BuilderView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BuilderView = (function(superClass) {
    extend(BuilderView, superClass);

    function BuilderView() {
      return BuilderView.__super__.constructor.apply(this, arguments);
    }

    BuilderView.prototype.events = {
      'click  .builder-save': 'update',
      'change #builder-date': 'builder_date',
      'change #builder-name': 'builder_name',
      'click #builder-pause': 'builder_paused'
    };

    BuilderView.prototype.initialize = function(options) {
      var ol_date;
      this.setElement($('#survey_settings_modal'));
      this.s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
      this.el_date = $('#builder-date');
      ol_date = moment(this.el_date.val()).format('DD/MM/YYYY');
      this.el_date.val(ol_date);
      this.save_btn = Ladda.create(document.querySelector('#builder-save'));
      this.builder_paused_init();
      return $("#builder-project-title").html($('#builder-name').val());
    };

    BuilderView.prototype.builder_date = _.debounce(function() {
      var date;
      date = moment(this.el_date.val()).toISOString();
      if (date) {
        return this.update('expires', date);
      }
    }, 500);

    BuilderView.prototype.builder_name = _.debounce(function() {
      var date;
      date = $('#builder-name').val();
      $("#builder-project-title").html($('#builder-name').val());
      if (date) {
        return this.update('survey_name', date);
      }
    }, 500);

    BuilderView.prototype.builder_paused_init = function() {
      var d;
      d = $('#builder-pause').attr('data-paused');
      if (d === 'True') {
        return $('#builder-pause .target').html('Resume');
      } else {
        return $('#builder-pause .target').html('Pause');
      }
    };

    BuilderView.prototype.builder_paused = function() {
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

    BuilderView.prototype.update = function(field, value) {
      this.save_btn.start();
      return $.ajax({
        url: "/api/survey/" + this.s_id + "/" + field,
        method: 'POST',
        data: {
          swag: value
        }
      }).done((function(_this) {
        return function() {
          _this.save_btn.stop();
          return $('#builder-updated').attr('data-livestamp', moment().toISOString());
        };
      })(this)).fail((function(_this) {
        return function() {
          _this.save_btn.stop();
          return swal({
            title: "Invalid Value",
            type: "error"
          });
        };
      })(this));
    };

    return BuilderView;

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
      this.builderView = new BuilderView(args);
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
