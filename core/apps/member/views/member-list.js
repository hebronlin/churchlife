'use strict';

var Backbone = require('backbone');
var Modal = require('backbone.modal');
var Marionette = require('backbone.marionette');
var EditView = require('./modals/edit');
var SpinnerModalView = require('./modals/spinner');
var Member = require('../models/member');
var $ = require('jquery');

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
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  add: function() {
    console.log("add is being used");
    var member = new Member();
    this.members.add(member);
    this.listenTo(member, 'change', this.render);
    var d = new EditView(member);
    d.render();

    $('#member-index-modal').html(d.el);
    // Backbone.history.navigate('members/new/', {trigger: true});
  },

  edit: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var d = new EditView(this.members.get(id));
      d.render();

      $('#member-index-modal').html(d.el);
  },

  render: function(){
    this.$el.html(this.template({members: this.members.toJSON()}));
    return this;
  },

  initialize: function(members) {
    var self = this;
    this.members = members;

    this.members.each(function (member) {
        self.listenTo(member, 'change', self.render);
    });
  }
});
