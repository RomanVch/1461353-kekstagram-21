'use strict';
(()=>{
  let showComments = 5;
  const RENDER_STOP_INDEX = 4;
  const bigPicture = document.querySelector(`.big-picture`);
  const buttonClosure = document.querySelector(`.big-picture__cancel`);
  const sampleBigPicture = document.querySelector(`#picture`).content;
  const listComments = bigPicture.querySelector(`.social__comments`);
  const buttonLoadComments = bigPicture.querySelector(`.comments-loader`);
  const maximumComments = bigPicture.querySelector(`.comments-count`);
  const quantityComment = bigPicture.querySelector(`.social__comment-count`);
  let gettingServerInformation = null;
  let postingImpressionsComment = 5;
  let picturesAdding = 5;
  const getComentsInfo = (way)=>{
    const comment = renderComment({
      avatar: way.avatar,
      message: way.message
    });
    listComments.appendChild(comment);
  };
  const onCommentsLoadClick = () => {
    picturesAdding = picturesAdding + 5;
    for (showComments; showComments < picturesAdding; showComments++) {
      if (postingImpressionsComment < gettingServerInformation.comments.length) {
        getComentsInfo(gettingServerInformation.comments[showComments]);
        postingImpressionsComment = postingImpressionsComment + 1;
        quantityComment.textContent = `${postingImpressionsComment} из ${gettingServerInformation.comments.length} комментариев`;
      } else {
        buttonLoadComments.classList.add(`hidden`);
        break;
      }
    }
  };

  const onButtonClosureClick = () => {
    bigPicture.classList.add(`hidden`);
    buttonLoadComments.classList.remove(`hidden`);
    buttonLoadComments.removeEventListener(`click`, onCommentsLoadClick);
    postingImpressionsComment = 5;
    picturesAdding = 5;
    showComments = 5;
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };


  const onDocumentKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onButtonClosureClick();
    }
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

  buttonClosure.addEventListener(`click`, onButtonClosureClick);


  const renderPicture = (picture) => {
    const blockTemplate = sampleBigPicture.cloneNode(true);
    blockTemplate.querySelector(`.picture__img`).src = picture.url;
    blockTemplate.querySelector(`.picture__likes`).textContent = picture.likes;
    blockTemplate.querySelector(`.picture__comments`).textContent = picture.comments.length;
    return blockTemplate;
  };

  const bigPictureRender = (picture) => {
    listComments.textContent = ``;
    gettingServerInformation = picture;

    const description = bigPicture.querySelector(`.social__caption`);
    const mainPicture = bigPicture.querySelector(`.big-picture__imgsrc`);
    const likesCount = bigPicture.querySelector(`.likes-count`);

    description.textContent = picture.description;
    mainPicture.src = picture.url;
    likesCount.textContent = picture.likes;
    maximumComments.textContent = picture.comments.length;


    for (let i = 0; i < picture.comments.length; i++) {
      if (picture.comments.length > showComments) {
        getComentsInfo(picture.comments[i]);
        quantityComment.textContent = `5 из ${picture.comments.length} комментариев`;
        if (i === RENDER_STOP_INDEX) {
          break;
        }
      } else {
        getComentsInfo(picture.comments[i]);
        quantityComment.textContent = `${picture.comments.length}
         из ${picture.comments.length} комментариев`;
        buttonLoadComments.classList.add(`hidden`);
      }
    }

    buttonLoadComments.addEventListener(`click`, onCommentsLoadClick);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  window.render = {
    renderPicture,
    bigPictureRender,
    bigPicture
  };
})();
