DashboardHelper =
  create_survey: ->
    'use strict'
    #: Get the form data.
    dat = $('#survaider_form').serialize()
    #: Disable the submit button.
    $('#exec_create_survaider').attr('disabled', true).text 'Processing'
    $.ajax
      type: 'POST'
      url: '/api/survey'
      data: dat
    .done (data) ->
      #: Render the New URI and Redirect.
      swal
        title: 'Built!'
        text: 'Proceed to adding the stuff.'
        type: 'success'
        confirmButtonText: 'Edit Structure'
        closeOnConfirm: true
      , ->
        $('#myModal').modal('hide')
        window.open data.uri_edit
    .fail (data) ->
      swal
        title: 'Error'
        type: 'error'

  survey_tiles:
    tile_template:
      """
        <div class="tile">
          <div class="panel-heading bg-master-light">
            <span class="h3 font-montserrat"><%= dat.name %></span><br>
            <small class="font-montserrat">Modified <strong><span data-livestamp="<%= dat.last_modified %>"><%= dat.last_modified %></span></strong></small><br>
          </div>
          <div class="panel-body bg-master-lightest">
            <small><span class="font-montserrat text-uppercase bold">Status:</span></small>
            <% if (!dat.is_active) { %>
            <span class="label font-montserrat <% if (dat.has_expired){%>label-important<%}else{%>label-warning<%}%>">
              Inactive
              <% if (dat.has_expired) { %>
                &bullet; Expired
              <% } %>
              <% if (dat.is_paused) { %>
                &bullet; Paused
              <% } %>
            </span>
            <% } else { %>
            <span class="label font-montserrat label-success">Active</span>
            <% } %>

            <div class="row m-t-10 m-b-10">
              <div class="<% if (dat.has_response_cap === Math.pow(2,32)) {%>col-sm-12<% } else {%>col-sm-6<% } %> text-center label">
                <h5 class="font-montserrat no-margin text-uppercase"><%= numeral(dat.has_obtained_responses).format('0[.]00a') %></h5>
                <p class="font-montserrat no-margin text-uppercase hint-text">Responses</p>
              </div>
              <% if (dat.has_response_cap === Math.pow(2,32)) { %>
              <% } else {%>
              <div class="col-sm-6 text-center label">
                  <h5 class="font-montserrat no-margin text-uppercase"><%= numeral(dat.has_response_cap).format('0[.]00a') %></h5>
                  <p class="font-montserrat no-margin text-uppercase hint-text">Goal</p>
              </div>
              <% } %>
            </div>

            <span class="font-montserrat">Stats, Modify or Share</span>
            <div class="btn-group btn-group-sm btn-group-justified m-t-10 m-b-10">
              <a href="<%= dat.uri_responses %>" class="btn btn-default">
                <i class="fa fa-star"></i>
                <span class="font-montserrat">Analytics</span>
              </a>
              <a href="<%= dat.uri_edit %>" class="btn btn-default">
                <i class="fa fa-star"></i>
                <span class="font-montserrat">Edit</span>
              </a>
            </div>

            <a href="<%= dat.uri_edit %>#share"><span class="label font-montserrat"><i class="fa fa-cog"></i> <span class="font-montserrat">Share</span></span></a>
            <a href="<%= dat.uri_edit %>#settings"><span class="label font-montserrat"><i class="fa fa-cog"></i> <span class="font-montserrat">Settings</span></span></a>

            <p class="font-montserrat m-t-10">Preview</p>
            <div class="btn-group btn-group-justified m-t-10">
              <div class="btn-group">
                <a href="<%= dat.uri_game %>" class="btn btn-primary">
                  <i class="fa fa-star"></i>
                  <span class="font-montserrat">Gamified</span>
                </a>
              </div>
              <div class="btn-group">
                <a href="<%= dat.uri_simple %>" class="btn btn-complete">
                  <i class="fa fa-file-text-o"></i>
                  <span class="font-montserrat">Regular</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      """

    init: ->
      @container = $('#survey_tiles')
      @container.masonry
        columnWidth: 1
        itemSelector: '.tile'
        percentPosition: true
        # gutter: 10
        # isFitWidth: true

    append: (dat) ->
      template = _.template @tile_template
      el = $ template dat: dat
      @container.append(el).masonry('appended', el, true)

$(document).ready ->
  DashboardHelper.survey_tiles.init()
  $.getJSON('/api/survey', (data) ->
    DashboardHelper.survey_tiles.append(dat) for dat in data.data.reverse()
  )

window.DashboardHelper = DashboardHelper
