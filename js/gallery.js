'use strict';
const picturesContainer = document.querySelector(`.pictures`);
const templatePicture = document.querySelector(`#picture`).content;
const renderBlockImg = (nameTemplate) => {
  const blockTemplate = templatePicture.cloneNode(true);
  blockTemplate.querySelector(`.picture__img`).src = nameTemplate.url;
  blockTemplate.querySelector(`.picture__likes`).textContent = nameTemplate.likes;
  blockTemplate.querySelector(`.picture__comments`).textContent = nameTemplate.comments.length;
  return blockTemplate;
};
const fragment = document.createDocumentFragment();
const renderedTemplate = window.templateFormation();
for (let i = 0; i < window.NUMBER_BLOCK_IMG; i++) {
  fragment.appendChild(renderBlockImg(renderedTemplate[i]));
}
picturesContainer.appendChild(fragment);
