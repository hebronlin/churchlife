'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var DropdownView = require('../../common/views/dropdown');
var $ = window.$ = window.jQuery = require('jquery');
Backbone.$ = $;


module.exports = Marionette.LayoutView.extend({
  template: require('../templates/header.hbs'),
});

