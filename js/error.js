'use strict';

window.error = (function () {

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function onClickErrorButton() {
    removeErrorMessage();
  }

  function onMissClickErrorMessage(evt) {
    if (evt.target !== document.querySelector('.error__inner')) {
      removeErrorMessage();
    }
  }

  function onKeydownErrorMessage(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorMessage();
    }
  }

  function removeErrorMessage() {
    var errorMessage = document.querySelector('.error');
    var errorCloseButton = errorMessage.querySelector('.error__button');

    main.removeChild(errorMessage);

    errorCloseButton.removeEventListener('click', onClickErrorButton);
    document.removeEventListener('click', onMissClickErrorMessage);
    document.removeEventListener('keydown', onKeydownErrorMessage);

  }

  function createErrorMessage(message, type) {
    var errorMessage = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var errorCloseButton = errorMessage.querySelector('.error__button');
    var errorTitle = errorMessage.querySelector('.error__title');

    errorTitle.textContent = message;

    if (type) {
      errorCloseButton.textContent = 'Закрыть';
    }

    fragment.appendChild(errorMessage);
    main.appendChild(fragment);

    errorCloseButton.addEventListener('click', onClickErrorButton);
    document.addEventListener('click', onMissClickErrorMessage);
    document.addEventListener('keydown', onKeydownErrorMessage);
  }


  var onLoadError = function (message) {
    var isLoad = true;
    createErrorMessage(message, isLoad);
  };

  var onSendError = function (message) {
    var isLoad = false;
    createErrorMessage(message, isLoad);
  };

  return {
    onLoadError: onLoadError,
    onSendError: onSendError
  };

})();
