'use strict';

window.preview = (function () {

  var COMMENTS_AMOUNT = 5;
  var commentsDataCopy = [];
  var showCommentCount;

  // Для работы с модальным окном фотографии из превью главной страницы
  var bigPictureModal = document.querySelector('.big-picture');
  var commentsList = bigPictureModal.querySelector('.social__comments');
  var commentTemplate = bigPictureModal.querySelector('.social__comment');
  var commentCount = bigPictureModal.querySelector('.social__comment-count');
  var commentLoadButton = bigPictureModal.querySelector('.comments-loader');

  // Скрывает информационные элементы
  function hideLoadButton() {
    commentLoadButton.classList.add('hidden');
  }

  // Показывает информационные элементы
  function showLoadButton() {
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

  function renderComments(comments) {
    var shownComments = comments.splice(0, COMMENTS_AMOUNT);
    var length = shownComments.length;
    var fragment = window.utils.addToFragment(shownComments, createCommentElement);

    showCommentCount += length;
    commentCount.childNodes[0].textContent = showCommentCount + ' из ';
    commentsList.appendChild(fragment);
  }

  function onCommentsLoadButtonClick() {
    renderComments(commentsDataCopy);

    if (commentsDataCopy.length === 0) {
      commentLoadButton.removeEventListener('click', onCommentsLoadButtonClick);
      hideLoadButton();
    }
  }

  // Заполняем поля модального окна фотографии
  function fillBigPicture(picture, data) {
    var usersPictures = document.querySelectorAll('.picture__img');

    usersPictures.forEach(function (element, index) {
      if (picture === element) {
        var pictureObject = data[index];
        commentsDataCopy = pictureObject.comments.slice();

        bigPictureModal.querySelector('.big-picture__img img').src = pictureObject.url;
        bigPictureModal.querySelector('.likes-count').textContent = pictureObject.likes;
        bigPictureModal.querySelector('.comments-count').textContent = pictureObject.comments.length;
        bigPictureModal.querySelector('.social__caption').textContent = pictureObject.description;

        showCommentCount = 0;
        commentsList.innerHTML = '';
        renderComments(commentsDataCopy);

        if (pictureObject.comments.length > COMMENTS_AMOUNT) {
          showLoadButton();
          commentLoadButton.addEventListener('click', onCommentsLoadButtonClick);
        }
      }
    });
  }

  return {
    fillBigPicture: fillBigPicture,
    renderComments: renderComments,
    onCommentsLoadButtonClick: onCommentsLoadButtonClick
  };

})();
