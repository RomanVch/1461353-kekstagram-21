'use strict';
const picturesContainer = document.querySelector(`.pictures`);

const onSuccess = (pictures) => {
  pictures.forEach((picture) => {
    const photo = window.render.renderPicture(picture);
    photo.querySelector(`.picture__img`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.render.bigPictureRender(picture);
      window.main.bigPicture.classList.remove(`hidden`);
    });
    picturesContainer.appendChild(photo);
  });
};

window.backend.load(onSuccess, (error) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: pink;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `20px`;
  node.style.color = `black`;

  node.textContent = `ошибка: ` + error;
  document.body.insertAdjacentElement(`afterbegin`, node);
});

