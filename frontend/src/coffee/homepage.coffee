
$(document).ready ->
  el = $ '#invite'
  el.on 'click', (el) ->
    $("#invite").parent("li").parent("ul").eq(0).toggleClass 'open'
