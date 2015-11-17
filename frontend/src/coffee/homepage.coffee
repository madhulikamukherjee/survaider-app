
$(document).ready ->
  $('#invite').on 'click', (el) ->
    $("#invite").parent("li").parent("ul").eq(0).toggleClass 'open'

  $('#invite_form').on 'submit', (e, el) ->
    e.preventDefault()
    submit = $('#invite_form button[type=submit]')
    submit.attr('disabled', 'true')
    submit.html('Processing')
    $.ajax
      url: 'http://backstage.ducic.ac.in/passthru/madhulika@survaider.com'
      data: $('#invite_form').serialize()
      type: 'GET'
    .done ->
      $('#invite').html("Request sent!")
      $('#invite').click()
      $('#invite').off 'click'
    .fail ->
      alert('Please try Again')
