'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Modal = require('backbone.modal');
var MemberSearchResultsView = require('../member-search-results');
var MemberSearchCollection = require('../../../common/collections/member_search');
var MemberGroupModel = require('../../../common/models/member_group');
var _ = require('underscore');

var $ = require('jquery');

Backbone.$ = $;
window.$ = $;


module.exports = Backbone.Modal.extend({
    template: require('../../templates/modals/edit.hbs'),

    cancelEl: '.close-button',
    submitEl: '.save',
    regions: {
        searchResults: '#main-search-results'
    },

    initialize: function(options) {
        this.parent = options.parent;
        this.group_id = this.parent.groupId;
        console.log(this.group_id);
        this.members = null;
    },

    groups: {
        'keypress #member-edit-form': 'disableSubmit',
        'keyup #member-edit-form': 'disableSubmit'
    },

    events: {
        'click .main-search-button': 'search',
        'click .add-new-member': 'addNewMember',
        'click .member-check': 'setMemberType',
        'click .visitor-check': 'setMemberType',
        // 'click .add-selected-members': 'addSelectedMembers'
    },

    setMemberType: function(e) {
        var member_id = $(e.target).data("id");
        if ($(e.target).prop('checked')) {
            this.$('.member-type input[data-id=' + member_id + ']').prop('checked', false);
            $(e.target).prop('checked', true);
        }
    },

    addNewMember: function() {
        this.parent.addNewMember();
    },

    search: function() {
        console.log("Searching members...");
        var self = this;
        var first_name = this.$el.find('input[name="first_name"]').val();
        var last_name = this.$el.find('input[name="last_name"]').val();
        this.members = new MemberSearchCollection({first_name: first_name, last_name: last_name});
        this.members.fetch().done(
            function() {
                console.log('Searching members done');
                self.onShow();
            }
        );
    },

    onShow: function(){
        if (this.members !== null) {
            console.log('Members: ' + this.members.length);
            var msrView = new MemberSearchResultsView(this.members);
            msrView.render();
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
        var self = this;
        this.$('.member-check').each(function (e) {
            if ($(this).prop('checked')) {
                var group_member = new MemberGroupModel({member_id: $(this).data('id'),
                                        group_id: self.group_id,
                                        member_type: 'Member'});
                group_member.save();
            }
        });
        this.$('.visitor-check').each(function (e) {
            if ($(this).prop('checked')) {
                var group_member = new MemberGroupModel({member_id: $(this).data('id'),
                                        group_id: self.group_id,
                                        member_type: 'Guest'});
                group_member.save();
            }
        });
        this.parent.renderGroupAttendance();
    }

});
