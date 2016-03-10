
Onboarding =
  slides:
    init: ->
      @slides = $("div[data-slide]")
      @slidetitles = $("li[data-slide-title]")
      @activate @slides.eq(0).attr 'data-slide'

    activate: (name)->
      @slides.removeClass 'active'
      @slidetitles.removeClass 'active'

      el = $("div[data-slide=#{name}]")
      el.addClass 'active'

      translate = -1 * @slides.index(el) * el.outerWidth()
      $('div[data-slides]').css 'transform', "translateX(#{translate}px)"

      title = $("li[data-slide-title=#{name}")
      title.addClass 'active'

    __paginate: (operator)->
      current = $("div[data-slide].active")
      index = @slides.index current
      if index < (@slides.length - 1) and operator is 1
        @activate @slides.eq(index + operator).attr 'data-slide'
      else if operator is -1 and index > 0
        @activate @slides.eq(index + operator).attr 'data-slide'

    next: ->
      @__paginate(1)

    previous: ->
      @__paginate(-1)

  init: ->
    $('#onboarding').html(Survaider.Templates['dashboard.onboarding.dock']())
    $('div[data-slide="key-aspect"] select[data-onboarding-input]').select2
      tags: true
      tokenSeparators: [',', ';']
    @slides.init()

    $('a[role="prev"]').on 'click', => @slides.previous()
    $('a[role="next"]').on 'click', => @slides.next()
    $('a[role="skip"]').on 'click', => @slides.next()

$(document).ready ->
  Onboarding.init()

window.Onboarding = Onboarding
