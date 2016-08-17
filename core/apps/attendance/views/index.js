'use strict';

var Marionette = require('backbone.marionette');
var MemberCollection = require('../../member/collections/member');
var EventCollection = require('../../event/collections/event');
var AttendanceModel = require('../models/attendance');
var AttendanceCollection = require('../collections/attendance');
var MemberAttendanceModel = require('../models/member_attendance');
var MemberAttendanceCollection = require('../collections/member_attendance');
var SpinnerModalView = require('../../common/views/modals/spinner');
var EditView = require('./modals/edit');

// The index view is a grid with the list of group.
module.exports = Marionette.LayoutView.extend({
  template: require('../templates/index.hbs'),
  regions: {
    modals: {
      selector: "#group-index-modal",
      regionType: Marionette.Modals
    }
  },

  events: {
    'click .group-add-button': 'add',
    'click .group-id-link': 'edit',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  render: function(){
    var self = this;
    this.member_attendance = new MemberAttendanceCollection();
    this.members.each(function(member) {
      self.event_attendance = new AttendanceCollection();
      var member_name = member.get('first_name') + ' ' + member.get('last_name');
      self.evts.each(function(evt) {
        var attendance = self.attendance.find(function(item) {
          return (item.get('member_id') === member.id && item.get('event_id') === evt.id) ;
        });
        if (typeof (attendance) === 'undefined' || attendance === null) {
          attendance = new AttendanceModel({member_id: member.id, evt_id: evt.id, attended: false});
        }
        self.event_attendance.add(attendance);
      });
      self.member_attendance.add(new MemberAttendanceModel({id: member.id, name: member_name,
                                        attendance: self.event_attendance.toJSON()}));
    });
    this.$el.html(this.template({evts: this.evts.toJSON(),
                                 members: this.member_attendance.toJSON()}));
    return this;
  },

  initialize: function(){
    var self = this;
    this.evts = new EventCollection();
    this.members = new MemberCollection();
    this.attendance = new AttendanceCollection();
    this.evts.fetch().done(
      function() {
        console.log('fetching events done');
        self.members.fetch().done(
          function() {
            console.log('fetching members done');
            self.attendance.fetch().done(
              function() {
                console.log('fetching attendance done');
                self.render();
              }
            )
          }
        )
        // $(document).ready(function() {$('#groupsTable').dataTable();});
      }
    );
  },
});
