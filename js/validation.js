'use strict';
(() => {
  const MAX_COMMENT_LENGTH = 140;
  const hastag = document.querySelector(`.text__hashtags`);
  const hastagSymbolsReg = /^#[\w\dа-яА-Я]{1,}$/i;
  const comentFoto = document.querySelector(`.text__description`);

  const onHastagInput = () => {
    const separator = hastag.value.toLowerCase().split(` `);
    const uniqHastags = [...new Set(separator)];
    for (let i = 0; i < separator.length; i++) {
      if (separator.length > 5) {
        hastag.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
      } else if (separator[i][0] !== `#`) {
        hastag.setCustomValidity(`хэш-тег начинается с символа #`);
      } else if (!hastagSymbolsReg.test(separator[i])) {
        hastag.setCustomValidity(`строка после решётки должна состоять из букв и чисел`);
      } else if (separator[i] === `#`) {
        hastag.setCustomValidity(`не #`);
      } else if (separator[i].length > 20) {
        hastag.setCustomValidity(`максимальная длина одного хэш-тега 20 символов`);
      } else if (uniqHastags.length !== separator.length) {
        hastag.setCustomValidity(`один и тот же хэш-тег не может быть использован дважды`);
      } else {
        hastag.setCustomValidity(``);
      }
    }
  };

  const onComentFotoInput = () => {
    const valueLength = comentFoto.value.length;
    if (MAX_COMMENT_LENGTH < valueLength) {
      comentFoto.setCustomValidity(`максимальная длина коментария 140 символов`);
    } else {
      comentFoto.setCustomValidity(``);
    }
  };

  hastag.addEventListener(`input`, onHastagInput);
  comentFoto.addEventListener(`input`, onComentFotoInput);

  window.validation = {
    hastag,
    comentFoto,
    onHastagInput,
    onComentFotoInput
  };
})();
