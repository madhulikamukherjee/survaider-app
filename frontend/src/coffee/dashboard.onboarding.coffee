
Onboarding =
  slides:
    init: (slide)->
      for name, obj of @meta
        obj.init()

      @slides = $("div[data-slide]")
      @slidetitles = $("li[data-slide-title]")
      @activate @slides.eq(0).attr 'data-slide'
      if slide
        @activate slide

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
      current_name = current.attr 'data-slide'

      if operator is 1 and not @meta[current_name]?.validate()
        alert(@meta[current_name]?.validation_error)
        return

      index = @slides.index current
      if index < (@slides.length - 1) and operator is 1
        @activate @slides.eq(index + operator).attr 'data-slide'
      else if operator is -1 and index > 0
        @activate @slides.eq(index + operator).attr 'data-slide'

    next: ->
      @__paginate(1)

    previous: ->
      @__paginate(-1)

    meta:
      'key-aspect':
        validation_error: 'Minimum one keyword is required.'
        can_skip: no

        init: ->
          @el = $('div[data-slide="key-aspect"]'+
            ' select[data-onboarding-input]')
          @el.select2
            tags: true
            tokenSeparators: [',', ';']
        serialize: ->
          @el.val()
        validate: ->
          vals = @serialize()
          return vals and vals.length > 0

      'business-units':
        validation_error: 'Please enter correct values.'
        can_skip: yes

        init: ->
          @parent = $('ul[role="unit-input"]')
          templateel = @parent.find 'li[role="template"]'
          templateel.hide()
          @template = templateel.clone()
          @add_field()

          @parent.siblings('a[role="add"]').on 'click', =>
            @add_field()

        add_field: ->
          el = $("<li role='input'>#{@template.html()}</li>")
          @parent.append el
          el.find('a[role="deleteorb"]').on 'click', ->
            el.remove()

        serialize: ->
          units = @parent.find('li[role="input"]')
          out = []
          for unitel in units
            unit = $ unitel
            out.push
              unit_name: unit.find('input[type="text"]').val()
              owner_mail: unit.find('input[type="email"]').val()
          return out

        validate: ->
          values = @serialize()
          for {name, mail} in values
            if not name or name.length < 1
              return false
            if not mail or mail.length < 2
              return false
          return true

  init: ->
    $('#onboarding').html(Survaider.Templates['dashboard.onboarding.dock']())

    @slides.init('business-units')

    $('a[role="prev"]').on 'click', => @slides.previous()
    $('a[role="next"]').on 'click', => @slides.next()
    $('a[role="skip"]').on 'click', => @slides.next()

$(document).ready ->
  Onboarding.init()

window.Onboarding = Onboarding
