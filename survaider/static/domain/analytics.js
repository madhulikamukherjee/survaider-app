(function() {
  $(document).ready(function() {
    var json_uri, s_id;
    s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
    json_uri = UriTemplate.expand('/api/survey/{s_id}/response/aggregate/nested', {
      s_id: s_id
    });
    return $.getJSON(json_uri, function(data) {
      'use strict';
      var i;
      $('#tableWithSearch thead tr').append("<th>Question</th>");
      i = 1;
      while (i < data.columns.length) {
        $('#tableWithSearch thead tr').append("<th>ID: " + data.columns[i][0] + "<br>Answered: <span data-livestamp=\"" + data.columns[i][1] + "\">" + data.columns[i][1] + "</span></th>");
        i++;
      }
      return $('#tableWithSearch').DataTable({
        'data': data.rows,
        dom: 'Brtip',
        scrollX: true,
        buttons: ['copy'],
        scrollCollapse: true,
        fixedColumns: true,
        columnDefs: {
          width: '40%',
          targets: 0
        }
      });
    });
  });

}).call(this);
