(function() {
  $(document).ready(function() {
    var el;
    el = $('#invite');
    return el.on('click', function(el) {
      return $("#invite").parent("li").parent("ul").eq(0).toggleClass('open');
    });
  });

}).call(this);
