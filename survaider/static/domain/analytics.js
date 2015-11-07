(function() {
  $(document).ready(function() {
    var json_uri, s_id;
    s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
    json_uri = UriTemplate.expand('/api/survey/{s_id}/response/aggregate', {
      s_id: s_id
    });
    $.getJSON(json_uri, function(data) {
      'use strict';
      var i;
      i = 0;
      while (i < data.columns.length) {
        $('#tableWithSearch thead tr').append('<th>' + data.columns[i] + '</th>');
        i++;
      }
      $('#tableWithSearch').DataTable({
        'data': data.rows,
        dom: 'Blfrtip',
        buttons: ['copy']
      });
    });
  });

}).call(this);
