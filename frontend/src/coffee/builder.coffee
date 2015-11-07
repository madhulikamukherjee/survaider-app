
class BuilderView extends Backbone.View
  events:
    'click .builder-save': 'update'

  initialize: (options) ->
    console.log "LOL"
    @setElement $ '#survey_settings_modal'
    @save_btn = Ladda.create document.querySelector '#builder-save'

  update: ->
    console.log "LOLs"
    @save_btn.start()

class Builder
  constructor: (opts={}) ->
    console.log "KIK"
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
