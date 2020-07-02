'use strict';

window.gallery = (function () {

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Массив с сгенерированными фото для главной страницы
  var picturesList = createPicturesArray(window.const.PICTURES_COUNT);

  // Рандомно склеивает комментарии
  function getRandomMessage(arr) {
    var index = window.utils.getRandomInt(0, 1);

    if (index % 2 === 0) {
      return window.utils.getRandomElement(arr) + ' ' + window.utils.getRandomElement(arr);
    }

    return window.utils.getRandomElement(arr);
  }

  // Создает пользовательский комментарий
  function createUserComment() {
    var index = window.utils.getRandomInt(1, 6);

    var comment = {
      avatar: 'img/avatar-' + index + '.svg',
      message: getRandomMessage(window.const.COMMENTS),
      name: window.utils.getRandomElement(window.const.USERS),
    };

    return comment;
  }

  // Создает массив с комментариями к одному фото
  function createCommentsArray() {
    var comments = [];
    var minComments = 0;
    var maxComments = 17;
    var commentsCount = window.utils.getRandomInt(minComments, maxComments);

    for (var i = 0; i <= commentsCount; i++) {
      comments.push(createUserComment());
    }

    return comments;
  }

  // Создает пользовательское фото
  function createPictureDesc(index, descriptions) {
    var minLikes = 15;
    var maxLikes = 200;

    var pictureDesc = {
      url: 'photos/' + index + '.jpg',
      description: window.utils.getRandomElement(descriptions),
      likes: window.utils.getRandomInt(minLikes, maxLikes),
      comments: createCommentsArray(),
    };

    return pictureDesc;
  }

  // Создает массив фотографий пользователей
  function createPicturesArray(count) {
    var picturesArray = [];

    for (var i = 0; i < count; i++) {
      picturesArray.push(createPictureDesc(i + 1, window.const.PICTURE_CAPTION));
    }

    return picturesArray;
  }

  // Клонирует шаблон фото и заполняет его
  function createPictureElement(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  picturesContainer.appendChild(window.utils.addToFragment(picturesList, createPictureElement));

  var usersPictures = picturesContainer.querySelectorAll('.picture__img');

  return {
    picturesList: picturesList,
    usersPictures: usersPictures
  };

})();
