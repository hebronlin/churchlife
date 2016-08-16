'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/attendance'),
  initialize: function(options) {
  	if (typeof (options) !== "undefined" && options.groupId) {
    	this.url = '/api/v1/attendance/?gid=' + options.groupId + '&format=json';
    }
  }
});
