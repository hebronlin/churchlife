'use strict';

var Backbone = require('backbone');
var Modal = require('backbone.modal');
var Marionette = require('backbone.marionette');
var GroupCollection = require('../../group/collections/group');
var EditView = require('./modals/edit');
var SpinnerModalView = require('../../common/views/modals/spinner');
var Member = require('../models/member');
var $ = require('jquery');
var dt = require('datatables.net')(window, $);

Backbone.$ = $;
window.$ = $;


module.exports = Marionette.LayoutView.extend({
  template: require('../templates/member-list.hbs'),

  regions: {
    modals: {
      selector: "#member-index-modal",
      regionType: Marionette.Modals
    }
  },

  events: {
    'click .member-add-button': 'add',
    'click .member-id-link': 'edit',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    this.$('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  add: function() {
    console.log("add is being used");
    var member = new Member();
    this.members.add(member);
    this.listenTo(member, 'change', this.render);
    var d = new EditView({groups: this.groups, member: member});
    d.render();

    this.$('#member-index-modal').html(d.el);
  },

  edit: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var d = new EditView({groups: this.groups, member: this.members.get(id)});
      d.render();

      this.$('#member-index-modal').html(d.el);
  },

  render: function(){
    this.$el.html(this.template({members: this.members.toJSON()}));
    return this;
  },

  initialize: function(options) {
    var self = this;
    this.groups = options.groups;
    this.members = options.members;
  }
});
