'use strict';

window.backend = (function () {

  // Работа с запросами
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://javascript.pages.academy/kekstagram/data';
  var SEND_URL = 'https://javascript.pages.academy/kekstagram';

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    processServerStatus(xhr, onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  }

  function send(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    processServerStatus(xhr, onLoad, onError);
    xhr.open('POST', SEND_URL);
    xhr.send(data);
  }

  function processServerStatus(xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          switch (xhr.status) {
            case 400:
              onError('Ошибка 400: Неверный запрос');
              break;
            case 403:
              onError('Ошибка 403: Доступ запрещен');
              break;
            case 404:
              onError('Ошибка 404: Ничего не найдено');
              break;
            case 500:
              onError('Ошибка 500: Ошибка сервера');
              break;
            case 502:
              onError('Ошибка 502: Неверный ответ сервера');
              break;
            case 503:
              onError('Ошибка 503: Сервер временно недоступен');
              break;
            default:
              onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
          }
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  }

  return {
    load: load,
    send: send
  };
})();
