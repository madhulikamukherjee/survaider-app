var Boner = {
    //
};

(function() {
  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      return $(el).bind('input.rivets', this.publish);
    },
    unbind: function(el) {
      return $(el).unbind('input.rivets');
    }
  };

  rivets.configure({
    prefix: "rv",
    adapter: {
      subscribe: function(obj, keypath, callback) {
        callback.wrapped = function(m, v) {
          return callback(v);
        };
        return obj.on('change:' + keypath, callback.wrapped);
      },
      unsubscribe: function(obj, keypath, callback) {
        return obj.off('change:' + keypath, callback.wrapped);
      },
      read: function(obj, keypath) {
        if (keypath === "cid") {
          return obj.cid;
        }
        return obj.get(keypath);
      },
      publish: function(obj, keypath, value) {
        if (obj.cid) {
          return obj.set(keypath, value);
        } else {
          return obj[keypath] = value;
        }
      }
    }
  });

}).call(this);

(function() {
  var BuilderView, EditFieldView, Formbuilder, FormbuilderCollection, FormbuilderModel, ScreenCollection, ScreenModel, ScreenView, ViewFieldView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  FormbuilderModel = (function(superClass) {
    extend(FormbuilderModel, superClass);

    function FormbuilderModel() {
      return FormbuilderModel.__super__.constructor.apply(this, arguments);
    }

    FormbuilderModel.prototype.sync = function() {};

    FormbuilderModel.prototype.indexInDOM = function() {
      var $wrapper;
      $wrapper = $(".sb-field-wrapper").filter((function(_this) {
        return function(_, el) {
          return $(el).data('cid') === _this.cid;
        };
      })(this));
      return $(".sb-field-wrapper").index($wrapper);
    };

    FormbuilderModel.prototype.is_input = function() {
      return Formbuilder.inputFields[this.get(Formbuilder.options.mappings.FIELD_TYPE)] != null;
    };

    return FormbuilderModel;

  })(Backbone.DeepModel);

  ScreenModel = (function(superClass) {
    extend(ScreenModel, superClass);

    function ScreenModel() {
      return ScreenModel.__super__.constructor.apply(this, arguments);
    }

    ScreenModel.prototype.screens = {
      intro: {
        title: 'Default Title',
        description: 'Default Description'
      },
      end: {
        title: 'Default Ending'
      }
    };

    return ScreenModel;

  })(Backbone.DeepModel);

  FormbuilderCollection = (function(superClass) {
    extend(FormbuilderCollection, superClass);

    function FormbuilderCollection() {
      return FormbuilderCollection.__super__.constructor.apply(this, arguments);
    }

    FormbuilderCollection.prototype.initialize = function() {
      return this.on('add', this.copyCidToModel);
    };

    FormbuilderCollection.prototype.model = FormbuilderModel;

    FormbuilderCollection.prototype.comparator = function(model) {
      return model.indexInDOM();
    };

    FormbuilderCollection.prototype.copyCidToModel = function(model) {
      return model.attributes.cid = model.cid;
    };

    return FormbuilderCollection;

  })(Backbone.Collection);

  ViewFieldView = (function(superClass) {
    extend(ViewFieldView, superClass);

    function ViewFieldView() {
      return ViewFieldView.__super__.constructor.apply(this, arguments);
    }


    /*
    The question cards.
     */

    ViewFieldView.prototype.className = "sb-field-wrapper";

    ViewFieldView.prototype.events = {
      'click .subtemplate-wrapper': 'focusEditView',
      'click .js-duplicate': 'duplicate',
      'click .js-clear': 'clear'
    };

    ViewFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    ViewFieldView.prototype.render = function() {
      this.$el.addClass('response-field-' + this.model.get(Formbuilder.options.mappings.FIELD_TYPE)).data('cid', this.model.cid).attr('data-cid', this.model.cid).html(Formbuilder.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      return this;
    };

    ViewFieldView.prototype.focusEditView = function() {
      return this.parentView.createAndShowEditView(this.model);
    };

    ViewFieldView.prototype.clear = function(e) {
      var cb, x;
      e.preventDefault();
      e.stopPropagation();
      cb = (function(_this) {
        return function() {
          _this.parentView.handleFormUpdate();
          return _this.model.destroy();
        };
      })(this);
      x = Formbuilder.options.CLEAR_FIELD_CONFIRM;
      switch (typeof x) {
        case 'string':
          if (confirm(x)) {
            return cb();
          }
          break;
        case 'function':
          return x(cb);
        default:
          return cb();
      }
    };

    ViewFieldView.prototype.duplicate = function() {
      var attrs;
      attrs = _.clone(this.model.attributes);
      delete attrs['id'];
      attrs['label'] += ' Copy';
      return this.parentView.createField(attrs, {
        position: this.model.indexInDOM() + 1
      });
    };

    return ViewFieldView;

  })(Backbone.View);

  EditFieldView = (function(superClass) {
    extend(EditFieldView, superClass);

    function EditFieldView() {
      return EditFieldView.__super__.constructor.apply(this, arguments);
    }

    EditFieldView.prototype.className = "edit-response-field";

    EditFieldView.prototype.events = {
      'click .js-add-option': 'addOption',
      'click .js-remove-option': 'removeOption',
      'click .js-default-updated': 'defaultUpdated',
      'input .option-label-input': 'forceRender',
      'click .sb-label-description': 'prepareLabel',
      'click .option': 'prepareLabel'
    };

    EditFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      return this.listenTo(this.model, "destroy", this.remove);
    };

    EditFieldView.prototype.render = function() {
      this.$el.html(Formbuilder.templates["edit/base"]({
        rf: this.model
      }));
      rivets.bind(this.$el, {
        model: this.model
      });
      return this;
    };

    EditFieldView.prototype.remove = function() {
      this.parentView.editView = void 0;
      $("#editField").removeClass("active");
      return EditFieldView.__super__.remove.apply(this, arguments);
    };

    EditFieldView.prototype.addOption = function(e) {
      var $el, field_type, i, newOption, op_len, options;
      $el = $(e.currentTarget);
      i = this.$el.find('.option').index($el.closest('.option'));
      options = this.model.get(Formbuilder.options.mappings.OPTIONS) || [];
      newOption = {
        label: Formbuilder.options.dict.DEFAULT_OPTION,
        checked: false
      };
      op_len = $el.parent().parent().find('.option').length;
      field_type = this.model.get(Formbuilder.options.mappings.FIELD_TYPE);
      if (Formbuilder.options.limit_map[field_type] && op_len >= Formbuilder.options.limit_map[field_type].max) {
        sweetAlert("", "This question only supports three options." + field_type, "error");
        return;
      }
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.removeOption = function(e) {
      var $el, field_type, index, op_len, options;
      $el = $(e.currentTarget);
      index = this.$el.find(".js-remove-option").index($el);
      op_len = $el.parent().parent().find('.option').length;
      field_type = this.model.get(Formbuilder.options.mappings.FIELD_TYPE);
      if (Formbuilder.options.limit_map[field_type] && op_len <= Formbuilder.options.limit_map[field_type].min) {
        sweetAlert("", "This question only supports three options." + field_type, "error");
        return;
      }
      options = this.model.get(Formbuilder.options.mappings.OPTIONS);
      options.splice(index, 1);
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.defaultUpdated = function(e) {
      var $el;
      $el = $(e.currentTarget);
      if (this.model.get(Formbuilder.options.mappings.FIELD_TYPE) !== 'checkboxes') {
        this.$el.find(".js-default-updated").not($el).attr('checked', false).trigger('change');
      }
      return this.forceRender();
    };

    EditFieldView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };

    EditFieldView.prototype.prepareLabel = function(e) {
      var $el;
      $el = $(e.currentTarget).find("input").eq(0);
      if ($el.val().indexOf("\x1e") > -1) {
        return $el.val("");
      }
    };

    return EditFieldView;

  })(Backbone.View);

  BuilderView = (function(superClass) {
    extend(BuilderView, superClass);

    function BuilderView() {
      return BuilderView.__super__.constructor.apply(this, arguments);
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-form': 'saveForm',
      'click .sb-add-field-types a': 'addField',
      'mouseover .sb-add-field-types': 'lockLeftWrapper',
      'mouseout .sb-add-field-types': 'unlockLeftWrapper',
      'hide.bs.modal #sb_edit_model': 'deSelectField'
    };

    BuilderView.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.formBuilder = options.formBuilder, this.bootstrapData = options.bootstrapData;
      if (selector != null) {
        this.setElement($(selector));
      }
      this.collection = new FormbuilderCollection;
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('change', this.handleFormUpdate, this);
      this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
      this.collection.bind('destroy', this.ensureEditViewScrolled, this);
      this.render();
      this.collection.reset(this.bootstrapData);
      this.bindSaveEvent();
      return setTimeout((function(_this) {
        return function() {
          _this.formSaved = false;
          _this.saveForm.call(_this);
          return $(".play-now").removeAttr("disabled");
        };
      })(this), 2500);
    };

    BuilderView.prototype.bindSaveEvent = function() {
      this.formSaved = true;
      this.saveFormButton = $(".js-save-form");
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      if (!!Formbuilder.options.AUTOSAVE) {
        setInterval((function(_this) {
          return function() {
            return _this.saveForm.call(_this);
          };
        })(this), 5000);
      }
      return $(window).bind('beforeunload', (function(_this) {
        return function() {
          if (_this.formSaved) {
            return void 0;
          } else {
            return Formbuilder.options.dict.UNSAVED_CHANGES;
          }
        };
      })(this));
    };

    BuilderView.prototype.reset = function() {
      this.$responseFields.html('');
      return this.addAll();
    };

    BuilderView.prototype.render = function() {
      var k, len, ref, subview;
      this.$el.html(Formbuilder.templates['page']());
      this.$fbLeft = this.$el.find('.sb-left');
      this.$responseFields = this.$el.find('.sb-response-fields');
      this.hideShowNoResponseFields();
      ref = this.SUBVIEWS;
      for (k = 0, len = ref.length; k < len; k++) {
        subview = ref[k];
        new subview({
          parentView: this
        }).render();
      }
      return this;
    };

    BuilderView.prototype.bindWindowScrollEvent = function() {
      return $(window).on('scroll', (function(_this) {
        return function() {
          var element, maxMargin, newMargin;
          element = $(".sb-tab-pane");
          newMargin = Math.max(0, $(window).scrollTop() - element.offset().top);
          maxMargin = _this.$responseFields.height();
          return element.css({
            'padding-top': Math.min(maxMargin, newMargin)
          });
        };
      })(this));
    };

    BuilderView.prototype.addOne = function(responseField, _, options) {
      var $replacePosition, view;
      view = new ViewFieldView({
        model: responseField,
        parentView: this
      });
      if (options.$replaceEl != null) {
        return options.$replaceEl.replaceWith(view.render().el);
      } else if ((options.position == null) || options.position === -1) {
        return this.$responseFields.append(view.render().el);
      } else if (options.position === 0) {
        return this.$responseFields.prepend(view.render().el);
      } else if (($replacePosition = this.$responseFields.find(".sb-field-wrapper").eq(options.position))[0]) {
        return $replacePosition.before(view.render().el);
      } else {
        return this.$responseFields.append(view.render().el);
      }
    };

    BuilderView.prototype.setSortable = function() {
      if (this.$responseFields.hasClass('ui-sortable')) {
        this.$responseFields.sortable('destroy');
      }
      this.$responseFields.sortable({
        forcePlaceholderSize: true,
        placeholder: 'sortable-placeholder',
        stop: (function(_this) {
          return function(e, ui) {
            var rf;
            if (ui.item.data('field-type')) {
              rf = _this.collection.create(Formbuilder.helpers.defaultFieldAttrs(ui.item.data('field-type')), {
                $replaceEl: ui.item
              });
              _this.createAndShowEditView(rf);
            }
            _this.handleFormUpdate();
            return true;
          };
        })(this),
        update: (function(_this) {
          return function(e, ui) {
            if (!ui.item.data('field-type')) {
              return _this.ensureEditViewScrolled();
            }
          };
        })(this),
        deactivate: (function(_this) {
          return function(e, ui) {};
        })(this),
        activate: (function(_this) {
          return function(e, ui) {};
        })(this)
      });
      return this.setDraggable();
    };

    BuilderView.prototype.setDraggable = function() {
      var $addFieldButtons;
      $addFieldButtons = this.$el.find("[data-field-type]");
      return $addFieldButtons.draggable({
        connectToSortable: this.$responseFields,
        helper: (function(_this) {
          return function() {
            var $helper;
            $helper = $("<div class='response-field-draggable-helper' />");
            $helper.css({
              width: '374px',
              height: '80px'
            });
            return $helper;
          };
        })(this)
      });
    };

    BuilderView.prototype.list_update = function() {
      var i, j, k, last, len, ref;
      i = 0;
      last = void 0;
      ref = this.collection.models;
      for (k = 0, len = ref.length; k < len; k++) {
        j = ref[k];
        j.set('q_no', i + 1);
        last = j;
        i += 1;
      }
      return console.log(last);
    };

    BuilderView.prototype.addAll = function() {
      this.collection.each(this.addOne, this);
      return this.setSortable();
    };

    BuilderView.prototype.hideShowNoResponseFields = function() {
      return this.$el.find(".sb-no-response-fields")[this.collection.length > 0 ? 'hide' : 'show']();
    };

    BuilderView.prototype.addField = function(e) {
      var field_type;
      field_type = $(e.currentTarget).data('field-type');
      return this.createField(Formbuilder.helpers.defaultFieldAttrs(field_type));
    };

    BuilderView.prototype.createField = function(attrs, options) {
      var rf;
      rf = this.collection.create(attrs, options);
      this.createAndShowEditView(rf);
      return this.handleFormUpdate();
    };

    BuilderView.prototype.createAndShowEditView = function(model) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".sb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
      $responseFieldEl.addClass('editing').siblings('.sb-field-wrapper').removeClass('editing');
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".sb-edit-field-wrapper").html($newEditEl);
      $('#sb_edit_model').modal('show');
      this.scrollLeftWrapper($responseFieldEl);
      return this;
    };

    BuilderView.prototype.deSelectField = function(model) {
      return this.$el.find(".sb-field-wrapper").removeClass('editing');
    };

    BuilderView.prototype.ensureEditViewScrolled = function() {
      if (!this.editView) {
        return;
      }
      return this.scrollLeftWrapper($(".sb-field-wrapper.editing"));
    };

    BuilderView.prototype.scrollLeftWrapper = function($responseFieldEl) {
      this.unlockLeftWrapper();
      if (!$responseFieldEl[0]) {
        return;
      }
      return $.scrollWindowTo((this.$el.offset().top + $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200, (function(_this) {
        return function() {
          return _this.lockLeftWrapper();
        };
      })(this));
    };

    BuilderView.prototype.lockLeftWrapper = function() {
      return this.$fbLeft.data('locked', true);
    };

    BuilderView.prototype.unlockLeftWrapper = function() {
      return this.$fbLeft.data('locked', false);
    };

    BuilderView.prototype.handleFormUpdate = function(e) {
      if (this.updatingBatch) {
        return;
      }
      this.formSaved = false;
      this.saveFormButton.removeAttr('disabled').text(Formbuilder.options.dict.SAVE_FORM);
      return this.list_update();
    };

    BuilderView.prototype.saveForm = function(e) {
      var payload;
      if (this.formSaved) {
        return;
      }
      this.formSaved = true;
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      this.collection.sort();
      payload = JSON.stringify({
        fields: this.collection.toJSON(),
        screens: this.formBuilder.screenView.toJSON()
      });
      console.log(payload);
      if (Formbuilder.options.HTTP_ENDPOINT) {
        this.doAjaxSave(payload);
      }
      return this.formBuilder.trigger('save', payload);
    };

    BuilderView.prototype.doForceSave = function() {
      this.formSaved = false;
      return this.saveForm();
    };

    BuilderView.prototype.doAjaxSave = function(payload) {
      return $.ajax({
        url: Formbuilder.options.HTTP_ENDPOINT,
        type: Formbuilder.options.HTTP_METHOD,
        data: payload,
        contentType: "application/json",
        success: (function(_this) {
          return function(data) {
            var datum, k, len, ref;
            _this.updatingBatch = true;
            for (k = 0, len = data.length; k < len; k++) {
              datum = data[k];
              if ((ref = _this.collection.get(datum.cid)) != null) {
                ref.set({
                  id: datum.id
                });
              }
              _this.collection.trigger('sync');
            }
            return _this.updatingBatch = void 0;
          };
        })(this)
      });
    };

    return BuilderView;

  })(Backbone.View);

  ScreenCollection = (function(superClass) {
    extend(ScreenCollection, superClass);

    function ScreenCollection() {
      return ScreenCollection.__super__.constructor.apply(this, arguments);
    }

    ScreenCollection.prototype.initialize = function() {};

    ScreenCollection.prototype.model = ScreenModel;

    return ScreenCollection;

  })(Backbone.Collection);

  ScreenView = (function(superClass) {
    extend(ScreenView, superClass);

    function ScreenView() {
      return ScreenView.__super__.constructor.apply(this, arguments);
    }

    ScreenView.prototype.events = {
      'input #survey_title': 'update',
      'input #survey_description': 'update',
      'input #survey_thank_you': 'update'
    };

    ScreenView.prototype.initialize = function(options) {
      var screens, selector;
      selector = options.selector, this.formBuilder = options.formBuilder, screens = options.screens;
      if (selector != null) {
        this.setElement($(selector));
      }
      this.dat = screens;
      return this.render(screens);
    };

    ScreenView.prototype.update = _.debounce(function() {
      this.dat = [$('#survey_title').val(), $('#survey_description').val(), $('#survey_thank_you').val()];
      return this.formBuilder.mainView.doForceSave();
    }, 500);

    ScreenView.prototype.toJSON = function() {
      return this.dat;
    };

    ScreenView.prototype.render = function(dat) {
      $('#survey_title').val(dat[0]);
      $('#survey_description').val(dat[1]);
      return $('#survey_thank_you').val(dat[2]);
    };

    return ScreenView;

  })(Backbone.View);

  Formbuilder = (function() {
    Formbuilder.helpers = {
      defaultFieldAttrs: function(field_type) {
        var attrs, base;
        attrs = {};
        attrs[Formbuilder.options.mappings.LABEL] = Formbuilder.options.dict.DEFAULT_LABEL;
        attrs[Formbuilder.options.mappings.FIELD_TYPE] = field_type;
        attrs[Formbuilder.options.mappings.REQUIRED] = true;
        attrs[Formbuilder.options.mappings.QNO] = 2;
        attrs['field_options'] = {};
        return (typeof (base = Formbuilder.fields[field_type]).defaultAttributes === "function" ? base.defaultAttributes(attrs) : void 0) || attrs;
      },
      simple_format: function(x) {
        return x != null ? x.replace(/\n/g, '<br />') : void 0;
      }
    };

    Formbuilder.options = {
      BUTTON_CLASS: 'sb-button',
      HTTP_ENDPOINT: '',
      HTTP_METHOD: 'POST',
      AUTOSAVE: true,
      CLEAR_FIELD_CONFIRM: false,
      mappings: {
        SIZE: 'field_options.size',
        UNITS: 'field_options.units',
        LABEL: 'label',
        FIELD_TYPE: 'field_type',
        REQUIRED: 'required',
        ADMIN_ONLY: 'admin_only',
        OPTIONS: 'field_options.options',
        DESCRIPTION: 'field_options.description',
        INCLUDE_OTHER: 'field_options.include_other_option',
        INCLUDE_BLANK: 'field_options.include_blank_option',
        INTEGER_ONLY: 'field_options.integer_only',
        MIN: 'field_options.min',
        MAX: 'field_options.max',
        MINLENGTH: 'field_options.minlength',
        MAXLENGTH: 'field_options.maxlength',
        LENGTH_UNITS: 'field_options.min_max_length_units',
        NEXT_VA: 'next.va',
        VALIDATION: 'field_options.validation',
        QNO: 'q_no'
      },
      limit_map: {
        yes_no: {
          min: 2,
          max: 3
        },
        single_choice: {
          min: 2,
          max: 5
        },
        multiple_choice: {
          min: 2,
          max: 5
        },
        ranking: {
          min: 2,
          max: 6
        },
        group_rating: {
          min: 2,
          max: 3
        }
      },
      dict: {
        ALL_CHANGES_SAVED: 'Saved',
        DEFAULT_LABEL: 'Question Title\x1e',
        DEFAULT_OPTION: 'Option\x1e',
        DEFAULT_YES: 'Yes\x1e',
        DEFAULT_NO: 'No\x1e',
        DEFAULT_MAYBE: 'Maybe\x1e',
        SAVE_FORM: 'Save',
        UNSAVED_CHANGES: 'You have unsaved changes. If you leave this page, you will lose those changes!',
        FIELDS: {
          short_text: "Short and quick answers to short and quick questions!<br>eg. What is your name?",
          long_text: "Longer, detailed responses.<br>eg. What do you REALLY feel about our product?",
          yes_no: "The quick opinion question.",
          multiple_choice: "Your responder selects many or all options here!",
          single_choice: "For questions to which you want only one answer",
          ranking: "Users can drag and drop the following options according to their preference!",
          rating: "This question asks to rate on a scale of 1 to 10.<br>eg. How much do you like the design of our product?",
          group_rating: "Ask users to rate a number of things on a scale of one star to five stars!"
        }
      }
    };

    Formbuilder.proxy = {
      addTargetAndSources: function() {
        return console.log("Fired.");
      }
    };

    Formbuilder.fields = {};

    Formbuilder.inputFields = {};

    Formbuilder.nonInputFields = {};

    Formbuilder.registerField = function(name, opts) {
      var k, len, ref, x;
      ref = ['view', 'edit'];
      for (k = 0, len = ref.length; k < len; k++) {
        x = ref[k];
        opts[x] = _.template(opts[x]);
      }
      opts.field_type = name;
      Formbuilder.fields[name] = opts;
      if (opts.type === 'non_input') {
        return Formbuilder.nonInputFields[name] = opts;
      } else {
        return Formbuilder.inputFields[name] = opts;
      }
    };

    function Formbuilder(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        formBuilder: this
      });
      this.mainView = new BuilderView(args);
      this.screenView = new ScreenView(args);
    }

    return Formbuilder;

  })();

  window.Formbuilder = Formbuilder;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Formbuilder;
  } else {
    window.Formbuilder = Formbuilder;
  }

}).call(this);

