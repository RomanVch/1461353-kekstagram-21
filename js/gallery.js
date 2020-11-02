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
  const MIN_NUMBER_PHOTOS = 0;
  const MAX_NUMBER_PHOTOS = 24;
  const renderFiltres = (list, listLength)=>{
    const photoDom = document.querySelectorAll(`.picture`);
    for (let i = 0; i < photoDom.length; i++) {
      photoDom[i].remove(picturesContainer);
    }
    for (let i = 0; i < listLength; i++) {
      const photo = window.render.renderPicture(list[i]);
      const randomPhotoDom = photo.querySelector(`.picture__img`);
      randomPhotoDom.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        window.render.bigPictureRender(list[i]);
        window.render.bigPicture.classList.remove(`hidden`);
      });
      picturesContainer.appendChild(photo);
    }
  };
  const randomNumber = (min, max) => {
    return (Math.random() * (max - min + 1)) + min;
  };
  const onSuccess = (pictures) => {
    pictureList = pictures;
    sortPictureList = pictures.slice();
    pictures.forEach((picture) => {
      const photo = window.render.renderPicture(picture);
      const photoDom = photo.querySelector(`.picture__img`);
      photoDom.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        window.render.bigPictureRender(picture);
        window.render.bigPicture.classList.remove(`hidden`);
      });
      picturesContainer.appendChild(photo);
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
  // рандом рендер
  const onButtonRandomFiltr = () => {
    for (let i = 0; i < pictureList.length; i++) {
      randomList.push(pictureList[Math.floor(randomNumber(MIN_NUMBER_PHOTOS, MAX_NUMBER_PHOTOS))]);
      uniqRandomList = [...new Set(randomList)];
      console.log(Math.floor(randomNumber(MIN_NUMBER_PHOTOS, MAX_NUMBER_PHOTOS)));
    }
    renderFiltres(uniqRandomList, RENDER_RANDOM_NUMBER);
    randomButton.classList.add(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
    randomList = [];
  };
  // по умолчанию
  const onButtonDefaultFiltr = () => {
    renderFiltres(pictureList, pictureList.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.add(`img-filters__button--active`);
    commentsSortButton.classList.remove(`img-filters__button--active`);
  };

  // фильтр по количеству коментариев
  const onButtonCommentsFiltr = ()=>{
    sortPictureList.sort((a, b)=>{
      return b.comments.length - a.comments.length;
    });
    renderFiltres(sortPictureList, sortPictureList.length);
    randomButton.classList.remove(`img-filters__button--active`);
    defaultButton.classList.remove(`img-filters__button--active`);
    commentsSortButton.classList.add(`img-filters__button--active`);
  };
  randomButton.addEventListener(`click`, window.debounce(onButtonRandomFiltr));
  defaultButton.addEventListener(`click`, window.debounce(onButtonDefaultFiltr));
  commentsSortButton.addEventListener(`click`, window.debounce(onButtonCommentsFiltr));
})();
