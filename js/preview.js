'use strict';

window.preview = (function () {

  var COMMENTS_AMOUNT = 5;

  // Для работы с модальным окном фотографии из превью главной страницы
  var bigPictureModal = document.querySelector('.big-picture');
  var commentsList = bigPictureModal.querySelector('.social__comments');
  var commentTemplate = bigPictureModal.querySelector('.social__comment');
  var commentLoadButton = bigPictureModal.querySelector('.comments-loader');

  // Скрывает информационные элементы
  function hideControlElement() {
    bigPictureModal.querySelector('.social__comment-count').classList.add('hidden');
    commentLoadButton.classList.add('hidden');
  }

  // Показывает информационные элементы
  function showControlElement() {
    bigPictureModal.querySelector('.social__comment-count').classList.remove('hidden');
    commentLoadButton.classList.remove('hidden');
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

  // Колличество загружаемых комментариев
  function setCommentsAmount(comments) {
    var length = comments.length;

    if (length <= COMMENTS_AMOUNT) {
      hideControlElement();
      return length;
    } else {
      showControlElement();
      return COMMENTS_AMOUNT;
    }
  }

  // Заполняем поля модального окна фотографии
  function fillBigPicture(picture) {
    var usersPictures = document.querySelectorAll('.picture__img');

    usersPictures.forEach(function (element, index) {
      if (picture === element) {
        var pictureObject = window.picturesList[index];
        var comments = pictureObject.comments;
        var fragment = window.utils.addToFragment(comments, setCommentsAmount(comments), createCommentElement);

        bigPictureModal.querySelector('.big-picture__img img').src = pictureObject.url;
        bigPictureModal.querySelector('.likes-count').textContent = pictureObject.likes;
        bigPictureModal.querySelector('.comments-count').textContent = pictureObject.comments.length;
        bigPictureModal.querySelector('.social__caption').textContent = pictureObject.description;

        renderComments(commentsList, fragment);
      }
    });
  }

  return {
    hideControlElement: hideControlElement,
    fillBigPicture: fillBigPicture,
  };

})();
