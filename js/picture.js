'use strict';
(() => {
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = window.form.imgUpload.querySelector(`#upload-cancel`);

  const onUploadFileChange = () => {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.picture.onDocumentKeydown);
    window.form.scaleControlSmaller.addEventListener(`click`, window.form.onScaleControlSmallerClick);
    window.form.scaleControlBigger.addEventListener(`click`, window.form.onScaleControlBiggerClick);
    window.form.effectLevelPin.addEventListener(`mousedown`, window.form.onEffectLevelPinMouseDown);
    window.form.effectLevelValue.addEventListener(`click`, window.form.onEffectLevelValueClick);
  };

  const onUploadCancelClick = () => {
    window.send.startInitialSettings();
    body.classList.remove(`modal-open`);
    window.form.scaleControlSmaller.removeEventListener(`click`, window.form.onScaleControlSmallerClick);
    window.form.scaleControlBigger.removeEventListener(`click`, window.form.onScaleControlBiggerClick);
    window.form.effectLevelPin.removeEventListener(`mousedown`, window.form.onEffectLevelPinMouseDown);
    window.form.effectLevelValue.removeEventListener(`click`, window.form.onEffectLevelValueClick);
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (document.activeElement !== window.validation.hastag && evt.key === window.render.ESCAPE && document.activeElement !== window.validation.comentFoto && evt.key === window.render.ESCAPE) {
      evt.preventDefault();
      onUploadCancelClick();
    }
  };

  uploadFile.addEventListener(`change`, onUploadFileChange);

  uploadCancel.addEventListener(`click`, onUploadCancelClick);


  window.picture = {
    imgUploadOverlay,
    uploadFile,
    onDocumentKeydown
  };
})();
