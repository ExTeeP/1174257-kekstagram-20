'use strict';

window.form = (function () {

  // Проверка поля на валидность
  function onPicteruDescriptionChange(evt) {

    if (evt.target.textLength > window.const.MAX_LENGTH_DESC || evt.target.toLoong) {
      evt.target.setCustomValidity('Комментарий не может быть больше 140 символов');
    } else {
      evt.target.setCustomValidity('');
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
  var pushErrorMessage = function (errorMessage, errorMessagesArr) {
    if (errorMessagesArr.indexOf(errorMessage) === -1) {
      errorMessagesArr.push(errorMessage);
    }
  };

  // Проверяет хештеги на наличие ошибок
  var createValidityMessages = function (notEmptyHashtags) {
    var errorMessages = [];

    if (notEmptyHashtags.length > window.const.MAX_HASHTAGS) {
      pushErrorMessage('Хеш-тегов не должно быть больше ' + window.const.MAX_HASHTAGS + ' .', errorMessages);
    }

    notEmptyHashtags.forEach(function (hashtag) {
      if (!hashtag.startsWith('#')) {
        pushErrorMessage('Хеш-тег должен начинаться с символа решетки (#).', errorMessages);
      } else if (hashtag.length === 1) {
        pushErrorMessage('Хеш-тег не может состоять из одного символа.', errorMessages);
      } else if (hashtag.length > window.const.MAX_HASHTAG_CHARACTERS) {
        pushErrorMessage('Хеш-тег не может состоять из более чем ' + window.const.MAX_HASHTAG_CHARACTERS + ' символов.', errorMessages);
      } else if (!hashtag.match(window.const.HASHTAG_REGEXP)) {
        pushErrorMessage('Хеш-тег должен состоять только из букв и цифр.', errorMessages);
      } else if (notEmptyHashtags.indexOf(hashtag) !== notEmptyHashtags.lastIndexOf(hashtag)) {
        pushErrorMessage('Хеш-теги не должны повторяться.', errorMessages);
      }
    });

    return errorMessages;
  };

  // Показывает сообщения об ошибках
  function showValidityErrors(evt, hashtagsArr) {
    var errors = createValidityMessages(hashtagsArr);
    if (errors.length !== 0) {
      evt.target.setCustomValidity(errors.join('\n'));
    } else {
      evt.target.setCustomValidity('');
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
