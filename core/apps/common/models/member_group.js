'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: function() {
    	return '/api/v1/member_group/';
    }
});