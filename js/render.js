'use strict';
(() => {

  const bigPictureRender = () => {
    const socialPicture = window.bigPicture.querySelector(`.social__picture`);
    const smallWindowPictures = document.querySelectorAll(`.picture`);
    console.log(smallWindowPictures);
    const onSuccess = (data)=>{
      for (let i = 0; i < smallWindowPictures.length; i++) {
        smallWindowPictures[i].addEventListener(`click`, function () {
          window.bigPicture.classList.remove(`hidden`);
          window.bigPicture.querySelector(`.big-picture__imgsrc`).src = data[i].url;
          window.bigPicture.querySelector(`.likes-count`).textContent = data[i].likes;
          window.bigPicture.querySelector(`.comments-count`).textContent = data[i].comments.length;
          socialPicture.src = data[i].comments[0].avatar;
          socialPicture.alt = data[i].comments[0].name;
          window.bigPicture.querySelector(`.social__text`).textContent = data[i].description;
          console.log(data[i].url);
        });
      }

    };
    const onError = (error) => {
      console.log(error);
    };
    window.load.load(onSuccess, onError);

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
})();
