'use strict';
(() =>{
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const upLoadCancel = window.form.imgUpload.querySelector(`#upload-cancel`);

  const onButtonLoadFile = () => {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.picture.onKeyCloseFormLoad);

  };

  const onButtonCloseFormLoad = () => {
    window.send.startInitialSettings();
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onKeyCloseFormLoad);
  };

  const onKeyCloseFormLoad = (evt) => {
    if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
      evt.preventDefault();
      window.send.startInitialSettings();
      body.classList.remove(`modal-open`);
      document.removeEventListener(`keydown`, onKeyCloseFormLoad);
    }
  };

  uploadFile.addEventListener(`change`, onButtonLoadFile);

  upLoadCancel.addEventListener(`click`, onButtonCloseFormLoad);


  window.picture = {
    imgUploadOverlay,
    uploadFile,
    onKeyCloseFormLoad
  };
})();
