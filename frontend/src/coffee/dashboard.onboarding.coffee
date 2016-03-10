
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

      for title in @slidetitles
        $(title).on 'click', (e) =>
          el = $(e.delegateTarget)
          if el.hasClass('filled')
            @activate el.attr('data-slide-title')

    activate: (name)->
      @slides.removeClass 'active'
      @slidetitles.removeClass 'active'
      @slidetitles.removeClass 'filled'

      if @meta[name]?.can_skip
        @skipel.show()
      else
        @skipel.hide()

      el = $("div[data-slide=#{name}]")
      el.addClass 'active'
      index = @slides.index(el)

      if index is 0
        @prevel.hide()
      else
        @prevel.show()

      translate = -1 * index * el.outerWidth()
      $('div[data-slides]').css 'transform', "translateX(#{translate}px)"

      title = $("li[data-slide-title=#{name}")
      title.addClass 'active'
      title.prevAll('li[data-slide-title]').addClass 'filled'

    __paginate: (operator, skipping)->
      current = $("div[data-slide].active")
      current_name = current.attr 'data-slide'

      if skipping and @meta[current_name].can_skip
        @meta[current_name].skip()

      if operator is 1 and @meta[current_name].next
        return @meta[current_name].next()

      if operator is 1 and not @meta[current_name]?.validate()
        vex.dialog.alert
          className: 'vex-theme-default'
          message: @meta[current_name]?.validation_error
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
        validation_error: """Business name and at least one
        keyword is required."""
        can_skip: no

        init: ->
          @slide = $('div[data-slide="key-aspect"]')
          @el = @slide.find('select[data-onboarding-input]')
          @el.select2
            tags: true
            tokenSeparators: [',', ';']
        serialize: ->
          {
            key_aspects: @el.val()
            survey_name: @slide.find('input').val()
          }
        validate: ->
          {key_aspects, survey_name} = @serialize()
          return (
            key_aspects and
            key_aspects.length > 0 and
            survey_name and
            survey_name.length > 1
          )

      'business-units':
        validation_error: 'Please enter correct values.'
        can_skip: yes

        init: ->
          @parent = $('ul[role="unit-input"]')
          templateel = @parent.find 'li[role="template"]'
          @template = templateel.clone()
          templateel.remove()
          @parent.prev('.header').hide()

          @parent.siblings('a[role="add"]').on 'click', =>
            @add_field()

        skip: ->
          @parent.find('.header').hide()
          @parent.find('li[role="input"]').remove()

        add_field: ->
          el = $("<li role='input'>#{@template.html()}</li>")
          @parent.append el
          @parent.prev('.header').show()
          @parent.animate
            scrollTop: 1000
          el.find('a[role="deleteorb"]').on 'click', =>
            el.remove()
            if @parent.children().length is 0
              @parent.prev('.header').hide()

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
          for {unit_name, owner_mail} in values
            if not unit_name or unit_name.length < 1
              return false
            if not owner_mail or owner_mail.length < 2
              return false
          return true

      'facebook':
        validation_error: 'Facebook URI incorrect? <insert your msg>'
        can_skip: yes

        init: -> @el = $("div[data-slide='facebook']")
        skip: ->
        serialize: -> @el.find('input').val()
        validate: -> true

      'twitter':
        validation_error: 'Twitter URI incorrect'
        can_skip: yes
        init: -> @el = $("div[data-slide='twitter']")
        skip: ->
        serialize: -> @el.find('input').val()
        validate: -> true

      'websites':
        validation_error: 'Websites incorrect'
        can_skip: yes
        init: -> @el = $("div[data-slide='websites']")
        skip: ->
        serialize: ->
          ta = @el.find('[for="tripadvisor"]').val()
          zm = @el.find('[for="zomato"]').val()
          return {
            tripadvisor: if ta.length > 1 then ta else false
            zomato: if zm.length > 1 then zm else false
          }
        validate: -> true
        next: -> Onboarding.overlay.activate('review')

  overlay:
    init: ->
      for name, obj of @meta
        obj.init()
      @elements = $('div[role="overlay"]')
      @close()

    activate: (name)->
      @close()
      target = $("div[data-overlay='#{name}'")
      @meta[name].pre_show?()
      target.addClass('visible')

    close: ->
      @elements.removeClass('visible')

    meta:
      review:
        init: ->
          @el = $("div[data-overlay='review'")
          @el.find("a[role='close']").on 'click', ->
            Onboarding.overlay.close()
        pre_show: ->
          rel = @el.find('dl[role="review-fields"]')
          render =
            'key-aspect': (dat) ->
              {key_aspects, survey_name} = dat
              out = "<dt>Survey Name</dt><dd>#{survey_name}</dd>"
              tags = (for tag in key_aspects
                "<span role='tag'>#{tag}</span>").join("")
              out += "<dt>Key Aspects</dt><dd>#{tags}</dt>"
              return out
            'business-units': (dat) ->
              units = for {unit_name, owner_mail} in dat
                "<li>#{unit_name} <small>(#{owner_mail})</small></li>"
              units = if units.length then units.join("") else "Skipped"
              "<dt>Units</dt><dd><ul>#{units}</ul></dd>"
            'facebook': (dat) ->
              val = if dat.length then dat else "Skipped"
              "<dt>Facebook</dt><dd>#{val}</dd>"
            'twitter': (dat) ->
              val = if dat.length then dat else "Skipped"
              "<dt>Twitter</dt><dd>#{val}</dd>"
            'websites': (dat) ->
              {zomato, tripadvisor} = dat
              out = unless (zomato or tripadvisor) then "Skipped" else """
                <ul>
                  #{if zomato then "<li>Zomato</li>" else ""}
                  #{if tripadvisor then "<li>Tripadvisor</li>" else ""}
                </ul>
              """
              "<dt>External Services</dt><dd>#{out}</dd>"

          meta = Onboarding.slides.meta
          htmlgen = (render[k](v.serialize()) for k, v of meta)
          rel.html(htmlgen.join(''))

      success:
        init: ->

  init: ->
    $('#onboarding').html(Survaider.Templates['dashboard.onboarding.dock']())

    @slides.init()
    @overlay.init()

$(document).ready ->
  Onboarding.init()

window.Onboarding = Onboarding
