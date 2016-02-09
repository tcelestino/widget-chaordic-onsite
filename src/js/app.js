var WidgetChaordicOnSite = window.WidgetChaordicOnSite || {};

WidgetChaordicOnSite = (function () {
  'use strict';
  var app = {
    init: function () {
      this.cache();
    },
    cache: function () {
      this.template = WidgetChaordicOnSite.Utils.$('#list-template');
      this.carousel = WidgetChaordicOnSite.Utils.$('.carousel');
    },
  };
  return app.init;
}());
