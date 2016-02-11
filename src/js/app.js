var WidgetChaordicOnSite = window.WidgetChaordicOnSite || {};

WidgetChaordicOnSite = (function () {
  'use strict';

  // default values
  var defaults = {
    template: '#product-list-template',
  };

  var app = {
    // initialize widget
    init: function (options) {
      this.options = _.extend(defaults, options);
      this.template = Helpers.template(Helpers.$(this.options.template).innerHTML);
      this.viewReference(this.getData('reference'));
      this.viewRecommendation(this.getData('recommendation'));
      Carousel.init();
    },

    // reference view
    viewReference: function (content) {
      var context = this.parseData(content);
      this.setContent('.viewed .products-list', context);
    },

    // recommendation view
    viewRecommendation: function (content) {
      var context = this.parseData(content);
      this.setContent('.see-more .products-list', context);
    },

    // set content with template
    setContent: function (el, context) {
      Helpers.$(el).innerHTML = this.template({ data: context });
    },

    // parse data JSON
    parseData: function (data) {
      var arr = [];
      if(!_.isArray(data)) {
        arr.push(this.setObjs(data.item));
      } else {
        _.each(data, function (values) {
          arr.push(this.setObjs(values));
        }.bind(this));
      }

      return arr;
    },

    // return data JSON
    getData: function (ref) {
      return this.options.json.data[ref];
    },

    // template to data JSON
    setObjs: function (content) {
      return {
        id: content.businessId,
        thumbnail: content.imageName,
        title: content.name,
        titleTruncate: Helpers.truncate(content.name, 80, '...'),
        price: content.price,
        oldPrice: (typeof content.oldPrice === null) ? '' : content.oldPrice,
        installments: content.productInfo.paymentConditions,
        url: content.detailUrl,
      };
    }
  };

  return app;

})();
