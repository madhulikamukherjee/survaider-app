
$(document).ready ->
  $('#invite').on 'click', (el) ->
    $("#invite").parent("li").parent("ul").eq(0).toggleClass 'open'

  $('#invite_form').on 'submit', ->
    $
