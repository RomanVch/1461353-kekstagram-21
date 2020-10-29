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
      imgUploadOverlay.classList.add(`hidden`);
      uploadFile.value = ``;
      window.send.j = 100;
      body.classList.remove(`modal-open`);
      window.prewiew.imgUploadPreview.style.transform = `scale(1)`;
      window.main.effectsRadio[0].checked = true;
      window.validation.hastag.value = ``;
      window.validation.comentFoto.value = ``;
      window.main.prewiewFoto.style.filter = ``;
      window.main.prewiewFoto.className = ``;
      window.form.imgUploadEffectLevel.classList.add(`hidden`);
      window.picture.imgUploadOverlay.classList.add(`hidden`);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
        evt.preventDefault();
        imgUploadOverlay.classList.add(`hidden`);
        uploadFile.value = ``;
        body.classList.remove(`modal-open`);
      }
    });
  })();
  window.picture = {
    imgUploadOverlay,
    uploadFile
  };
})();
