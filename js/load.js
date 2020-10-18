'use strict';
(()=>{
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
  const save = () => {};
  window.load = {
    load,
    save
  };
})();

