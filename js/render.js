'use strict';
(()=>{
  const socialPicture = window.bigPicture.querySelector(`.social__picture`);
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const templatePicture = document.querySelector(`#picture`).content;

  bigPictureCancel.addEventListener(`click`, () => {
    window.bigPicture.classList.add(`hidden`);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.bigPicture.classList.add(`hidden`);
    }
  });

  window.renderPicture = (picture) => {
    const blockTemplatee = templatePicture.cloneNode(true);
    blockTemplatee.querySelector(`.picture__img`).src = picture.url;
    blockTemplatee.querySelector(`.picture__likes`).textContent = picture.likes;
    blockTemplatee.querySelector(`.picture__comments`).textContent = picture.comments.length;
    return blockTemplatee;
  };

  window.bigPictureRender = (picture) => {
    window.bigPicture.querySelector(`.big-picture__imgsrc`).src = picture.url;
    window.bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
    window.bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
    socialPicture.src = picture.comments[0].avatar;
    socialPicture.alt = picture.comments[0].name;
    window.bigPicture.querySelector(`.social__text`).textContent = picture.description;
  };
})();
