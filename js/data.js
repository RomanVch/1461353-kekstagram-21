'use strict';
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
const template = [];
const templateFormation = () => {

  for (let i = 1; i <= window.NUMBER_BLOCK_IMG; i++) {
    template.push({ // добавить объект в массив
      url: `photos/${i}.jpg`,
      description: `строка — описание фотографии.`,
      likes: Math.floor(window.randomNumber(15, 200)),
      comments:
      [
        {
          avatar: `img/avatar-${Math.floor(window.randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(window.randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(window.randomNumber(0, nameComments.length - 1))]
        },
        {
          avatar: `img/avatar-${Math.floor(window.randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(window.randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(window.randomNumber(0, nameComments.length - 1))]
        },
        {
          avatar: `img/avatar-${Math.floor(window.randomNumber(1, 6))}.svg`,
          message: messageComments[Math.floor(window.randomNumber(0, messageComments.length - 1))],
          name: nameComments[Math.floor(window.randomNumber(0, nameComments.length - 1))]
        }
      ],
    });
  }
  return template;
};

window.template = template;
window.templateFormation = templateFormation;