(function() {
  Formbuilder.registerField('group_rating', {
    order: 8,
    view: "<% lis = rf.get(Formbuilder.options.mappings.OPTIONS) || [] %>\n<% for (i = 0; i < lis.length; i += 1) { %>\n  <div class=\"line\">\n    <label class='sb-option'>\n      <p>\n          <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n          <br>\n          <i class=\"fa fa-star\"></i>\n          <i class=\"fa fa-star\"></i>\n          <i class=\"fa fa-star\"></i>\n          <i class=\"fa fa-star\"></i>\n          <i class=\"fa fa-star\"></i>\n      </p>\n    </label>\n  </div>\n<% } %>\n  <button class=\"target hanging\"\n          data-target = \"out\"\n          id = \"<%= rf.cid %>_0\"\n  ></button>",
    edit: "<%= Formbuilder.templates['edit/options']() %>",
    addButton: "<span class=\"pull-left\"><i class=\"fa fa-star\"></i></span> Group Rating</span>",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }, {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('multiple_choice', {
    order: 5,
    view: "<% lis = rf.get(Formbuilder.options.mappings.OPTIONS) || [] %>\n<% for (i = 0; i < lis.length; i += 1) { %>\n  <div class=\"line\">\n      <p><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %></p>\n  </div>\n<% } %>\n  <button class=\"target hanging\"\n          data-target = \"out\"\n          id = \"<%= rf.cid %>_0\"\n  ></button>",
    edit: "<%= Formbuilder.templates['edit/options']() %>",
    addButton: "<span class=\"pull-left\"><span class=\"fa fa-square-o\"></span></span> Multiple Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }, {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('long_text', {
    order: 1,
    view: "<div class=\"line\">\n    <p>Any Response</p>\n    <button class=\"target\"\n            data-target = \"out\"\n            id = \"<%= rf.cid %>_0\"\n            data-target-index = \"0\"\n            data-target-value = \"\"\n    ></button>\n</div>",
    edit2: "<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",
    edit: "",
    addButton: "<span class=\"pull-left\">&#182;</span> Long Text"
  });

}).call(this);

(function() {
  Formbuilder.registerField('ranking', {
    order: 6,
    view: "<% lis = rf.get(Formbuilder.options.mappings.OPTIONS) || [] %>\n<% for (i = 0; i < lis.length; i += 1) { %>\n  <div class=\"line\">\n    <label class='sb-option'>\n      <p>\n          <span class=\"digit up\"><i class=\"fa fa-arrow-up\"></i></span><span class=\"digit down\"><i class=\"fa fa-arrow-down\"></i></span>\n          <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n      </p>\n    </label>\n  </div>\n<% } %>\n  <button class=\"target hanging\"\n          data-target = \"out\"\n          id = \"<%= rf.cid %>_0\"\n  ></button>",
    edit: "<%= Formbuilder.templates['edit/options']() %>",
    addButton: "<span class=\"pull-left\"><span class=\"fa fa-bars\"></span></span> Ranking",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }, {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('rating', {
    order: 7,
    view: "<div class=\"line\">\n  <label class='sb-option'>\n    <p>\n          <span class=\"digit\">1</span>\n          <span class=\"digit\">2</span>\n          <span class=\"digit\">3</span>\n          <span class=\"digit\">4</span>\n          <span class=\"digit spacer\">...</span>\n          <span class=\"digit\">8</span>\n          <span class=\"digit\">9</span>\n          <span class=\"digit\">10</span>\n    </p>\n  </label>\n</div>\n  <button class=\"target hanging\"\n          data-target = \"out\"\n          id = \"<%= rf.cid %>_0\"\n  ></button>",
    edit: "",
    addButton: "<span class=\"pull-left\"><span class=\"fa fa-star\"></span></span> Rating"
  });

}).call(this);

(function() {
  Formbuilder.registerField('short_text', {
    order: 0,
    view: "<div class=\"line\">\n    <p>Any Response</p>\n    <button class=\"target hanging\"\n            data-target = \"out\"\n            id = \"<%= rf.cid %>_0\"\n    ></button>\n</div>",
    edit: "<%= Formbuilder.templates['edit/validation']() %>",
    addButton: "<span class='pull-left'><span class='fa fa-font'></span></span> Short Text"
  });

}).call(this);

(function() {
  Formbuilder.registerField('single_choice', {
    order: 4,
    view: "<% lis = rf.get(Formbuilder.options.mappings.OPTIONS) || [] %>\n<% for (i = 0; i < lis.length; i += 1) { %>\n  <div class=\"line\">\n      <span class=\"link\"></span>\n      <p><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %></p>\n      <button class=\"target\"\n              data-target = \"out\"\n              id = \"<%= rf.cid %>_<%= i %>\"\n              data-target-index = \"<%= i %>\"\n              data-target-value = \"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\"\n      ></button>\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']() %>",
    addButton: "<span class=\"pull-left\"><span class=\"fa fa-circle-o\"></span></span> Single Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }, {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('yes_no', {
    order: 2,
    view: "<% lis = rf.get(Formbuilder.options.mappings.OPTIONS) || [] %>\n<% for (i = 0; i < lis.length; i += 1) { %>\n  <div class=\"line\">\n      <span class=\"link\"></span>\n      <p><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %></p>\n      <button class=\"target\"\n              data-target = \"out\"\n              id = \"<%= rf.cid %>_<%= i %>\"\n              data-target-index = \"<%= i %>\"\n              data-target-value = \"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\"\n      ></button>\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']() %>",
    addButton: "<span class=\"pull-left\"><span class=\"fa fa-dot-circle-o\"></span></span> Yes \/ No",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }, {
          label: Formbuilder.options.dict.DEFAULT_OPTION,
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

this["Formbuilder"] = this["Formbuilder"] || {};
this["Formbuilder"]["templates"] = this["Formbuilder"]["templates"] || {};

this["Formbuilder"]["templates"]["edit/add_logic"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Add Option</div>\n\n';
 if (typeof includeBlank !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_BLANK )) == null ? '' : __t) +
'\' />\n    Include blank\n  </label>\n';
 } ;
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\n  <a class="js-remove-option" title="Remove Option"><i class="fa fa-times-circle"></i></a>\n</div>\n\n';
 if (typeof includeOther !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER )) == null ? '' : __t) +
'\' />\n    Include "other"\n  </label>\n';
 } ;
__p += '\n\n<a class="js-add-option .button"><i class="fa fa-plus-circle"></i>&nbsp;Add Option</a>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n' +
((__t = ( Formbuilder.templates['edit/common']({rf: rf}) )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_header"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-field-label\'>\n  <span data-rv-text="model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'"></span>\n  <code class=\'field-type\' data-rv-text=\'model.' +
((__t = ( Formbuilder.options.mappings.FIELD_TYPE )) == null ? '' : __t) +
'\'></code>\n  <span class=\'fa fa-arrow-right pull-right\'></span>\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['edit/base_header']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/checkboxes"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.REQUIRED )) == null ? '' : __t) +
'\' />\n  Required\n</label>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/common"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Edit Question</div>\n\n<div class=\'sb-common-wrapper\'>\n  <div class=\'sb-label-description\'>\n    ' +
((__t = ( Formbuilder.templates['edit/label_description']({rf: rf}) )) == null ? '' : __t) +
'\n  </div>\n  <div class=\'sb-common-checkboxes\'>\n    ' +
((__t = ( Formbuilder.templates['edit/checkboxes']() )) == null ? '' : __t) +
'\n  </div>\n  <div class=\'sb-clear\'></div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/integer_only"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Integer only</div>\n<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INTEGER_ONLY )) == null ? '' : __t) +
'\' />\n  Only accept integers\n</label>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/label_description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="form-group form-group-default required">\n<label>Question Label</label>\n<textarea class="form-control" data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'\'></textarea>\n</div>\n<p>\n' +
((__t = ( Formbuilder.options.dict.FIELDS[rf.get(Formbuilder.options.mappings.FIELD_TYPE)] )) == null ? '' : __t) +
'\n</p>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Minimum / Maximum</div>\n\nAbove\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MIN )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nBelow\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAX )) == null ? '' : __t) +
'" style="width: 30px" />\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max_length"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Length Limit</div>\n\nMin\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MINLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nMax\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAXLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.LENGTH_UNITS )) == null ? '' : __t) +
'" style="width: auto;">\n  <option value="characters">characters</option>\n  <option value="words">words</option>\n</select>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Add Option</div>\n\n';
 if (typeof includeBlank !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_BLANK )) == null ? '' : __t) +
'\' />\n    Include blank\n  </label>\n';
 } ;
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\n  <a class="js-remove-option" title="Remove Option"><i class="fa fa-times-circle"></i></a>\n</div>\n\n';
 if (typeof includeOther !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER )) == null ? '' : __t) +
