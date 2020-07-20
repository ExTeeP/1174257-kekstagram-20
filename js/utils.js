'use strict';

window.utils = (function () {
  var DEBOUNCE_INTERVAL = 500;

  // Рандомное число из промежутка или рандомное число
  function getRandomInt(min, max) {
    if (max !== undefined) {
      return Math.round(Math.random() * (max - min) + min);
    }

    return Math.floor(Math.random() * min);
  }

  // Вывести рандомный элемент из массива
  function getRandomElement(arr) {
    return arr[getRandomInt(arr.length)];
  }

  // Добавляет в фрагмент элементы для последующего вывода на страницу
  function addToFragment(elements, callback) {
    if (callback && typeof callback === 'function') {
      var fragment = document.createDocumentFragment();

      elements.forEach(function (element) {
        fragment.appendChild(callback(element));
      });

      return fragment;
    }

    return null;
  }

  // Перемешивание массива
  function getShuffleArray(array, iteration) {
    var arrayCopy = array.slice();
    var currentIndex = iteration ? iteration : arrayCopy.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {

      randomIndex = window.utils.getRandomInt(currentIndex);
      currentIndex -= 1;

      temporaryValue = arrayCopy[currentIndex];
      arrayCopy[currentIndex] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = temporaryValue;
    }

    return iteration ? arrayCopy.splice(0, iteration) : arrayCopy;
  }

  function debounce(callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  return {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    addToFragment: addToFragment,
    getShuffleArray: getShuffleArray,
    debounce: debounce
  };

})();
