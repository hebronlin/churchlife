'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: require('../models/member_group'),
  url: '/api/v1/member_group/',
});
