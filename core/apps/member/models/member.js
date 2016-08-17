'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  // If we have the id, let's use the URL with an id,
  // so we can update this object (i.e. call HTTP PUT
  // on save()).
  url: function() {
    var baseURL = '/api/v1/member/';
    if (this.get('id')) {
        baseURL = baseURL + this.get('id') + '/';
    }
    if (typeof (options) !== "undefined" && options.groupId) {
      return baseURL + '?gid=' + options.groupId + '&format=json';
    } else {
      return baseURL;
    }
  },
  defaults: function() {
    return {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      gender: 'M',
      nick_name: '',
      other_name: '',
      language: '',
    };
  }
});
