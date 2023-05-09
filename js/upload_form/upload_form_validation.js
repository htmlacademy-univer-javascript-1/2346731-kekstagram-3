const form = document.querySelector('#upload-select-image');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
},false);
const hashtagRegexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

export function activatePristineValidationOfUploadForm() {
  pristine.addValidator(commentInput, validateComment, 'Количество символов в комментарии должно быть от 20 до 140');
  pristine.addValidator(hashtagInput, validateHashtag, 'Хештег должен содержать от 1 до 19 символов и начинаться с решётки');
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()){
      form.submit();
    }
  });

}

function validateComment (value) {
  return value.length > 20 && value.length < 140;

}

function validateHashtag (value) {
  return hashtagRegexp.test(value);
}

