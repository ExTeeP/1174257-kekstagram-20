'use strict';

window.gallery = (function () {

  // Количество фото
  var PICTURES_COUNT = 25;

  // Массив имен
  var USERS = [
    'Александр',
    'Артём',
    'Снежанна',
    'Мария',
    'Кирилл',
    'Рома',
    'Изабель',
    'Юра',
    'Эльвира',
    'Владимир',
    'Николай',
    'Сергей',
    'Евгений',
    'Егор',
    'Оксана',
    'Светлана',
    'Августин',
    'Дмитрий',
    'Алевтина',
    'Инокентий',
    'Иван',
    'Анатолий',
    'Геральд',
    'Антон',
    'Трисс'
  ];

  // Массив комментариев от пользователей
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // Массив подписи к фото от автора
  var PICTURE_CAPTION = [
    'Отдых это хорошо: все знают, и кто ты, а кто нет. И знаешь, что нужно делать.',
    'И что на нем написано, в этой твоей Вселенной? «Золото Дола»? «Медалей»? «Пурпурного галстука»?',
    'Какой предел продуктивной паранойи может быть у железного человека? Да ещё в мирное время?',
    'Девушка оказалась гораздо легче.',
    '«Звёздная война». Главный герой Антон Шлемин – оптимист и переживающий за судьбу человека вне рамок мундира.',
    'Пинский баллон в программе. Бис первый в своем роде.',
    'На этот раз Барби показалось, что на ее спине кроме того квадрата вырезали еще и сердце.',
    'Многие говорят, что это вовсе не то, что вы думаете, а «не большее количество людей».',
    'В культурном центре — эти люди спокойно читают газеты, сидя у компьютера, наблюдая за происходящим на улицах.',
    'Москва? Откуда она взялась, когда другие ломали голову над этой таинственной темой.',
    'Котикистрия. По-моему, это книга, которая должна быть на каждом книжном прилавке.',
    'Каждый хочет изменить человечество, но никто не задумывается о том, как изменить себя.',
    'Наша жизнь начинает подходить к концу, когда мы перестаём говорить о действительно важных вещах.',
    'Стоит только поверить, что вы можете – и вы уже на полпути к цели.',
    'Приносить пользу миру — это единственный способ стать счастливым.',
    'У каждого свои недостатки.',
    'Запомните, что не достичь успеха – иногда тоже большая удача.',
    'Суши. Именно так меня называла жена. Холодный, как рыба.',
    'У всего есть своя красота, но не каждый может ее увидеть.',
    'Мир делится на два класса — одни веруют в невероятное, другие совершают невозможное.',
    'Неосмысленная жизнь не стоит того, чтобы жить.',
    'Стремитесь не к успеху, а к ценностям, которые он даёт​.',
    'Сложнее всего начать действовать, все остальное зависит только от упорства.',
    'Успех — это способность идти от поражения к поражению, не теряя оптимизма.',
    'Не столь важно, как медленно ты идешь, как то, как долго ты идешь, не останавливаясь.',
  ];

  // Для работы с фотографиями на главной странице
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Массив с сгенерированными фото для главной страницы
  var picturesList = createPicturesArray(PICTURES_COUNT);

  // Рандомно склеивает комментарии
  function getRandomMessage(arr) {
    var index = window.utils.getRandomInt(0, 1);

    if (index % 2 === 0) {
      return window.utils.getRandomElement(arr) + ' ' + window.utils.getRandomElement(arr);
    }

    return window.utils.getRandomElement(arr);
  }

  // Создает пользовательский комментарий
  function createUserComment() {
    var index = window.utils.getRandomInt(1, 6);

    var comment = {
      avatar: 'img/avatar-' + index + '.svg',
      message: getRandomMessage(COMMENTS),
      name: window.utils.getRandomElement(USERS),
    };

    return comment;
  }

  // Создает массив с комментариями к одному фото
  function createCommentsArray() {
    var comments = [];
    var minComments = 0;
    var maxComments = 17;
    var commentsCount = window.utils.getRandomInt(minComments, maxComments);

    for (var i = 0; i <= commentsCount; i++) {
      comments.push(createUserComment());
    }

    return comments;
  }

  // Создает пользовательское фото
  function createPictureDesc(index, descriptions) {
    var minLikes = 15;
    var maxLikes = 200;

    var pictureDesc = {
      url: 'photos/' + index + '.jpg',
      description: window.utils.getRandomElement(descriptions),
      likes: window.utils.getRandomInt(minLikes, maxLikes),
      comments: createCommentsArray(),
    };

    return pictureDesc;
  }

  // Создает массив фотографий пользователей
  function createPicturesArray(count) {
    var picturesArray = [];

    for (var i = 0; i < count; i++) {
      picturesArray.push(createPictureDesc(i + 1, PICTURE_CAPTION));
    }

    return picturesArray;
  }

  // Клонирует шаблон фото и заполняет его
  function createPictureElement(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  picturesContainer.appendChild(window.utils.addToFragment(picturesList, createPictureElement));

  var usersPictures = picturesContainer.querySelectorAll('.picture__img');

  return {
    picturesList: picturesList,
    usersPictures: usersPictures
  };

})();
