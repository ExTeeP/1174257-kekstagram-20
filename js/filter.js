'use strict';

window.filter = (function () {
  var RANDOM_PICTURES_AMOUNT = 10;

  var filteredPictures = [];

  var filterForm = document.querySelector('.img-filters');
  var filterDefault = filterForm.querySelector('#filter-default');
  var filterRandom = filterForm.querySelector('#filter-random');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');

  function toggleActiveFilter(selectedFilter) {
    var activeFilter = filterForm.querySelector('.img-filters__button--active');

    activeFilter.classList.remove('img-filters__button--active');
    selectedFilter.classList.add('img-filters__button--active');
  }

  function showDefaultPictures() {
    window.gallery.renderPictures(window.gallery.picturesData);
    return window.gallery.picturesData;
  }

  function showRandomPictures() {
    var randomPictures = window.utils.getShuffleArray(window.gallery.picturesData, RANDOM_PICTURES_AMOUNT);

    window.gallery.renderPictures(randomPictures);
    return randomPictures;
  }

  function showDiscussedPictures() {
    var picturesDataCopy = window.gallery.picturesData.slice();
    var sortedList = picturesDataCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    window.gallery.renderPictures(sortedList);
    return sortedList;
  }

  var onFilterFormClick = window.utils.debounce(function (evt) {
    toggleActiveFilter(evt.target);
    window.gallery.removePictures();

    switch (evt.target) {
      case filterDefault:
        window.filter.filteredPictures = showDefaultPictures();
        break;
      case filterRandom:
        window.filter.filteredPictures = showRandomPictures();
        break;
      case filterDiscussed:
        window.filter.filteredPictures = showDiscussedPictures();
        break;
      default:
        window.filter.filteredPictures = showDefaultPictures();
        break;
    }
  });

  filterForm.addEventListener('click', onFilterFormClick);

  return {
    filteredPictures: filteredPictures
  };

})();
