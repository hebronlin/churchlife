'use strict';

// To register Handlebars helpers, since we use hbsfy,
// we must reference 'hbsfy/runtime' which is the single
// Handlebars copy used in all the system.
var Handlebars = require('hbsfy/runtime');

// Register global Handlebars helpers:
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

