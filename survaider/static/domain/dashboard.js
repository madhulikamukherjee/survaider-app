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
      tile_template: "<div class=\"tile\">\n  <div class=\"panel-heading bg-master-light\">\n    <span class=\"h3 font-montserrat\"><%= dat.name %></span><br>\n    <small class=\"font-montserrat\">Modified <strong><span data-livestamp=\"<%= dat.last_modified %>\">(Loading)</span></strong></small><br>\n  </div>\n  <div class=\"panel-body bg-master-lightest\">\n    <small><span class=\"font-montserrat text-uppercase bold\">Status:</span></small>\n    <% if (!dat.is_active) { %>\n    <span class=\"label font-montserrat <% if (dat.has_expired){%>label-important<%}else{%>label-warning<%}%>\">\n      Inactive\n      <% if (dat.has_expired) { %>\n        &bullet; Expired\n      <% } %>\n      <% if (dat.is_paused) { %>\n        &bullet; Paused\n      <% } %>\n    </span>\n    <% } else { %>\n    <span class=\"label font-montserrat label-success\">Active</span>\n    <% } %>\n\n    <div class=\"row m-t-10 m-b-10\">\n      <div class=\"<% if (dat.has_response_cap === Math.pow(2,32)) {%>col-sm-12<% } else {%>col-sm-6<% } %> text-center label\">\n        <h5 class=\"font-montserrat no-margin text-uppercase\"><%= numeral(dat.has_obtained_responses).format('0[.]00a') %></h5>\n        <p class=\"font-montserrat no-margin text-uppercase hint-text\">Responses</p>\n      </div>\n      <% if (dat.has_response_cap === Math.pow(2,32)) { %>\n      <% } else {%>\n      <div class=\"col-sm-6 text-center label\">\n          <h5 class=\"font-montserrat no-margin text-uppercase\"><%= numeral(dat.has_response_cap).format('0[.]00a') %></h5>\n          <p class=\"font-montserrat no-margin text-uppercase hint-text\">Goal</p>\n      </div>\n      <% } %>\n    </div>\n\n    <span class=\"font-montserrat\">Stats, Modify or Share</span>\n    <div class=\"btn-group btn-group-sm btn-group-justified m-t-10 m-b-10\">\n      <a href=\"<%= dat.uri_responses %>\" class=\"btn btn-default\">\n        <i class=\"fa fa-star\"></i>\n        <span class=\"font-montserrat\">Analytics</span>\n      </a>\n      <a href=\"<%= dat.uri_edit %>\" class=\"btn btn-default\">\n        <i class=\"fa fa-star\"></i>\n        <span class=\"font-montserrat\">Edit</span>\n      </a>\n    </div>\n\n    <a href=\"<%= dat.uri_edit %>#share\"><span class=\"label font-montserrat\"><i class=\"fa fa-cog\"></i> <span class=\"font-montserrat\">Share</span></span></a>\n    <a href=\"<%= dat.uri_edit %>#settings\"><span class=\"label font-montserrat\"><i class=\"fa fa-cog\"></i> <span class=\"font-montserrat\">Settings</span></span></a>\n\n    <p class=\"font-montserrat m-t-10\">Preview</p>\n    <div class=\"btn-group btn-group-justified m-t-10\">\n      <div class=\"btn-group\">\n        <% if (dat.is_gamified) { %>\n          <a href=\"<%= dat.uri_game %>\" class=\"btn btn-primary\">\n        <% } else { %>\n          <a href=\"#\" class=\"btn btn-primary\" disabled>\n        <% } %>\n          <i class=\"fa fa-star\"></i>\n          <span class=\"font-montserrat\">Gamified</span>\n        </a>\n      </div>\n      <div class=\"btn-group\">\n        <a href=\"<%= dat.uri_simple %>\" class=\"btn btn-complete\">\n          <i class=\"fa fa-file-text-o\"></i>\n          <span class=\"font-montserrat\">Regular</span>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>",
      init: function() {
        this.container = $('#card_dock');
        return this.container.masonry({
          columnWidth: 1,
          itemSelector: '.card',
          isFitWidth: true
        });
      },
      append: function(dat) {
        var attrs, el, template;
        template = Survaider.Templates['dashboard.tiles'];
        attrs = {
          narrow: dat.has_response_cap === Math.pow(2, 32) ? 'narrow' : ''
        };
        el = $(template({
          dat: dat,
          attrs: attrs
        }));
        this.container.append(el).masonry('appended', el, true);
        Waves.attach(el);
        el.on('click', function() {
          if (el.hasClass('narrow')) {
            return el.find('a.more').click();
          }
        });
        el.find("a.more").on('click', (function(_this) {
          return function() {
            el.removeClass('narrow');
            return _this.reload();
          };
        })(this));
        return el.find("a.less").on('click', (function(_this) {
          return function(e) {
            el.addClass('narrow');
            e.stopPropagation();
            return _this.reload();
          };
        })(this));
      },
      reload: function() {
        var reset;
        reset = _.bind((function(_this) {
          return function() {
            return _this.container.masonry();
          };
        })(this), this);
        return _.delay(reset, 700);
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