'\' />\n    Include "other"\n  </label>\n';
 } ;
__p += '\n\n<a class="js-add-option .button"><i class="fa fa-plus-circle"></i>&nbsp;Add Option</a>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/size"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Size</div>\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.SIZE )) == null ? '' : __t) +
'">\n  <option value="small">Small</option>\n  <option value="medium">Medium</option>\n  <option value="large">Large</option>\n</select>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/units"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Units</div>\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.UNITS )) == null ? '' : __t) +
'" />\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/validation"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="form-group required">\n    <select data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.VALIDATION )) == null ? '' : __t) +
'\'>\n      <option value="text">Text</option>\n      <option value="email">Email</option>\n      <option value="telephone">Phone Number</option>\n    </select>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/yes_no"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-edit-section-header\'>Yes No</div>\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\n  <a class="js-remove-option" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\n</div>\n\n<div class=\'sb-bottom-add\'>\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add option</a>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["page"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row no-margin">\n    <div class="col-xs-3 fixed">\n        <div id="builder-panel"></div>\n        <div class="panel panel-transparent affix" style="position:fixed; width:25%;">\n          <div class="panel-heading">\n            <span class="font-montserrat text-uppercase bold">Project Details</span><br>\n            <span class="h3 font-montserrat" id="builder-project-title"></span>\n            <br>\n            <div class="btn-group btn-group-sm btn-group-justified m-t-10 m-b-10">\n              <a href="#" class="btn btn-primary" onclick="$(\'#survey_export_modal\').modal(\'show\');">\n                <span class="font-montserrat">Share / Preview</span>\n              </a>\n              <a href="#" class="btn btn-default" onclick="$(\'#survey_settings_modal\').modal(\'show\');">\n                <i class="fa fa-cog"></i>\n                <span class="font-montserrat">Settings</span>\n              </a>\n            </div>\n            <button class="btn btn-success font-montserrat btn-sm js-save-form">Save</button>\n          </div>\n          <div class="panel-body">\n            <hr>\n            <span class="font-montserrat text-uppercase bold">Fields</span>\n            <br>\n            ' +
((__t = ( Formbuilder.templates['partials/add_field']() )) == null ? '' : __t) +
'\n            <hr>\n            <p>Drag and Drop the questions to begin building the survaider.</p>\n          </div>\n        </div>\n\n        <!-- <button class=\'btn btn-success js-save-form\'></button> -->\n    </div>\n    <div class="col-xs-9 no-padding">\n        ' +
((__t = ( Formbuilder.templates['partials/right_side']() )) == null ? '' : __t) +
'\n    </div>\n</div>\n' +
((__t = ( Formbuilder.templates['partials/edit_field']() )) == null ? '' : __t) +
'\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/add_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'sb-tab-pane active\' id=\'addField\'>\n  <div class=\'sb-add-field-types\'>\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(Formbuilder.inputFields, 'order'), function(f){ ;
__p += '\n        <a class="btn btn-block btn-default font-montserrat" data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(Formbuilder.nonInputFields, 'order'), function(f){ ;
__p += '\n        <a data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'" class="' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/edit_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal fade slide-right" id="sb_edit_model" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog modal-sm">\n    <div class="modal-content-wrapper">\n      <div class="modal-content">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>\n        </button>\n        <div class="container-xs-height full-height">\n          <div class="row-xs-height">\n            <div class="modal-body col-xs-height col-middle">\n                <div class=\'sb-field-options\' id=\'editField\'>\n                  <div class=\'sb-edit-field-wrapper\'></div>\n                  <div class="sb-field-options-done">\n                      <button onclick=\'$("#editField").removeClass("active");\'>Done</button>\n                  </div>\n                </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="modal fade slide-up" id="sb_upload_model" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog modal-sm">\n    <div class="modal-content-wrapper">\n      <div class="modal-content">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>\n        </button>\n        <div class="container-xs-height full-height">\n          <div class="row-xs-height">\n            <div class="modal-body col-xs-height col-middle text-center   ">\n\n              <form action="/file-upload" class="dropzone no-margin dz-clickable">\n\n                    <div class="dz-default dz-message"><span>Drop files here to upload</span></div></form>\n\n                      <button onclick=\'$("#editField").removeClass("active");\'>Done</button>\n\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/left_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="hesader">\n        <h2>Sample Survey</h2>\n        <button class=\'js-save-form\'></button>\n        <button class=\'play-now\' onclick="Router.play();" disabled>Play Now!</button>\n    </div>\n\n    <div class="content">\n        <h2>Question Type</h2>\n        <div class=\'sb-tab-content\'>\n            Formbuilder.templates[\'partials/edit_field\']()\n        </div>\n    </div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/right_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-right\'>\n  <div id=\'svg-canvas\'></div>\n  <div class="sb-survey-description above">\n      <p class="section">Introduction Screen</p>\n      <div class="screen_head">\n        <input type="text" placeholder="Survey Title" value="" id="survey_title">\n        <textarea id="survey_description"></textarea>\n        <button class="target_O"\n                id = "i"\n                data-target = "top_out"\n                data-target-index = "0"\n        ></button>\n      </div>\n  </div>\n  <div class=\'sb-response-fields\'>\n  </div>\n  <div class="sb-survey-description below">\n      <p class="section">End Screen</p>\n      <textarea id="survey_thank_you"></textarea>\n      <button class="target_O"\n              id = "j"\n              data-target = "top_in"\n              data-target-index = "0"\n      ></button>\n  </div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/save_button"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'sb-save-wrapper\'>\n  <button class=\'js-save-form ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'\'></button>\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["view/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\n    <div class="field-card">\n        <div class="meta">\n            <p class="section">Question ' +
((__t = ( rf.get('q_no') )) == null ? '' : __t) +
'</p>\n\n            ' +
((__t = ( Formbuilder.templates['view/label']({rf: rf}) )) == null ? '' : __t) +
'\n\n            <button class="target" data-target="in" id="' +
((__t = ( rf.cid )) == null ? '' : __t) +
'" ></button>\n        </div>\n        <div class="logic">\n            <p class="section">Options</p>\n            ' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\n        </div>\n        ' +
((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\n    </div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

this["Formbuilder"]["templates"]["view/description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'help-block\'>\n  ' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.DESCRIPTION)) )) == null ? '' : __t) +
'\n</span>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/duplicate_remove"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'actions-wrapper\'>\n  <a class="js-duplicate" title="Duplicate Field">Duplicate</a>\n  <a class="js-clear" title="Remove Field">Delete</a>\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["view/label"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<p class="title">' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.LABEL)) )) == null ? '' : __t) +
'</p>\n<p class="type">\n    <!--<strong>Type</strong>: -->\n    <small>' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.FIELD_TYPE)).replace(/_/, " ") )) == null ? '' : __t) +
'</small>\n    <!--\n    &bullet;\n    <strong>CID:</strong> ' +
((__t = ( Formbuilder.attributes )) == null ? '' : __t) +
'\n    -->\n    &bullet;<small>\n    ';
 if (rf.get(Formbuilder.options.mappings.REQUIRED)) { ;
__p += '\n    Required\n    ';
 } else { ;
__p += '\n    Optional\n    ';
 } ;
__p += '\n    ';
 if (rf.get(Formbuilder.options.mappings.VALIDATION)) { ;
__p += '\n    &bullet; ' +
((__t = ( rf.get(Formbuilder.options.mappings.VALIDATION) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    </small>\n</p>\n';

}
return __p
};