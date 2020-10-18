'use strict';
(() => {
  const arrayEfects = [
    `none`,
    `effects__preview--chrome`,
    `effects__preview--sepia`,
    `effects__preview--marvin`,
    `effects__preview--phobos`,
    `effects__preview--heat`,
  ];
  const effectLevelLine = window.imgUpload.querySelector(`.effect-level__line`);
  const effectLevelPin = window.imgUpload.querySelector(`.effect-level__pin`);
  const effectLevelDepth = window.imgUpload.querySelector(`.effect-level__depth`);
  const effectLevelValue = window.imgUpload.querySelector(`.effect-level__value`);
  let shift = 25;
  window.imgUploadEffectLevel.classList.add(`hidden`);
  const funDelEffects = () => {
    window.effectsRadio[0].addEventListener(`change`, () => {
      window.prewiewFoto.className = ``;
      window.imgUploadEffectLevel.classList.add(`hidden`);
      window.prewiewFoto.style.filter = ``;
    });
  };
  for (let i = 0; i < window.effectsRadio.length; i++) {
    window.effectsRadio[i].addEventListener(`change`, () => {
      funDelEffects();
      window.prewiewFoto.className = ``;
      window.imgUploadEffectLevel.classList.remove(`hidden`);
      window.prewiewFoto.classList.add(arrayEfects[i]);
      const effectsDef = [
        ``,
        `grayscale(1)`,
        `sepia(1)`,
        `invert(100%)`,
        `blur(3px)`,
        `brightness(3)`,
      ];
      for (let y = 0; y < effectsDef.length; y++) {
        if (window.prewiewFoto.classList.contains(arrayEfects[y])) {
          window.prewiewFoto.style.filter = effectsDef[y];
        } else if (shift !== 100) {
          shift = 100;
          effectLevelPin.style.left = `100%`;
          effectLevelDepth.style.width = `100%`;
        }
      }
    });
  }


  const slider = (() => {


    effectLevelPin.addEventListener(`mousedown`, onSliderPinActive);
    effectLevelValue.addEventListener(`click`, onSliderPinMove);

    // функция обработки mousedown при перетягивании ползунка

    function onSliderPinActive(evt) {
      evt.preventDefault();
      document.addEventListener(`mousemove`, onSliderPinMove);
      document.addEventListener(`mouseup`, onSliderPinDrop);
    }

    // функция обработки mousemove и рассчета положения ползунка в процентах
    function onSliderPinMove(evt) {
      const scaleMax = effectLevelLine.getBoundingClientRect().right;
      const scaleMin = effectLevelLine.getBoundingClientRect().left;
      let currentX = evt.clientX;
      if (currentX > scaleMax) {
        currentX = scaleMax;
      } else if (currentX < scaleMin) {
        currentX = scaleMin;
      }
      shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
      slider.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
      effectLevelPin.style.left = `${shift}%`;
      effectLevelDepth.style.width = `${shift}%`;
    }

    // функция обработки mouseup при перетягивании ползунка

    function onSliderPinDrop(evt) {
      evt.preventDefault();
      document.removeEventListener(`mousemove`, onSliderPinMove);
      document.removeEventListener(`mouseup`, onSliderPinDrop);
    }


    return {
      shift,
      effectLevelPin,
      effectLevelDepth
    };

  })();
  document.addEventListener(`mousemove`, () => {
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
      if (window.prewiewFoto.classList.contains(arrayEfects[i])) {
        window.prewiewFoto.style.filter = effects[i];
      }
    }
  });
})();
