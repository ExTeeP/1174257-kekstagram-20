'use strict';

window.userPicture = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var pictureEditModal = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEditModal.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('.img-upload__input');
  var effectsPreview = pictureEditModal.querySelectorAll('.effects__preview');

  function uploadInputChangeHandler() {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (!matches) {
      window.main.closeModal();
      window.error.onError('Недопустимый формат. Фотография должна быть в формате gif, jpg, jpeg или png!', 'Загрузить другую фотографию');
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      picturePreview.src = reader.result;

      effectsPreview.forEach(function (preview) {
        preview.style = 'background-image: url("' + reader.result + '")';
      });
    });

    reader.readAsDataURL(file);
  }

  uploadInput.addEventListener('change', uploadInputChangeHandler);
})();
