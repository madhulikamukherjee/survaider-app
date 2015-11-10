$(document).ready ->
  s_id = UriTemplate.extract '/survey/s:{s_id}/edit'
  , window.location.pathname
  .s_id

  json_uri = UriTemplate.expand '/api/survey/{s_id}/response/aggregate'
  , s_id: s_id

  $.getJSON json_uri, (data) ->
    'use strict'
    #: Render the Table Head.
    i = 0
    while i < data.columns.length
      $('#tableWithSearch thead tr').append '<th>' + data.columns[i] + '</th>'
      i++
    $('#tableWithSearch').DataTable
      'data': data.rows
      dom: 'Blfrtip'
      buttons: [ 'copy' ]
    return
  return
