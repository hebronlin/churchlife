'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/member_search'),
  // url: '/api/v1/member/search/',
  initialize: function(options) {
    this.url = '/api/v1/member/search/?';
  	if (typeof (options) !== "undefined") {
  		if (options.first_name) {
  			this.url += 'fn=' + options.first_name + '&';
  		}
  		if (options.last_name) {
  			this.url += 'ln=' + options.last_name + '&';
  		}
    	this.url += 'format=json';
    }
    console.log(this.url);
  }
});
