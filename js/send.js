'use strict';
(() => {
  const main = document.querySelector(`main`);
  const form = document.querySelector(`.img-upload__form`);

  const onSuccess = () => {
    const successMessage = document.querySelector(`#success`);
    window.form.startInitialSettings();
    main.appendChild(successMessage.content);
    const successInner = main.querySelector(`.success`);
    const successButton = successInner.querySelector(`.success__button`);
    successInner.classList.remove(`hidden`);
    const successWindowsill = successInner.querySelector(`.success__inner`);
    closeSuccesWindow(successInner, successButton, successWindowsill);
  };

  const onError = () => {
    const erorrMessage = document.querySelector(`#error`);
    window.form.startInitialSettings();
    main.appendChild(erorrMessage.content);
    window.form.imgUploadOverlay.classList.add(`hidden`);
    const errorWindow = main.querySelector(`.error`);
    const errorButton = errorWindow.querySelector(`.error__button`);
    errorWindow.classList.remove(`hidden`);
    const errorWindowsill = errorWindow.querySelector(`.error__inner`);
    closeSuccesWindow(errorWindow, errorButton, errorWindowsill);
  };

  const closeSuccesWindow = (way, button, sill) => {
    const closeWindow = () => {
      way.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      button.removeEventListener(`click`, onButtonClick);
      document.removeEventListener(`click`, onDocumentClick);
      document.removeEventListener(`keydown`, onDocumentKeydown);
    };
    const onButtonClick = () => {
      closeWindow(way);
    };

    const onDocumentKeydown = (evt) => {
      if (evt.key === window.render.ESCAPE) {
        closeWindow(way);
      }
    };
    const onDocumentClick = (evt) => {
      const isClickInside = sill.contains(evt.target);
      if (!isClickInside) {
        closeWindow(way);
      }
    };
    button.addEventListener(`click`, onButtonClick);
    document.addEventListener(`keydown`, onDocumentKeydown);
    document.addEventListener(`click`, onDocumentClick);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    window.backend.send(new FormData(form), onSuccess, onError);
  };
  form.addEventListener(`submit`, onFormSubmit);

})();
