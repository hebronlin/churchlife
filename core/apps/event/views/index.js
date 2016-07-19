'use strict';

var Marionette = require('backbone.marionette');
var Event = require('../models/event');
var EventCollection = require('../collections/event');
var SpinnerModalView = require('../../common/views/modals/spinner');
var EditView = require('./modals/edit');

// The index view is a grid with the list of event.
module.exports = Marionette.LayoutView.extend({
  template: require('../templates/index.hbs'),
  regions: {
    modals: {
      selector: "#event-index-modal",
      regionType: Marionette.Modals
    }
  },

  events: {
    'click .event-add-button': 'add',
    'click .event-id-link': 'edit',
  },

  showSpinnerModal: function() {
    this.spinnerModalView = new SpinnerModalView();
    $('#main-spinner-modal').html(this.spinnerModalView.render().el);
  },

  add: function() {
    console.log("add is being used");
    var e = new Event();
    this.evts.add(e);
    this.listenTo(e, 'change', this.render);
    var d = new EditView(e);
    d.render();

    $('#event-index-modal').html(d.el);
    // Backbone.history.navigate('members/new/', {trigger: true});
  },

  edit: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var d = new EditView(this.evts.get(id));
      d.render();

      $('#event-index-modal').html(d.el);
  },

  render: function(){
    this.$el.html(this.template({events: this.evts.toJSON()}));
    return this;
  },

  initialize: function(){
    var self = this;
    this.evts = new EventCollection();
    this.evts.fetch().done(
      function() {
        console.log('fetching events done');
        self.evts.each(function (e) {
            self.listenTo(e, 'change', self.render);
        });
        self.render();
        $(document).ready(function() {$('#eventsTable').dataTable();});
      }
    );
  },
});
