'use strict';
(() => {
  const RENDER_STOP_INDEX = 4;
  const DEFAULT_DIGIT = 5;
  const ESCAPE = `Escape`;
  let numberOfComment = 5;
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


  const onCommentsLoadClick = () => {
    const fragment = document.createDocumentFragment();
    picturesAdding = picturesAdding + DEFAULT_DIGIT;
    for (numberOfComment; numberOfComment < picturesAdding; numberOfComment++) {
      if (postingImpressionsComment < gettingServerInformation.comments.length) {
        const comment = renderComment({
          avatar: gettingServerInformation.comments[numberOfComment].avatar,
          message: gettingServerInformation.comments[numberOfComment].message
        });
        postingImpressionsComment = postingImpressionsComment + 1;
        quantityComment.textContent = `${postingImpressionsComment} из ${gettingServerInformation.comments.length} комментариев`;
        fragment.appendChild(comment);
      } else {
        buttonLoadComments.classList.add(`hidden`);
        break;
      }
    }
    listComments.appendChild(fragment);
  };

  const onButtonClosureClick = () => {
    bigPicture.classList.add(`hidden`);
    buttonLoadComments.classList.remove(`hidden`);
    buttonLoadComments.removeEventListener(`click`, onCommentsLoadClick);
    postingImpressionsComment = DEFAULT_DIGIT;
    picturesAdding = DEFAULT_DIGIT;
    numberOfComment = DEFAULT_DIGIT;
    document.body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };


  const onDocumentKeydown = (evt) => {
    if (evt.key === ESCAPE) {
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
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < picture.comments.length; i++) {
      const comment = renderComment({
        avatar: picture.comments[i].avatar,
        message: picture.comments[i].message
      });
      if (picture.comments.length > numberOfComment) {
        quantityComment.textContent = `5 из ${picture.comments.length} комментариев`;
        fragment.appendChild(comment);
        if (i === RENDER_STOP_INDEX) {
          break;
        }
      } else {
        quantityComment.textContent = `${picture.comments.length}
         из ${picture.comments.length} комментариев`;
        buttonLoadComments.classList.add(`hidden`);
        fragment.appendChild(comment);
      }
    }
    listComments.appendChild(fragment);
    buttonLoadComments.addEventListener(`click`, onCommentsLoadClick);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  window.render = {
    renderPicture,
    bigPictureRender,
    bigPicture,
    ESCAPE
  };
})();
