(->
  $(document).ready ->
    json_uri = undefined
    s_id = undefined
    raw_json = undefined
    s_id = UriTemplate.extract('/survey/s:{s_id}/edit', window.location.pathname).s_id
    json_uri = UriTemplate.expand('/api/survey/{s_id}/response/aggregate/nested', s_id: s_id)
    raw_json = UriTemplate.expand('/api/survey/{s_id}/deepjson', s_id: s_id)
    $.getJSON raw_json, (raw_data) ->
      #Got the raw JSON structure.
      $.getJSON json_uri, (data) ->
        #Got the data.
        'use strict'
        i = undefined
        $('#tableWithSearch thead tr').append '<th>Question</th>'
        i = 1
        while i < data.columns.length
          $('#tableWithSearch thead tr').append '<th>ID: ' + data.columns[i][0] + '<br>Answered: <span data-livestamp="' + data.columns[i][1] + '">' + data.columns[i][1] + '</span></th>'
          i++
        nested_data = data.rows
        # console.log nested_data
        #The old F'ed up data.
        number_of_respondents = nested_data[0].length - 1
        #Because first one is question itself.
        new_data = new Array(nested_data.length)
        #This var is what we will finally pass.
        j = 0
        while j < new_data.length
          #run for as many rows (or, number of questions in the survey)
          question_label = nested_data[j][0]
          #The first cell of every row is the question label.
          cid = undefined
          option_label = ''
          check = 0
          val = undefined
          option_list = ''
          k = 0
          check = 0
          while check < data.questions.length
            #time to check the cid
            if question_label == data.questions[check][1]
              #If the question label is matched with any one of list of questions in the survey
              cid = data.questions[check][0]
              #Then catch the CID of that question and exit
              break
            check++
          new_data[j] = new Array(nested_data[j].length)
          new_data[j][0] = nested_data[j][0]
          #Copy the question label as it is
          #Check for the field type as well as index position of this particular CID
          field_type = undefined
          index_pos = undefined
          check = 0
          while check < raw_data.fields.length
            if cid == raw_data.fields[check].cid
              field_type = raw_data.fields[check].field_type
              index_pos = check
              break
            check++
          #Now we take every response in nested_data coresponding to this index position, and check for the actual option label in raw_data (if the 'field_type' requires it.)
          if field_type == 'short_text' or field_type == 'long_text' or field_type == 'rating'
            N = 1
            N = 1
            while N < nested_data[j].length
              new_data[j][N] = nested_data[j][N]
              N++
          else if field_type == 'yes_no' or field_type == 'single_choice'
            N = 1
            while N < nested_data[j].length
              val = nested_data[j][N]
              # console.log val
              if val != null
                val = Number(val[val.length - 1])
                #strip the "a_3" to just string "3" and then to number '3'.
                option_label = raw_data.fields[index_pos].field_options.options[val - 1].label
                new_data[j][N] = option_label
              else
                new_data[j][N] = null
              N++
          else if field_type == 'multiple_choice'
            N = 1
            while N < nested_data[j].length
              val = nested_data[j][N]
              if val != null
                val = nested_data[j][N].split('###')
                k = 0
                while k < val.length
                  val[k] = Number(val[k][val[k].length - 1])
                  option_label = raw_data.fields[index_pos].field_options.options[val[k] - 1].label
                  if k == 0
                    option_list = option_label
                  else
                    option_list = option_list + '<br>' + option_label
                  k++
                new_data[j][N] = option_list
              else
                new_data[j][N] = null
              N++
          else if field_type == 'ranking'
            N = 1
            while N < nested_data[j].length
              val = nested_data[j][N]
              if val != null
                val = nested_data[j][N].split('###')
                opt = undefined
                pos = undefined
                opt_str = undefined
                k = 0
                while k < val.length
                  val[k] = val[k].split('##')
                  val[k][0] = Number(val[k][0][val[k][0].length - 1])
                  k++
                val = val.sort((a, b) ->
                  a[1] - (b[1])
                )
                # Sorting according to rank given
                k = 0
                while k < val.length
                  opt = val[k][0]
                  pos = val[k][1]
                  opt = raw_data.fields[index_pos].field_options.options[opt - 1].label
                  opt_str = pos + ': ' + opt
                  if k == 0
                    option_list = opt_str
                  else
                    option_list = option_list + '<br>' + opt_str
                  k++
                new_data[j][N] = option_list
              else
                new_data[j][N] = null
              N++
          else if field_type == 'group_rating'
            N = 1
            while N < nested_data[j].length
              val = nested_data[j][N]
              if val != null
                val = nested_data[j][N].split('###')
                opt = undefined
                pos = undefined
                opt_str = undefined
                k = 0
                while k < val.length
                  val[k] = val[k].split('##')
                  val[k][0] = Number(val[k][0][val[k][0].length - 1])
                  k++
                k = 0
                while k < val.length
                  opt = val[k][0]
                  pos = val[k][1]
                  opt = raw_data.fields[index_pos].field_options.options[opt - 1].label
                  opt_str = pos + ': ' + opt
                  if k == 0
                    option_list = opt_str
                  else
                    option_list = option_list + '<br>' + opt_str
                  k++
                new_data[j][N] = option_list
              else
                new_data[j][N] = null
              N++
          j++
        # end of the while loop.
        # console.log new_data


        ###########################
        ### Convert data to CSV ###
        ###########################

        convertArrayOfObjectsToCSV = (args) ->
          result = undefined
          ctr = undefined
          keys = undefined
          columnDelimiter = undefined
          lineDelimiter = undefined
          data = undefined
          data = args.data or null
          if data == null or !data.length
            return null
          columnDelimiter = args.columnDelimiter or ','
          lineDelimiter = args.lineDelimiter or '\n'
          keys = Object.keys(data[0])
          result = ''
          result += keys.join(columnDelimiter)
          result += lineDelimiter
          data.forEach (item) ->
            ctr = 0
            keys.forEach (key) ->
              if ctr > 0
                result += columnDelimiter
              if typeof item[key] == 'string'
                temp = item[key]
                temp = temp.slice(0, 0) + '"' + temp.slice(0)
                item[key] = temp.slice(0, temp.length) + '"' + temp.slice(temp.length)
              result += item[key]
              ctr++
              return
            result += lineDelimiter
            return
          result

        ###########################
        ## Activate download link #
        ###########################

        window.downloadCSV = (args) ->
          data = undefined
          filename = undefined
          link = undefined
          csv = convertArrayOfObjectsToCSV(data: new_data)
          if csv == null
            return
          filename = args.filename or 'export.csv'
          if !csv.match(/^data:text\/csv/i)
            csv = 'data:text/csv;charset=utf-8,' + csv
          data = encodeURI(csv)
          link = document.createElement('a')
          link.setAttribute 'href', data
          link.setAttribute 'download', filename
          link.click()
          return

        $('#tableWithSearch').DataTable
          'data': new_data
          dom: 'Brtip'
          scrollX: true
          buttons: [ 'copy' ]
          scrollCollapse: true
          fixedColumns: true
          columnDefs:
            width: '40%'
            targets: 0
    return
  return
).call this