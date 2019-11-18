'use strict';

(function () {

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
  var photos = createDemoDataArray(25);

  function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min) ^ 0;
  }

  function createRandomComments(length) {
    var array = [];
    for (var i = 0; i < length; i++) {
      array.push({
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        message: comments[getRandomNumber(0, 7)],
        name: authors[getRandomNumber(0, 12)]
      });
    }
    return array;
  }

  function createDemoDataArray(length) {
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
  }

  window.photos = photos;

}());
