'use strict';
var getRandomNumber = function (min, max) {
  return (Math.random() * (max - min) + min) ^ 0;
};
var comments = [
  'Все Отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

var authors = [
  'Андрей',
  'Светлана',
  'Артем',
  'Карина',
  'Виталий',
  'Василий',
  'Вероника',
  'Александр',
  'Александра',
  'Анна',
  'Филип',
  'Елизавета',
  'Алиса'
];

var createRandomComments = function (length) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array.push({
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: comments[getRandomNumber(0, 7)],
      name: authors[getRandomNumber(0, 12)]
    });
  }
  return array;
};

var createDemoDataArray = function (length) {
  var array = [];
  for (var i = 0; i < length; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'My favorite photo',
      likes: getRandomNumber(15, 200),
      comments: createRandomComments(getRandomNumber(0, 7))
    };
    array.push(photo);
  }
  return array;
};
var photos = createDemoDataArray(25);

// Создание DOM-элемента на основе JS-объекта
var createPhotoNode = function (photo) {
  var createPictureLink = document.createElement('a');
  var createPictureImg = document.createElement('img');
  var createPictureInfo = document.createElement('p');
  var createPictureLikes = document.createElement('span');
  var createPictureComments = document.createElement('span');
  var childInfo;
  var photoBlock;
  createPictureLink.appendChild(createPictureImg);
  childInfo = createPictureLink.appendChild(createPictureInfo);
  childInfo.appendChild(createPictureLikes);
  childInfo.appendChild(createPictureComments);
  createPictureLink.setAttribute('href', '#');
  createPictureImg.setAttribute('src', photo.url);
  createPictureImg.setAttribute('width', '182');
  createPictureImg.setAttribute('height', '182');
  createPictureImg.setAttribute('alt', 'Случайная фотография');
  createPictureLink.classList.add('picture');
  createPictureImg.classList.add('picture__img');
  createPictureInfo.classList.add('picture__info');
  createPictureComments.classList.add('picture__comments');
  createPictureLikes.classList.add('picture__likes');
  createPictureLikes.innerHTML = photo.likes;
  createPictureComments.innerHTML = photo.comments.length;
  photoBlock = createPictureLink;
  return photoBlock;
};

// Заполнение блока DOM-элементами на основе массива JS-объектов
var block = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(createPhotoNode(photos[i]));
}
block.appendChild(fragment);

// Создание большой фотографии из массива объектов в полноразмерном режиме
var createBigPhotoNode = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  var bigPictureImg = document.querySelector('.big-picture__img img:nth-of-type(1)');
  bigPictureImg.setAttribute('src', photos[0].url);
  var bigPicturelikes = document.querySelector('.likes-count');
  bigPicturelikes.innerHTML = photos[0].likes;
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  bigPictureCommentsCount.innerHTML = photo.comments.length;
  var bigPictureCommentsImg = document.querySelector('.social__picture');
  bigPictureCommentsImg.setAttribute('src', photos[0].comments[0].avatar);
  bigPictureCommentsImg.setAttribute('alt', photos[0].comments[0].name);
  var bigPictureCommentsText = document.querySelectorAll('.social__comments p'); // Или лучше 2 раза querySelector?
  bigPictureCommentsText[0].innerHTML = photos[0].comments[0].message;
  bigPictureCommentsText[1].innerHTML = photos[0].comments[0].message; // Вот тут не уверен правильно ли
  var bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.innerHTML = photos[0].description;
  var bigPictureSocialCommentCount = document.querySelector('.social__comment-count');
  bigPictureSocialCommentCount.classList.add('visually-hidden');
  var bigPictureSocialCommentLoader = document.querySelector('.comments-loader');
  bigPictureSocialCommentLoader.classList.add('visually-hidden');
  return bigPicture;
};
createBigPhotoNode(photos[0]);
