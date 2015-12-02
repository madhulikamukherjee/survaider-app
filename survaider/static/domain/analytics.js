(function() {
  (function() {
    $(document).ready(function() {
      var json_uri, raw_json, s_id;
      json_uri = void 0;
      s_id = void 0;
      raw_json = void 0;
      s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
      json_uri = UriTemplate.expand('/api/survey/{s_id}/response/aggregate/nested', {
        s_id: s_id
      });
      raw_json = UriTemplate.expand('/api/survey/{s_id}/deepjson', {
        s_id: s_id
      });
      $.getJSON(raw_json, function(raw_data) {
        return $.getJSON(json_uri, function(data) {
          'use strict';
          var N, check, cid, convertArrayOfObjectsToCSV, field_type, i, index_pos, j, k, nested_data, new_data, number_of_respondents, opt, opt_str, option_label, option_list, pos, question_label, val;
          i = void 0;
          $('#tableWithSearch thead tr').append('<th>Question</th>');
          i = 1;
          while (i < data.columns.length) {
            $('#tableWithSearch thead tr').append('<th>ID: ' + data.columns[i][0] + '<br>Answered: <span data-livestamp="' + data.columns[i][1] + '">' + data.columns[i][1] + '</span></th>');
            i++;
          }
          nested_data = data.rows;
          number_of_respondents = nested_data[0].length - 1;
          new_data = new Array(nested_data.length);
          j = 0;
          while (j < new_data.length) {
            question_label = nested_data[j][0];
            cid = void 0;
            option_label = '';
            check = 0;
            val = void 0;
            option_list = '';
            k = 0;
            check = 0;
            while (check < data.questions.length) {
              if (question_label === data.questions[check][1]) {
                cid = data.questions[check][0];
                break;
              }
              check++;
            }
            new_data[j] = new Array(nested_data[j].length);
            new_data[j][0] = nested_data[j][0];
            field_type = void 0;
            index_pos = void 0;
            check = 0;
            while (check < raw_data.fields.length) {
              if (cid === raw_data.fields[check].cid) {
                field_type = raw_data.fields[check].field_type;
                index_pos = check;
                break;
              }
              check++;
            }
            if (field_type === 'short_text' || field_type === 'long_text' || field_type === 'rating') {
              N = 1;
              N = 1;
              while (N < nested_data[j].length) {
                new_data[j][N] = nested_data[j][N];
                N++;
              }
            } else if (field_type === 'yes_no' || field_type === 'single_choice') {
              N = 1;
              while (N < nested_data[j].length) {
                val = nested_data[j][N];
                if (val !== null) {
                  val = Number(val[val.length - 1]);
                  option_label = raw_data.fields[index_pos].field_options[val - 1].label;
                  new_data[j][N] = option_label;
                } else {
                  new_data[j][N] = null;
                }
                N++;
              }
            } else if (field_type === 'multiple_choice') {
              N = 1;
              while (N < nested_data[j].length) {
                val = nested_data[j][N];
                if (val !== null) {
                  val = nested_data[j][N].split('###');
                  k = 0;
                  while (k < val.length) {
                    val[k] = Number(val[k][val[k].length - 1]);
                    option_label = raw_data.fields[index_pos].field_options[val[k] - 1].label;
                    if (k === 0) {
                      option_list = option_label;
                    } else {
                      option_list = option_list + '<br>' + option_label;
                    }
                    k++;
                  }
                  new_data[j][N] = option_list;
                } else {
                  new_data[j][N] = null;
                }
                N++;
              }
            } else if (field_type === 'ranking') {
              N = 1;
              while (N < nested_data[j].length) {
                val = nested_data[j][N];
                if (val !== null) {
                  val = nested_data[j][N].split('###');
                  opt = void 0;
                  pos = void 0;
                  opt_str = void 0;
                  k = 0;
                  while (k < val.length) {
                    val[k] = val[k].split('##');
                    val[k][0] = Number(val[k][0][val[k][0].length - 1]);
                    k++;
                  }
                  val = val.sort(function(a, b) {
                    return a[1] - b[1];
                  });
                  k = 0;
                  while (k < val.length) {
                    opt = val[k][0];
                    pos = val[k][1];
                    opt = raw_data.fields[index_pos].field_options[opt - 1].label;
                    opt_str = pos + ': ' + opt;
                    if (k === 0) {
                      option_list = opt_str;
                    } else {
                      option_list = option_list + '<br>' + opt_str;
                    }
                    k++;
                  }
                  new_data[j][N] = option_list;
                } else {
                  new_data[j][N] = null;
                }
                N++;
              }
            } else if (field_type === 'group_rating') {
              N = 1;
              while (N < nested_data[j].length) {
                val = nested_data[j][N];
                if (val !== null) {
                  val = nested_data[j][N].split('###');
                  opt = void 0;
                  pos = void 0;
                  opt_str = void 0;
                  k = 0;
                  while (k < val.length) {
                    val[k] = val[k].split('##');
                    val[k][0] = Number(val[k][0][val[k][0].length - 1]);
                    k++;
                  }
                  k = 0;
                  while (k < val.length) {
                    opt = val[k][0];
                    pos = val[k][1];
                    opt = raw_data.fields[index_pos].field_options[opt - 1].label;
                    opt_str = pos + ': ' + opt;
                    if (k === 0) {
                      option_list = opt_str;
                    } else {
                      option_list = option_list + '<br>' + opt_str;
                    }
                    k++;
                  }
                  new_data[j][N] = option_list;
                } else {
                  new_data[j][N] = null;
                }
                N++;
              }
            }
            j++;
          }
          console.log(new_data);

          /* Convert data to CSV */
          convertArrayOfObjectsToCSV = function(args) {
            var columnDelimiter, ctr, keys, lineDelimiter, result;
            result = void 0;
            ctr = void 0;
            keys = void 0;
            columnDelimiter = void 0;
            lineDelimiter = void 0;
            data = void 0;
            data = args.data || null;
            if (data === null || !data.length) {
              return null;
            }
            columnDelimiter = args.columnDelimiter || ',';
            lineDelimiter = args.lineDelimiter || '\n';
            keys = Object.keys(data[0]);
            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;
            data.forEach(function(item) {
              ctr = 0;
              keys.forEach(function(key) {
                var temp;
                if (ctr > 0) {
                  result += columnDelimiter;
                }
                if (typeof item[key] === 'string') {
                  temp = item[key];
                  temp = temp.slice(0, 0) + '"' + temp.slice(0);
                  item[key] = temp.slice(0, temp.length) + '"' + temp.slice(temp.length);
                }
                result += item[key];
                ctr++;
              });
              result += lineDelimiter;
            });
            return result;
          };
          window.downloadCSV = function(args) {
            var csv, filename, link;
            data = void 0;
            filename = void 0;
            link = void 0;
            csv = convertArrayOfObjectsToCSV({
              data: new_data
            });
            if (csv === null) {
              return;
            }
            filename = args.filename || 'export.csv';
            if (!csv.match(/^data:text\/csv/i)) {
              csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);
            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
          };
          return $('#tableWithSearch').DataTable({
            'data': new_data,
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
    });
  }).call(this);

}).call(this);
