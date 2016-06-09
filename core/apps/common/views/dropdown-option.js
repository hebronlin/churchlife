'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var utils = require('../../utils');

// Generic dropdown option view.
module.exports = Marionette.ItemView.extend({
  template: require('../templates/dropdown-option.hbs'),

  tagName: 'li',

  templateHelpers: function() {
    var options = this.options.options;
    return {
      isSelected: this.isSelected(),
      id: this.model.get(options.idKey),
      label: this.model.get(options.labelKey),
      value: this.model.get(options.valueKey),
      liaCSS: options.liaCSS
    };
  },

  events: {
    'click a': 'updateOption'
  },

  isSelected: function() {
    var options = this.options.options;

    return this.model.get(options.idKey) === options.selectedKey;
  },

  // If we don't define the 'tagName' or 'el' properties, Backbone will wrap this view with
  // a <div> tag by default.
  //
  // But the template used in this view needs the <li> tag to contain an 'active' CSS class name,
  // if the item is the selected one.
  //
  // To achieve that, we either put the <li> tag in the template (with a Handlebars 'if' to set
  // that class), and then we remove the default <div> tag on this onRender() method.
  //
  // Or we use the tagName property, and we add the CSS class also on this onRender() method.
  onRender: function () {
    // Solution #1: get rid of the wrapping <div> tag:

    // // Get rid of that pesky wrapping-div.
    // // Assumes 1 child element present in template.
    // this.$el = this.$el.children();
    //
    // // Unwrap the element to prevent infinitely
    // // nesting elements during re-render.
    // this.$el.unwrap();
    // this.setElement(this.$el);

    // Solution #2: Add the required CSS classes to the <li> tag (we'll use this one).
    if (this.isSelected()) {
        this.$el.addClass('active');
    }
  },

  updateOption: function(e) {
    if (this.options.options.updateDOM) {
        // We usually will call the callback to set the change in the model, then the parent view will render
        // the collection again, rendering the dropdown again, with the selected values.
        // Thus we don't have to worry about clearing all the other options in the DOM (the "selected" attribute or "active" CSS class),
        // nor setting the dropdown value in a hidden input tag.
        //
        // So, if we need to do the changes in the DOM, we can set "updateDOM" to call the old dropdown code that takes care of those things:
        utils.dropdownSelectOptionClick($(e.currentTarget));
    }
    if (this.options.options.callback) {
      this.options.options.callback(e, this.options.options.callbackOptions);
    }
  }

});

