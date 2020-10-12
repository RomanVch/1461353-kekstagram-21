'use strict';
const socialPicture = window.bigPicture.querySelector(`.social__picture`);
const smallWindowPictures = document.querySelectorAll(`.picture`);
const bigPictureRender = () => {
  for (let i = 0; i < smallWindowPictures.length; i++) {
    smallWindowPictures[i].addEventListener(`click`, function () {
      window.bigPicture.classList.remove(`hidden`);
      window.bigPicture.querySelector(`.big-picture__imgsrc`).src = window.template[i].url;
      window.bigPicture.querySelector(`.likes-count`).textContent = window.template[i].likes;
      window.bigPicture.querySelector(`.comments-count`).textContent = window.template[i].comments.length;
      socialPicture.src = window.template[i].comments[0].avatar;
      socialPicture.alt = window.template[i].comments[0].name;
      window.bigPicture.querySelector(`.social__text`).textContent = window.template[i].description;
    });
  }
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  bigPictureCancel.addEventListener(`click`, () => {
    window.bigPicture.classList.add(`hidden`);
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.bigPicture.classList.add(`hidden`);
    }
  });
};

bigPictureRender();
