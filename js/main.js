'use strict';

// Количество постов
var POST_COUNT = 25;

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

// Массив комментариев
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив подписи к фото
var PHOTO_CAPTION = [
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

// var simulatedListPost = document.querySelector('.pictures');
// var postTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

function getMessage() {
  var index = getRandomInt(0, 1);
  if (index % 2 === 0) {
    return getRandomElement(COMMENTS) + ' ' + getRandomElement(COMMENTS);
  }

  return getRandomElement(COMMENTS);
}

function createUserComment() {
  var avatarIndex = getRandomInt(1, 6);

  var comment = {
    avatar: 'img/avatar-' + avatarIndex + '.svg',
    message: getMessage(),
    name: getRandomElement(USERS),
  };

  return comment;
}

function createCommentsArray() {
  var commentsCount = getRandomInt(0, 17);
  var comments = [];

  for (var i = 0; i <= commentsCount; i++) {
    comments.push(createUserComment());
  }

  return comments;
}

function createPhotoDesc(photoIndex) {
  var photoDesc = {
    url: 'photos/' + photoIndex + '.jpg',
    description: getRandomElement(PHOTO_CAPTION),
    likes: getRandomInt(15, 200),
    comments: createCommentsArray(),
  };

  return photoDesc;
}

function createPhotosArray() {
  var photoArray = [];

  for (var i = 0; i < POST_COUNT; i++) {
    photoArray.push(createPhotoDesc(i + 1));
  }

  return photoArray;
}
