var Carousel = window.Carousel || {};
Carousel = (function () {
  'use strict';

  var defaults = {
    widthItem: 170,
    itemPerPage: 1
  };

  var plugin = {
    init: function () {
      this.lists = document.querySelector('.see-more .products-list');
      this.btnPrev = document.querySelector('.control-prev');
      this.btnNext = document.querySelector('.control-next');
      this.itensCount = parseInt(this.lists.children.length, 10);
      this.carouselWidth = this.itensCount * defaults.widthItem + 10;
      this.events();

      this.lists.style.width = this.carouselWidth + 'px';
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

      this.lists.style.marginLeft = marginLeft + 'px';

      evt.preventDefault();
      evt.stopPropagation();
    },

    nextItem: function (evt) {
      var marginLeft = this.directionControl('next');
      var maxWidth = (this.carouselWidth - ((this.itensCount - 4) * defaults.widthItem)) * -1; //-1020
      if (marginLeft < maxWidth) {
        return;
      }
      this.lists.style.marginLeft = marginLeft + 'px';
      evt.preventDefault();
    },

    getWrapperMarginLeft: function () {
      var style = this.getCurrentStyle();
      return parseInt(style.marginLeft, 10);
    },

    getCurrentStyle: function () {
      return this.lists.currentStyle || window.getComputedStyle(this.lists);
    },

    directionControl: function (direction) {
      if (direction === 'next') {
        return (this.getWrapperMarginLeft() - this.totalItems());
      } else {
        return (this.getWrapperMarginLeft() + this.totalItems());
      }
    },
    totalItems: function () {
      return defaults.itemPerPage * defaults.widthItem;
    }

  };

  return plugin;

})();
