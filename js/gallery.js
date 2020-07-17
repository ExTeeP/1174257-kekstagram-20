'use strict';

window.gallery = (function () {

  var PICTURES_AMOUNT = 25;

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Создает пользовательское фото
  function createPicture(picture) {
    return {
      url: picture.url,
      description: picture.description,
      likes: picture.likes,
      comments: picture.comments
    };
  }

  // Создает массив фотографий пользователей
  function createPicturesArray(data) {
    var pictures = [];

    for (var i = 0; i < PICTURES_AMOUNT; i++) {
      pictures.push(createPicture(data[i]));
    }

    return pictures;
  }

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
    var picturesList = createPicturesArray(data);
    renderPictures(data);

    // Экспорт массива с данными от сервера
    window.picturesList = picturesList;
  }

  window.backend.load(onLoadSuccess);
})();
