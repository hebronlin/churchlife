'use strict';

require('jquery-ui');

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Member = require('../../member/models/member');
var MemberCollection = require('../../member/collections/member');
var EventCollection = require('../../event/collections/event');
var AttendanceModel = require('../models/attendance');
var AttendanceCollection = require('../collections/attendance');
var MemberAttendanceModel = require('../models/member_attendance');
var MemberAttendanceCollection = require('../collections/member_attendance');
var SpinnerModalView = require('../../common/views/modals/spinner');
var EditView = require('./modals/edit');
var MemberEditView = require('../../member/views/modals/edit');

// The index view is a grid with the list of group.
module.exports = Marionette.LayoutView.extend({
  template: require('../templates/index.hbs'),
  regions: {
    modals: {
      selector: "#attendance-index-modal",
      regionType: Marionette.Modals
    }
  },
  // ui: {
  //   datepicker: "#attendance_date"
  // },

  events: {
    'change .group_select': 'selectGroup',
    'change #attendance_date': 'changeDate',
    'click .member-add-button': 'add',
    'click .attendance-check': 'updateAttendance',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  add: function() {
    console.log("add is being used");
    var d = new EditView({parent: this});
    d.render();

    this.$('#attendance-index-modal').html(d.el);
    // Backbone.history.navigate('members/new/', {trigger: true});
  },

  changeDate: function() {
    console.log("Come to change date");
    var from = this.$("#attendance_date").val().split("-");
    var d = new Date(from[0], from[1] - 1, from[2]);
    this.date = this.convertDateToStr(d);
    // this.date = $("#attendance_date").val();
    this.attendance = new AttendanceCollection({groupId:this.groupId, date:this.date});
    this.renderGroupAttendance();
  },

  convertDateToStr: function(d) {
    var firstDate = new Date(d.setDate(d.getDate() - d.getDay()));
    var mm = (firstDate.getMonth() + 1) + '';
    if (mm.length < 2) mm = '0' + mm;
    var dd = firstDate.getDate() + '';
    if (dd.length < 2) dd = '0' + dd;
    return [d.getFullYear(), mm, dd].join('-');
  },

  addNewMember: function() {
    console.log("addNewMember is being used");
    var member = new Member();
    this.members.add(member);
    this.listenTo(member, 'change', this.render);
    var d = new MemberEditView({groups: this.groups, member: member});
    d.render();

    this.$('#member-index-modal').html(d.el);
  },

  addMember: function(member_id) {
    var self = this;
    var member = new Member({id: member_id});
    member.fetch().done(
      function() {
        self.members.add(member);
      });
  },

  selectGroup: function(e) {
    this.groupId = e.target.value;
    this.members = new MemberCollection({groupId:this.groupId});
    this.attendance = new AttendanceCollection({groupId:this.groupId, date:this.date});
    this.renderGroupAttendance();
  },

  updateAttendance: function(e){
    // e.preventDefault();
    var event_attendance;
    var id = $(e.currentTarget).data("id");
    var member_id = $(e.currentTarget).data("memberid");
    var evt_id = $(e.currentTarget).data("eventid");
    var attended = e.currentTarget.checked;
    if (id) {
      event_attendance = this.attendance.get(id);
      event_attendance.set({'attended': attended});
      event_attendance.save();
    } else {
      event_attendance = new AttendanceModel({member_id: member_id, event_id: evt_id,
                                              date: this.date, attended: attended});
      event_attendance.save();
      this.attendance.add(event_attendance);
    }
    // console.log(event_attendance.get('id'));
    this.renderGroupAttendance();
  },

  render: function(){
    var self = this;
    this.member_attendance = new MemberAttendanceCollection();
    this.members.each(function(member) {
      self.event_attendance = new Backbone.Collection;
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
    this.$('#attendance_date').val(this.date);
    return this;
  },

  renderGroupAttendance: function() {
    var self = this;
    this.members.fetch().done(
      function() {
        console.log("members fetching done.");
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
    // Set cuurent date
    this.date = this.convertDateToStr(new Date());
    this.groupId = "";
    if (this.groups !== null && this.groups.length !== 0) {
      this.groupId = this.groups.at(0).get("id");
    }
    this.evts = new EventCollection();
    this.members = new MemberCollection({groupId:this.groupId});
    this.attendance = new AttendanceCollection({groupId:this.groupId, date:this.date});
    this.evts.fetch().done(
      function() {
        self.renderGroupAttendance();
        // $(document).ready(function() {$('#groupsTable').dataTable();});
      }
    );
  },
});
