'use strict';

window.scale = (function () {

  // Переменные для изменения масштаба
  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEditModal.querySelector('.img-upload__preview img');
  var scaleValue = pictureEditModal.querySelector('.scale__control--value');

  // Парсит значение масштаба фотографии в число, тк в поле знацение в %
  function getValueScale() {
    return parseInt(scaleValue.value, 10);
  }

  // Устанавливает значение масштаба по умолчанию
  function setSourceScale() {
    scaleValue.value = SCALE_MAX + '%';
    picturePreview.style.transform = 'scale(' + (SCALE_MAX / 100) + ')';
  }

  // При клике увеличивает масштаб фото
  function onScaleIncreaseClick() {
    var value = getValueScale();

    if (value < SCALE_MAX) {
      value += SCALE_STEP;
      picturePreview.style.transform = 'scale(' + (value / 100) + ')';
      scaleValue.value = value + '%';
    }
  }

  // При клике уменьшает масштаб фото
  function onScaleDecreaseClick() {
    var value = getValueScale();

    if (value > SCALE_MIN) {
      value -= SCALE_STEP;
      picturePreview.style.transform = 'scale(' + (value / 100) + ')';
      scaleValue.value = value + '%';
    }
  }

  return {
    setSourceScale: setSourceScale,
    onScaleIncreaseClick: onScaleIncreaseClick,
    onScaleDecreaseClick: onScaleDecreaseClick
  };

})();
