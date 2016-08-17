'use strict';

var Marionette = require('backbone.marionette');
var MemberView = require('../../member/views/index');
var GroupView = require('../../group/views/index');
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
    this.getRegion('attendance').show(new AttendanceView());
    this.getRegion('members').show(new MemberView());
    this.getRegion('groups').show(new GroupView());
    this.getRegion('events').show(new EventView());
    return this;
  },
});

