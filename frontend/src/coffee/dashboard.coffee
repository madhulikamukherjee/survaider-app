DashboardHelper =
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
    @bind_events()

  bind_events: ->
    $("#build_survey").on 'click', @create_survey

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

  create_survey: ->
    vex.dialog.buttons.YES.text = 'Proceed'
    vex.dialog.buttons.NO.text = 'Cancel'
    vex.dialog.open
      className: 'vex-theme-top'
      message: Survaider.Templates['dashboard.build.dropdown']()
      afterOpen: ->
        $("select[name='s_tags']").select2
          tags: true
          tokenSeparators: [',', ' ', ';']
      showCloseButton: yes
      escapeButtonCloses: no
      overlayClosesOnClick: no
      onSubmit: (event) ->
        event.preventDefault()
        event.stopPropagation()
        $vexContent = $(@).parent()

        $.post('/api/survey', $(".vex-dialog-form").serialize())
          .done (data) ->
            vex.close $vexContent.data().vex.id

            vex.dialog.alert
              className: 'vex-theme-default'
              message: 'Created. Proceed here'
              callback: (value) -> window.location = data.uri_edit
          .fail (data) ->
            vex.close $vexContent.data().vex.id
            vex.dialog.alert
              className: 'vex-theme-default'
              message: 'Server Error. Please try again.'


$(document).ready ->
  dbd = new Dashboard
  dbd.init()

  DashboardHelper.nav_menu()

window.Dashboard = Dashboard
window.DashboardHelper = DashboardHelper
