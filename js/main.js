'use strict';
const numberBlockImg = 25;
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


const randomNumber = (min, max) => {
  return (Math.random() * (max - min + 1)) + min;
};
const templateFormation = () => {
  let template = [];
  for (let i = 1; i <= 25; i++) {
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
let renderBlockImg = (nameTemplate) => {
  let blockTemplate = templatePicture.cloneNode(true);
  blockTemplate.querySelector(`.picture__img`).src = nameTemplate.url;
  blockTemplate.querySelector(`.picture__likes`).textContent = nameTemplate.likes;
  blockTemplate.querySelector(`.picture__comments`).textContent = nameTemplate.comments.length;
  return blockTemplate;
};
let fragment = document.createDocumentFragment();
const renderedTemplate = templateFormation();
for (let i = 0; i < numberBlockImg; i++) {
  fragment.appendChild(renderBlockImg(renderedTemplate[i]));
}
picturesContainer.appendChild(fragment);

templateFormation();
