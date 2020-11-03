'use strict';
(() =>{
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const upLoadCancel = window.form.imgUpload.querySelector(`#upload-cancel`);

  uploadFile.addEventListener(`change`, () => {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  });

  upLoadCancel.addEventListener(`click`, () => {
    window.send.initialSettings();
    body.classList.remove(`modal-open`);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
      evt.preventDefault();
      window.send.initialSettings();
      body.classList.remove(`modal-open`);
    }
  });
  window.picture = {
    imgUploadOverlay,
    uploadFile
  };
})();
