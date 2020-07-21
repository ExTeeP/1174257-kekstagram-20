'use strict';

window.gallery = (function () {

  var picturesData = [];

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureFilters = document.querySelector('.img-filters');

  // Клонирует шаблон фото и заполняет его
  function fillPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function renderPictures(data) {
    picturesContainer.appendChild(window.utils.addToFragment(data, fillPicture));
  }

  var removePictures = function () {
    var shownPictures = picturesContainer.querySelectorAll('.picture');

    shownPictures.forEach(function (picture) {
      picturesContainer.removeChild(picture);
    });
  };

  function onLoadSuccess(data) {
    window.gallery.picturesData = data;
    renderPictures(data);
    pictureFilters.classList.remove('img-filters--inactive');
  }

  window.backend.load(onLoadSuccess, window.error.onError);

  return {
    picturesData: picturesData,
    renderPictures: renderPictures,
    removePictures: removePictures
  };

})();
