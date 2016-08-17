'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/attendance'),
  initialize: function(options) {
  	this.url = '/api/v1/attendance/';
  	if (typeof (options) !== "undefined" && options.groupId) {
    	this.url = this.url + '?gid=' + options.groupId + '&format=json';
    }
  }
});
