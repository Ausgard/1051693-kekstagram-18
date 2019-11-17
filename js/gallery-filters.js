'use strict';

(function () {

  var slider = document.querySelector('.effect-level__line');
  var rangeControl = slider.querySelector('.effect-level__pin');
  var effectControl = slider.querySelector('.effect-level__depth');
  var uploadedImgBlockCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('.img-upload__input');
  var uploadedImgBlock = document.querySelector('.img-upload__overlay');
  var uploadFilterControls = document.querySelector('.effects__list');
  var effectLevelRange = document.querySelector('.img-upload__effect-level');
  var prewiewImg = document.querySelector('.img-upload__preview img:nth-of-type(1)');
  var newLeft;
  var sliderLength = 450;
  var effect = 'effects__preview--none';
  var appliedFilter = 'effects__preview--none';
  var currentFilterPercentage = 1;
  var filterValue = '';
  var previewPhoto = document.querySelector('.img-upload__preview img');
  var scaleBlock = document.querySelector('.img-upload__scale');
  var scaleValue = document.querySelector('.scale__control--value');
  var zoomStep = 0.25;
  var zoomValue = 1;
  var button = 'scale__control  scale__control--value';
  var scaleValueCounter;
  var zoomClassValues = 'zoom_standart';
  prewiewImg.style.transform = 'scale(' + zoomValue + ')';

  uploadFile.addEventListener('change', openUploadedImgBlock);

  function openUploadedImgBlock() {
    uploadedImgBlock.classList.remove('hidden');
  }

  effectLevelRange.classList.add('hidden');

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

  function closePreviewPhotoMouse() {
    uploadedImgBlock.classList.add('hidden');
    setDefaultFilterValue();
  }
  uploadedImgBlockCancel.addEventListener('click', closePreviewPhotoMouse);

  function setDefaultFilterValue() {
    prewiewImg.style.transform = 'scale(' + zoomValue + ')';
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
    setZoom(event);
  }

  function setScaleValueCounter() {
    scaleValueCounter = ((zoomValue * 100) + '%');
    scaleValue.setAttribute('value', scaleValueCounter);
  }
  setScaleValueCounter(zoomValue);

  scaleBlock.addEventListener('click', setZoom);

  function setZoom(event) {
    button = event.target.className;
    if (button) {
      zoomClassValues = {
        'scale__control  scale__control--smaller': 'zoom_out',
        'scale__control  scale__control--bigger': 'zoom_in',
        'scale__control  scale__control--value': 'zoom_standart'
      };
    }
    var appliedZoom = zoomClassValues[button];
    function zoomCount() {
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
      prewiewImg.style.transform = 'scale(' + zoomValue + ')';
    }
    applyZoom();
  }

}());
