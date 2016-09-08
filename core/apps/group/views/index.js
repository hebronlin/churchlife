'use strict';

var Marionette = require('backbone.marionette');
var Group = require('../models/group');
var GroupCollection = require('../collections/group');
var SpinnerModalView = require('../../common/views/modals/spinner');
var EditView = require('./modals/edit');
var OwnerView = require('./modals/owner');

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
    'click .group-edit-link': 'edit',
    'click .group-owner-link': 'editOwner',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  add: function() {
    console.log("add is being used");
    var group = new Group();
    this.groups.add(group);
    this.listenTo(group, 'change', this.render);
    var d = new EditView(group);
    d.render();

    $('#group-index-modal').html(d.el);
    // Backbone.history.navigate('members/new/', {trigger: true});
  },

  edit: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var d = new EditView(this.groups.get(id));
      d.render();

      $('#group-index-modal').html(d.el);
  },

  editOwner: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var d = new OwnerView(this.groups.get(id));
      d.render();

      $('#group-index-modal').html(d.el);
  },

  render: function(){
    this.$el.html(this.template({groups: this.groups.toJSON()}));
    return this;
  },

  initialize: function(groups){
    var self = this;
    if (groups !== null) {
      this.groups = groups;
      this.groups.each(function (group) {
          self.listenTo(group, 'change', self.render);
      });
      this.render();
    } else {
      this.groups = new GroupCollection();
      this.groups.fetch().done(
        function() {
          console.log('fetching groups done');
          self.groups.each(function (group) {
              self.listenTo(group, 'change', self.render);
          });
          self.render();
          // $(document).ready(function() {$('#groupsTable').dataTable();});
        }
      );
    }
  },
});
