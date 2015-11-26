$(document).ready ->
  s_id = UriTemplate.extract '/survey/s:{s_id}/edit'
  , window.location.pathname
  .s_id

  json_uri = UriTemplate.expand '/api/survey/{s_id}/response/aggregate/nested'
  , s_id: s_id

  $.getJSON json_uri, (data) ->
    'use strict'
    #: Render the Table Head.
    $('#tableWithSearch thead tr').append """<th>Question</th>"""
    i = 1
    while i < data.columns.length
      $('#tableWithSearch thead tr').append """<th>ID: #{data.columns[i][0]}<br>Answered: <span data-livestamp=\"#{data.columns[i][1]}\">#{data.columns[i][1]}</span></th>"""
      i++
    $('#tableWithSearch').DataTable
      'data': data.rows
      dom: 'Brtip'
      scrollX: true
      buttons: [ 'copy' ]
      scrollCollapse: true
      fixedColumns:   true
      columnDefs:
        width: '40%'
        targets: 0
