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
  var squareLength = 182;
  var createPictureLink = document.createElement('a');
  var createPictureImg = document.createElement('img');
  var createPictureInfo = document.createElement('p');
  var createPictureLikes = document.createElement('span');
  var createPictureComments = document.createElement('span');
  var childInfo;
  var photoBlock;
  var squareLength = 182;
  createPictureLink.appendChild(createPictureImg);
  childInfo = createPictureLink.appendChild(createPictureInfo);
  childInfo.appendChild(createPictureLikes);
  childInfo.appendChild(createPictureComments);
  createPictureLink.setAttribute('href', '#');
  createPictureImg.setAttribute('src', photo.url);
  createPictureImg.setAttribute('width', squareLength);
  createPictureImg.setAttribute('height', squareLength);
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

// Создание блока коментариев
var createBigPictureCommentBlock = function (photo) {
  var squareLengthBlock = 35;
  var createBlock = document.createElement('li');
  var createImg = document.createElement('img');
  var createP = document.createElement('p');
  createBlock.appendChild(createImg);
  createBlock.appendChild(createP);
  createBlock.classList.add('social__comment');
  createImg.classList.add('social__picture');
  createP.classList.add('social__text');
  createImg.setAttribute('src', photo.avatar);
  createImg.setAttribute('alt', photo.name);
  createImg.setAttribute('width', squareLengthBlock);
  createImg.setAttribute('height', squareLengthBlock);
  createP.innerHTML = photo.message;
  return createBlock;
};

var createBigPhotoNode = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  var bigPictureImg = document.querySelector('.big-picture__img img:nth-of-type(1)');
  bigPictureImg.setAttribute('src', photo.url);
  var bigPicturelikes = document.querySelector('.likes-count');
  bigPicturelikes.innerHTML = photo.likes;
  var bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.innerHTML = photo.description;
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  bigPictureCommentsCount.innerHTML = photo.comments.length;
  var bigPictureCommentsBlock = document.querySelector('.social__comments');
  // Чистка блока
  for (i = 0; i < bigPictureCommentsBlock.childNodes.length; i++) {
    bigPictureCommentsBlock.innerHTML = '';
  }
  // Наполнение блока
  for (i = 0; i < photo.comments.length; i++) {
    bigPictureCommentsBlock.appendChild(createBigPictureCommentBlock(photo.comments[i]));
  }
  var bigPictureSocialCommentCount = document.querySelector('.social__comment-count');
  bigPictureSocialCommentCount.classList.add('visually-hidden');
  var bigPictureSocialCommentLoader = document.querySelector('.comments-loader');
  bigPictureSocialCommentLoader.classList.add('visually-hidden');
  return bigPicture;
};
// createBigPhotoNode(photos[0]);
