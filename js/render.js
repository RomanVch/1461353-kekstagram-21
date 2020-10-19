'use strict';
(()=>{
  const socialPicture = window.bigPicture.querySelectorAll(`.social__picture`);
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const templatePicture = document.querySelector(`#picture`).content;
  const socialComments = window.bigPicture.querySelector(`.social__comments`);
  window.socialComments = socialComments;
  const commentsLoader = window.bigPicture.querySelector(`.comments-loader`);
  let commentsCount = window.bigPicture.querySelector(`.comments-count`);
  const socialCommentCount = window.bigPicture.querySelector(`.social__comment-count`);

  window.commentsLoader = commentsLoader;
  window.socialComments = socialComments;
  bigPictureCancel.addEventListener(`click`, () => {
    window.bigPicture.classList.add(`hidden`);
    commentsLoader.classList.remove(`hidden`);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.bigPicture.classList.add(`hidden`);

    }
  });

  window.renderPicture = (picture) => {
    const blockTemplatee = templatePicture.cloneNode(true);
    blockTemplatee.querySelector(`.picture__img`).src = picture.url;
    blockTemplatee.querySelector(`.picture__likes`).textContent = picture.likes;
    blockTemplatee.querySelector(`.picture__comments`).textContent = picture.comments.length;
    return blockTemplatee;
  };

  window.bigPictureRender = (picture) => {
    window.bigPicture.querySelector(`.big-picture__imgsrc`).src = picture.url;
    window.bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    socialPicture[0].src = picture.comments[0].avatar;
    socialPicture[0].alt = picture.comments[0].name;
    window.bigPicture.querySelector(`.social__caption`).textContent = picture.description;
    window.bigPicture.querySelector(`.social__text`).textContent = picture.comments[0].message;
    socialPicture[1].src = picture.comments[1].avatar;
    const socialCommentAll = window.bigPicture.querySelectorAll(`.social__comment`);
    if (socialCommentAll.length < 5) {
      for (let i = 0; i < 4; i++) {
        const comment = window.bigPicture.querySelector(`.social__comment`).cloneNode(true);
        comment.querySelector(`.social__picture`).src = picture.comments[i].avatar;
        comment.querySelector(`.social__text`).textContent = picture.comments[i].message;
        window.socialComments.appendChild(comment);
      }
    }

    window.commentsLoader.addEventListener(`click`, ()=>{
      const socialCommentAll = window.bigPicture.querySelectorAll(`.social__comment`);
      if (socialCommentAll.length < picture.comments.length) {
        for (let i = 5; i <= picture.comments.length; i++) {
          console.log(socialCommentAll);
          const comment = window.bigPicture.querySelector(`.social__comment`).cloneNode(true);
          comment.querySelector(`.social__picture`).src = picture.comments[i].avatar;
          comment.querySelector(`.social__text`).textContent = picture.comments[i].message;
          //socialCommentCount.textContent = i + 1 + ` из ` + picture.comments.length + ` комментариев`;
          window.socialComments.appendChild(comment);
        }
      } else {
        window.commentsLoader.classList.add(`hidden`);
      }
    });
  };
})();
