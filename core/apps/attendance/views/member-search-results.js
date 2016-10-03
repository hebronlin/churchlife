'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
  template: require('../templates/member-search-results.hbs'),
  el: '#main-search-results',

  render: function(){
    this.$el.html(this.template({members: this.members.toJSON()}));
    return this;
  },

  initialize: function(members){
    var self = this;
    this.members = members;
  },
});
