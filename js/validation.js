'use strict';
(() => {
  const hastag = document.querySelector(`.text__hashtags`);
  window.hastag = hastag;
  const hastagSymbolsReg = /^#[\w\dа-яА-Я]{1,}$/i;
  const regLong = /^#[a-zа-я-0-9]{0,20}$/i;
  const MAX_COMMENT_LENGTH = 140;
  const comentFoto = document.querySelector(`.text__description`);

  hastag.addEventListener(`input`, () => {
    const hashtagsSeparator = hastag.value.toLowerCase().split(` `);
    const uniqHastags = [...new Set(hashtagsSeparator)];
    for (let i = 0; i < hashtagsSeparator.length; i++) {
      if (hashtagsSeparator.length > 5) {
        hastag.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
      } else if (hashtagsSeparator[i][0] !== `#`) {
        hastag.setCustomValidity(`хэш-тег начинается с символа #`);
      } else if (!hastagSymbolsReg.test(hashtagsSeparator[i])) {
        hastag.setCustomValidity(`строка после решётки должна состоять из букв и чисел`);
      } else if (hashtagsSeparator[i] === `#`) {
        hastag.setCustomValidity(`не #`);
      } else if (!regLong.test(hashtagsSeparator[i])) {
        hastag.setCustomValidity(`максимальная длина одного хэш-тега 20 символов`);
      } else if (uniqHastags.length !== hashtagsSeparator.length) {
        hastag.setCustomValidity(`один и тот же хэш-тег не может быть использован дважды`);
      } else {
        hastag.setCustomValidity(``);
      }
    }
  });


  comentFoto.addEventListener(`input`, () => {
    const valueLength = comentFoto.value.length;
    if (MAX_COMMENT_LENGTH < valueLength) {
      comentFoto.setCustomValidity(`максимальная длина коментария 140 символов`);
    } else {
      comentFoto.setCustomValidity(``);
    }
  });
})();
