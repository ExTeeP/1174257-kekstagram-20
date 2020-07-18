'use strict';

window.success = (function () {

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function onClickSuccessButton() {
    removeSuccessMessage();
  }

  function onMissClickSuccessMessage(evt) {
    if (evt.target !== document.querySelector('.success__inner')) {
      removeSuccessMessage();
    }
  }

  function onKeydownSuccessMessage(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessMessage();
    }
  }

  function removeSuccessMessage() {
    var successMessage = document.querySelector('.success');
    var successCloseButton = successMessage.querySelector('.success__button');

    main.removeChild(successMessage);

    successCloseButton.removeEventListener('click', onClickSuccessButton);
    document.removeEventListener('click', onMissClickSuccessMessage);
    document.removeEventListener('keydown', onKeydownSuccessMessage);

  }

  function createSuccessMessage() {
    var successMessage = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var successCloseButton = successMessage.querySelector('.success__button');

    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    successCloseButton.addEventListener('click', onClickSuccessButton);
    document.addEventListener('click', onMissClickSuccessMessage);
    document.addEventListener('keydown', onKeydownSuccessMessage);
  }

  function onSuccess() {
    createSuccessMessage();
  }

  return {
    onSuccess: onSuccess
  };

})();
