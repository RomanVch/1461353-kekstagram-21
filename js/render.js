'use strict';
(()=>{
  const SHOWN_COMMENTS = 5;

  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const templatePicture = document.querySelector(`#picture`).content;
  const socialComments = window.main.bigPicture.querySelector(`.social__comments`);
  const commentsLoader = window.main.bigPicture.querySelector(`.comments-loader`);
  const commentsCount = window.main.bigPicture.querySelector(`.comments-count`);
  const socialCommentCount = window.main.bigPicture.querySelector(`.social__comment-count`);
  let pictureData = null;
  let shownPictures = 5;
  let PicturesQuantity = 5;
  const onCommentsLoaderClick = () => {
    PicturesQuantity = PicturesQuantity + 5;
    for (let i = SHOWN_COMMENTS; i < PicturesQuantity; i++) {

      if (shownPictures < pictureData.comments.length) {
        const comment = renderComment({
          avatar: pictureData.comments[i].avatar,
          message: pictureData.comments[i].message
        });
        socialComments.appendChild(comment);
        shownPictures = shownPictures + 1;
        socialCommentCount.textContent = shownPictures + ` из ` + pictureData.comments.length + ` комментариев`;
      } else {
        commentsLoader.classList.add(`hidden`);
      }
    }

  };

  const hideBigPicture = () => {
    window.main.bigPicture.classList.add(`hidden`);
    commentsLoader.classList.remove(`hidden`);
    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    shownPictures = 5;
    PicturesQuantity = 5;
  };

  const renderComment = (comment) => {
    const listItem = document.createElement(`li`);
    const image = document.createElement(`img`);
    const paragraph = document.createElement(`p`);

    listItem.classList.add(`social__comment`);
    image.classList.add(`social__picture`);
    paragraph.classList.add(`social__text`);

    image.src = comment.avatar;
    paragraph.textContent = comment.message;

    listItem.appendChild(image);
    listItem.appendChild(paragraph);

    return listItem;
  };

  bigPictureCancel.addEventListener(`click`, () => {
    hideBigPicture();
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideBigPicture();
    }
  });

  const renderPicture = (picture) => {
    const blockTemplatee = templatePicture.cloneNode(true);
    blockTemplatee.querySelector(`.picture__img`).src = picture.url;
    blockTemplatee.querySelector(`.picture__likes`).textContent = picture.likes;
    blockTemplatee.querySelector(`.picture__comments`).textContent = picture.comments.length;
    return blockTemplatee;
  };

  const bigPictureRender = (picture) => {
    socialComments.innerHTML = ``;
    pictureData = picture;

    const description = window.main.bigPicture.querySelector(`.social__caption`);
    const mainPicture = window.main.bigPicture.querySelector(`.big-picture__imgsrc`);
    const likesCount = window.main.bigPicture.querySelector(`.likes-count`);

    description.textContent = picture.description;
    mainPicture.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;

    if (pictureData.comments.length > SHOWN_COMMENTS) {
      for (let i = 0; i < SHOWN_COMMENTS; i++) {
        const comment = renderComment({
          avatar: picture.comments[i].avatar,
          message: picture.comments[i].message
        });
        socialCommentCount.textContent = 5 + ` из ` + picture.comments.length + ` комментариев`;
        socialComments.appendChild(comment);
      }
    } else {
      for (let i = 0; i < pictureData.comments.length; i++) {
        const comment = renderComment({
          avatar: picture.comments[i].avatar,
          message: picture.comments[i].message
        });
        socialCommentCount.textContent = pictureData.comments.length
         + ` из ` + picture.comments.length + ` комментариев`;
        socialComments.appendChild(comment);
        commentsLoader.classList.add(`hidden`);
      }
    }

    commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
  };

  window.render = {
    socialComments,
    renderPicture,
    bigPictureRender
  };
})();
