'use strict';
const bigPicture = document.querySelector(`.big-picture`);
const imgUpload = document.querySelector(`.img-upload`);
const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
const prewiewFoto = imgUpload.querySelector(`#prewiew__foto`);

window.main = {
  bigPicture,
  imgUpload,
  effectsRadio,
  prewiewFoto
};
