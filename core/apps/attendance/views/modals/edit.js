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

    initialize: function(group) {
        this.group = group;
    },

    groups: {
        'keypress #member-edit-form': 'disableSubmit',
        'keyup #member-edit-form': 'disableSubmit'
    },

    onShow: function() {
        if (this.group) {
            this.$el.find('form input[name="name"]').val(this.group.get('name'));
            this.$el.find('form input[name="description"]').val(this.group.get('description'));
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
        this.group.save({
            'name': this.$el.find('form input[name="name"]').val(),
            'description': this.$el.find('form input[name="description"]').val(),
            }
        );
    }

});
