'use strict';
(() => {
  const STANDART_VALUE = 100;
  const STEP_ZOOM = 25;
  const BRIGHTNESS_STEP_DIVISOR = 50;
  const BLUR_DIVISOR = 33.3333;
  const DEFAULT_DIGIT = 100;
  const DEFAULT_LEVEL_VALUE = `100`;
  const imgUploadInput = document.querySelector(`.img-upload__input`);
  const imgUpload = document.querySelector(`.img-upload`);
  const imgUploadEffectLevel = imgUpload.querySelector(`.img-upload__effect-level`);
  const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
  const demonstrationPhoto = imgUpload.querySelector(`#prewiew__foto`);
  const body = document.body;
  const uploadCancel = imgUpload.querySelector(`#upload-cancel`);
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const defaultEffects = [
    ``,
    `grayscale(1)`,
    `sepia(1)`,
    `invert(100%)`,
    `blur(3px)`,
    `brightness(3)`,
  ];
  let onEffectLevelPinMouseDown = null;
  const effectsClasses = [
    `none`,
    `effects__preview--chrome`,
    `effects__preview--sepia`,
    `effects__preview--marvin`,
    `effects__preview--phobos`,
    `effects__preview--heat`,
  ];
  const effectLevelLine = imgUpload.querySelector(`.effect-level__line`);
  const effectLevelPin = imgUpload.querySelector(`.effect-level__pin`);
  const effectLevelDepth = imgUpload.querySelector(`.effect-level__depth`);
  const effectLevelValue = imgUpload.querySelector(`.effect-level__value`);
  let shift = STEP_ZOOM;
  imgUploadEffectLevel.classList.add(`hidden`);
  const scaleControlSmaller = imgUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imgUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = imgUpload.querySelector(`.scale__control--value`);
  const imgUploadPreview = imgUpload.querySelector(`.img-upload__preview`);
  let valueZoom = 100;

  const startInitialSettings = () => {
    imgUploadPreview.style.transform = `scale(1)`;
    valueZoom = DEFAULT_DIGIT;
    effectsRadio[0].checked = true;
    window.validation.hashtag.value = ``;
    window.validation.commentPhoto.value = ``;
    demonstrationPhoto.style.filter = ``;
    demonstrationPhoto.className = ``;
    imgUploadEffectLevel.classList.add(`hidden`);
    imgUploadInput.value = ``;
    imgUploadOverlay.classList.add(`hidden`);
    uploadFile.value = ``;
    scaleControlValue.value = `100%`;
    effectLevelValue.value = DEFAULT_LEVEL_VALUE;
  };

  const onScaleControlSmallerClick = () => {
    if (valueZoom > STEP_ZOOM + 1) {
      valueZoom = valueZoom - STEP_ZOOM;
      scaleControlValue.value = valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${valueZoom / STANDART_VALUE})`;
    } else {
      valueZoom = STEP_ZOOM;
      scaleControlValue.value = valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${valueZoom / STANDART_VALUE})`;
    }
  };

  const onScaleControlBiggerClick = () => {
    if (valueZoom < STANDART_VALUE) {
      valueZoom = valueZoom + STEP_ZOOM;
      scaleControlValue.value = valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${valueZoom / STANDART_VALUE})`;
    } else {
      valueZoom = STANDART_VALUE;
      scaleControlValue.value = valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${valueZoom / STANDART_VALUE})`;
    }
  };

  for (let i = 0; i < effectsRadio.length; i++) {

    const onEffectsRadioChange = () => {
      demonstrationPhoto.className = ``;
      imgUploadEffectLevel.classList.remove(`hidden`);
      demonstrationPhoto.classList.add(effectsClasses[i]);
      for (let y = 0; y < defaultEffects.length; y++) {
        if (demonstrationPhoto.classList.contains(effectsClasses[y])) {
          demonstrationPhoto.style.filter = defaultEffects[y];
        } else if (shift !== STANDART_VALUE) {
          shift = STANDART_VALUE;
          effectLevelPin.style.left = `100%`;
          effectLevelDepth.style.width = `100%`;
        } else if (effectsRadio[0].checked) {
          demonstrationPhoto.className = ``;
          imgUploadEffectLevel.classList.add(`hidden`);
          demonstrationPhoto.style.filter = ``;
        }
      }
    };
    effectsRadio[i].addEventListener(`change`, onEffectsRadioChange);
  }

  const slide = () => {
    onEffectLevelPinMouseDown = (evt) => {
      evt.preventDefault();
      document.body.addEventListener(`mousemove`, onDocumentBodyMouseMove);
      document.addEventListener(`mouseup`, onDocumentMouseUp);
    };

    const onEffectLevelValueClick = (evt) => {
      const scaleMax = effectLevelLine.getBoundingClientRect().right;
      const scaleMin = effectLevelLine.getBoundingClientRect().left;
      let currentX = evt.clientX;
      if (currentX > scaleMax) {
        currentX = scaleMax;
      } else if (currentX < scaleMin) {
        currentX = scaleMin;
      }
      shift = parseInt((currentX - scaleMin) * STANDART_VALUE / (scaleMax - scaleMin), 10);
      slide.shift = parseInt((currentX - scaleMin) * STANDART_VALUE / (scaleMax - scaleMin), 10);
      effectLevelPin.style.left = `${shift}%`;
      effectLevelDepth.style.width = `${shift}%`;
      effectLevelValue.value = shift;
      document.addEventListener(`mousemove`, onDocumentMouseMove);
    };

    const onDocumentBodyMouseMove = (evt) => {
      const scaleMax = effectLevelLine.getBoundingClientRect().right;
      const scaleMin = effectLevelLine.getBoundingClientRect().left;
      let currentX = evt.clientX;
      if (currentX > scaleMax) {
        currentX = scaleMax;
      } else if (currentX < scaleMin) {
        currentX = scaleMin;
      }
      shift = parseInt((currentX - scaleMin) * STANDART_VALUE / (scaleMax - scaleMin), 10);
      slide.shift = parseInt((currentX - scaleMin) * STANDART_VALUE / (scaleMax - scaleMin), 10);
      effectLevelPin.style.left = `${shift}%`;
      effectLevelDepth.style.width = `${shift}%`;
      effectLevelValue.value = shift;
      document.addEventListener(`mousemove`, onDocumentMouseMove);
    };

    const onDocumentMouseUp = (evt) => {
      evt.preventDefault();
      document.body.removeEventListener(`mousemove`, onDocumentBodyMouseMove);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
      document.removeEventListener(`mousemove`, onDocumentMouseMove);
    };

    const onDocumentMouseMove = () => {
      const brightnessStep = 1 + (shift / BRIGHTNESS_STEP_DIVISOR);
      const effects = [
        ``,
        `grayscale(${shift / STANDART_VALUE})`,
        `sepia(${shift / STANDART_VALUE})`,
        `invert(${shift}%)`,
        `blur(${shift / BLUR_DIVISOR}px)`,
        `brightness(${brightnessStep})`,
      ];
      for (let i = 0; i < effects.length; i++) {
        if (demonstrationPhoto.classList.contains(effectsClasses[i])) {
          demonstrationPhoto.style.filter = effects[i];
        }
      }
    };

    const uploadRemoveEventListener = () => {
      startInitialSettings();
      body.classList.remove(`modal-open`);
      scaleControlSmaller.removeEventListener(`click`, onScaleControlSmallerClick);
      scaleControlBigger.removeEventListener(`click`, onScaleControlBiggerClick);
      effectLevelPin.removeEventListener(`mousedown`, onEffectLevelPinMouseDown);
      effectLevelValue.removeEventListener(`click`, onEffectLevelValueClick);
      document.removeEventListener(`keydown`, onDocumentKeydown);
    };
    const onUploadFileChange = () => {
      imgUploadOverlay.classList.remove(`hidden`);
      body.classList.add(`modal-open`);
      document.addEventListener(`keydown`, onDocumentKeydown);
      scaleControlSmaller.addEventListener(`click`, onScaleControlSmallerClick);
      scaleControlBigger.addEventListener(`click`, onScaleControlBiggerClick);
      effectLevelPin.addEventListener(`mousedown`, onEffectLevelPinMouseDown);
      effectLevelValue.addEventListener(`click`, onEffectLevelValueClick);
    };

    const onUploadCancelClick = () => {
      uploadRemoveEventListener();
    };

    const onDocumentKeydown = (evt) => {
      if (document.activeElement !== window.validation.hashtag && evt.key === window.render.ESCAPE && document.activeElement !== window.validation.commentPhoto && evt.key === window.render.ESCAPE) {
        evt.preventDefault();
        uploadRemoveEventListener();
      }
    };

    uploadFile.addEventListener(`change`, onUploadFileChange);

    uploadCancel.addEventListener(`click`, onUploadCancelClick);

    effectLevelPin.addEventListener(`mousedown`, onEffectLevelPinMouseDown);
    effectLevelValue.addEventListener(`click`, onEffectLevelValueClick);

    return {
      shift,
      effectLevelPin,
      effectLevelDepth,
      onDocumentKeydown
    };

  };
  slide();
  window.form = {
    imgUpload,
    startInitialSettings,
    imgUploadOverlay
  };
})();
