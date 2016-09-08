'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Modal = require('backbone.modal');
var _ = require('underscore');

var $ = require('jquery');
var MemberSearchResultsView = require('../../../common/views/member-search-results');
var MemberSearchCollection = require('../../../common/collections/member_search');
var MemberGroupModel = require('../../../common/models/member_group');
var MemberGroupCollection = require('../../../common/collections/member_group');

Backbone.$ = $;
window.$ = $;


module.exports = Backbone.Modal.extend({
    template: require('../../templates/modals/owner.hbs'),

    cancelEl: '.close-button',
    submitEl: '.save',
    regions: {
        searchResults: '#main-search-results'
    },
    // viewContainer: '.container',

    initialize: function(group) {
        this.group = group;
        this.members = null;
        this.member_groups = new MemberGroupCollection();
    },

    groups: {
        'keypress #member-edit-form': 'disableSubmit',
        'keyup #member-edit-form': 'disableSubmit'
    },

    events: {
        'click .main-search-button': 'search',
        'click .member-check': 'updateOwner',
    },

    search: function() {
        var self = this;
        this.members = new MemberSearchCollection();
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

    updateOwner: function(e){
        // e.preventDefault();
        var member_id = $(e.currentTarget).data("id");
        var group_id = this.group.get('id');
        var member_group = this.member_groups.find(function(item) {
            return (item.get('member_id') === member_id && item.get('group_id') === group_id &&
                        item.get('member_type') === 'Admin');
        });
        console.log(e.currentTarget.checked);
        if (e.currentTarget.checked) {
            if (typeof (member_group) === 'undefined' || member_group === null) {
                member_group = new MemberGroupModel({member_id: member_id, group_id: group_id,
                                        member_type: 'Admin'});
                this.member_groups.add(member_group);
            }
        }
        console.log(this.member_groups.length);
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
        this.member_groups.each(function (member_group) {
            member_group.save();
        });
    }

});
