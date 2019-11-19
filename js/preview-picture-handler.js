'use strict';

(function () {
  var photos = window.photos;
  var createBigPhotoNode = window.createBigPhotoNode;
  var bigPicture = document.querySelector('.big-picture');
  var targetPhoto = document.querySelector('.pictures');
  var closeBigPhotoBtn = document.querySelector('.big-picture__cancel');

  targetPhoto.addEventListener('click', openBigPhoto);
  targetPhoto.addEventListener('keydown', openBigPhoto);
  closeBigPhotoBtn.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', closeBigPhoto);

  function openBigPhoto(event) {
    var identificatedClick;
    var targetElement;
    if (event.which === 13) {
      targetElement = event.target.children[0];
    } else {
      if (event.which === 1) {
        targetElement = event.target;
      }
    }
    var array = [];
    for (var i = 1; i < photos.length + 1; i++) {
      identificatedClick = document.querySelector('.pictures a:nth-of-type(' + i + ')');
      array.push(identificatedClick);
      if (identificatedClick.childNodes[0] === targetElement) {
        createBigPhotoNode(photos[array.length - 1]);
        i = array.length;
      }
    }
  }

  function closeBigPhoto(event) {
    if (event.keyCode === 27 || event.which === 1) {
      bigPicture.classList.add('hidden');
    }
  }

  window.bigPicture = bigPicture;

}());
