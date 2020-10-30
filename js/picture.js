'use strict';
(() =>{
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const upLoadCancel = window.main.imgUpload.querySelector(`#upload-cancel`);
  (() => {
    uploadFile.addEventListener(`change`, function () {
      imgUploadOverlay.classList.remove(`hidden`);
      body.classList.add(`modal-open`);
    });
  })();
  (() => {
    upLoadCancel.addEventListener(`click`, function () {
      window.send.initialSettings();
      body.classList.remove(`modal-open`);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
        evt.preventDefault();
        window.send.initialSettings();
        body.classList.remove(`modal-open`);
      }
    });
  })();
  window.picture = {
    imgUploadOverlay,
    uploadFile
  };
})();
