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
        itemSelector: "div[data-card=parent]"
        isFitWidth: true

    append: (dat) ->
      units = dat.units.length > 0
      template = Survaider.Templates['dashboard.tiles']
      attrs =
        # narrow: if dat.has_response_cap is 2 ** 32 then 'narrow' else ''
        expand: if units then 'expanded' else ''
        narrow: if units then '' else 'narrow'

      el = $ template dat: dat, attrs: attrs
      @container.append(el).masonry('appended', el, true).masonry()

      subroutine = (dat) =>
        subunit = @units
        cnt = @container.find(el).find('.subunit-container')
        subunit.init cnt, dat, _.bind(@reload, @)

      if units
        subroutine(dat)

      Waves.attach el.find '.parent-unit'

      el.on 'click', ->
        if el.hasClass('narrow')
          el.find('a.more').click()

      el.find("a.more").on 'click', =>
        el.removeClass('narrow')

      el.find("a.more").on 'click', =>
        el.removeClass('narrow')
        if units
          el.addClass('expanded')
        fn = _.bind ->
          if units
            subunit.reload()
            @reload()
        , @

        _.delay fn, 1000

        @reload()

      el.find("a.share-btn").on 'click', (e) =>
        vex.dialog.confirm
          message: 'Are you absolutely sure you want to destroy the alien planet?'
          className: 'vex-theme-default'
          callback: (value) ->
            console.log if value then 'Successfully destroyed the planet.' else 'Chicken.'

      el.find("a.less").on 'click', (e) =>
        el.addClass('narrow')
        el.removeClass('expanded') if units
        e.stopPropagation()
        @reload()

      el.find("a.survey-unit-btn").on 'click', =>
        @units.add dat, (data) =>
          dat.units.push data.unit
          el.addClass('expanded')
          subroutine(dat)
          el.find("a.survey-unit-btn").hide()
          @reload()

    reload: _.debounce (now) ->
      reset = _.bind () =>
        @container.masonry()
      , @

      _.delay reset, 500
      _.delay reset, 1500
      _.delay reset, 2500

      if now
        _.delay reset, 50
    , 500

    units:
      init: (parent_container, data, parent_reload) ->
        template = Survaider.Templates['dashboard.unit']
        el = $ template dat: data

        parent_container.append(el)
        parent_reload()

        @parent_container = parent_container
        @container = parent_container.find('.subunitdock')

        @container.masonry
          columnWidth: 1
          itemSelector: "div[data-card=unit]"
          isFitWidth: true

        @append(dat) for dat in data.units.reverse()

        parent_container.find('.btn-subunit').on 'click', =>
          @add data, (dat) =>
            @append dat.unit
            parent_reload()

      append: (dat) ->
        template = Survaider.Templates['dashboard.unit.tiles']
        el = $ template dat: dat

        @container.append(el).masonry('appended', el, true).masonry()

        el.find(".sparkline").sparkline _.shuffle([15,16,17,19,19,15,13,12,12,14,16,17,19,30,13,35,40,30,35,35,35,22]),
          type: 'line'
          lineColor: '#333333'
          fillColor: '#00bfbf'
          spotColor: '#7f007f'
          width: '200px'
          height: '50px'
          chartRangeMin: 0
          drawNormalOnTop: false
          disableInteraction: yes

        # @reload(yes)

      add: (binding, callback) ->
        swal
          title: "Create a Survey Unit"
          text: "Please provide Survey Unit name for '#{binding.name}'."
          type: 'input'
          showCancelButton: true
          closeOnConfirm: false
          showLoaderOnConfirm: true
          inputPlaceholder: 'Unit Name'
        , (inputValue) ->
          if inputValue == false
            return false
          if inputValue == ''
            swal.showInputError 'You need to write something!'
            return false

          $.ajax
            url: "/api/survey/#{binding.id}/unit_addition"
            data:
              swag: inputValue
            method: 'POST'
          .done (dat) ->
            swal
                title: "Unit Created!"
                type:  "success"
                confirmButtonText: 'Done'
                closeOnConfirm: yes
                showCancelButton: no
              , ->
                callback(dat)
          .fail ->
            swal
              title: "Sorry, something went wrong. Please try again, or contact Support."
              type:  "error"

      reload: _.debounce (now) ->
        reset = _.bind () =>
          @container.masonry()
        , @

        _.delay reset, 600
        _.delay reset, 1000
        _.delay reset, 2000
        _.delay reset, 3000
      , 100

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

class Survey
  constructor: ->
    @surveys = []
    @surveys.settings = @settings

  settings: (e, tile) =>
    vex.dialog.open
      message: 'Edit your Survaider'
      className: 'vex-theme-default'
      input: Survaider.Templates['dashboard.survey.settings']()

    console.log e, f, @surveys

class Dashboard
  constructor: ->
    @container = $('#card_dock')
    @container.html Survaider.Templates['dashboard.dock']()
    @dashboard = new Survey

  init: ->
    @rv_container = rivets.bind $('#surveys'), @dashboard

    @fetch()

  process_data: (dat) ->
    #: Processes the data and adds it to the dashboard collection.
    for s in dat.data
      switch s.meta.type
        when "Survey"
          #: Add the Root Survey
          index = _.findIndex @dashboard.surveys, (d) ->
            d?.id is s.id
          if index > -1
            @dashboard.surveys[index] = _.extend(@dashboard.surveys[index], s)
          else
            @dashboard.surveys.push _.extend({units: []}, s)

          if s.status.unit_count > 0
            #: Create a fake Unit!
            index = _.findIndex @dashboard.surveys, (d) ->
              d?.id is s.id
            @dashboard.surveys[index].units.push _.extend s, fake: yes
            @dashboard.surveys[index].contains_fake = yes

        when "Survey.SurveyUnit"
          #: Add TO Survey
          index = _.findIndex @dashboard.surveys, (d) ->
            d?.id is s.rootid

          if index > -1
            #: We found an existing Survey. Awesome. Add to its units.
            index_unit = _.findIndex @dashboard.surveys[index].units,
            (d) -> d?.id is s.id

            if index_unit == -1
              @dashboard.surveys[index].units.push s

            p_c = _.reduce @dashboard.surveys[index].units
            , (m, v) ->
              m + v.status.response_count
            ,0


            @dashboard.surveys[index].status.response_count_agg = p_c

          else
            #: Nope. CLONE the s, Not REFER.
            cpy = _.extend JSON.parse(JSON.stringify(s)),
              meta:
                name: s.meta.rootname
            cpy.units = [s]
            @dashboard.surveys.push cpy

  fetch: ->
    $.getJSON '/api/survey'
    .success (data) =>
      if data.data.length is 0
        $('.alt-text').fadeIn()
      @process_data data
    console.log @dashboard.surveys

$(document).ready ->
  dbd = new Dashboard
  dbd.init()

  DashboardHelper.nav_menu()

window.Dashboard = Dashboard
window.DashboardHelper = DashboardHelper
