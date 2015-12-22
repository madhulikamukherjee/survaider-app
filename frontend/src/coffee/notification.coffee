NotificationHelper =
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

$(document).ready ->
  NotificationHelper.survey_tiles.init()
  Waves.init()

  $.getJSON '/api/notification', (data) ->
    # $('.spinner').hide()

    # NotificationHelper.survey_tiles.append(dat) for dat in data.data.reverse()

  NotificationHelper.nav_menu()

window.NotificationHelper = NotificationHelper
