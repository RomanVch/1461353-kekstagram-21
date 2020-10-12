'use strict';
const body = document.body;
const uploadFile = document.querySelector(`#upload-file`);
const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
const upLoadCancel = window.imgUpload.querySelector(`#upload-cancel`);
(() =>{
  (() => {
    uploadFile.addEventListener(`change`, function () {
      imgUploadOverlay.classList.remove(`hidden`);
      body.classList.add(`modal-open`);
    });
  })();
  (() => {
    upLoadCancel.addEventListener(`click`, function () {
      imgUploadOverlay.classList.add(`hidden`);
      uploadFile.value = ``;
      body.classList.remove(`modal-open`);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (document.activeElement !== window.hastag && evt.key === `Escape`) {
        evt.preventDefault();
        imgUploadOverlay.classList.add(`hidden`);
        uploadFile.value = ``;
        body.classList.remove(`modal-open`);
      }
    });
  })();
})();
