var photoDescription = [];

var getRandomNumber = function (min, max) {
  return (Math.random() * (max - min) + min) ^ 0;
}

var comments = [
  'Все Отлично',
  'Не передаваемые эмоции',
  'Какой снимок красивый',
  'Velikolepno😍',
  'Ого! Это вы где?',
  'Очень красивый вид , фотография захватывает дух 👍🏔️',
  'Ваши публикации всегда очень интересные👍🏻'
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
      avatar: 'img/avatar-6.svg',
      message: comments[getRandomNumber(0, 6)],
      name: authors[getRandomNumber(0, 12)]
    })
  }
  return array;
}

var createDemoDataArray = function (length) {
  var array = []
  for (var i = 0; i < length; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      description: 'My favorite photo',
      likes: getRandomNumber(15, 200),
      comments: createRandomComments(getRandomNumber(0, 6))
    }
    array.push(photo);
  }
  return array;

}

var photos = createDemoDataArray(25);

console.log(photos);
