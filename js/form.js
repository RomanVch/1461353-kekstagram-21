'use strict';
(() => {
  const STANDART_VALUE = 100;
  const STEP_ZOOM = 25;
  const BRIGHTNESS_STEP_DIVISOR = 50;
  const BLUR_DIVISOR = 33.3333;
  const imgUpload = document.querySelector(`.img-upload`);
  const imgUploadEffectLevel = imgUpload.querySelector(`.img-upload__effect-level`);
  const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
  const prewiewFoto = imgUpload.querySelector(`#prewiew__foto`);
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

  const onScaleControlSmallerClick = () => {
    if (window.send.valueZoom > STEP_ZOOM + 1) {
      window.send.valueZoom = window.send.valueZoom - STEP_ZOOM;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / STANDART_VALUE})`;
    } else {
      window.send.valueZoom = STEP_ZOOM;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / STANDART_VALUE})`;
    }
  };

  const onScaleControlBiggerClick = () => {
    if (window.send.valueZoom < STANDART_VALUE) {
      window.send.valueZoom = window.send.valueZoom + STEP_ZOOM;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / STANDART_VALUE})`;
    } else {
      window.send.valueZoom = STANDART_VALUE;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / STANDART_VALUE})`;
    }
  };

  for (let i = 0; i < effectsRadio.length; i++) {

    const onEffectsRadioChange = () => {
      prewiewFoto.className = ``;
      imgUploadEffectLevel.classList.remove(`hidden`);
      prewiewFoto.classList.add(effectsClasses[i]);
      const defaultEffects = [
        ``,
        `grayscale(1)`,
        `sepia(1)`,
        `invert(100%)`,
        `blur(3px)`,
        `brightness(3)`,
      ];
      for (let y = 0; y < defaultEffects.length; y++) {
        if (prewiewFoto.classList.contains(effectsClasses[y])) {
          prewiewFoto.style.filter = defaultEffects[y];
        } else if (shift !== STANDART_VALUE) {
          shift = STANDART_VALUE;
          effectLevelPin.style.left = `100%`;
          effectLevelDepth.style.width = `100%`;
        } else if (effectsRadio[0].checked) {
          prewiewFoto.className = ``;
          imgUploadEffectLevel.classList.add(`hidden`);
          prewiewFoto.style.filter = ``;
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
        if (prewiewFoto.classList.contains(effectsClasses[i])) {
          prewiewFoto.style.filter = effects[i];
        }
      }
    };

    effectLevelPin.addEventListener(`mousedown`, onEffectLevelPinMouseDown);
    effectLevelValue.addEventListener(`click`, onEffectLevelValueClick);

    return {
      shift,
      effectLevelPin,
      effectLevelDepth
    };

  };
  slide();
  window.form = {
    imgUploadEffectLevel,
    effectLevelValue,
    imgUploadPreview,
    scaleControlValue,
    imgUpload,
    effectsRadio,
    prewiewFoto,
    scaleControlSmaller,
    onScaleControlSmallerClick,
    scaleControlBigger,
    onScaleControlBiggerClick,
    effectLevelPin,
    onEffectLevelPinMouseDown
  };
})();
