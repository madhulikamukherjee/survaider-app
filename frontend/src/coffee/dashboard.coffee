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
    init: ->
      @container = $('#card_dock')
      @container.masonry
        columnWidth: 1
        # containerStyle: null
        itemSelector: '.card'
        # percentPosition: true
        # gutter: 10
        isFitWidth: true

      @count = 0

    append: (dat) ->
      @count += 1
      template = Survaider.Templates['dashboard.tiles']
      attrs =
        narrow: if dat.has_response_cap is 2 ** 32 then 'narrow' else ''
        expand: if @count is 1 then 'expasnded' else ''

      el = $ template dat: dat, attrs: attrs
      @container.append(el).masonry('appended', el, true)

      Waves.attach el.find '.parent-unit'

      el.on 'click', ->
        if el.hasClass('narrow')
          el.find('a.more').click()

      el.find("a.more").on 'click', =>
        el.removeClass('narrow')
        @reload()

      el.find("a.expand").on 'click', =>
        el.addClass('expanded')
        @reload(yes)

      el.find("a.less").on 'click', (e) =>
        el.addClass('narrow')
        e.stopPropagation()
        @reload()

    reload: (now) ->
      reset = _.bind () =>
        @container.masonry()
      , @

      _.delay reset, 700

      if now
        _.delay reset, 50

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
