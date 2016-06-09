'use strict';

var Marionette = require('backbone.marionette');
var MemberListView = require('./member-list');
var MemberCollection = require('../collections/member');

// The index view is a grid with the list of member.
module.exports = Marionette.LayoutView.extend({
  template: require('../templates/index.hbs'),
  regions: {
    members: "#member-container"
  },

  initialize: function(){
    var self = this;

    this.members = new MemberCollection();

    this.members.fetch().done(
      function() {
        console.log('fetching members done');
        self.memberListView = new MemberListView(self.members);
        self.getRegion('members').show(self.memberListView);
      }
    );
  },

});
