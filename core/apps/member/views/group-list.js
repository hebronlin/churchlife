'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
  template: require('../templates/group-list.hbs'),
  el: '#group-list',

  render: function(){
    this.$el.html(this.template({groups: this.groups.toJSON()}));
    return this;
  },

  initialize: function(groups){
    var self = this;
    this.groups = groups;
  },
});
