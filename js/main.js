'use strict';
const NUMBER_BLOCK_IMG = 25;
window.NUMBER_BLOCK_IMG = NUMBER_BLOCK_IMG;
const bigPicture = document.querySelector(`.big-picture`);
window.bigPicture = bigPicture;
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
const imgUpload = document.querySelector(`.img-upload`);
window.imgUpload = imgUpload;
const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
window.effectsRadio = effectsRadio;
const prewiewFoto = imgUpload.querySelector(`#prewiew__foto`);
window.prewiewFoto = prewiewFoto;
const imgUploadEffectLevel = imgUpload.querySelector(`.img-upload__effect-level`);
window.imgUploadEffectLevel = imgUploadEffectLevel;
socialCommentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
const randomNumber = (min, max) => {
  return (Math.random() * (max - min + 1)) + min;
};
window.randomNumber = randomNumber;


