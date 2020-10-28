'use strict';
(()=>{
  const statusCode = {
    OK: 200
  };
  const load = (onSuccess, onError) => {
    const urlGet = `https://21.javascript.pages.academy/kekstagram/data`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, urlGet);

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, () => {
      onError(xhr.status);
    });
    xhr.send();
  };
  const send = (data, onSuccess, onError) => {
    const urlGet = `https://21.javascript.pages.academy/kekstagram`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, urlGet);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.send(data);
  };
  const save = () => {};
  window.backend = {
    load,
    send,
    save
  };
})();

