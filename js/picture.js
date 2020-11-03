'use strict';
(() =>{
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const upLoadCancel = window.form.imgUpload.querySelector(`#upload-cancel`);

  const onButtonLoadFile = () => {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  };

  const onButtonCloseFormLoad = () => {
    window.send.initialSettings();
    body.classList.remove(`modal-open`);
  };

  const onKeyCloseFormLoad = (evt) => {
    if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
      evt.preventDefault();
      window.send.initialSettings();
      body.classList.remove(`modal-open`);
    }
  };

  uploadFile.addEventListener(`change`, onButtonLoadFile);

  upLoadCancel.addEventListener(`click`, onButtonCloseFormLoad);

  document.addEventListener(`keydown`, onKeyCloseFormLoad);

  window.picture = {
    imgUploadOverlay,
    uploadFile
  };
})();
