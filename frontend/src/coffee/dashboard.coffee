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
        window.location = data.uri_edit
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
            <small class="font-montserrat">Modified <strong><span data-livestamp="<%= dat.last_modified %>">(Loading)</span></strong></small><br>
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
                <% if (dat.is_gamified) { %>
                  <a href="<%= dat.uri_game %>" class="btn btn-primary">
                <% } else { %>
                  <a href="#" class="btn btn-primary" disabled>
                <% } %>
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

    template:
      """
      <div class="card <%= attrs.narrow %>">
        <section class="frontmatter">
          <h1><%= dat.name %></h1>
          <small>
            <span class="status-expanded">
              Created
              <strong>
                <span data-livestamp="<%= dat.created_on %>">(Loading)</span>
              </strong>
            </span>
            <ul class="status-narrow">
              <li><i class="fa fa-circle-o idle"></i>Active</li>
              <li><i class="fa fa-rss alert"></i>10 critical alerts</li>
            </ul>
          </small>

          <ul class="statistics">
            <li>
              <h1>Responses</h1>
              <h2>
                <%= numeral(dat.has_obtained_responses).format('0[.]00a') %>
              </h2>
            </li>
            <li>
              <% if (dat.has_response_cap !== Math.pow(2,32)) { %>
              <h1>Goal</h1>
              <h2><%= numeral(dat.has_response_cap).format('0[.]00a') %></h2>
              <% } %>
            </li>
          </ul>
          <a href="javascript:void(0)" class="more">
            <i class="fa fa-arrow-circle-down"></i>More
          </a>
        </section>
        <section class="status">
          <h1>
            Status
            <a href="javascript:void(0)" class="less">
              <i class="fa fa-arrow-circle-up"></i>Show Less
            </a>
          </h1>

          <ul>
            <li><i class="fa fa-circle-o idle"></i>Active</li>
            <li>
              <i class="fa fa-clock-o primary"></i>
              Modified
              <strong>
              <span data-livestamp="<%= dat.last_modified %>">(Loading)</span>
              </strong>
            </li>
            <li><i class="fa fa-rss alert"></i>10 critical alerts</li>
          </ul>
        </section>
        <section class="footer">
          <section class="destinations">
            <ul>
              <a href="<%= dat.uri_responses %>">
                <li><i class="fa fa-area-chart"></i> Analytics</li>
              </a>
              <a href="<%= dat.uri_edit %>">
                <li><i class="fa fa-edit"></i> Edit</li>
              </a>
            </ul>
          </section>
          <section class="actions">
            <ul>
              <li>
                <a href="<%= dat.uri_edit %>#settings">
                  <i class="fa fa-cog"></i> Settings
                </a>
              </li>
              <li>
                <a href="<%= dat.uri_edit %>#share">
                  <i class="fa fa-share-alt"></i> Share
                </a>
              </li>
              <li>
                <a href="<%= dat.uri_edit %>#share">
                  <i class="fa fa-star"></i> Preview
                </a>
              </li>
            </ul>
          </section>
        </section>
      </div>
      """

    init: ->
      @container = $('#card_dock')
      @container.masonry
        columnWidth: 1
        # containerStyle: null
        itemSelector: '.card'
        # percentPosition: true
        # gutter: 10
        isFitWidth: true

    append: (dat) ->
      template = _.template @template
      attrs =
        narrow: if dat.has_response_cap is 2 ** 32 then 'narrow' else ''

      el = $ template dat: dat, attrs: attrs
      @container.append(el).masonry('appended', el, true)

      Waves.attach(el)

      el.on 'click', ->
        if el.hasClass('narrow')
          el.find('a.more').click()

      el.find("a.more").on 'click', =>
        el.removeClass('narrow')
        @reload()

      el.find("a.less").on 'click', (e) =>
        el.addClass('narrow')
        e.stopPropagation()
        @reload()

    reload: ->
      reset = _.bind () =>
        @container.masonry()
      , @

      # _.delay reset, 10
      # _.delay reset, 300
      _.delay reset, 700

  nav_menu: ->
    if $('.cd-stretchy-nav').length > 0
      stretchyNavs = $('.cd-stretchy-nav')
      stretchyNavs.each ->
        stretchyNav = $(this)
        stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger')
        stretchyNavTrigger.on 'click', (event) ->
          event.preventDefault()
          stretchyNav.toggleClass 'nav-is-visible'

      $(document).on 'click', (event) ->
        !$(event.target).is('.cd-nav-trigger') and !$(event.target).is('.cd-nav-trigger span') and stretchyNavs.removeClass('nav-is-visible')


$(document).ready ->
  DashboardHelper.survey_tiles.init()
  Waves.init()

  $.getJSON '/api/survey', (data) ->
    $('.spinner').hide()

    if data.data.length is 0
      $('.alt-text').fadeIn()

    DashboardHelper.survey_tiles.append(dat) for dat in data.data.reverse()

  $('#survaider_form').submit (e) ->
    e.preventDefault()
    DashboardHelper.create_survey()

  DashboardHelper.nav_menu()

window.DashboardHelper = DashboardHelper
