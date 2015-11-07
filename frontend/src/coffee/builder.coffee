
class BuilderView extends Backbone.View
  events:
    'click  .builder-save': 'update'
    # 'input  #builder-date': 'builder_date'
    'change #builder-date': 'builder_date'
    'change #builder-name': 'builder_name'

  initialize: (options) ->
    @setElement $ '#survey_settings_modal'
    @s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id
    @el_date  = $('#builder-date')
    ol_date = moment(@el_date.val()).format('DD/MM/YYYY')
    @el_date.val(ol_date)
    @save_btn = Ladda.create document.querySelector '#builder-save'

  builder_date: _.debounce ->
      date = moment(@el_date.val()).toISOString()
      if date
        @update('expires', date)
    ,500

  builder_name: _.debounce ->
      date = $('#builder-name').val()
      if date
        @update('survey_name', date)
    ,500

  update: (field, value) ->
    @save_btn.start()
    $.ajax
      url: "/api/survey/#{@s_id}/#{field}"
      method: 'POST'
      data:
        swag: value
    .done =>
      @save_btn.stop()
      $('#builder-updated').attr('data-livestamp', moment().toISOString())
    .fail =>
      @save_btn.stop()
      swal
        title: "Invalid Value"
        type:  "error"

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

  a = new Builder()

  $.getJSON json_uri, (data) ->
    fb = new Formbuilder(
      selector: '.sb-main'
      bootstrapData: data.fields
      screens: data.screens)
    fb.on 'save', (payload) ->
      # $.post payload_update_uri, { swag: payload }, (data) ->

  $('#survey_settings_modal').modal 'show'
