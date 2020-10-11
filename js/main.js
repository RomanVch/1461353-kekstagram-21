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
  `effects__preview--chrome`,
  `effects__preview--sepia`,
  `effects__preview--marvin`,
  `effects__preview--phobos`,
  `effects__preview--heat`,
];


const effectLevelLine = imgUpload.querySelector(`.effect-level__line`);
const effectLevelPin = imgUpload.querySelector(`.effect-level__pin`);
const effectLevelDepth = imgUpload.querySelector(`.effect-level__depth`);
const effectLevelValue = imgUpload.querySelector(`.effect-level__value`);
let shift = 25;
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

const fotoLoad = () => {
  uploadFile.addEventListener(`change`, function () {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  });
};
fotoLoad();
const fotoLoadClosed = () => {
  upLoadCancel.addEventListener(`click`, function () {
    imgUploadOverlay.classList.add(`hidden`);
    uploadFile.value = ``;
    body.classList.remove(`modal-open`);
  });
  document.addEventListener(`keydown`, function (evt) {
    if (document.activeElement !== hastag && evt.key === `Escape`) {
      evt.preventDefault();
      imgUploadOverlay.classList.add(`hidden`);
      uploadFile.value = ``;
      body.classList.remove(`modal-open`);
    }
  });
};
fotoLoadClosed();
let j = 100;

const funScaleSmall = () => {
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


const funScaleBig = () => {
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

const funScaleButton = () => {
  scaleControlSmaller.addEventListener(`click`, function () {
    funScaleSmall();
  });

  scaleControlBigger.addEventListener(`click`, function () {
    funScaleBig();

  });
};

funScaleButton();
const funDelEffects = () => {
  effectsRadio[0].addEventListener(`change`, function () {
    prewiewFoto.className = ``;
    imgUploadEffectLevel.classList.add(`hidden`);
  });
};
funDelEffects();

const funAddEffects = () => {
  for (let i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener(`change`, function () {
      funDelEffects();
      prewiewFoto.className = ``;
      imgUploadEffectLevel.classList.remove(`hidden`);
      prewiewFoto.classList.add(arrayEfects[i]);
      const effectsDef = [
        ``,
        `grayscale(1)`,
        `sepia(1)`,
        `invert(100%)`,
        `blur(3px)`,
        `brightness(3)`,
      ];
      for (let y = 0; y < effectsDef.length; y++) {
        if (prewiewFoto.classList.contains(arrayEfects[y])) {
          prewiewFoto.style.filter = effectsDef[y];
        } else if (shift !== 100) {
          shift = 100;
          effectLevelPin.style.left = `100%`;
          effectLevelDepth.style.width = `100%`;
        }
      }
    });
  }
};

funAddEffects();


const slider = (() => {


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
    if (currentX > scaleMax) {
      currentX = scaleMax;
    } else if (currentX < scaleMin) {
      currentX = scaleMin;
    }
    shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
    slider.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
    effectLevelPin.style.left = `${shift}%`;
    effectLevelDepth.style.width = `${shift}%`;
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

})();

imgUploadEffectLevel.addEventListener(`mousemove`, () => {
  const brightnessStep = 1 + (shift / 50);
  const effects = [
    ``,
    `grayscale(${shift / 100})`,
    `sepia(${shift / 100})`,
    `invert(${shift}%)`,
    `blur(${shift / 33.3333}px)`,
    `brightness(${brightnessStep})`,
  ];
  for (let i = 0; i < effects.length; i++) {
    if (prewiewFoto.classList.contains(arrayEfects[i])) {
      prewiewFoto.style.filter = effects[i];
    }
  }
});

// валидация хэштега
const hastag = document.querySelector(`.text__hashtags`);
const hastagSymbolsReg = /^#[\w\dа-яА-Я]{1,}$/i;
const regLong = /^#[a-zа-я-0-9]{0,20}$/i;
const regLongComent = /^.{0,140}$/i;
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
  if (!regLongComent.test(comentFoto)) {
    comentFoto.setCustomValidity(`максимальная длина коментария 140 символов`);
  }
});
