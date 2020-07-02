'use strict';

window.preview = (function () {

  // Для работы с модальным окном фотографии из превью главной страницы
  var bigPictureModal = document.querySelector('.big-picture');
  var commentsList = bigPictureModal.querySelector('.social__comments');
  var commentTemplate = bigPictureModal.querySelector('.social__comment');
  var usersPictures = window.gallery.usersPictures;

  // Временно скрывает информационные элементы
  function hideControlElement() {
    bigPictureModal.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureModal.querySelector('.comments-loader').classList.add('hidden');
  }

  // Заполняем поле с комментарием
  function createCommentElement(commentator) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('img').src = commentator.avatar;
    commentElement.querySelector('img').alt = commentator.name;
    commentElement.querySelector('.social__text').textContent = commentator.message;

    return commentElement;
  }

  // Выполняет сброс и вставляет новые комментарии из фрагмента
  function renderComments(list, fragment) {
    list.innerHTML = '';
    list.appendChild(fragment);
  }

  // Заполняем поля модального окна фотографии
  function fillBigPicture(picture) {
    usersPictures.forEach(function (element, index) {

      if (picture === element) {
        bigPictureModal.querySelector('.big-picture__img img').src = window.gallery.picturesList[index].url;
        bigPictureModal.querySelector('.likes-count').textContent = window.gallery.picturesList[index].likes;
        bigPictureModal.querySelector('.comments-count').textContent = window.gallery.picturesList[index].comments.length;
        bigPictureModal.querySelector('.social__caption').textContent = window.gallery.picturesList[index].description;

        renderComments(commentsList, window.utils.addToFragment(window.gallery.picturesList[index].comments, createCommentElement));
      }
    });
  }

  return {
    hideControlElement: hideControlElement,
    fillBigPicture: fillBigPicture,
  };

})();
