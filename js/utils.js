'use strict';

window.utils = (function () {

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
  function addToFragment(elements, count, callback) {
    if (callback && typeof callback === 'function') {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < count; i++) {
        fragment.appendChild(callback(elements[i]));
      }

      return fragment;
    }

    return null;
  }

  return {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    addToFragment: addToFragment
  };

})();
