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
          $('#myModal').modal('hide');
          return window.open(data.uri_edit);
        });
      }).fail(function(data) {
        return swal({
          title: 'Error',
          type: 'error'
        });
      });
    },
    survey_tiles: {
      tile_template: "<div class=\"tile\">\n  <div class=\"panel-heading bg-master-light\">\n    <span class=\"h3 font-montserrat\"><%= dat.name %></span><br>\n    <small class=\"font-montserrat\">Modified <strong><span data-livestamp=\"<%= dat.last_modified %>\"><%= dat.last_modified %></span></strong></small><br>\n  </div>\n  <div class=\"panel-body bg-master-lightest\">\n    <small><span class=\"font-montserrat text-uppercase bold\">Status:</span></small>\n    <% if (!dat.is_active) { %>\n    <span class=\"label font-montserrat <% if (dat.has_expired){%>label-important<%}else{%>label-warning<%}%>\">\n      Inactive\n      <% if (dat.has_expired) { %>\n        &bullet; Expired\n      <% } %>\n      <% if (dat.is_paused) { %>\n        &bullet; Paused\n      <% } %>\n    </span>\n    <% } else { %>\n    <span class=\"label font-montserrat label-success\">Active</span>\n    <% } %>\n\n    <div class=\"row m-t-10 m-b-10\">\n      <div class=\"<% if (dat.has_response_cap === Math.pow(2,32)) {%>col-sm-12<% } else {%>col-sm-6<% } %> text-center label\">\n        <h5 class=\"font-montserrat no-margin text-uppercase\"><%= numeral(dat.has_obtained_responses).format('0[.]00a') %></h5>\n        <p class=\"font-montserrat no-margin text-uppercase hint-text\">Responses</p>\n      </div>\n      <% if (dat.has_response_cap === Math.pow(2,32)) { %>\n      <% } else {%>\n      <div class=\"col-sm-6 text-center label\">\n          <h5 class=\"font-montserrat no-margin text-uppercase\"><%= numeral(dat.has_response_cap).format('0[.]00a') %></h5>\n          <p class=\"font-montserrat no-margin text-uppercase hint-text\">Goal</p>\n      </div>\n      <% } %>\n    </div>\n\n    <span class=\"font-montserrat\">Stats, Modify or Share</span>\n    <div class=\"btn-group btn-group-sm btn-group-justified m-t-10 m-b-10\">\n      <a href=\"<%= dat.uri_responses %>\" class=\"btn btn-default\">\n        <i class=\"fa fa-star\"></i>\n        <span class=\"font-montserrat\">Analytics</span>\n      </a>\n      <a href=\"<%= dat.uri_edit %>\" class=\"btn btn-default\">\n        <i class=\"fa fa-star\"></i>\n        <span class=\"font-montserrat\">Edit</span>\n      </a>\n    </div>\n\n    <a href=\"<%= dat.uri_edit %>#share\"><span class=\"label font-montserrat\"><i class=\"fa fa-cog\"></i> <span class=\"font-montserrat\">Share</span></span></a>\n    <a href=\"<%= dat.uri_edit %>#settings\"><span class=\"label font-montserrat\"><i class=\"fa fa-cog\"></i> <span class=\"font-montserrat\">Settings</span></span></a>\n\n    <p class=\"font-montserrat m-t-10\">Preview</p>\n    <div class=\"btn-group btn-group-justified m-t-10\">\n      <div class=\"btn-group\">\n        <% if (dat.is_gamified) { %>\n          <a href=\"<%= dat.uri_game %>\" class=\"btn btn-primary\">\n        <% } else { %>\n          <a href=\"#\" class=\"btn btn-primary\" disabled>\n        <% } %>\n          <i class=\"fa fa-star\"></i>\n          <span class=\"font-montserrat\">Gamified</span>\n        </a>\n      </div>\n      <div class=\"btn-group\">\n        <a href=\"<%= dat.uri_simple %>\" class=\"btn btn-complete\">\n          <i class=\"fa fa-file-text-o\"></i>\n          <span class=\"font-montserrat\">Regular</span>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>",
      init: function() {
        this.container = $('#survey_tiles');
        return this.container.masonry({
          columnWidth: 1,
          itemSelector: '.tile',
          percentPosition: true
        });
      },
      append: function(dat) {
        var el, template;
        template = _.template(this.tile_template);
        el = $(template({
          dat: dat
        }));
        return this.container.append(el).masonry('appended', el, true);
      }
    }
  };

  $(document).ready(function() {
    DashboardHelper.survey_tiles.init();
    return $.getJSON('/api/survey', function(data) {
      var dat, i, len, ref, results;
      ref = data.data.reverse();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dat = ref[i];
        results.push(DashboardHelper.survey_tiles.append(dat));
      }
      return results;
    });
  });

  window.DashboardHelper = DashboardHelper;

}).call(this);
