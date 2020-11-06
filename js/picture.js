'use strict';
(() =>{
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const upLoadCancel = window.form.imgUpload.querySelector(`#upload-cancel`);

  const onUploadFileChange = () => {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.picture.onDocumentKeydown);
    window.form.scaleControlSmaller.addEventListener(`click`, window.form.onScaleControlSmallerClick);
    window.form.scaleControlBigger.addEventListener(`click`, window.form.onScaleControlBiggerClick);
    window.form.effectLevelPin.addEventListener(`mousedown`, window.form.onEffectLevelPinMouseDown);
    window.form.effectLevelValue.addEventListener(`click`, window.form.onEffectLevelValueClick);
  };

  const onUpLoadCancelClick = () => {
    window.send.startInitialSettings();
    body.classList.remove(`modal-open`);
    window.form.scaleControlSmaller.removeEventListener(`click`, window.form.onScaleControlSmallerClick);
    window.form.scaleControlBigger.removeEventListener(`click`, window.form.onScaleControlBiggerClick);
    window.form.effectLevelPin.removeEventListener(`mousedown`, window.form.onEffectLevelPinMouseDown);
    window.form.effectLevelValue.removeEventListener(`click`, window.form.onEffectLevelValueClick);
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (document.activeElement !== window.validation.hastag && evt.key === `Escape`) {
      evt.preventDefault();
      window.form.scaleControlSmaller.removeEventListener(`click`, window.form.onScaleControlSmallerClick);
      window.form.scaleControlBigger.removeEventListener(`click`, window.form.onScaleControlBiggerClick);
      window.send.startInitialSettings();
      body.classList.remove(`modal-open`);
      window.form.effectLevelPin.removeEventListener(`mousedown`, window.form.onEffectLevelPinMouseDown);
      window.form.effectLevelValue.removeEventListener(`click`, window.form.onEffectLevelValueClick);
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  uploadFile.addEventListener(`change`, onUploadFileChange);

  upLoadCancel.addEventListener(`click`, onUpLoadCancelClick);


  window.picture = {
    imgUploadOverlay,
    uploadFile,
    onDocumentKeydown
  };
})();
