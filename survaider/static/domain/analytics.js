(function() {
  $(document).ready(function() {
    var json_uri, s_id, raw_json;
    s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id;
    json_uri = UriTemplate.expand('/api/survey/{s_id}/response/aggregate/nested', {
      s_id: s_id
    });
    raw_json = UriTemplate.expand('/api/survey/{s_id}/deepjson', {
      s_id: s_id
    });

    $.getJSON(raw_json, function(raw_data){ //Got the raw JSON structure.
          return $.getJSON(json_uri, function(data) { //Got the data.
          'use strict';
          var i;

          $('#tableWithSearch thead tr').append("<th>Question</th>");
          i = 1;
          while (i < data.columns.length) {
            $('#tableWithSearch thead tr').append("<th>ID: " + data.columns[i][0] + "<br>Answered: <span data-livestamp=\"" + data.columns[i][1] + "\">" + data.columns[i][1] + "</span></th>");
            i++;
          }
          var question_types = ["short_text", "long_text", "yes_no", "single_choice", "multiple_choice", "ranking", "rating"];
          
          var nested_data = data.rows; //The old F'ed up data.
          var number_of_respondents = nested_data[0].length - 1; //Because first one is question itself.
          var new_data = new Array(nested_data.length); //This var is what we will finally pass.
          var j = 0;
          while (j < new_data.length){ //run for as many rows (or, number of questions in the survey)
 
                  var question_label = nested_data[j][0]; //The first cell of every row is the question label.
                  var cid;
                  var check = 0;
                  for (check = 0; check<data.questions.length; check++){ //time to check the cid
                      if (question_label == data.questions[check][1]) { //If the question label is matched with any one of list of questions in the survey
                        cid = data.questions[check][0]; //Then catch the CID of that question and exit
                        break;
                      }
                  }

                  new_data[j] = new Array(nested_data[j].length);
                  new_data[j][0] = nested_data[j][0]; //Copy the question label as it is

                  //Check for the field type as well as index position of this particular CID
                  var field_type, index_pos;
                  for (check=0; check<raw_data.fields.length; check++){
                      if (cid == raw_data.fields[check].cid) {
                        field_type = raw_data.fields[check].field_type;
                        index_pos = check;
                        break;
                      }
                  }

                  //Now we take every response in nested_data coresponding to this index position, and check for the actual option label in raw_data (if the 'field_type' requires it.)
                  if (field_type == "short_text" || field_type == "long_text" || field_type == "rating") {
                      var N = 1;
                      for (N = 1; N < nested_data[j].length; N++){
                          new_data[j][N] = nested_data[j][N];
                        }
                  }

                  else if (field_type == "yes_no" || field_type == "single_choice") {
                      var N = 1;
                      for (N = 1; N < nested_data[j].length; N++){
                          var val = nested_data[j][N];

                          if (val!= null) {
                              val = Number(val[val.length - 1]); //strip the "a_3" to just string "3" and then to number '3'.
                              var option_label = raw_data.fields[index_pos].field_options[val-1].label;
                              new_data[j][N] = option_label;
                          }
                          else new_data[j][N] = null;
                        }
                  }

                  else if (field_type == "multiple_choice"){
                      var N = 1;
                      for (N = 1; N < nested_data[j].length; N++) {
                          var val = nested_data[j][N];
                          if (val!=null){
                              val = nested_data[j][N].split("###");
                              var option_label, option_list = "", k = 0;
                              for (k = 0; k<val.length; k++) {
                                val[k] = Number(val[k][val[k].length - 1]);
                                option_label = raw_data.fields[index_pos].field_options[val[k]-1].label;
                                if (k == 0) option_list = option_label;
                                else option_list = option_list +", "+ option_label;
                              }
                              new_data[j][N] = option_list;
                          }
                          else new_data[j][N] = null;
                      }
                  }

                  else if (field_type == "ranking"){
                    var N = 1;
                    for (N = 1; N < nested_data[j].length; N++) {
                      var val = nested_data[j][N];
                      if (val!=null){
                              val = nested_data[j][N].split("###");
                              var option_list = "", opt, pos, opt_str, k = 0;
                              for (k = 0; k<val.length; k++){
                                val[k] = val[k].split("##");
                                val[k][0] = Number(val[k][0][val[k][0].length-1]);
                              }
                              val = val.sort(function (a,b){return a[1] - b[1]; }); // Sorting according to rank given
                              for (k = 0; k<val.length; k++){
                                opt = val[k][0];
                                pos = val[k][1];
                                opt = raw_data.fields[index_pos].field_options[opt-1].label;
                                opt_str = pos + ": " + opt;
                                if (k == 0) option_list = opt_str;
                                else option_list = option_list + ", " + opt_str;
                              }
                              new_data[j][N] = option_list;
                      }
                      else new_data[j][N] = null;

                    }
                  }
                  j++;
          } // end of the while loop.

          console.log(new_data);

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
