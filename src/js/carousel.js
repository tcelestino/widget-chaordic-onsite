var Carousel = window.Carousel || {};
Carousel = (function () {
  'use strict';

  var defaults = {
    widthItem: 180,
    itemPerPage: 1,
    itemView: 4
  };

  var plugin = {
    init: function () {
      this.lists = document.querySelector('.see-more .products-list');
      this.btnPrev = document.querySelector('.control-prev');
      this.btnNext = document.querySelector('.control-next');
      this.itensCount = parseInt(this.lists.children.length, 10);
      this.carouselWidth = this.itensCount * defaults.widthItem;
      this.events();

      this.lists.style.width = this.carouselWidth + 'px';
    },

    events: function () {
      this.btnPrev.addEventListener('click', _.debounce(this.prevItem.bind(this), 500));
      this.btnNext.addEventListener('click', _.debounce(this.nextItem.bind(this), 500));
    },

    prevItem: function (evt) {
      var marginLeft = this.directionControl('prev');
      if (marginLeft > 0) {
        this.lists.style.marginLeft = 0 + 'px';
        return;
      }

      this.lists.style.marginLeft = marginLeft + 'px';

      evt.preventDefault();
      evt.stopPropagation();
    },

    nextItem: function (evt) {
      var marginLeft = this.directionControl('next');
      var maxWidth = (this.carouselWidth - defaults.itemView * defaults.widthItem) * -1;
      if (marginLeft < maxWidth) {
        this.lists.style.marginLeft = maxWidth + 'px';
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
