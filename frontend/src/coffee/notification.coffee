
class SurveyTicketNotification extends Backbone.Model
  defaults:
    type: 'SurveyTicket'

  initialize: ->
    @template = Survaider.Templates['notification.survey.ticket.tile']

class SurveyResponseNotification extends Backbone.Model
  defaults:
    type: 'SurveyResponseNotification'

  initialize: ->
    @template = Survaider.Templates['notification.survey.response.tile']

class NotificationCollection extends Backbone.Collection
  model: (attr, options) ->
    switch attr.type
      when 'SurveyTicket'
        return new SurveyTicketNotification attr, options
      when 'SurveyResponseNotification'
        return new SurveyResponseNotification attr, options

class NotificationView extends Backbone.View

  initialize: (options) ->
    {@parentView} = options

  render: ->
    @$el.html @model.template({dat: @model.attributes})
    return @

class NotificationDock extends Backbone.View
  initialize: (options) ->
    {selector, @notif, @bootstrapData} = options
    @collection = new NotificationCollection
    @collection.bind 'add', @addOne, @
    @setElement $ selector
    @render()
    @load_notifications()

  template: Survaider.Templates['notification.dock']

  load_notifications: (time_end) ->
    uri = '/api/notifications'
    uri += "/#{time_end}" if time_end?

    $.getJSON uri
    .done (data) =>
      @collection.add data.data
    .fail (data) =>
      console.log data

  render: ->
    @$el.html @template()
    @view_dock = @$el.find('ul')
    @

  addOne: (fieldDat, _, options) ->
    view = new NotificationView
      model: fieldDat
      parentView: @
    @view_dock.append view.render().el

class NotificationRouter extends Backbone.Router
  routes:
    '': 'init'
    ':time': 'timeappend'

  init: ->

  timeappend: (time) ->

class Notification
  constructor: (opts={}) ->
    _.extend @, Backbone.Events
    args = _.extend opts, {notif: @}
    @mainView = new NotificationDock args

window.Notification = Notification

NotificationHelper =
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
        if !$(event.target).is('.cd-nav-trigger') and
           !$(event.target).is('.cd-nav-trigger span')
          stretchyNavs.removeClass('nav-is-visible')

$(document).ready ->
  # NotificationHelper.notification_tiles.init()
  # Waves.init()

  # $.getJSON '/api/notifications', (data) ->
    # $('.spinner').hide()
    # NotificationHelper.notification_tiles.append(dat) for dat in data.data
  notif = new Notification
    selector: '#card_dock'
      # bootstrapData: data.data

  NotificationHelper.nav_menu()

window.NotificationHelper = NotificationHelper
