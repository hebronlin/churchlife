'use strict';

// XXX should these three lines be a separate import
// as marionette requires in exactly this order
var Backbone = require('backbone');
var $ = window.$ = window.jQuery = require('jquery');  // Set jQuery into the window.X scope, for Bootstrap.
Backbone.$ = $;
require('bootstrap');  // Although not directly used in this file, require so it goes into bundle.js
require('./common/handlebars');

//var App = require('./app');
var Marionette = require('backbone.marionette');
var LayoutView = require('./common/views/layout');
var _ = require('underscore');

// Handles CSRF for the app.

// Gets a cookie using jQuery
// Source: https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Sets CSRF token for POST
var oldSync = Backbone.sync;
Backbone.sync = function(method, model, options){
    options.beforeSend = function(xhr){
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    };
    return oldSync(method, model, options);
};

$(function() {
  // Render the main page layout (header + content) containers:
  var layout = new LayoutView();
  layout.render();
});
