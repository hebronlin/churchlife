'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/user_session'),
  url: '/api/v1/user_session/',
});
