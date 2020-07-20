'use strict';

window.saturation = (function () {

  // Насыщеность
  var SATURATION_DEFAULT = 100;

  var Effect = {
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEditModal.querySelector('.img-upload__preview img');
  var saturationPin = pictureEditModal.querySelector('.effect-level__pin');
  var saturationValue = pictureEditModal.querySelector('.effect-level__value');
  var saturationLine = pictureEditModal.querySelector('.effect-level__line');
  var saturationLineDepth = pictureEditModal.querySelector('.effect-level__depth');

  // Возвращение к заводским настройкам
  function setSourceSaturation() {
    saturationValue.value = SATURATION_DEFAULT;
    saturationPin.style.left = SATURATION_DEFAULT + '%';
    saturationLineDepth.style.width = SATURATION_DEFAULT + '%';
  }

  // В зависимости от класс изменяет насыщеность
  var setSaturation = function (percent) {
    Array.from(picturePreview.classList, function (element) {
      if (element.match('effects__preview--')) {
        switch (element) {
          case Effect.chrome:
            picturePreview.style.filter = 'grayscale(' + percent / 100 + ')';
            break;
          case Effect.sepia:
            picturePreview.style.filter = 'sepia(' + percent / 100 + ')';
            break;
          case Effect.marvin:
            picturePreview.style.filter = 'invert(' + percent + '%)';
            break;
          case Effect.phobos:
            picturePreview.style.filter = 'blur(' + (percent * 3 / 100) + 'px)';
            break;
          case Effect.heat:
            picturePreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
            break;
          default:
            picturePreview.style.filter = '';
        }
      }
    });
  };

  // Передвижение пина и изменение значений эффекта
  function onSaturationPinMove(evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var lineWidth = saturationLine.offsetWidth;
    var pinStep = lineWidth / 100;
    var percent;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      var pinCoordX = evt.target.offsetLeft - shiftX;
      percent = Math.round(pinCoordX / pinStep);

      startCoordX = moveEvt.clientX;

      if (!(pinCoordX < 0 || pinCoordX > lineWidth)) {
        saturationValue.value = percent;
        saturationPin.style.left = percent + '%';
        saturationLineDepth.style.width = percent + '%';
        setSaturation(percent);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  return {
    onSaturationPinMove: onSaturationPinMove,
    setSourceSaturation: setSourceSaturation,
  };

})();
