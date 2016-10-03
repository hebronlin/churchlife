'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/attendance'),
  initialize: function(options) {
  	this.url = '/api/v1/attendance/?';
  	if (typeof (options) !== "undefined") {
  		if (options.groupId) {
  			this.url += 'gid=' + options.groupId + '&';
  		}
  		if (options.date) {
  			this.url += 'day=' + options.date + '&';
  		}
    	this.url += 'format=json';
    }
  }
});
