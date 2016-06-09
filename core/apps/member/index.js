'use strict';

var Marionette = require('backbone.marionette');
var Router = require('./router');
var IndexView = require('./views/index');
var HeaderModel = require('./models/header');
var HeaderView = require('./views/header');


module.exports = Marionette.Object.extend({
  initialize: function(options) {
    console.log("member/index initialize()");
    this.header = options.header;
    this.container = options.container;
    this.router = new Router({controller: this, container: this.container});
  },
  index: function() {
    var model = new HeaderModel({title: 'Churchlife',
                                 placeholder: 'Search Members'});
    this.header.show(new HeaderView({model: model}));
    this.container.show(new IndexView());
  },
  create: function() {
    console.log('member/router.js save().');
    // this.header.show(new EditHeaderView());
    // this.container.show(new IndexView({model: new TileModel(),
    //                                    edit_mode: true}));
  },
  delete: function(memberId) {
    console.log('member/router.js delete(): ' + memberId);
  },
  edit: function(memberId) {
    var self = this;
    console.log('member/router.js edit(): ' + memberId);
  }
});
