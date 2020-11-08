'use strict';
(() => {
  const RENDER_RANDOM_NUMBER = 10;
  const ENTER = `Enter`;
  const picturesContainer = document.querySelector(`.pictures`);
  const pictureFilter = document.querySelector(`.img-filters`);
  const randomButton = pictureFilter.querySelector(`#filter-random`);
  const defaultButton = pictureFilter.querySelector(`#filter-default`);
  const commentsSortButton = pictureFilter.querySelector(`#filter-discussed`);
  let pictureLists = [];
  let randomLists = [];
  let uniqRandomLists = [];
  let sortPictureLists = [];

  const renderFiltres = (listName, listLength)=> {
    const fragment = document.createDocumentFragment();
    const photoGalleryIcons = document.querySelectorAll(`.picture`);
    for (let i = 0; i < photoGalleryIcons.length; i++) {
      photoGalleryIcons[i].remove();
    }
    for (let i = 0; i < listLength; i++) {
      const photo = window.render.renderPicture(listName[i]);
      const randomPhotoGalleryIcon = photo.querySelector(`.picture`);
      console.log(window.render.renderPicture(listName[i]));
      const onRandomPhotoGalleryIconClick = (evt) => {
        evt.preventDefault();
        window.render.bigPictureRender(listName[i]);
        window.render.bigPicture.classList.remove(`hidden`);
        document.body.classList.add(`modal-open`);
      };

      const onPhotoGalleryIconKeydown = (evt) => {
        if (evt.key === ENTER) {
          onRandomPhotoGalleryIconClick();
        }
      };
      randomPhotoGalleryIcon.addEventListener(`keydown`, onPhotoGalleryIconKeydown);
      randomPhotoGalleryIcon.addEventListener(`click`, onRandomPhotoGalleryIconClick);
      fragment.appendChild(photo);
    }
    picturesContainer.appendChild(fragment);
  };

  const getRandomNumber = (min, max) => {
    return (Math.random() * (max - min + 1)) + min;
  };

  const onSuccess = (pictures) => {
    pictureLists = pictures;
    sortPictureLists = pictures.slice();
    const fragment = document.createDocumentFragment();
    pictures.forEach((picture) => {
      const photo = window.render.renderPicture(picture);
      const photoGalleryIcon = photo.querySelector(`.picture`);
      fragment.appendChild(photo);
      const onPhotoGalleryIconKeydown = (evt) => {
        if (evt.key === ENTER) {
          evt.preventDefault();
          window.render.bigPictureRender(picture);
          window.render.bigPicture.classList.remove(`hidden`);
          document.body.classList.add(`modal-open`);
        }
      };

      const onPhotoGalleryIconClick = () => {
        window.render.bigPictureRender(picture);
        window.render.bigPicture.classList.remove(`hidden`);
        document.body.classList.add(`modal-open`);
      };
      photoGalleryIcon.addEventListener(`keydown`, onPhotoGalleryIconKeydown);
      photoGalleryIcon.addEventListener(`click`, onPhotoGalleryIconClick);
    });
    pictureFilter.classList.remove(`img-filters--inactive`);
    picturesContainer.appendChild(fragment);
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
    for (let i = 0; i < pictureLists.length; i++) {
      randomLists.push(pictureLists[Math.floor(getRandomNumber(0, pictureLists.length - 1))]);
      uniqRandomLists = [...new Set(randomLists)];
    }
    renderFiltres(uniqRandomLists, RENDER_RANDOM_NUMBER);
    randomButton.classList.add(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
    randomLists = [];
  };

  const onDefaultButtonClick = () => {
    renderFiltres(pictureLists, pictureLists.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.add(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
  };

  const onCommentsSortButtonClick = () => {
    sortPictureLists.sort((a, b)=> {
      return b.comments.length - a.comments.length;
    });
    renderFiltres(sortPictureLists, sortPictureLists.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.add(`img-filters__button--active`);
  };
  randomButton.addEventListener(`click`, window.debounce(onRandomButtonClick));
  defaultButton.addEventListener(`click`, window.debounce(onDefaultButtonClick));
  commentsSortButton.addEventListener(`click`, window.debounce(onCommentsSortButtonClick));
})();
