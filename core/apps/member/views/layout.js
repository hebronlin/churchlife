'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
  template: require('../templates/layout.hbs'),
  el: '#main-container-content',
  regions: {
      header: '#main-header',
      main: '#main-region'
  },
});

