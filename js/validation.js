'use strict';
(() => {
  const MAX_COMMENT_LENGTH = 140;
  const hashtag = document.querySelector(`.text__hashtags`);
  const hastagSymbolsReg = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
  const commentPhoto = document.querySelector(`.text__description`);

  const onHastagInput = () => {
    const separator = hashtag.value.toLowerCase().split(` `);
    const uniqHastags = [...new Set(separator)];
    for (let i = 0; i < separator.length; i++) {
      if (separator[i][0] !== `#` && separator[i] !== ``) {
        hashtag.setCustomValidity(`хэш-тег начинается с символа #`);
        break;
      } else if (separator[i] === `#` && separator[i] !== ``) {
        hashtag.setCustomValidity(`не #`);
        break;
      } else if (!hastagSymbolsReg.test(separator[i]) && separator[i] !== ``) {
        hashtag.setCustomValidity(`строка после решётки должна состоять из букв и чисел`);
        break;
      } else if (separator[i].length > 20 && separator[i] !== ``) {
        hashtag.setCustomValidity(`максимальная длина одного хэш-тега 20 символов`);
        break;
      } else if (separator.length > 5 && separator[i] !== ``) {
        hashtag.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
      } else if (uniqHastags.length !== separator.length && separator[i] !== ``) {
        hashtag.setCustomValidity(`один и тот же хэш-тег не может быть использован дважды`);
      } else {
        hashtag.setCustomValidity(``);
      }
    }
  };

  const onCommentPhotoInput = () => {
    const valueLength = commentPhoto.value.length;
    if (MAX_COMMENT_LENGTH < valueLength) {
      commentPhoto.setCustomValidity(`максимальная длина коментария 140 символов`);
    } else {
      commentPhoto.setCustomValidity(``);
    }
  };

  hashtag.addEventListener(`input`, onHastagInput);
  commentPhoto.addEventListener(`input`, onCommentPhotoInput);

  window.validation = {
    hashtag,
    commentPhoto,
    onHastagInput,
    onCommentPhotoInput
  };
})();
