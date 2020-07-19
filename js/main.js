'use strict';

window.main = (function () {

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var bigPictureClose = document.querySelector('#picture-cancel');
  var bigPictureModal = document.querySelector('.big-picture');
  var commentLoadButton = bigPictureModal.querySelector('.comments-loader');

  // Работа с загрузкой фотографий
  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var pictureUploadInput = document.querySelector('#upload-file');
  var pictureEditClose = document.querySelector('#upload-cancel');
  var pictureEffectList = pictureEditModal.querySelector('.effects__list');
  var pictureHashtag = pictureEditModal.querySelector('.text__hashtags');
  var pictureDescription = pictureEditModal.querySelector('.text__description');
  var scaleIncrease = pictureEditModal.querySelector('.scale__control--bigger');
  var scaleDecrease = pictureEditModal.querySelector('.scale__control--smaller');
  var saturationPin = pictureEditModal.querySelector('.effect-level__pin');
  var form = picturesContainer.querySelector('#upload-select-image');

  // Открытие модального окна
  function showModal(node) {
    node.classList.remove('hidden');
    document.body.classList.add('modal-open');
    node.classList.add('active-popup'); // Добавляет класс активного окна для закрытия по Esc
    document.addEventListener('keydown', onModalEscPress);
    node.setAttribute('tabIndex', '0');
    node.focus();
  }

  // Закрытие модального окна
  function closeModal() {
    var node = document.querySelector('.active-popup');

    node.classList.add('hidden');
    document.body.classList.remove('modal-open');
    node.classList.remove('active-popup');
    document.removeEventListener('keydown', onModalEscPress);
    node.removeAttribute('tabIndex');
  }

  // Сброс значения инпута загрузки файла при закрытии окна редактирования фото
  function resetUploadImage() {
    pictureUploadInput.value = '';
  }

  // Нажатие на Esc закрывает окно
  function onModalEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }

  // Когда поле в фокусе закрыть попап нельзя
  function onElementFocus() {
    document.removeEventListener('keydown', onModalEscPress);
  }

  // Когда поле теряет фокус, его можно закрыть
  function onElementBlur() {
    document.addEventListener('keydown', onModalEscPress);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    closeModal();
    window.backend.send(new FormData(form), window.success.onSuccess, window.error.onError);
  }

  // Обработчик открытия модального окна для каждой фотографии
  picturesContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    var picture = target.matches('.picture__img');

    if (target && picture) {
      evt.preventDefault();
      window.preview.fillBigPicture(target);
      showModal(bigPictureModal);
    }
  });

  // Обработчик закрытия модального окна фотографии
  bigPictureClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();

    commentLoadButton.removeEventListener('click', window.preview.onCommentsLoadButtonClick);
  });

  // Обработчик открытия редактирования фото
  pictureUploadInput.addEventListener('change', function () {
    showModal(pictureEditModal);
    window.effects.setSourceEffect();
    window.scale.setSourceScale();
    window.saturation.setSourceSaturation();

    scaleIncrease.addEventListener('click', window.scale.onScaleIncreaseClick);
    scaleDecrease.addEventListener('click', window.scale.onScaleDecreaseClick);

    pictureEffectList.addEventListener('click', window.effects.onEffectPreviewClick);

    pictureDescription.addEventListener('change', window.validation.onPicteruDescriptionChange);
    pictureDescription.addEventListener('focus', onElementFocus);
    pictureDescription.addEventListener('blur', onElementBlur);

    pictureHashtag.addEventListener('change', window.validation.onPictureHashtragChange);
    pictureHashtag.addEventListener('focus', onElementFocus);
    pictureHashtag.addEventListener('blur', onElementBlur);

    saturationPin.addEventListener('mousedown', window.saturation.onSaturationPinMove);

    form.addEventListener('submit', onFormSubmit);
  });

  // Обработчик закрытия модального окна редактирования фотографии
  pictureEditClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetUploadImage();
    closeModal();

    scaleIncrease.removeEventListener('click', window.scale.onScaleIncreaseClick);
    scaleDecrease.removeEventListener('click', window.scale.onScaleDecreaseClick);

    pictureEffectList.removeEventListener('click', window.effects.onEffectPreviewClick);

    pictureDescription.removeEventListener('change', window.validation.onPicteruDescriptionChange);
    pictureDescription.removeEventListener('focus', onElementFocus);
    pictureDescription.removeEventListener('blur', onElementBlur);

    pictureHashtag.removeEventListener('change', window.validation.onPictureHashtragChange);
    pictureHashtag.removeEventListener('focus', onElementFocus);
    pictureHashtag.removeEventListener('blur', onElementBlur);

    saturationPin.removeEventListener('mousedown', window.saturation.onSaturationPinMove);

    form.removeEventListener('submit', onFormSubmit);
  });

})();
