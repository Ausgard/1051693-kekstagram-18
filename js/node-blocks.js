'use strict';

(function () {

  var block = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function createPhotoNode(photo) {
    var squareLength = 182;
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
  }

  function createBigPictureCommentBlock(photo) {
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
  }

  function createBigPhotoNode(photo) {
    createBigPictureCommentBlock(photo);
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
    for (var i = 0; i < bigPictureCommentsBlock.childNodes.length; i++) {
      bigPictureCommentsBlock.innerHTML = '';
    }
    for (i = 0; i < photo.comments.length; i++) {
      bigPictureCommentsBlock.appendChild(createBigPictureCommentBlock(photo.comments[i]));
    }
    var bigPictureSocialCommentCount = document.querySelector('.social__comment-count');
    bigPictureSocialCommentCount.classList.add('visually-hidden');
    var bigPictureSocialCommentLoader = document.querySelector('.comments-loader');
    bigPictureSocialCommentLoader.classList.add('visually-hidden');
    return bigPicture;
  }

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoNode(photos[i]));
  }
  block.appendChild(fragment);

  window.createBigPhotoNode = createBigPhotoNode;

}());
