/* global Handlebars */
var WidgetChaordicOnSite = window.WidgetChaordicOnSite || {};
WidgetChaordicOnSite.Utils = (function () {
  'use strict';
  return {
    $: function (id) {
      return document.querySelector(id);
    },
    ajax: function (type, url) {
      return new XMLHttpRequest(type, url);
    },
    template: function (source) {
      return Handlebars.compile(source, { noEscape: true });
    }
  };
}());
