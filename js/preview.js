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
  function createCommentElement(objCommentator) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('img').src = objCommentator.avatar;
    commentElement.querySelector('img').alt = objCommentator.name;
    commentElement.querySelector('.social__text').textContent = objCommentator.message;

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
        var objPhoto = window.gallery.picturesList[index];
        var fragment = window.utils.addToFragment(objPhoto.comments, createCommentElement);

        bigPictureModal.querySelector('.big-picture__img img').src = objPhoto.url;
        bigPictureModal.querySelector('.likes-count').textContent = objPhoto.likes;
        bigPictureModal.querySelector('.comments-count').textContent = objPhoto.comments.length;
        bigPictureModal.querySelector('.social__caption').textContent = objPhoto.description;

        renderComments(commentsList, fragment);
      }
    });
  }

  return {
    hideControlElement: hideControlElement,
    fillBigPicture: fillBigPicture,
  };

})();
