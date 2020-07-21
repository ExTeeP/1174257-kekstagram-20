'use strict';

window.effects = (function () {

  var Effect = {
    NONE: 'effect-none',
    CHROME: 'effect-chrome',
    SEPIA: 'effect-sepia',
    MARVIN: 'effect-marvin',
    PHOBOS: 'effect-phobos',
    HEAT: 'effect-heat'
  };

  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEditModal.querySelector('.img-upload__preview img');
  var saturationControlSet = pictureEditModal.querySelector('.effect-level');

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
        picturePreview.style.filter = '';
      }
    });
  }

  // Сбрасывает предыдущий эффект и накладывает новый
  function applyEffect(style) {
    removeEffect();
    showSaturationControls();
    window.saturation.setSourceSaturation();
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
      case Effect.NONE:
        setSourceEffect();
        break;
      case Effect.CHROME:
        applyEffect('effects__preview--chrome');
        break;
      case Effect.SEPIA:
        applyEffect('effects__preview--sepia');
        break;
      case Effect.MARVIN:
        applyEffect('effects__preview--marvin');
        break;
      case Effect.PHOBOS:
        applyEffect('effects__preview--phobos');
        break;
      case Effect.HEAT:
        applyEffect('effects__preview--heat');
        break;
    }
  }

  return {
    onEffectPreviewClick: onEffectPreviewClick,
    setSourceEffect: setSourceEffect,
  };

})();
