'use strict';

window.gallery = (function () {

  var PICTURES_AMOUNT = 25;
  var picturesData = [];

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
    picturesContainer.appendChild(window.utils.addToFragment(data, PICTURES_AMOUNT, fillPicture));
  }

  function onLoadSuccess(data) {
    window.gallery.picturesData = data;
    renderPictures(data);
  }

  window.backend.load(onLoadSuccess, window.error.onLoadError);

  return {
    picturesData: picturesData
  };

})();
