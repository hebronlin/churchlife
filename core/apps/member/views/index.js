'use strict';

var Marionette = require('backbone.marionette');
var HeaderView = require('./header');
var MemberListView = require('./member-list');
var MemberCollection = require('../collections/member');
var $ = require('jquery');
// var dt = require('datatables.net')(window, $);

// The index view is a grid with the list of member.
module.exports = Marionette.LayoutView.extend({
  template: require('../templates/index.hbs'),
  regions: {
    header: '#tab-content-header',
    members: '#tab-content-container'
  },

  initialize: function(options){
    var self = this;
    this.members = new MemberCollection({groupId: options.groupId});
    this.members.fetch().done(
      function() {
        console.log('fetching members done');
        self.getRegion('header').show(new HeaderView());
        self.memberListView = new MemberListView(self.members);
        self.getRegion('members').show(self.memberListView);
        // $(document).ready(function() {$('#membersTable').dataTable();});
      }
    );
  },

});
