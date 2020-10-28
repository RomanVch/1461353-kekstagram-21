'use strict';
(() => {
  const imgUploadInput = document.querySelector(`.img-upload__input`);
  const main = document.querySelector(`main`);
  const form = document.querySelector(`.img-upload__form`);
  const initialSettings = (way)=>{
    window.prewiew.imgUploadPreview.style.transform = `scale(1)`;
    window.main.effectsRadio[0].checked = true;
    window.validation.hastag.value = ``;
    window.validation.comentFoto.value = ``;
    window.main.prewiewFoto.style.filter = ``;
    window.main.prewiewFoto.className = ``;
    window.form.imgUploadEffectLevel.classList.add(`hidden`);
    imgUploadInput.value = ``;
    window.picture.imgUploadOverlay.classList.add(`hidden`);
    main.appendChild(way.content);
  };
  const onSuccess = () => {
    const successMessage = document.querySelector(`#success`);
    initialSettings(successMessage);
    const successInner = main.querySelector(`.success`);
    const successButton = successInner.querySelector(`.success__button`);
    successInner.classList.remove(`hidden`);
    const successWindowsill = successInner.querySelector(`.success__inner`);
    closeSuccesWindow(successInner, successButton, successWindowsill);
  };
  const onError = ()=>{
    const erorrMessage = document.querySelector(`#error`);
    initialSettings(erorrMessage);
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
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        way.classList.add(`hidden`);
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
})();
