'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/member'),
  url: '/api/v1/member/',
});
