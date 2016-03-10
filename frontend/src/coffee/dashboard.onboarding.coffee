
Onboarding =
  slides:
    init: (slide)->
      for name, obj of @meta
        obj.init()

      @prevel = $('a[role="prev"]')
      @nextel = $('a[role="next"]')
      @skipel = $('a[role="skip"]')

      @slides = $("div[data-slide]")
      @slidetitles = $("li[data-slide-title]")
      @activate @slides.eq(0).attr 'data-slide'
      if slide
        @activate slide

      @prevel.on 'click', => @previous()
      @nextel.on 'click', => @next()
      @skipel.on 'click', => @skip()

    activate: (name)->
      @slides.removeClass 'active'
      @slidetitles.removeClass 'active'

      if @meta[name]?.can_skip
        @skipel.show()
      else
        @skipel.hide()

      el = $("div[data-slide=#{name}]")
      el.addClass 'active'

      translate = -1 * @slides.index(el) * el.outerWidth()
      $('div[data-slides]').css 'transform', "translateX(#{translate}px)"

      title = $("li[data-slide-title=#{name}")
      title.addClass 'active'

    __paginate: (operator, skipping)->
      current = $("div[data-slide].active")
      current_name = current.attr 'data-slide'

      if skipping and @meta[current_name].can_skip
        @meta[current_name].skip()

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

    skip: ->
      @__paginate(1, true)

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
          @parent.find('.header').hide()

          @parent.siblings('a[role="add"]').on 'click', =>
            @add_field()

        skip: ->
          @parent.find('.header').hide()
          @parent.find('li[role="input"]').remove()

        add_field: ->
          el = $("<li role='input'>#{@template.html()}</li>")
          @parent.append el
          @parent.find('.header').show()
          el.find('a[role="deleteorb"]').on 'click', =>
            el.remove()
            if @parent.children().length is 2
              @parent.find('.header').hide()

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
          console.log values
          for {unit_name, owner_mail} in values
            if not unit_name or unit_name.length < 1
              return false
            if not owner_mail or owner_mail.length < 2
              return false
          return true

      'facebook':
        validation_error: 'Facebook URI incorrect? <insert your msg>'
        can_skip: yes

        init: ->

        skip: ->

        serialize: ->

        validate: ->
          true

      'twitter':
        validation_error: 'Twitter URI incorrect'
        can_skip: yes
        init: ->
        skip: ->
        serialize: ->
        validate: -> true

      'websites':
        validation_error: 'Websites incorrect'
        can_skip: yes
        init: ->
        skip: ->
        serialize: ->
        validate: -> true

  init: ->
    $('#onboarding').html(Survaider.Templates['dashboard.onboarding.dock']())

    @slides.init()

$(document).ready ->
  Onboarding.init()

window.Onboarding = Onboarding
