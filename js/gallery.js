'use strict';
const picturesContainer = document.querySelector(`.pictures`);

const onSuccess = (pictures) => {
  pictures.forEach((picture) => {
    const photo = window.renderPicture(picture);
    photo.querySelector(`.picture__img`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.bigPictureRender(picture);
      while (window.socialComments.children.length > 5) {
        window.socialComments.removeChild(window.socialComments.lastChild);
      }
      window.bigPicture.classList.remove(`hidden`);
    });
    picturesContainer.appendChild(photo);
  });
};

window.load.load(onSuccess, (error) => {
  console.log(error);
});

