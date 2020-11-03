'use strict';
(() => {
  const imgUploadInput = document.querySelector(`.img-upload__input`);
  const main = document.querySelector(`main`);
  const form = document.querySelector(`.img-upload__form`);
  let valueZoom = 100;
  const initialSettings = ()=>{
    window.form.imgUploadPreview.style.transform = `scale(1)`;
    window.send.valueZoom = 100;
    window.form.effectsRadio[0].checked = true;
    window.validation.hastag.value = ``;
    window.validation.comentFoto.value = ``;
    window.form.prewiewFoto.style.filter = ``;
    window.form.prewiewFoto.className = ``;
    window.form.imgUploadEffectLevel.classList.add(`hidden`);
    imgUploadInput.value = ``;
    window.picture.imgUploadOverlay.classList.add(`hidden`);
    window.picture.uploadFile.value = ``;
    window.form.scaleControlValue.value = `100%`;
    window.form.effectLevelValue.value = `100`;
  };
  const onSuccess = () => {
    const successMessage = document.querySelector(`#success`);
    initialSettings();
    main.appendChild(successMessage.content);
    const successInner = main.querySelector(`.success`);
    const successButton = successInner.querySelector(`.success__button`);
    successInner.classList.remove(`hidden`);
    const successWindowsill = successInner.querySelector(`.success__inner`);
    closeSuccesWindow(successInner, successButton, successWindowsill);
  };
  const onError = ()=>{
    const erorrMessage = document.querySelector(`#error`);
    initialSettings();
    main.appendChild(erorrMessage.content);
    window.picture.imgUploadOverlay.classList.add(`hidden`);
    const errorWindow = main.querySelector(`.error`);
    const errorButton = errorWindow.querySelector(`.error__button`);
    errorWindow.classList.remove(`hidden`);
    const errorWindowsill = errorWindow.querySelector(`.error__inner`);
    closeSuccesWindow(errorWindow, errorButton, errorWindowsill);
  };
  const closeSuccesWindow = (way, button, sill)=>{
    button.addEventListener(`click`, () => {
      way.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        way.classList.add(`hidden`);
        document.body.classList.remove(`modal-open`);
      }
    });
    document.addEventListener(`click`, (evt)=>{
      const isClickInside = sill.contains(evt.target);
      if (!isClickInside) {
        way.classList.add(`hidden`);
      }
    });
  };

  form.addEventListener(`submit`, (evt)=>{
    evt.preventDefault();
    window.backend.send(new FormData(form), onSuccess, onError);
  });
  window.send = {
    valueZoom,
    initialSettings
  };
})();
