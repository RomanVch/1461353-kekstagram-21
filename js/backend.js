'use strict';
const URL_GET = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_PUSH = `https://21.javascript.pages.academy/kekstagram`;
const StatusCode = {
  OK: 200
};
const load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`GET`, URL_GET);

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;

      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(xhr.status);
  });
  xhr.addEventListener(`timeout`, function() {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000;
  xhr.send();
};
const send = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`POST`, URL_PUSH);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(xhr.status);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.send(data);
};
window.backend = {
  load,
  send
};
