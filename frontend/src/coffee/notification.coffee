
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

  comparator: (model) ->
    moment(model.get 'acquired').unix()

class NotificationView extends Backbone.View

  initialize: (options) ->
    {@parentView} = options

  render: ->
    @setElement(@model.template({dat: @model.attributes}))
    return @

class NotificationDock extends Backbone.View
  events:
    'click [data-backbone-call=next]': 'load_notifications'

  initialize: (options) ->
    {selector, @notif, @bootstrapData} = options
    @collection = new NotificationCollection
    @collection.bind 'add', @addOne, @
    @setElement $ selector
    @render()
    @load_old_disable = no
    @load_notifications()

  template: Survaider.Templates['notification.dock']

  load_notifications: () ->
    uri = '/api/notification'
    uri += "/#{@time_end}" if @time_end?

    return if @load_old_disable is yes

    $.getJSON uri
    .done (data) =>
      @collection.add data.data
      @time_end = data.next
      if data.next is false
        @load_old_disable = yes

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
  notif = new Notification
    selector: '#card_dock'

  NotificationHelper.nav_menu()

window.Notification = Notification
window.NotificationHelper = NotificationHelper
