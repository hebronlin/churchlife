'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Modal = require('backbone.modal');
var _ = require('underscore');

var $ = require('jquery');

Backbone.$ = $;
window.$ = $;


module.exports = Backbone.Modal.extend({
    template: require('../../templates/modals/edit.hbs'),

    cancelEl: '.close-button',
    submitEl: '.save',

    initialize: function(evt) {
        this.evt = evt;
    },

    events: {
        'keypress #member-edit-form': 'disableSubmit',
        'keyup #member-edit-form': 'disableSubmit'
    },

    onShow: function() {
        if (this.evt) {
            this.$el.find('form input[name="name"]').val(this.evt.get('name'));
            this.$el.find('form input[name="description"]').val(this.evt.get('description'));
        }
    },

    // Don't submit the form when the enter key is pressed.
    disableSubmit: function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    },

    submit: function() {
        this.evt.save({
            'name': this.$el.find('form input[name="name"]').val(),
            'description': this.$el.find('form input[name="description"]').val(),
            }
        );
    }

});
