var photoDescription = [];

var getRandomNumber = function (min, max) {
  return (Math.random() * (max - min) + min) ^ 0;
}

var comments = [
  'Все Отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
]

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
]

var createRandomComments = function (length) {
  var array = []
  for (var i = 0; i < length; i++) {
    array.push({
      avatar: 'img/avatar-'+ getRandomNumber(1, 6) +'.svg',
      message: comments[getRandomNumber(0, 7)],
      name: authors[getRandomNumber(0, 12)]
    })
  }
  return array;
}

var createDemoDataArray = function (length) {
  var array = []
  for (var i = 0; i < length; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'My favorite photo',
      likes: getRandomNumber(15, 200),
      comments: createRandomComments(getRandomNumber(0, 7))
    }
    array.push(photo);
  }
  return array;
}
var photos = createDemoDataArray(25);

// Создание DOM-элемента на основе JS-объекта
var PictureLink = function(length) {

var createPictureLink = document.createElement('a');
var createPictureImg = document.createElement('img');
var createPictureInfo = document.createElement('p');
var createPictureComments = document.createElement('span');
var createPictureLikes = document.createElement('span');

var childImg;
var childInfo;
var childComments;
var childComments;

var array = []

  for (var i = 0; i < length; i++) {

childImg = createPictureLink.appendChild(createPictureImg);
childInfo = createPictureLink.appendChild(createPictureInfo);
childComments = childInfo.appendChild(createPictureComments);
childComments = childInfo.appendChild(createPictureLikes);

createPictureLink.setAttribute('href', '#');
createPictureImg.setAttribute('src', ' ');
createPictureImg.setAttribute('width', '182');
createPictureImg.setAttribute('height', '182');
createPictureImg.setAttribute('alt', 'Случайная фотография');

createPictureLink.classList.add("picture");
createPictureImg.classList.add("picture__img");
createPictureInfo.classList.add("picture__info");
createPictureComments.classList.add("picture__comments");
createPictureLikes.classList.add("picture__likes");

array.push(createPictureLink);
}

return array;
}

var box = PictureLink(photos.length);

console.log(photos);
console.log(box);



// createPictureLikes.innerHTML = getRandomNumber(15, 200);
