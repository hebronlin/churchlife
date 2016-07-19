'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/event'),
  url: '/api/v1/event/',
});
