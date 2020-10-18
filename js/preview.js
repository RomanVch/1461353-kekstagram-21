'use strict';
(() => {
  const scaleControlSmaller = window.imgUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = window.imgUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = window.imgUpload.querySelector(`.scale__control--value`);
  const imgUploadPreview = window.imgUpload.querySelector(`.img-upload__preview`);
  let j = 100;
  (() => {
    const funScaleSmall = () => {
      if (j > 1) {
        j = j - 25;
        scaleControlValue.value = j + `%`;
        imgUploadPreview.style.transform = `scale(${j / 100})`;
      } else {
        j = 0;
        scaleControlValue.value = j + `%`;
        imgUploadPreview.style.transform = `scale(${j / 100})`;
      }
    };


    const funScaleBig = () => {
      if (j < 100) {
        j = j + 25;
        scaleControlValue.value = j + `%`;
        imgUploadPreview.style.transform = `scale(${j / 100})`;
      } else {
        j = 100;
        scaleControlValue.value = j + `%`;
        imgUploadPreview.style.transform = `scale(${j / 100})`;
      }
    };


    scaleControlSmaller.addEventListener(`click`, function () {
      funScaleSmall();
    });

    scaleControlBigger.addEventListener(`click`, function () {
      funScaleBig();

    });
  })();
})();


