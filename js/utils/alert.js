const mainElement = document.querySelector('main');
const bodyElement = document.querySelector('body');
const uploadWindow = document.querySelector('.img-upload__overlay');
const uploadErrorMessageTemplate = document.querySelector('#error');
const uploadSuccessMessageTemplate = document.querySelector('#success');


export function showErrorOnImageUploading(){
  bodyElement.insertAdjacentElement('beforeend', uploadErrorMessageTemplate.content.firstElementChild.cloneNode(true));
  document.addEventListener('click', removeErrorClickHandler);
  document.addEventListener('keydown', removeErrorEscapeKeyHandler);
}

function removeErrorEscapeKeyHandler(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeErrorMessageOnImageUploading();
  }
}

function removeErrorClickHandler(evt){
  const errorMessage = document.querySelector('.error__inner');
  const withinBoundaries = evt.composedPath().includes(errorMessage);
  const closeButtonIsTarget = evt.target === errorMessage.querySelector('button');
  if (!withinBoundaries || closeButtonIsTarget) {
    evt.preventDefault();
    removeErrorMessageOnImageUploading();
  }
}

function removeErrorMessageOnImageUploading(){
  const errorMessage = document.querySelector('.error');
  bodyElement.removeChild(errorMessage);
  document.removeEventListener('click', removeErrorClickHandler);
  document.removeEventListener('keydown', removeErrorEscapeKeyHandler);
}

/*======================================= Upload success message =============================================*/
export function showMessageOnImageSuccess(){
  bodyElement.insertAdjacentElement('beforeend', uploadSuccessMessageTemplate.content.firstElementChild.cloneNode(true));
  document.addEventListener('click', removeSuccessClickHandler);
  document.addEventListener('keydown', removeSuccessEscapeKeyHandler);
}

function removeSuccessEscapeKeyHandler(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeSuccessMessageOnImageUploading();
  }
}

function removeSuccessClickHandler(evt){
  const successMessage = document.querySelector('.success__inner');
  const withinBoundaries = evt.composedPath().includes(successMessage);
  const closeButtonIsTarget = evt.target === successMessage.querySelector('button');
  if (!withinBoundaries || closeButtonIsTarget) {
    evt.preventDefault();
    removeSuccessMessageOnImageUploading();
  }
}

function removeSuccessMessageOnImageUploading(){
  const successMessage = document.querySelector('.success');
  bodyElement.removeChild(successMessage);
  document.removeEventListener('click', removeSuccessClickHandler);
  document.removeEventListener('keydown', removeSuccessEscapeKeyHandler);
}


/*============================= My own alerts =============================*/
export function showAlertInMain(text) {
  const alertElement = createDiv(text);
  alertElement.style.background = 'red';
  alertElement.style.animation = 'dropdown 1s ease-in 0s 1 normal forwards';
  mainElement.insertAdjacentElement('afterbegin', alertElement);
  sleep(5000).then(() => mainElement.removeChild(alertElement));
}

export function showAlertInUploadForm(text) {
  const alertElement = createDiv(text);
  alertElement.style.background = 'red';
  alertElement.style.animation = 'dropdown 1s ease-in 0s 1 normal forwards';
  uploadWindow.insertAdjacentElement('beforeend', alertElement);
  sleep(5000).then(() => uploadWindow.removeChild(alertElement));
}

export function showMessageInMain(text) {
  const alertElement = createDiv(text);
  alertElement.style.background = 'green';
  alertElement.style.animation = 'dropdown 1s ease-in 0s 1 normal forwards';
  mainElement.insertAdjacentElement('afterbegin', alertElement);
  sleep(5000).then(() => mainElement.removeChild(alertElement));
}

export function showMessageInUploadForm(text) {
  const alertElement = createDiv(text);
  alertElement.style.background = 'green';
  alertElement.style.animation = 'dropdown 1s ease-in 0s 1 normal forwards';
  uploadWindow.insertAdjacentElement('beforeend', alertElement);
  sleep(5000).then(() => uploadWindow.removeChild(alertElement));
}

function createDiv(text){
  const alertElement = document.createElement('div');
  alertElement.style.height = '25px';
  alertElement.style.width = '30%';
  alertElement.style.marginLeft = '35%';
  alertElement.style.textAlign = 'center';
  alertElement.style.color = 'white';
  alertElement.textContent = text;
  return alertElement;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
