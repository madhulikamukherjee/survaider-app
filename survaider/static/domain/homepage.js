(function() {
  $(document).ready(function() {
    $('#invite').on('click', function(el) {
      return $("#invite").parent("li").parent("ul").eq(0).toggleClass('open');
    });
    return $('#invite_form').on('submit', function(e, el) {
      var submit;
      e.preventDefault();
      submit = $('#invite_form button[type=submit]');
      submit.attr('disabled', 'true');
      submit.html('Processing');
      return $.ajax({
        url: 'http://backstage.ducic.ac.in/passthru/madhulika@survaider.com',
        data: $('#invite_form').serialize(),
        type: 'GET'
      }).done(function() {
        $('#invite').html("Request sent!");
        $('#invite').click();
        return $('#invite').off('click');
      }).fail(function() {
        return alert('Please try Again');
      });
    });
  });

}).call(this);
