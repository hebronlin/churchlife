'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: function() {
    return {
      id: 0,
      name: "",
      attendance: null,
    };
  }
});
