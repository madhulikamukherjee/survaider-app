
class BuilderView extends Backbone.View
  events:
    'click .builder-save':   'update_sequence'
    'click #builder-delete': 'survey_delete'
    'input #builder-date':   'builder_date'
    'input #builder-limit':   'builder_limit'
    'click #builder-date-check': 'builder_date_toggle'
    'click #builder-limit-check': 'builder_limit_toggle'
    'change #builder-date': 'builder_date'
    'change #builder-name': 'builder_name'
    'click #builder-pause': 'builder_paused'

  initialize: (options) ->
    @setElement $ '#survey_settings_modal'
    @s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id
    @el_date  = $('#builder-date')
    @el_limit = $('#builder-limit')
    @save_btn = Ladda.create document.querySelector '#builder-save'
    @builder_date_init()
    @builder_limit_init()
    @builder_paused_init()
    $("#builder-project-title").html($('#builder-name').val())

  builder_date_init: ->
    ex_date = moment(@el_date.val())
    if ex_date.isAfter('9000-01-01', 'year')
      ex_date = moment().endOf("year")
      $('#builder-date-check').attr('checked', no)
      @el_date.hide()
    else
      $('#builder-date-check').attr('checked', yes)
      @el_date.show()
    @el_date.val(ex_date.format('YYYY MM DD'))

  builder_date_toggle: _.debounce ->
    if $('#builder-date-check').is(':checked')
      ed = moment().endOf("year")
      @el_date.val(ed.format('YYYY MM DD'))
      @update('expires', ed.toISOString())
      @el_date.show()
    else
      @el_date.hide()
      @update('expires', moment('9999 01 01').toISOString())
  ,500

  builder_date: _.debounce ->
    date = moment @el_date.val()
    if date.isValid()
      @update('expires', date.toISOString())
  ,500

  builder_limit_init: ->
    ex_limit = parseInt @el_limit.val()
    if ex_limit is 2**32
      $('#builder-limit-check').attr('checked', no)
      @el_limit.hide()
    else
      $('#builder-limit-check').attr('checked', yes)
      @el_limit.show()
    @el_limit.val(ex_limit)

  builder_limit_toggle: _.debounce ->
    if $('#builder-limit-check').is(':checked')
      @el_limit.val 1000
      @update 'response_cap', 1000
      @el_limit.show()
    else
      @el_limit.hide()
      @update 'response_cap', 2**32
  ,500

  builder_limit: _.debounce ->
    limit = parseInt @el_limit.val()
    if limit
      @update 'response_cap', limit
  ,500

  builder_name: _.debounce ->
    date = $('#builder-name').val()
    $("#builder-project-title").html($('#builder-name').val())
    if date
      @update('survey_name', date)
  ,500

  builder_paused_init: ->
    d = $('#builder-pause').attr('data-paused')
    if d == 'True'
      $('#builder-pause .target').html('Resume')
    else
      $('#builder-pause .target').html('Pause')

  builder_paused: ->
    d = $('#builder-pause').attr('data-paused')
    if d is 'True'
      $('#builder-pause .target').html('Pause')
      $('#builder-pause').attr('data-paused', 'False')
      @update('paused', 'false')
    else
      $('#builder-pause .target').html('Resume')
      $('#builder-pause').attr('data-paused', 'True')
      @update('paused', 'true')

  survey_delete: ->
    swal
        title: "Are you sure you want to delete this Survey?"
        text: "It's not possible to recover a deleted survey."
        type: "warning"
        showCancelButton: true
        confirmButtonColor: "#DD6B55"
        confirmButtonText: "Yes, delete it!"
        closeOnConfirm: false
        showLoaderOnConfirm: true
      , =>
        $.ajax
          url: "/api/survey/#{@s_id}"
          method: 'DELETE'
        .done =>
          swal
              title: "Succesfully Deleted"
              type:  "success"
              confirmButtonText: 'Proceed'
              closeOnConfirm: false
              showCancelButton: false
            , ->
              window.location = '/'
        .fail =>
          swal
            title: "Sorry, something went wrong. Please try again, or contact Support."
            type:  "error"

  update_sequence: ->
    tasks = [
        field: 'survey_name'
        value: $('#builder-name').val()
      ,
        field: 'expires'
        value: moment(@el_date.val()).toISOString()

      ,
        field: 'response_cap'
        value: parseInt @el_limit.val()
    ]

    q = $.Deferred().resolve()
    for task, i in tasks
      q = q.then(@update task.field, task.value, (i + 1) / tasks.length)

  update: (field, value, promise) ->
    unless promise or promise is 0
      @save_btn.start()
    $.ajax
      url: "/api/survey/#{@s_id}/#{field}"
      method: 'POST'
      data:
        swag: value
    .done =>
      if promise and promise == 1
        @save_btn.stop()
      else if promise
        @save_btn.setProgress promise
      else
        @save_btn.stop()

      $('#builder-updated').attr('data-livestamp', moment().toISOString())
      return true
    .fail =>
      unless promise
        @save_btn.stop()
        swal
          title: "Error while saving. Please check the input data."
          type:  "error"
      else
        throw "Error while saving"

class Builder
  constructor: (opts={}) ->
    _.extend @, Backbone.Events
    args = _.extend opts, {builder: @}
    @builderView = new BuilderView args

window.Builder = Builder

$(document).ready ->
  s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id
  json_uri = UriTemplate.expand('/api/survey/{s_id}/json?editing=true', s_id: s_id)
  payload_update_uri = UriTemplate.expand('/api/survey/{s_id}/struct', s_id: s_id)
  im_upload_uri = UriTemplate.expand('/api/survey/{s_id}/img_upload', s_id: s_id)
  im_list_uri   = UriTemplate.expand('/api/survey/{s_id}/repr', s_id: s_id)

  $.getJSON json_uri, (data) ->
    fb = new Formbuilder
      selector: '.sb-main'
      bootstrapData: data.fields
      screens: data.screens
      endpoints:
        img_upload: im_upload_uri
        img_list:   im_list_uri

    fb.on 'save', (payload) ->
      $.post payload_update_uri, { swag: payload }, (data) ->

    builder = new Builder()

    if window.location.hash is '#share'
      $('#survey_export_modal').modal 'show'
    else if window.location.hash is '#settings'
      $('#survey_settings_modal').modal 'show'
