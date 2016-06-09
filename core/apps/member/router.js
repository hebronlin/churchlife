'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'members(/)': 'index',
    'members/new(/)': 'create',
    'members/:memberId(/)': 'index',
    'members/:memberId/delete(/)': 'delete',
    'members/:memberId/edit(/)': 'edit'
  }
});
