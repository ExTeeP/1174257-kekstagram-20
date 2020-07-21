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

  function createErrorMessage(message, errorButtonText) {
    var errorMessage = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var errorCloseButton = errorMessage.querySelector('.error__button');
    var errorTitle = errorMessage.querySelector('.error__title');

    errorTitle.textContent = message;
    errorCloseButton.textContent = errorButtonText;

    fragment.appendChild(errorMessage);
    main.appendChild(fragment);

    errorCloseButton.addEventListener('click', onClickErrorButton);
    document.addEventListener('click', onMissClickErrorMessage);
    document.addEventListener('keydown', onKeydownErrorMessage);
  }

  function onError(message, errorButtonText) {
    createErrorMessage(message, errorButtonText);
  }

  return {
    onError: onError,
  };

})();
