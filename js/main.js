'use strict';

window.main = (function () {

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var bigPictureClose = document.querySelector('#picture-cancel');
  var bigPictureModal = document.querySelector('.big-picture');

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

  // Обработчик открытия модального окна для каждой фотографии
  picturesContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    var picture = target.matches('.picture__img');

    if (target && picture) {
      evt.preventDefault();
      // window.preview.hideControlElement();
      window.preview.fillBigPicture(target);
      showModal(bigPictureModal);
    }
  });

  // Обработчик закрытия модального окна фотографии
  bigPictureClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
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

    pictureDescription.addEventListener('change', window.form.onPicteruDescriptionChange);
    pictureDescription.addEventListener('focus', onElementFocus);
    pictureDescription.addEventListener('blur', onElementBlur);

    pictureHashtag.addEventListener('change', window.form.onPictureHashtragChange);
    pictureHashtag.addEventListener('focus', onElementFocus);
    pictureHashtag.addEventListener('blur', onElementBlur);

    saturationPin.addEventListener('mousedown', window.saturation.onSaturationPinMove);
  });

  // Обработчик закрытия модального окна редактирования фотографии
  pictureEditClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetUploadImage();
    closeModal();

    scaleIncrease.removeEventListener('click', window.scale.onScaleIncreaseClick);
    scaleDecrease.removeEventListener('click', window.scale.onScaleDecreaseClick);

    pictureEffectList.removeEventListener('click', window.effects.onEffectPreviewClick);

    pictureDescription.removeEventListener('change', window.form.onPicteruDescriptionChange);
    pictureDescription.removeEventListener('focus', onElementFocus);
    pictureDescription.removeEventListener('blur', onElementBlur);

    pictureHashtag.removeEventListener('change', window.form.onPictureHashtragChange);
    pictureHashtag.removeEventListener('focus', onElementFocus);
    pictureHashtag.removeEventListener('blur', onElementBlur);

    saturationPin.removeEventListener('mousedown', window.saturation.onSaturationPinMove);
  });

})();
