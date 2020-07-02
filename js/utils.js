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

  return {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    addToFragment: addToFragment
  };

})();
