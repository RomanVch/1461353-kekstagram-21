'use strict';
const NUMBER_BLOCK_IMG = 25;
const picturesContainer = document.querySelector(`.pictures`);
const templatePicture = document.querySelector(`#picture`).content;
const messageComments = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const nameComments = [
  `Лука`,
  `Феликс`,
  `Елисей`,
  `Максимильян`,
  `Ираклий`,
  `Радион`,
  `Антип`,
  `Измаил`,
  `Леонид`,
  `Онуфрий`,
  `Иван`,
  `Станислав`,
  `Руслан`,
  `Аркадий`,
  `Рюрик`,
  `Яков`,
  `Никифор`,
  `Тимофей`,
  `Всеволод`,
  `Кондратий`,
  `Артур`,
  `Сократ`,
  `Кузьма`,
  `Владислав`,
  `Иосиф`
];
const bigPicture = document.querySelector(`.big-picture`);
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
const body = document.body;
const socialPicture = bigPicture.querySelector(`.social__picture`);
const uploadFile = document.querySelector(`#upload-file`);
const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
const imgUpload = document.querySelector(`.img-upload`);
const upLoadCancel = imgUpload.querySelector(`#upload-cancel`);
const scaleControlSmaller = imgUpload.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imgUpload.querySelector(`.scale__control--bigger`);
const scaleControlValue = imgUpload.querySelector(`.scale__control--value`);
const imgUploadPreview = imgUpload.querySelector(`.img-upload__preview`);
const effectsRadio = imgUpload.querySelectorAll(`.effects__radio`);
const prewiewFoto = imgUpload.querySelector(`#prewiew__foto`);
const imgUploadEffectLevel = imgUpload.querySelector(`.img-upload__effect-level`);
const arrayEfects = [
  ``,
  `.effects__preview--chrome`,
  `.effects__preview--sepia`,
  `.effects__preview--marvin`,
  `.effects__preview--phobos`,
  `.effects__preview--heat`,
];
body.classList.add(`modal-open`);
/*
// cлайдер
let effectLevelLine = imgUpload.querySelector(`.effect-level__line`);
let effectLevelPin = imgUpload.querySelector(`.effect-level__pin`);
let effectLevelDepth = imgUpload.querySelector(`.effect-level__depth`);
let effectLevelValue = imgUpload.querySelector(`.effect-level__value`);
let shift = 25;*/
// слайдер
socialCommentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
const randomNumber = (min, max) => {
  return (Math.random() * (max - min + 1)) + min;
};
const templateFormation = () => {
  const template = [];
  for (let i = 1; i <= NUMBER_BLOCK_IMG; i++) {
    template.push({ // добавить объект в массив
      url: `photos/${i}.jpg`,
      description: `строка — описание фотографии.`,
      likes: Math.floor(randomNumber(15, 200)),
      comments:
      [
        {
          avatar: `img/avatar-${Math.floor(randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(randomNumber(0, nameComments.length - 1))]
        },
        {
          avatar: `img/avatar-${Math.floor(randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(randomNumber(0, nameComments.length - 1))]
        },
        {
          avatar: `img/avatar-${Math.floor(randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(randomNumber(0, nameComments.length - 1))]
        }
      ],
    });
  }
  return template;
};
const renderBlockImg = (nameTemplate) => {
  const blockTemplate = templatePicture.cloneNode(true);
  blockTemplate.querySelector(`.picture__img`).src = nameTemplate.url;
  blockTemplate.querySelector(`.picture__likes`).textContent = nameTemplate.likes;
  blockTemplate.querySelector(`.picture__comments`).textContent = nameTemplate.comments.length;
  return blockTemplate;
};
const fragment = document.createDocumentFragment();
const renderedTemplate = templateFormation();
for (let i = 0; i < NUMBER_BLOCK_IMG; i++) {
  fragment.appendChild(renderBlockImg(renderedTemplate[i]));
}
picturesContainer.appendChild(fragment);

templateFormation();

const bigPictureRender = (nameElement) => {
  bigPicture.querySelector(`.big-picture__imgsrc`).src = nameElement.url;
  bigPicture.querySelector(`.likes-count`).textContent = nameElement.likes;
  bigPicture.querySelector(`.comments-count`).textContent = nameElement.comments.length;
  socialPicture.src = nameElement.comments[0].avatar;
  socialPicture.alt = nameElement.comments[0].name;
  bigPicture.querySelector(`.social__text`).textContent = nameElement.description;
};
bigPictureRender(renderedTemplate[0]);

let fotoLoad = () => {
  uploadFile.addEventListener(`change`, function () {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  });
};
fotoLoad();
let fotoLoadClosed = () => {
  upLoadCancel.addEventListener(`click`, function () {
    imgUploadOverlay.classList.add(`hidden`);
    uploadFile.value = ``;
    body.classList.remove(`modal-open`);
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      imgUploadOverlay.classList.add(`hidden`);
      uploadFile.value = ``;
      body.classList.remove(`modal-open`);
    }
  });
};
fotoLoadClosed();
let j = 100;

let funScaleSmall = () => {
  if (j > 1) {
    j = j - 25;
    scaleControlValue.value = j + `%`;
    imgUploadPreview.style.transform = `scale(${j / 100})`;
  } else {
    j = 0;
    scaleControlValue.value = j + `%`;
    imgUploadPreview.style.transform = `scale(${j / 100})`;
  }
};


let funScaleBig = () => {
  if (j < 100) {
    j = j + 25;
    scaleControlValue.value = j + `%`;
    imgUploadPreview.style.transform = `scale(${j / 100})`;
  } else {
    j = 100;
    scaleControlValue.value = j + `%`;
    imgUploadPreview.style.transform = `scale(${j / 100})`;
  }
};

let funScaleButton = () => {
  scaleControlSmaller.addEventListener(`click`, function () {
    funScaleSmall();
  });

  scaleControlBigger.addEventListener(`click`, function () {
    funScaleBig();

  });
};

funScaleButton();
let funDelEffects = () => {
  effectsRadio[0].addEventListener(`change`, function () {
    prewiewFoto.className = ``;
    imgUploadEffectLevel.classList.add(`hidden`);
  });
};
funDelEffects();

let funAddEffects = () => {
  for (let i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener(`change`, function () {
      funDelEffects();
      prewiewFoto.className = ``;
      prewiewFoto.classList.remove();
      imgUploadEffectLevel.classList.remove(`hidden`);
      prewiewFoto.classList.add(arrayEfects[i]);
    });
  }
};

funAddEffects();
/*
const slider = (function () {


  effectLevelPin.addEventListener(`mousedown`, onSliderPinActive);
  effectLevelValue.addEventListener(`click`, onSliderPinMove);

  // функция обработки mousedown при перетягивании ползунка

  function onSliderPinActive(evt) {
    evt.preventDefault();
    document.addEventListener(`mousemove`, onSliderPinMove);
    document.addEventListener(`mouseup`, onSliderPinDrop);
  }

  // функция обработки mousemove и рассчета положения ползунка в процентах

  function onSliderPinMove(evt) {
    const scaleMax = effectLevelLine.getBoundingClientRect().right;
    const scaleMin = effectLevelLine.getBoundingClientRect().left;
    let currentX = evt.clientX;
    currentX > scaleMax ? currentX = scaleMax : currentX;
    currentX < scaleMin ? currentX = scaleMin : currentX;
    shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
    slider.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
    effectLevelPin.style.left = `${shift}%`;
    effectLevelDepth.style.width = `${shift}%`;
    effectLevelValue.value = shift;
  }

  // функция обработки mouseup при перетягивании ползунка

  function onSliderPinDrop(evt) {
    evt.preventDefault();
    document.removeEventListener(`mousemove`, onSliderPinMove);
    document.removeEventListener(`mouseup`, onSliderPinDrop);
  }

  return {
    shift,
    effectLevelPin,
    effectLevelDepth
  };
})();*/
// валидация хэштега
const hastag = document.querySelector(`.text__hashtags`);
const hastagReg = /#.{0,}/g;
const hastagSymbolsReg = /#[\w\dа-яА-Я]{0,}/gi;
const reg = /^#[\d\w]{1,19}$/gi;

hastag.addEventListener(`input`, function () {
  let hastagsMeaning = hastag.value.split(` `);
  for (let i = 0; i < hastagsMeaning.length - 1; i++) {
    console.log(hastagsMeaning);
    if (hastagsMeaning.length > 5) {
      hastag.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
    } else if (!hastagReg.test(hastagsMeaning[i])) {
      hastag.setCustomValidity(`хэш-тег начинается с символа #`);
    } else if (!hastagSymbolsReg.test(hastagsMeaning[i])) {
      hastag.setCustomValidity(`строка после решётки должна состоять из букв и чисел`);
      console.log(hastagsMeaning[i]);
    } else if (hastagsMeaning[i] === `#`) {
      hastag.setCustomValidity(`не #`);
      console.log(hastagsMeaning[i]);
    } else {
      hastag.setCustomValidity(``);
    }
  }
});
/*
1) хэш-тег начинается с символа # (решётка); - это решает const reg = /^#[\d\w]{1,19}$/gi;
2) строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.; - это решает const reg = /^#[\d\w]{1,19}$/gi;
3) хеш-тег не может состоять только из одной решётки; - это решает const reg = /^#[\d\w]{1,19}$/gi;
4) максимальная длина одного хэш-тега 20 символов, включая решётку; - это решает const reg = /^#[\d\w]{1,19}$/gi;
5) хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;  - это решает const reg = /^#[\d\w]{1,19}$/gi;
6) хэш-теги разделяются пробелами; - это решается .split(` `);
7) один и тот же хэш-тег не может быть использован дважды; - не могу понять нужно удалять дубль или или должна вылазить ошибка не должно быть повторений
8) нельзя указать больше пяти хэш-тегов; наверное
if (hastagsMeaning.length >= 5) {
  hastag.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
}
9) хэш-теги необязательны; ??? форма может отправиться и без хэштегов ?(необязательное поле)
10) если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
просто сделать нажатие не активным (пока хз как)
*/
