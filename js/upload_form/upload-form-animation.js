/* eslint no-use-before-define: 0 */
/*--------------Opening and closing the form--------------*/
const loadButtonElement = document.querySelector('.img-upload__input');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const imagePreviewDivElement = document.querySelector('#image-preview');
const fileInputElement = document.querySelector('#upload-file');
const closeButtonElement = document.querySelector('#upload-cancel');
const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

export function animateOpeningAndClosingOfUploadForm(){
  loadButtonElement.addEventListener('click', loadButtonHandler);
}

function escapeKeydownHandler(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadWindowCloseHandler();
  }
}

function loadButtonHandler(){
  fileInputElement.addEventListener('change', fileInputHandler);
  document.addEventListener('keydown', escapeKeydownHandler);
  closeButtonElement.addEventListener('click', uploadWindowCloseHandler);
}

function fileInputHandler() {
  const [file] = fileInputElement.files;
  if (file) {
    imagePreviewDivElement.src = URL.createObjectURL(file);
  }
  uploadFormElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}


export function uploadWindowCloseHandler(){
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButtonElement.removeEventListener('click', uploadWindowCloseHandler);
  fileInputElement.value='';
  scaleValue = 100;
  setImageScale(scaleValue);
  resetFilters();
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  fileInputElement.value = '';
  uploadFormElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

export function closeUploadWindowWithoutErasing(){
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButtonElement.removeEventListener('click', uploadWindowCloseHandler);
  fileInputElement.value='';
  uploadFormElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}


/*-------------------Image scaling and filters applying---------------------*/
const scaleValueElement = document.querySelector('.scale__control--value');
let scaleValue = 100;
const increaseScaleButtonElement = document.querySelector('.scale__control--bigger');
const decreaseScaleButtonElement = document.querySelector('.scale__control--smaller');
const filtersRadiosListElement = document.querySelector('.effects__list');
const imagePreviewImgElement = document.querySelector('#image-preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelInputElement = document.querySelector('.effect-level__value');
let currentFilter = 'none';
const filterToSliderSettingsMap = new Map();
filterToSliderSettingsMap.set('none', [0, 100, 1, 'none']);
filterToSliderSettingsMap.set('chrome', [0, 1, 0.1, 'grayscale']);
filterToSliderSettingsMap.set('sepia', [0, 1, 0.1, 'sepia']);
filterToSliderSettingsMap.set('marvin', [0, 100, 1, 'invert']);
filterToSliderSettingsMap.set('phobos', [0, 3, 0.1, 'blur']);
filterToSliderSettingsMap.set('heat', [1, 3, 0.1, 'brightness']);

export function animateImageScalingAndFiltersApplying() {
  increaseScaleButtonElement.addEventListener('click', increaseImageScaleButtonHandler);
  decreaseScaleButtonElement.addEventListener('click', decreaseImageScaleButtonHandler);
  filtersRadiosListElement.addEventListener('click', applyFilterHandler);
  sliderElement.noUiSlider.on('update', adjustFilterTransparency);
}
function increaseImageScaleButtonHandler(){
  if (scaleValue <= 75){
    scaleValue += 25;
    setImageScale(scaleValue);
  }
}
function decreaseImageScaleButtonHandler(){
  if (scaleValue >= 50){
    scaleValue -= 25;
    setImageScale(scaleValue);
  }
}

function setImageScale(val){
  scaleValueElement.value = `${val}%`;
  imagePreviewDivElement.style.transform = `scale(${val/100.0})`;
}

function applyFilterHandler(evt) {
  if(evt.target.type === 'radio'){
    currentFilter = evt.target.value;
    changeNoUiSlider(evt.target.value);
    for (const radio of document.querySelectorAll('.effects__radio')) {
      radio.removeAttribute('checked');
    }
    evt.target.setAttribute('checked', '');
    const classesOfImagePreview = imagePreviewImgElement.classList;
    for (const cl of classesOfImagePreview){
      if (cl.includes('effects__preview--')){
        classesOfImagePreview.remove(cl);
        break;
      }
    }
    classesOfImagePreview.add(`effects__preview--${currentFilter}`);
  }

}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 10
});

function changeNoUiSlider(filter) {
  if (filter === 'none') {
    imagePreviewImgElement.style.removeProperty('filter');
  }
  const settings = filterToSliderSettingsMap.get(filter);
  sliderElement.noUiSlider.updateOptions({
    start: 100,
    range: {
      'min': settings[0],
      'max': settings[1]
    },
    step: settings[2]
  });

}

function adjustFilterTransparency() {
  effectLevelInputElement.value = sliderElement.noUiSlider.get();
  let measure = '';
  if (currentFilter === 'marvin'){
    measure='%';
  } else if (currentFilter === 'phobos'){
    measure='px';
  }
  const filter = filterToSliderSettingsMap.get(currentFilter)[3];
  imagePreviewDivElement.style.setProperty('filter', `${filter}(${effectLevelInputElement.value}${measure})`);
  imagePreviewImgElement.style.setProperty('color', 'red');
}

function resetFilters() {
  filtersRadiosListElement.querySelector('#effect-none').click();
}

