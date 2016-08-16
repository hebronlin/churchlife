'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/member'),
  initialize: function(options) {
    this.url = '/api/v1/member/?gid=' + options.groupId + '&format=json';
  }
});
