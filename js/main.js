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

// показ интерфейса фильтров
var uploadFile = document.querySelector('.img-upload__input');
var uploadedImgBlock = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', openUploadedImgBlock);
function openUploadedImgBlock() {
  uploadedImgBlock.classList.remove('hidden');
};

var uploadFilterControls = document.querySelector('.effects__list'); // список инпутов (эффекты)
var effectLevelRange = document.querySelector('.img-upload__effect-level'); // регулятор
var prewiewImg = document.querySelector('.img-upload__preview img:nth-of-type(1)'); // фотка
var newLeft;
// применение фильтра к фото

effectLevelRange.classList.add('hidden');
var sliderLength = 450;
var effect = 'effects__preview--none';
var appliedFilter = 'effects__preview--none';
var currentFilterPercentage = 1;
var filterValue = '';
var previewPhoto = document.querySelector('.img-upload__preview img');
uploadFilterControls.addEventListener('click', setFilter);

function setFilter() {
  effect = event.target.id;
  if (effect) {
    var filters = {
      'effect-none': 'effects__preview--none',
      'effect-chrome': 'effects__preview--chrome',
      'effect-sepia': 'effects__preview--sepia',
      'effect-marvin': 'effects__preview--marvin',
      'effect-phobos': 'effects__preview--phobos',
      'effect-heat': 'effects__preview--heat'
    };
    appliedFilter = filters[effect];
    applyFilter();
  }
}

function countFilterValue(filter) {
  var filters = {
    'effects__preview--none': '',
    'effects__preview--chrome': 'grayscale(' + Math.floor(currentFilterPercentage * 100) + '%)',
    'effects__preview--sepia': 'sepia(' + Math.floor(currentFilterPercentage * 100) + '%)',
    'effects__preview--marvin': 'invert(' + Math.floor(currentFilterPercentage * 100) + '%)',
    'effects__preview--phobos': 'blur(' + Math.floor(currentFilterPercentage * 10) + 'px)',
    'effects__preview--heat': 'brightness(' + (currentFilterPercentage + 1).toFixed(1) + ')',
  };
  return filters[filter];
}

function applyFilter() {
  filterValue = countFilterValue(appliedFilter);
  previewPhoto.className = '';
  previewPhoto.classList.add(appliedFilter);
  previewPhoto.style.filter = filterValue;
  if (appliedFilter === 'effects__preview--none') {
    effectLevelRange.classList.add('hidden');
  } else {
    effectLevelRange.classList.remove('hidden');
  }
}

// регулятор
var slider = document.querySelector('.effect-level__line');
var rangeControl = slider.querySelector('.effect-level__pin');
var effectControl = slider.querySelector('.effect-level__depth');

function rangeControlHandeler() {
  var shiftX = event.clientX - rangeControl.getBoundingClientRect().left;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    event.preventDefault();
    newLeft = event.clientX - slider.getBoundingClientRect().left - shiftX;
    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = slider.offsetWidth - rangeControl.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    rangeControl.style.left = newLeft + shiftX + 'px';
    effectControl.style.width = newLeft + shiftX + 'px';
    currentFilterPercentage = newLeft / sliderLength;
    applyFilter();
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
}
rangeControl.addEventListener('mousedown', rangeControlHandeler);

// Масштаб
var scaleBlock = document.querySelector('.img-upload__scale');
var scaleValue = document.querySelector('.scale__control--value');
prewiewImg.style.transform = 'scale('+ zoomValue +')';
var zoomStep = 0.25;
var zoomValue = 1;
var button = 'scale__control  scale__control--value';
var scaleValueCounter;

function setScaleValueCounter() {
scaleValueCounter = ((zoomValue * 100) + '%');
scaleValue.setAttribute('value', scaleValueCounter);
}
setScaleValueCounter();

scaleBlock.addEventListener('click', setZoom);

function setZoom() {

  button = event.target.className;
  if (button) {
    var values = {
      'scale__control  scale__control--smaller': 'zoom_out',
      'scale__control  scale__control--bigger': 'zoom_in',
      'scale__control  scale__control--value': 'zoom_standart'
    };
  }
  var appliedZoom = values[button];
  function zoomCount(event) {
    switch (appliedZoom) {
      case 'zoom_in':
        if (zoomValue === 1) {
          break;
        } else {
          zoomValue = zoomValue + zoomStep;
        }
        break;
      case 'zoom_out':
        if (zoomValue === 0.25) {
          break;
        } else {
          zoomValue = zoomValue - zoomStep;
        }
        break;
      case 'zoom_standart':
          zoomValue = 1;
          break;
    }
    setScaleValueCounter();
  }
  zoomCount();
  function applyZoom() {
    prewiewImg.style.transform = 'scale('+ zoomValue +')';
  }
  applyZoom();
}
// закрытие
var uploadedImgBlockCancel = document.querySelector('.img-upload__cancel');

function closePreviewPhotoMouse(event) {
  uploadedImgBlock.classList.add('hidden');
  setDefaultFilterValue();
}

function closePreviewPhotoButton(event) {
      if (event.keyCode === 27) {
      if (uploadedImgBlock.classList.contains('hidden')) {
      } else {
        uploadedImgBlock.classList.add('hidden');
        setDefaultFilterValue();
      }
    }
}
uploadedImgBlockCancel.addEventListener('click', closePreviewPhotoMouse);
window.addEventListener('keydown', closePreviewPhotoButton);

function setDefaultFilterValue() {
  prewiewImg.style.transform = 'scale('+ zoomValue +')';
  zoomStep = 0.25;
  zoomValue = 1;
  button = 'scale__control  scale__control--value';
  effectLevelRange.classList.add('hidden');
  sliderLength = 450;
  appliedFilter = 'effects__preview--none';
  currentFilterPercentage = 1;
  filterValue = '';
  var effectsPreviewNoneInput = document.querySelector('.effects__radio');
  effectsPreviewNoneInput.checked = true;
  setFilter();
  applyFilter();
  setZoom();
}
