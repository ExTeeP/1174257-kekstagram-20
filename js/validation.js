'use strict';

window.validation = (function () {

  // Максимальное колличество символов в описании к фото
  var MAX_LENGTH_DESC = 140;

  // Валидация хештегов
  var HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_CHARACTERS = 20;

  function setCustomBorder(evt) {
    evt.target.style.outline = 'red';
    evt.target.style.boxShadow = '0 0 0 2px red';
  }

  function removeCustomBorder(evt) {
    evt.target.style.outline = 'initial';
    evt.target.style.boxShadow = 'none';
  }

  // Проверка поля на валидность
  function onPicteruDescriptionChange(evt) {
    if (evt.target.textLength > MAX_LENGTH_DESC || evt.target.toLoong) {
      evt.target.setCustomValidity('Комментарий не может быть больше 140 символов');
      setCustomBorder(evt);
    } else {
      evt.target.setCustomValidity('');
      removeCustomBorder(evt);
    }
  }

  // Возвращает массив введенных хештегов
  function createHashtags(input) {
    return input.value.toLowerCase().split(' ');
  }

  // Избавляет массив хештегов от лишних пробелов
  function removeEmptyHashtag(hashtagsArr) {
    var notEmptyHashtags = [];

    hashtagsArr.forEach(function (hastag) {
      if (hastag !== '') {
        notEmptyHashtags.push(hastag);
      }
    });

    return notEmptyHashtags;
  }

  // Добавляет сообщение об ошибке в массив с ошибками
  function pushErrorMessage(errorMessage, errorMessagesArr) {
    if (errorMessagesArr.indexOf(errorMessage) === -1) {
      errorMessagesArr.push(errorMessage);
    }
  }

  // Проверяет хештеги на наличие ошибок
  function createValidityMessages(notEmptyHashtags) {
    var errorMessages = [];

    if (notEmptyHashtags.length > MAX_HASHTAGS) {
      pushErrorMessage('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS + ' .', errorMessages);
    }

    notEmptyHashtags.forEach(function (hashtag) {
      if (!hashtag.startsWith('#')) {
        pushErrorMessage('Хеш-тег должен начинаться с символа решетки (#).', errorMessages);
      } else if (hashtag.length === 1) {
        pushErrorMessage('Хеш-тег не может состоять из одного символа.', errorMessages);
      } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
        pushErrorMessage('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов.', errorMessages);
      } else if (!hashtag.match(HASHTAG_REGEXP)) {
        pushErrorMessage('Хеш-тег должен состоять только из букв и цифр.', errorMessages);
      } else if (notEmptyHashtags.indexOf(hashtag) !== notEmptyHashtags.lastIndexOf(hashtag)) {
        pushErrorMessage('Хеш-теги не должны повторяться.', errorMessages);
      }
    });

    return errorMessages;
  }

  // Показывает сообщения об ошибках
  function showValidityErrors(evt, hashtagsArr) {
    var errors = createValidityMessages(hashtagsArr);

    if (errors.length !== 0) {
      evt.target.setCustomValidity(errors.join('\n'));
      setCustomBorder(evt);
    } else {
      evt.target.setCustomValidity('');
      removeCustomBorder(evt);
    }
  }

  // Валидирует хештеги
  function onPictureHashtragChange(evt) {
    var allHashtags = createHashtags(evt.target);
    var correctHashtags = removeEmptyHashtag(allHashtags);

    showValidityErrors(evt, correctHashtags);
  }

  return {
    onPictureHashtragChange: onPictureHashtragChange,
    onPicteruDescriptionChange: onPicteruDescriptionChange
  };

})();
