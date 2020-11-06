'use strict';
(() => {
  const picturesContainer = document.querySelector(`.pictures`);
  const imgFilters = document.querySelector(`.img-filters`);
  const randomButton = imgFilters.querySelector(`#filter-random`);
  const defaultButton = imgFilters.querySelector(`#filter-default`);
  const commentsSortButton = imgFilters.querySelector(`#filter-discussed`);
  let pictureList = [];
  let randomList = [];
  let uniqRandomList = [];
  let sortPictureList = [];
  const RENDER_RANDOM_NUMBER = 10;
  const renderFiltres = (list, listLength)=>{
    const photoGalleryIcons = document.querySelectorAll(`.picture`);
    for (let i = 0; i < photoGalleryIcons.length; i++) {
      photoGalleryIcons[i].remove(picturesContainer);
    }
    for (let i = 0; i < listLength; i++) {
      const photo = window.render.renderPicture(list[i]);
      const randomPhotoGalleryIcon = photo.querySelector(`.picture`);
      const onRandomPhotoGalleryIconClick = (evt) => {
        evt.preventDefault();
        window.render.bigPictureRender(list[i]);
        window.render.bigPicture.classList.remove(`hidden`);
      };
      const onPhotoGalleryIconKeydown = (evt) => {
        if (evt.key === `Enter`) {
          onRandomPhotoGalleryIconClick();
        }
      };
      randomPhotoGalleryIcon.addEventListener(`keydown`, onPhotoGalleryIconKeydown);
      randomPhotoGalleryIcon.addEventListener(`click`, onRandomPhotoGalleryIconClick);
      picturesContainer.appendChild(photo);
    }
  };
  const getRandomNumber = (min, max) => {
    return (Math.random() * (max - min + 1)) + min;
  };
  const onSuccess = (pictures) => {
    pictureList = pictures;
    sortPictureList = pictures.slice();
    pictures.forEach((picture) => {
      const photo = window.render.renderPicture(picture);
      const photoGalleryIcon = photo.querySelector(`.picture`);
      picturesContainer.appendChild(photo);
      const onPhotoGalleryIconKeydown = (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          window.render.bigPictureRender(picture);
          window.render.bigPicture.classList.remove(`hidden`);
        }
      };
      const onPhotoGalleryIconClick = () => {
        window.render.bigPictureRender(picture);
        window.render.bigPicture.classList.remove(`hidden`);
      };
      photoGalleryIcon.addEventListener(`keydown`, onPhotoGalleryIconKeydown);
      photoGalleryIcon.addEventListener(`click`, onPhotoGalleryIconClick);

    });
    imgFilters.classList.remove(`img-filters--inactive`);

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
  const onRandomButtonClick = () => {
    for (let i = 0; i < pictureList.length; i++) {
      randomList.push(pictureList[Math.floor(getRandomNumber(0, pictureList.length - 1))]);
      uniqRandomList = [...new Set(randomList)];
    }
    renderFiltres(uniqRandomList, RENDER_RANDOM_NUMBER);
    randomButton.classList.add(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
    randomList = [];
  };
  const onDefaultButtonClick = () => {
    renderFiltres(pictureList, pictureList.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.add(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
  };

  const onCommentsSortButtonClick = ()=>{
    sortPictureList.sort((a, b)=>{
      return b.comments.length - a.comments.length;
    });
    renderFiltres(sortPictureList, sortPictureList.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.add(`img-filters__button--active`);
  };
  randomButton.addEventListener(`click`, window.debounce(onRandomButtonClick));
  defaultButton.addEventListener(`click`, window.debounce(onDefaultButtonClick));
  commentsSortButton.addEventListener(`click`, window.debounce(onCommentsSortButtonClick));
})();
