'use strict';
const picturesContainer = document.querySelector(`.pictures`);
const templatePicture = document.querySelector(`#picture`).content;
const onSuccess = (data) => {
  const renderBlockImg = (information) => {
    const blockTemplatee = templatePicture.cloneNode(true);
    blockTemplatee.querySelector(`.picture__img`).src = information.url;
    blockTemplatee.querySelector(`.picture__likes`).textContent = information.likes;
    blockTemplatee.querySelector(`.picture__comments`).textContent = information.comments.length;
    return blockTemplatee;
  };
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 25; i++) {
    fragment.appendChild(renderBlockImg(data[i]));
  }
  picturesContainer.appendChild(fragment);
};
const onError = (error) => {
  console.log(error);
};
window.load.load(onSuccess, onError);

