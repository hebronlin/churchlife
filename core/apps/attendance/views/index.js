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
    'change .group_select': 'selectGroup',
    'click .member-add-button': 'add',
    'click .attendance-check': 'updateAttendance',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  selectGroup: function(e) {
    this.groupId = e.target.value;
    this.members = new MemberCollection({groupId:this.groupId});
    this.attendance = new AttendanceCollection({groupId:this.groupId});
    this.renderGroupAttendance();
  },

  updateAttendance: function(e){
    e.preventDefault();
    var event_attendance;
    var id = $(e.currentTarget).data("id");
    var member_id = $(e.currentTarget).data("memberid");
    var evt_id = $(e.currentTarget).data("eventid");
    var attended = e.currentTarget.checked;
    if (id) {
      event_attendance = this.attendance.get(id);
      event_attendance.set({'attended': attended});
    } else {
      event_attendance = new AttendanceModel({member_id: member_id, event_id: evt_id,
                                              date: this.date, attended: attended});
      this.attendance.add(event_attendance);
    }
    console.log(event_attendance.get('id'));
    event_attendance.save();
    this.renderGroupAttendance();
  },

  render: function(){
    var self = this;
    this.member_attendance = new MemberAttendanceCollection();
    this.members.each(function(member) {
      self.event_attendance = new AttendanceCollection();
      var member_name = member.get('first_name') + ' ' + member.get('last_name');
      self.evts.each(function(evt) {
        var attendance = self.attendance.find(function(item) {
          return (item.get('member_id') === member.id &&
                  item.get('event_id') === evt.id &&
                  item.get('date') === self.date);
        });
        if (typeof (attendance) === 'undefined' || attendance === null) {
          attendance = new AttendanceModel({member_id: member.id, event_id: evt.id,
                                            date: self.date, attended: false});
        }
        self.event_attendance.add(attendance);
      });
      self.member_attendance.add(new MemberAttendanceModel({id: member.id, name: member_name,
                                        attendance: self.event_attendance.toJSON()}));
    });
    this.$el.html(this.template({evts: this.evts.toJSON(),
                                 members: this.member_attendance.toJSON(),
                                 groups: this.groups.toJSON()}));
    this.$el.find('select[name="group_select"]').val(this.groupId);
    return this;
  },

  renderGroupAttendance: function() {
    var self = this;
    this.members.fetch().done(
      function() {
        self.attendance.fetch().done(
          function() {
            self.render();
          }
        )
      }
    );
  },

  initialize: function(options){
    var self = this;
    this.user_session = options.user_session;
    this.groups = options.groups;
    var d = new Date();
    var mm = d.getMonth() + 1;
    var dd = d.getDate() - d.getDay();
    this.date = [d.getFullYear(), !mm[1] && '0' + mm, !dd[1] && '0' + dd].join('-');
    this.groupId = "";
    if (this.groups !== null) {
      this.groupId = this.groups.at(0).get("id");
    }
    this.evts = new EventCollection();
    this.members = new MemberCollection({groupId:this.groupId});
    this.attendance = new AttendanceCollection({groupId:this.groupId});
    this.evts.fetch().done(
      function() {
        self.renderGroupAttendance();
        // $(document).ready(function() {$('#groupsTable').dataTable();});
      }
    );
  },
});
