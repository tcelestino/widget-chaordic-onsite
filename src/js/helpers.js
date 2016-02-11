'use strict';

var Helpers = window.Helpers || {};

Helpers = (function () {
  return {
    $: function (el) {
      return document.querySelector(el);
    },

    template: function (source) {
      return Handlebars.compile(source, { noEscape: true });
    },

    truncate: function (string, length, reticence) {
      if (string.length > length) {
        var suspension = (reticence ? reticence : '...');
        return string.slice(0, length - suspension.length) + suspension;
      }
      return string;
    }
  };
})();