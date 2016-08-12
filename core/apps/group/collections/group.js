'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/group'),
  url: '/api/v1/group/',
});
