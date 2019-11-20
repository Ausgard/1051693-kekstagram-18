'use strict';

(function () {
  var requestUrl = 'https://js.dump.academy/kekstagram/data';
  var xhr = new XMLHttpRequest();
  var array = [];

  function testFu() {

    xhr.open('GET', requestUrl);
    xhr.responseType = 'json';
    xhr.send();
      xhr.onload = function () {
        for (var i = 0; i < xhr.response.length; i++) {
          array.push(xhr.response[i]);
        }
        console.log(array);
      }
  }

  testFu(array);
  console.log(array);

}());
