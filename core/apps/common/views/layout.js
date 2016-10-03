'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var MemberView = require('../../member/views/index');
var GroupView = require('../../group/views/index');
var GroupCollection = require('../../group/collections/group');
var AttendanceView = require('../../attendance/views/index');
var EventView = require('../../event/views/index');

module.exports = Marionette.LayoutView.extend({
  template: require('../templates/layout.hbs'),
  el: '#main-container-content',
  regions: {
      attendance: '#attendance',
      members: '#members',
      groups: '#groups',
      events: '#events'
  },

  render: function(){
    this.tabs = [{link: "attendance", label: "Attendance", active: true}];
    if (this.user_session.get("is_superuser")) {
      this.tabs.push({link: "members", label: "Members", active: false});
      this.tabs.push({link: "groups", label: "Groups", active: false});
      this.tabs.push({link: "events", label: "Events", active: false});
    }
    // this.tabs.add({link: "attendance", label: "Attendance", active: true});
    this.$el.html(this.template({tabs: this.tabs}));
    this.getRegion('attendance').show(new AttendanceView({user_session: this.user_session,
                                                          groups: this.groups}));
    if (this.user_session.get("is_superuser")) {
      this.getRegion('members').show(new MemberView({user_session: this.user_session,
                                                     groups: this.groups}));
      this.getRegion('groups').show(new GroupView(this.groups));
      this.getRegion('events').show(new EventView());
    }
    return this;
  },

  initialize: function(options){
    var self = this;
    // this.tabs = new Backbone.Collection;
    this.user_session = options.user_session;
    this.groups = new GroupCollection();
    this.groups.fetch().done(
      function() {
        console.log("Fetching groups done.");
        self.render();
      }
    );
  }
});

