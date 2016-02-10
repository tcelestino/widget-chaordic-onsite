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

  var carousel = {
    defaults: {
      widthItem: 170,
      itemPerPage: 1
    },

    init: function () {
      this.carouselWrapper = document.querySelector('.see-more .products-list');
      this.itensCount = parseInt(this.carouselWrapper.children.length, 10);
      this.carouselWidth = this.itensCount * carousel.defaults.widthItem + 10;
      this.carouselWrapper.style.width = this.carouselWidth + 'px';
      this.btnPrev = document.querySelector('.control-prev');
      this.btnNext = document.querySelector('.control-next');
      this.events();
    },
    events: function () {
      this.btnPrev.addEventListener('click', this.prevItem.bind(this));
      this.btnNext.addEventListener('click', this.nextItem.bind(this));
    },

    prevItem: function (evt) {
      var marginLeft = this.directionControl('prev');
       if (marginLeft > 0) {
         return;
       }
      this.carouselWrapper.style.marginLeft = marginLeft + 'px';
      evt.preventDefault();
    },

    nextItem: function (evt) {
      var marginLeft = this.directionControl('next');
      if (marginLeft >= this.carouselWidth) {
        return;
      }
      console.log(marginLeft);
      this.carouselWrapper.style.marginLeft = marginLeft + 'px';
      evt.preventDefault();
    },

    getWrapperMarginLeft: function () {
      var style = this.carouselWrapper.currentStyle ||
                  window.getComputedStyle(this.carouselWrapper);


      return parseInt(style.marginLeft, 10);
    },

    directionControl: function (direction) {
      if (direction === 'next') {
        return (this.getWrapperMarginLeft() - carousel.defaults.itemPerPage * carousel.defaults.widthItem);
      } else {
        return (this.getWrapperMarginLeft() + carousel.defaults.itemPerPage * carousel.defaults.widthItem);
      }

    }

  };

  var app = {
    init: function (options) {
      this.options = _.extend(defaults, options);
      this.template = privates.template(privates.$(this.options.template).innerHTML);
      this.viewReference(this.getData('reference'));
      this.viewRecommendation(this.getData('recommendation'));
      carousel.init();
    },

    viewReference: function (content) {
      var context = this.parseData(content);
      this.setContent('.viewed .products-list', context);
    },

    viewRecommendation: function (content) {
      var context = this.parseData(content);
      this.setContent('.see-more .products-list', context);
    },

    setContent: function (el, context) {
      privates.$(el).innerHTML = this.template({ data: context });
    },

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

    getData: function (ref) {
      return this.options.data.data[ref];
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
