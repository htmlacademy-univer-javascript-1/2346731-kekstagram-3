/*--------------Opening and closing the form--------------*/
const loadButton = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__overlay');
const imagePreviewDivElement = document.querySelector('#image-preview');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('#upload-cancel');

export function animateOpeningAndClosingOfUploadForm(){
  loadButton.addEventListener('click', showUploadWindow);
  closeButton.addEventListener('click', closeUploadWindow);
}

function escapeKeyListener(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadWindow();
  }
}

function showUploadWindow(){
  fileInput.addEventListener('change', () => {
    const [file] = fileInput.files;
    if (file) {
      imagePreviewDivElement.src = URL.createObjectURL(file);
    }
    uploadForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
  document.addEventListener('keydown', escapeKeyListener);
}


function closeUploadWindow(){
  document.removeEventListener('keydown', escapeKeyListener);
  fileInput.value='';
  resetFilters();
  uploadForm.classList.add('hidden');
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
  increaseScaleButtonElement.addEventListener('click', increaseImageScale);
  decreaseScaleButtonElement.addEventListener('click', decreaseImageScale);
  filtersRadiosListElement.addEventListener('click', applyFilter);
  sliderElement.noUiSlider.on('update', adjustFilterTransparency);
}
function increaseImageScale(){
  scaleValue += 25;
  if (scaleValue >= 100){
    scaleValue=100;
    imagePreviewDivElement.style.transform = 'scale(1)';
  } else {
    imagePreviewDivElement.style.transform = `scale(0.${scaleValue})`;
  }
  scaleValueElement.value = `${scaleValue}%`;

}
function decreaseImageScale(){
  if (scaleValue >= 50){
    scaleValue -= 25;
  }
  scaleValueElement.value = `${scaleValue}%`;
  imagePreviewDivElement.style.transform = `scale(0.${scaleValue})`;

}
function applyFilter(evt) {
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
