'use strict';

window.effects = (function () {

  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEditModal.querySelector('.img-upload__preview img');
  var saturationControlSet = pictureEditModal.querySelector('.effect-level');
  var saturationPin = pictureEditModal.querySelector('.effect-level__pin');
  var saturationValue = pictureEditModal.querySelector('.effect-level__value');
  var saturationLine = pictureEditModal.querySelector('.effect-level__line');
  var saturationLineDepth = pictureEditModal.querySelector('.effect-level__depth');

  // Передаёт положение бегунка и заполняет связанные поля
  function getSaturationValue() {
    var lineWidth = saturationLine.offsetWidth;
    var pinPosition = saturationPin.offsetLeft;
    var pinStep = lineWidth / 100;
    var percent = Math.round(pinPosition / pinStep);

    saturationValue.value = percent;
    saturationPin.style.left = percent + '%';
    saturationLineDepth.style.width = percent + '%';

    return percent;
  }

  // Скрыть блок с управлением насыщенности фильтра
  function hideSaturationControls() {
    saturationControlSet.classList.add('hidden');
  }

  // Показать блок с управлением насыщенности фильтра
  function showSaturationControls() {
    saturationControlSet.classList.remove('hidden');
  }

  // Создает массив из классов узла для сравнения и удаления наложенного фильтра
  function removeEffect() {
    Array.from(picturePreview.classList, function (element) {
      if (element.match('effects__preview--')) {
        picturePreview.classList.remove(element);
      }
    });
  }

  // Сбрасывает предыдущий эффект и накладывает новый
  function applyEffect(style) {
    removeEffect();
    showSaturationControls();
    picturePreview.classList.add(style);
  }

  // Возвращает к оригинальному эффекту
  function setSourceEffect() {
    removeEffect();
    hideSaturationControls();
    picturePreview.classList.add('effects__preview--none');
  }

  // Переключатель между классами
  function onEffectPreviewClick(evt) {
    switch (evt.target.id) {
      case 'effect-none':
        setSourceEffect();
        break;
      case 'effect-chrome':
        applyEffect('effects__preview--chrome');
        break;
      case 'effect-sepia':
        applyEffect('effects__preview--sepia');
        break;
      case 'effect-marvin':
        applyEffect('effects__preview--marvin');
        break;
      case 'effect-phobos':
        applyEffect('effects__preview--phobos');
        break;
      case 'effect-heat':
        applyEffect('effects__preview--heat');
        break;
    }
  }

  // При отпускании передает позицию ползунка
  saturationPin.addEventListener('mouseup', function () {
    getSaturationValue();
  });

  return {
    onEffectPreviewClick: onEffectPreviewClick,
    setSourceEffect: setSourceEffect,
  };

})();
