'use strict';

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
	tabs    : [
    {link: "attendance", label: "Attendance", active: true},
		{link: "members", label: "Members", active: false},
		{link: "groups", label: "Groups", active: false},
    {link: "events", label: "Events", active: false}
	],

  render: function(){
    this.$el.html(this.template({tabs: this.tabs}));
    var attendanceView = new AttendanceView({user_session: this.user_session,
                                             groups: this.groups});
    this.getRegion('attendance').show(attendanceView);
    this.getRegion('members').show(new MemberView({user_session: this.user_session,
                                                   groups: this.groups}));
    if (this.user_session.get("is_superuser")) {
      this.getRegion('groups').show(new GroupView(this.groups));
      this.getRegion('events').show(new EventView());
    }
    return this;
  },

  initialize: function(options){
    var self = this;
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

