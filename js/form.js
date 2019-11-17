'use strict';

(function () {

  var uploadFormButton = document.querySelector('.img-upload__submit');
  var hashtagInput = document.querySelector('.text__hashtags');
  var comentInput = document.querySelector('.text__description');
  var uploadedImgBlock = document.querySelector('.img-upload__overlay');
  uploadFormButton.addEventListener('click', createHashtagArray);
  uploadFormButton.addEventListener('click', createComentString);
  document.addEventListener('keydown', closeComentTextarea);

  function createHashtagArray() {
    var flag;
    var separator = ' ';
    var inputString = hashtagInput.value;
    var array = [];
    var upperCaseArray = [];
    array = inputString.split(separator);

    function removeSpaces() {
      array.sort();
      for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length;) {
          if (array[i] === '') {
            array.splice(i, 1);
          } else {
            j++;
          }
        }
      }
    }
    removeSpaces(array);
    function findIdenticalHashtag() {
      upperCaseArray = upperCaseArray.concat(array);
      for (var i = 0; i < upperCaseArray.length; i++) {
        upperCaseArray[i] = upperCaseArray[i].toUpperCase();
      }
      for (i = 0; i < upperCaseArray.length; i++) {
        for (var j = i + 1; j < upperCaseArray.length;) {
          if (upperCaseArray[i] === upperCaseArray[j]) {
            upperCaseArray.splice(i, 1);
          } else {
            j++;
          }
        }
      }
      comparisonArrays(array, upperCaseArray);
    }
    function comparisonArrays() {
      flag = array.length !== upperCaseArray.length;
    }
    findIdenticalHashtag(array);
    function validationErrors() {

      for (var i = 0; i < array.length; i++) {
        if (array[i].charAt(0) !== '#') {
          hashtagInput.setCustomValidity('Ошибка: ' + '"' + array[i] + '"' + ' хеш-тег должен начинаться со знака "#"');
        }
        if (array[i].length === 1 && array[i].charAt(0) === '#') {
          hashtagInput.setCustomValidity('Ошибка: ' + '"' + array[i] + '"' + ' хеш-тег не может состоять только со знака "#"');
        }
        if (array[i].charAt(array[i].length - 1) === ',' || array[i].charAt(array[i].length - 1) === '.') {
          hashtagInput.setCustomValidity('Ошибка: ' + '"' + array[i] + '"' + ' хеш-теги должны разделяться пробелом');
        }
        if (flag) {
          hashtagInput.setCustomValidity('Ошибка: один и тот же хэш-тег не может быть использован дважды');
        }
        if (array.length > 5) {
          hashtagInput.setCustomValidity('Ошибка: нельзя указать больше пяти хэш-тегов');
        }
        if (array[i].length > 20) {
          hashtagInput.setCustomValidity('Ошибка: ' + '"' + array[i] + '"' + ' максимальная длина одного хэш-тега 20 символов');
        }
      }
    }
    validationErrors(array);
  }

  function createComentString() {
    var inputString = comentInput.value;
    if (inputString.length > 140) {
      comentInput.setCustomValidity('Длина коментария не должна превышать 140 символов');
    }
  }

  function closeComentTextarea(event) {
    var closeFlag;
    if (document.activeElement === comentInput || document.activeElement === hashtagInput) {
      closeFlag = true;
    } else {
      closeFlag = false;
    }
    if (event.keyCode === 27) {
      if (!closeFlag) {
        uploadedImgBlock.classList.add('hidden');
      }
    }
  }

}());
