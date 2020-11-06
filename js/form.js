'use strict';
(() => {
  const imgUpload = document.querySelector(`.img-upload`);
  const imgUploadEffectLevel = imgUpload.querySelector(`.img-upload__effect-level`);
  const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
  const prewiewFoto = imgUpload.querySelector(`#prewiew__foto`);
  const arrayEfects = [
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
  let shift = 25;
  imgUploadEffectLevel.classList.add(`hidden`);
  const scaleControlSmaller = imgUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imgUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = imgUpload.querySelector(`.scale__control--value`);
  const imgUploadPreview = imgUpload.querySelector(`.img-upload__preview`);

  const onScaleControlSmallerClick = () => {
    if (window.send.valueZoom > 26) {
      window.send.valueZoom = window.send.valueZoom - 25;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / 100})`;
    } else {
      window.send.valueZoom = 25;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / 100})`;
    }
  };


  const onScaleControlBiggerClick = () => {
    if (window.send.valueZoom < 100) {
      window.send.valueZoom = window.send.valueZoom + 25;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / 100})`;
    } else {
      window.send.valueZoom = 100;
      scaleControlValue.value = window.send.valueZoom + `%`;
      imgUploadPreview.style.transform = `scale(${window.send.valueZoom / 100})`;
    }
  };


  const deleteEffects = () => {
    effectsRadio[0].addEventListener(`change`, () => {
      prewiewFoto.className = ``;
      imgUploadEffectLevel.classList.add(`hidden`);
      prewiewFoto.style.filter = ``;
    });
  };
  for (let i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener(`change`, () => {
      deleteEffects();
      prewiewFoto.className = ``;
      imgUploadEffectLevel.classList.remove(`hidden`);
      prewiewFoto.classList.add(arrayEfects[i]);
      const defaultEffects = [
        ``,
        `grayscale(1)`,
        `sepia(1)`,
        `invert(100%)`,
        `blur(3px)`,
        `brightness(3)`,
      ];
      for (let y = 0; y < defaultEffects.length; y++) {
        if (prewiewFoto.classList.contains(arrayEfects[y])) {
          prewiewFoto.style.filter = defaultEffects[y];
        } else if (shift !== 100) {
          shift = 100;
          effectLevelPin.style.left = `100%`;
          effectLevelDepth.style.width = `100%`;
        }
      }
    });
  }


  const slide = () => {

    const onEffectLevelPinMouseDown = (evt) => {
      evt.preventDefault();
      document.addEventListener(`mousemove`, onEffectLevelValueClick);
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
      shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
      slide.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
      effectLevelPin.style.left = `${shift}%`;
      effectLevelDepth.style.width = `${shift}%`;
      effectLevelValue.value = shift;
      document.addEventListener(`mousemove`, onDocumentMouseMove);
    };

    const onDocumentMouseUp = (evt) => {
      evt.preventDefault();
      document.removeEventListener(`mousemove`, onEffectLevelValueClick);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
      document.removeEventListener(`mousemove`, onDocumentMouseMove);
    };
    const onDocumentMouseMove = () => {
      const brightnessStep = 1 + (shift / 50);
      const effects = [
        ``,
        `grayscale(${shift / 100})`,
        `sepia(${shift / 100})`,
        `invert(${shift}%)`,
        `blur(${shift / 33.3333}px)`,
        `brightness(${brightnessStep})`,
      ];
      for (let i = 0; i < effects.length; i++) {
        if (prewiewFoto.classList.contains(arrayEfects[i])) {
          prewiewFoto.style.filter = effects[i];
        }
      }
    };

    effectLevelPin.addEventListener(`mousedown`, onEffectLevelPinMouseDown);
    effectLevelValue.addEventListener(`click`, onEffectLevelValueClick);

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
    return {
      shift,
      effectLevelPin,
      effectLevelDepth
    };

  };
  slide();

})();
