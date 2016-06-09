'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var DropdownOptionsView = require('./dropdown-option');


// Generic dropdown view widget.
module.exports = Marionette.CompositeView.extend({
  template: require('../templates/dropdown.hbs'),

  childView: DropdownOptionsView,

  childViewContainer: '.dropdown-menu',

  childViewOptions: function(model, index) {
    return {
      options: this.options  // Pass all options to the child view.
    };
  },

  templateHelpers: function() {
    return {
      selectedLabel: this.options.selectedLabel,  // The selected value label.
      btnCSS: this.options.btnCSS,  // Additional CSS to apply to the button.
      ulCSS: this.options.ulCSS, // Additional CSS for the <ul> tag that wraps the options.
      liaCSS: this.options.liaCSS, // Additional CSS for the <li> tag (which is each option).
      isError: this.options.isError
    };
  }

});

