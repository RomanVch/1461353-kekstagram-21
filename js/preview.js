'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const effectsItem = window.form.imgUploadOverlay.querySelectorAll(`.effects__preview`);

const onUploadFileChange = () => {
  const file = window.form.uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    const onReaderLoad = () => {
      window.form.demonstrationPhoto.src = reader.result;
      for (let i = 0; i < effectsItem.length; i++) {
        effectsItem[i].style.backgroundImage = `url('${reader.result} ')`;
      }
    };
    reader.addEventListener(`load`, onReaderLoad);

    reader.readAsDataURL(file);
  }
};

window.form.uploadFile.addEventListener(`change`, onUploadFileChange);
