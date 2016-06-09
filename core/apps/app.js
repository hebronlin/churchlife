'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.Application.extend({
  _routes_cache: {},
  _validate_routes: function(name, app) {
    var self = this;
    _.each(_.keys(app.router.routes), function(route) {
      if ((_.has(self._routes_cache, route)) && (name !== self._routes_cache[route])) {
        throw 'route already in use: route=' + route + ' name=' + name;
      }
      self._routes_cache[route] = name;
    });
  },
  initialize: function() {
    this._apps = {};
  },
  addApp: function(name, options) {
    if (! ('app' in options)) { throw 'missing required key in options: app'; }
    var appOptions = _.omit(options, 'app');

    var app = new options.app(appOptions);
    this._validate_routes(name, app);

    this._apps[name] = app;
  }
});
