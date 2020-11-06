'use strict';
(()=>{
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
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, () => {
      onError(xhr.status);
    });
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
})();

