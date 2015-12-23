NotificationHelper =
  notification_tiles:
    init: ->
      @container = $('#card_dock')
      @container.masonry
        columnWidth: 1
        itemSelector: "div[data-card=parent]"
        isFitWidth: true

    append: (dat) ->
      template = Survaider.Templates['notification.survey.response.tile']
      attrs =
        expand: if true then 'expanded' else ''
        narrow: if true then '' else 'narrow'

      el = $ template dat: dat, attrs: attrs
      @container.append(el).masonry('appended', el, true).masonry()

      Waves.attach el.find '.parent-unit'

    reload: _.debounce (now) ->
      reset = _.bind () =>
        @container.masonry()
      , @

      _.delay reset, 500
    , 500

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
  NotificationHelper.notification_tiles.init()
  Waves.init()

  $.getJSON '/api/notification/surveyresponsenotification', (data) ->
    # $('.spinner').hide()

    NotificationHelper.notification_tiles.append(dat) for dat in data.data.reverse()

  NotificationHelper.nav_menu()

window.NotificationHelper = NotificationHelper
