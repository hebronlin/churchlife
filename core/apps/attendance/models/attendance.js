'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  // If we have the id, let's use the URL with an id,
  // so we can update this object (i.e. call HTTP PUT
  // on save()).
  url: function() {
    var baseURL = '/api/v1/attendance/';
    if (this.get('id')) {
        return baseURL + this.get('id') + '/';
    } else {
        return baseURL;
    }
  },
  defaults: function() {
    return {
      id: null,
      member_id: '',
      event_id: '',
      attended: false,
      absent_reason: "",
    };
  }
});
