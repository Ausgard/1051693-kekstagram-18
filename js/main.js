var photoDescription = [];

var getRandomNumber = function (min, max) {
  return (Math.random() * (max - min) + min) ^ 0;
}

// Добавь больше комментов
var comments = [
  'Все Отлично'
  'Не передаваемые эмоции'
  'Какой снимок красивый'
  'Velikolepno😍'
  'Ого! Это вы где?'
  'Очень красивый вид , фотография захватывает дух 👍🏔️'
  'Ваши публикации всегда очень интересные👍🏻'
]

var createRandomComments = function (length) {
  var array = []
  for (var i = 0; i < length; i++) {
    array.push({
      avatar: 'img/avatar-6.svg',
      // Поменяй максимальное значение до количества комментов - 1
      // Например: message: comments[getRandomNumber(0, 10)]
      message: comments[0],
      name: 'Артем'
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
      comments: createRandomComments(getRandomNumber(1, 3))
    }
    array.push(photo);
  }
  return array;

}

var photos = createDemoDataArray(25);

console.log(photos);
