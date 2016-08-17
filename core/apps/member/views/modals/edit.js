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

    initialize: function(member) {
        this.member = member;
    },

    events: {
        'keypress #member-edit-form': 'disableSubmit',
        'keyup #member-edit-form': 'disableSubmit'
    },

    onShow: function() {
        if (this.member) {
            this.$el.find('form input[name="first_name"]').val(this.member.get('first_name'));
            this.$el.find('form input[name="last_name"]').val(this.member.get('last_name'));
            this.$el.find('form input[name="email"]').val(this.member.get('email'));
            this.$el.find('form input[name="other_name"]').val(this.member.get('other_name'));
            this.$el.find('form select[name="gender"]').val(this.member.get('gender'));
            this.$el.find('form input[name="language"]').val(this.member.get('language'));
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
        this.member.save({
            'first_name': this.$el.find('form input[name="first_name"]').val(),
            'last_name': this.$el.find('form input[name="last_name"]').val(),
            'email': this.$el.find('form input[name="email"]').val(),
            'other_name': this.$el.find('form input[name="other_name"]').val(),
            'gender': this.$el.find('form select[name="gender"]').val(),
            'language': this.$el.find('form select[name="language"]').val(),
            }
        );
    }

});
