'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = window.$ = window.jQuery = require('jquery');
Backbone.$ = $;

module.exports = Marionette.LayoutView.extend({
  template: require('../templates/header.hbs'),
  render: function(){
    this.$el.html(this.template({title: "Members", placeholder: 'Search Members'}));
    return this;
  },
  initialize: function(){
  	this.render();
  }
});

