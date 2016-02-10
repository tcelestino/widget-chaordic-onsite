var WidgetChaordicOnSite = window.WidgetChaordicOnSite || {};

WidgetChaordicOnSite = (function () {
  'use strict';

  var defaults = {
    template: '#product-list-template',
  };

  var privates = {
    $: function (el) {
      return document.querySelector(el);
    },
    ajax: function () {
      return new XMLHttpRequest();
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

  var app = {
    init: function (options) {
      this.options = _.extend(options, defaults);
      this.template = privates.template(privates.$(this.options.template).innerHTML);
      this.setReference(this.getData('reference'));
      this.setRecommendation(this.getData('recommendation'));
    },

    setReference: function (content) {
      var context = this.parseData(content);
      this.setContent('.viewed .products-list', context);
    },

    setRecommendation: function (content) {
      var context = this.parseData(content);
      this.setContent('.see-more .products-list', context);
    },

    setContent: function (el, context) {
      privates.$(el).innerHTML = this.template({ data: context });
    },

    parseData: function (data) {
      return _.map(data, function (o) {
        if (_.isArray(o)) {
          return _.map(o, function (i) {
            return this.setObjs(i);
          }.bind(this));
        } else {
          return this.setObjs(o.item);
        }
      }.bind(this));
    },

    getData: function (ref) {
      return _.mapValues(this.options.data, function (data) {
        if(data[ref]) {
          return data[ref];
        }
      });
    },

    setObjs: function (content) {
      return {
        id: content.businessId,
        thumbnail: content.imageName,
        title: content.name,
        titleTruncate: privates.truncate(content.name, 80, '...'),
        price: content.price,
        oldPrice: (typeof content.oldPrice === null) ? '' : content.oldPrice,
        installments: content.productInfo.paymentConditions,
        url: content.detailUrl,
      };
    }


  };

  return app;

})();
(function () {
  'use strict';
  WidgetChaordicOnSite.init();
})();
