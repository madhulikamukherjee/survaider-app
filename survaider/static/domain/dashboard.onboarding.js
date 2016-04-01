(function() {
  var Onboarding;

  Onboarding = {
    slides: {
      init: function(slide) {
        var i, len, name, obj, ref, ref1, results, title;
        ref = this.meta;
        for (name in ref) {
          obj = ref[name];
          obj.init();
        }
        this.prevel = $('a[role="prev"]');
        this.nextel = $('a[role="next"]');
        this.skipel = $('a[role="skip"]');
        this.slides = $("div[data-slide]");
        this.slidetitles = $("li[data-slide-title]");
        this.activate(this.slides.eq(0).attr('data-slide'));
        if (slide) {
          this.activate(slide);
        }
        this.prevel.on('click', (function(_this) {
          return function() {
            return _this.previous();
          };
        })(this));
        this.nextel.on('click', (function(_this) {
          return function() {
            return _this.next();
          };
        })(this));
        this.skipel.on('click', (function(_this) {
          return function() {
            return _this.skip();
          };
        })(this));
        ref1 = this.slidetitles;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          title = ref1[i];
          results.push($(title).on('click', (function(_this) {
            return function(e) {
              var el;
              el = $(e.delegateTarget);
              if (el.hasClass('filled')) {
                return _this.activate(el.attr('data-slide-title'));
              }
            };
          })(this)));
        }
        return results;
      },
      activate: function(name) {
        var el, index, ref, ref1, title, translate;
        this.slides.removeClass('active');
        this.slidetitles.removeClass('active');
        this.slidetitles.removeClass('filled');
        if ((ref = this.meta[name]) != null ? ref.can_skip : void 0) {
          this.skipel.show();
        } else {
          this.skipel.hide();
        }
        el = $("div[data-slide=" + name + "]");
        el.addClass('active');
        index = this.slides.index(el);
        if (((ref1 = this.meta[name]) != null ? ref1.prepare : void 0) != null) {
          this.meta[name].prepare(this.meta);
        }
        if (index === 0) {
          this.prevel.hide();
        } else {
          this.prevel.show();
        }
        translate = -1 * index * el.outerWidth();
        $('div[data-slides]').css('transform', "translateX(" + translate + "px)");
        title = $("li[data-slide-title=" + name);
        title.addClass('active');
        return title.prevAll('li[data-slide-title]').addClass('filled');
      },
      __paginate: function(operator, skipping) {
        var current, current_name, index, ref, ref1;
        current = $("div[data-slide].active");
        current_name = current.attr('data-slide');
        if (skipping && this.meta[current_name].can_skip) {
          this.meta[current_name].skip();
        }
        if (operator === 1 && this.meta[current_name].next) {
          return this.meta[current_name].next();
        }
        if (operator === 1 && !((ref = this.meta[current_name]) != null ? ref.validate() : void 0)) {
          vex.dialog.alert({
            className: 'vex-theme-default',
            message: (ref1 = this.meta[current_name]) != null ? ref1.validation_error : void 0
          });
          return;
        }
        index = this.slides.index(current);
        if (index < (this.slides.length - 1) && operator === 1) {
          return this.activate(this.slides.eq(index + operator).attr('data-slide'));
        } else if (operator === -1 && index > 0) {
          return this.activate(this.slides.eq(index + operator).attr('data-slide'));
        }
      },
      next: function() {
        return this.__paginate(1);
      },
      skip: function() {
        return this.__paginate(1, true);
      },
      previous: function() {
        return this.__paginate(-1);
      },
      meta: {
        'key-aspect': {
          validation_error: "Business name and at least one\nkeyword is required.",
          can_skip: false,
          init: function() {
            this.slide = $('div[data-slide="key-aspect"]');
            this.el = this.slide.find('select[data-onboarding-input]');
            return this.el.select2({
              tags: true,
              tokenSeparators: [',', ';']
            });
          },
          serialize: function() {
            return {
              key_aspects: this.el.val(),
              survey_name: this.slide.find('input').val()
            };
          },
          validate: function() {
            var key_aspects, ref, survey_name;
            ref = this.serialize(), key_aspects = ref.key_aspects, survey_name = ref.survey_name;
            return key_aspects && key_aspects.length > 0 && survey_name && survey_name.length > 1;
          }
        },
        'business-units': {
          validation_error: 'Please enter correct values.',
          can_skip: true,
          init: function() {
            var templateel;
            this.parent = $('ul[role="unit-input"]');
            templateel = this.parent.find('li[role="template"]');
            this.template = templateel.clone();
            templateel.remove();
            this.parent.prev('.header').hide();
            this.add_field();
            return this.parent.siblings('a[role="add"]').on('click', (function(_this) {
              return function() {
                return _this.add_field();
              };
            })(this));
          },
          skip: function() {
            this.parent.find('.header').hide();
            return this.parent.find('li[role="input"]').remove();
          },
          add_field: function() {
            var el;
            el = $("<li role='input'>" + (this.template.html()) + "</li>");
            this.parent.append(el);
            this.parent.prev('.header').show();
            this.parent.animate({
              scrollTop: 1000
            });
            return el.find('a[role="deleteorb"]').on('click', (function(_this) {
              return function() {
                el.remove();
                if (_this.parent.children().length === 0) {
                  return _this.parent.prev('.header').hide();
                }
              };
            })(this));
          },
          serialize: function() {
            var i, len, out, unit, unitel, units;
            units = this.parent.find('li[role="input"]');
            out = [];
            for (i = 0, len = units.length; i < len; i++) {
              unitel = units[i];
              unit = $(unitel);
              out.push({
                unit_name: unit.find('input[type="text"]').val(),
                owner_mail: unit.find('input[type="email"]').val()
              });
            }
            return out;
          },
          validate: function() {
            var i, len, owner_mail, ref, unit_name, values;
            values = this.serialize();
            if (values.length === 0) {
              return false;
            }
            for (i = 0, len = values.length; i < len; i++) {
              ref = values[i], unit_name = ref.unit_name, owner_mail = ref.owner_mail;
              if (!unit_name || unit_name.length < 1) {
                return false;
              }
              if (!owner_mail || owner_mail.length < 2) {
                return false;
              }
            }
            return (_.uniq(values, 'unit_name')).length === values.length;
          }
        },
        'facebook': {
          validation_error: 'Facebook URI incorrect? <insert your msg>',
          can_skip: true,
          init: function() {
            return this.el = $("div[data-slide='facebook']");
          },
          skip: function() {},
          serialize: function() {
            return this.el.find('input').val();
          },
          validate: function() {
            return true;
          }
        },
        'twitter': {
          validation_error: 'Twitter URI incorrect',
          can_skip: true,
          init: function() {
            return this.el = $("div[data-slide='twitter']");
          },
          skip: function() {},
          serialize: function() {
            return this.el.find('input').val();
          },
          validate: function() {
            return true;
          }
        },
        'websites': {
          validation_error: 'Websites incorrect',
          can_skip: true,
          init: function() {
            var templateel;
            this.el = $("div[data-slide='websites']");
            this.container = $("ul[role='user-input']");
            templateel = this.el.find('li[role="template"]');
            this.template = templateel.clone();
            return templateel.remove();
          },
          skip: function() {},
          prepare: function(meta) {
            var el, i, len, results, unit_name, units;
            this.container.html('');
            units = meta['business-units'].serialize();
            results = [];
            for (i = 0, len = units.length; i < len; i++) {
              unit_name = units[i].unit_name;
              el = $("<li role='input'>" + (this.template.html()) + "</li>");
              (el.find('label')).html(unit_name);
              (el.find('input')).attr('data-unit', unit_name);
              results.push(this.container.append(el));
            }
            return results;
          },
          serialize: function() {
            var inputs, vals;
            inputs = this.container.find('input');
            vals = {};
            inputs.each(function() {
              var el, fr, unit, val;
              el = $(this);
              fr = el.attr('for');
              val = el.val();
              unit = el.attr('data-unit');
              if (!val.length) {
                return;
              }
              if (!vals[unit]) {
                vals[unit] = {};
              }
              return vals[unit][fr] = val;
            });
            return vals;
          },
          validate: function() {
            return true;
          },
          next: function() {
            return Onboarding.overlay.activate('review');
          }
        }
      }
    },
    overlay: {
      init: function() {
        var name, obj, ref;
        ref = this.meta;
        for (name in ref) {
          obj = ref[name];
          obj.init();
        }
        this.elements = $('div[role="overlay"]');
        return this.close();
      },
      activate: function(name, args) {
        var base, target;
        this.close();
        target = $("div[data-overlay='" + name + "'");
        if (typeof (base = this.meta[name]).pre_show === "function") {
          base.pre_show(args);
        }
        return target.addClass('visible');
      },
      close: function() {
        return this.elements.removeClass('visible');
      },
      meta: {
        review: {
          init: function() {
            this.el = $("div[data-overlay='review'");
            (this.el.find('p[role="buttons"]')).slideDown();
            (this.el.find('p[role="progress"]')).slideUp();
            (this.el.find('a[role="close"]')).on('click', function() {
              return Onboarding.overlay.close();
            });
            return (this.el.find('a[role="proceed"]')).on('click', (function(_this) {
              return function() {
                return _this.do_proceed();
              };
            })(this));
          },
          pre_show: function() {
            var htmlgen, k, meta, rel, render, v;
            this.preset = false;
            rel = this.el.find('dl[role="review-fields"]');
            render = {
              'key-aspect': function(dat) {
                var key_aspects, out, survey_name, tag, tags;
                key_aspects = dat.key_aspects, survey_name = dat.survey_name;
                out = "<dt>Survey Name</dt><dd>" + survey_name + "</dd>";
                tags = ((function() {
                  var i, len, results;
                  results = [];
                  for (i = 0, len = key_aspects.length; i < len; i++) {
                    tag = key_aspects[i];
                    results.push("<span role='tag'>" + tag + "</span>");
                  }
                  return results;
                })()).join("");
                out += "<dt>Key Aspects</dt><dd>" + tags + "</dt>";
                return out;
              },
              'business-units': function(dat) {
                var owner_mail, unit_name, units;
                units = (function() {
                  var i, len, ref, results;
                  results = [];
                  for (i = 0, len = dat.length; i < len; i++) {
                    ref = dat[i], unit_name = ref.unit_name, owner_mail = ref.owner_mail;
                    results.push("<li>" + unit_name + " <small>(" + owner_mail + ")</small></li>");
                  }
                  return results;
                })();
                units = units.length ? units.join("") : "Skipped";
                return "<dt>Units</dt><dd><ul>" + units + "</ul></dd>";
              },
              'facebook': function(dat) {
                var val;
                val = dat.length ? dat : "Skipped";
                return "<dt>Facebook</dt><dd>" + val + "</dd>";
              },
              'twitter': function(dat) {
                var val;
                val = dat.length ? dat : "Skipped";
                return "<dt>Twitter</dt><dd>" + val + "</dd>";
              },
              'websites': function(dat) {
                var k, out, v;
                out = "";
                for (k in dat) {
                  v = dat[k];
                  out += "<li>" + k + ": " + (v.zomato ? "zomato" : "") + "\n" + (v.tripadvisor ? 'tripadvisor' : "") + " </li>";
                }
                if (!out.length) {
                  out = "skipped";
                }
                return "<dt>External Services</dt><dd><ul>" + out + "</ul></dd>";
              }
            };
            meta = Onboarding.slides.meta;
            htmlgen = (function() {
              var results;
              results = [];
              for (k in meta) {
                v = meta[k];
                results.push(render[k](v.serialize()));
              }
              return results;
            })();
            this.preset = true;
            return rel.html(htmlgen.join(''));
          },
          do_proceed: function() {
            var data;
            if ((this.preset != null) !== true) {
              return;
            }
            (this.el.find('p[role="buttons"]')).slideUp();
            (this.el.find('p[role="progress"]')).slideDown();
            data = {
              bulk: true,
              payload: JSON.stringify({
                create: Onboarding.slides.meta['key-aspect'].serialize(),
                units: Onboarding.slides.meta['business-units'].serialize(),
                social: {
                  facebook: Onboarding.slides.meta['facebook'].serialize(),
                  twitter: Onboarding.slides.meta['twitter'].serialize()
                },
                services: Onboarding.slides.meta['websites'].serialize()
              })
            };
            return $.ajax({
              url: '/api/survey',
              data: data,
              type: 'POST'
            }).done((function(_this) {
              return function(dat) {
                return Onboarding.overlay.activate('success', {
                  success: (dat != null ? dat.partial : void 0) === false ? true : false,
                  uri: dat != null ? dat.uri_edit : void 0,
                  id: dat != null ? dat.id : void 0
                });
              };
            })(this)).fail((function(_this) {
              return function() {
                vex.dialog.alert({
                  className: 'vex-theme-default',
                  message: "Unknown server error. Please try again."
                });
                (_this.el.find('p[role="buttons"]')).slideDown();
                (_this.el.find('p[role="progress"]')).slideUp();
              };
            })(this));
          }
        },
        success: {
          msg_fail: "Your survey has been succesfully created, however a few\nof the unit owners you had designated weren't added because they're\nalready owners of another survey. No worries, though. You can always\nshare the units from your dashboard.",
          msg_success: "Your survey has been succesfully created.",
          init: function() {
            return this.el = $("div[data-overlay='success'");
          },
          pre_show: function(status) {
            (this.el.find('[role="edit"]')).attr('href', (status != null ? status.uri : void 0) || '#');
            (this.el.find('[role="dashboard"]')).attr('href', ("/survey/s:" + (status != null ? status.id : void 0) + "/analysis?parent=true") || '#');
            return (this.el.find('[role="message"]')).html((status != null ? status.success : void 0) ? this.msg_success : this.msg_fail);
          }
        }
      }
    },
    init: function() {
      $('#onboarding').html(Survaider.Templates['dashboard.onboarding.dock']());
      this.slides.init();
      return this.overlay.init();
    }
  };

  $(document).ready(function() {
    return Onboarding.init();
  });

  window.Onboarding = Onboarding;

}).call(this);
