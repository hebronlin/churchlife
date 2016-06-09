'use strict';

var Backbone = require('backbone');
var Modal = require('backbone.modal');


/* Loading spinner modal, it's shared for all modules. */
module.exports = Backbone.Modal.extend({
  template: require('../../templates/modals/spinner.hbs'),
});

