'use strict';
(() => {
  const scaleControlSmaller = window.main.imgUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = window.main.imgUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = window.main.imgUpload.querySelector(`.scale__control--value`);
  const imgUploadPreview = window.main.imgUpload.querySelector(`.img-upload__preview`);
  (() => {
    const funScaleSmall = () => {
      if (window.send.j > 1) {
        window.send.j = window.send.j - 25;
        scaleControlValue.value = window.send.j + `%`;
        imgUploadPreview.style.transform = `scale(${window.send.j / 100})`;
      } else {
        window.send.j = 0;
        scaleControlValue.value = window.send.j + `%`;
        imgUploadPreview.style.transform = `scale(${window.send.j / 100})`;
      }
    };


    const funScaleBig = () => {
      if (window.send.j < 100) {
        window.send.j = window.send.j + 25;
        scaleControlValue.value = window.send.j + `%`;
        imgUploadPreview.style.transform = `scale(${window.send.j / 100})`;
      } else {
        window.send.j = 100;
        scaleControlValue.value = window.send.j + `%`;
        imgUploadPreview.style.transform = `scale(${window.send.j / 100})`;
      }
    };


    scaleControlSmaller.addEventListener(`click`, function () {
      funScaleSmall();
    });

    scaleControlBigger.addEventListener(`click`, function () {
      funScaleBig();

    });
  })();
  window.prewiew = {
    imgUploadPreview,
    scaleControlValue
  };
})();


