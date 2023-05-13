import {setupPristineValidationOfUploadForm} from './upload-form-validation.js';
import {validateUploadForm} from './upload-form-validation.js';
import {
  showErrorOnImageUploading, showMessageOnImageSuccess
} from '../utils/alert.js';
import {postData} from '../utils/HTTP.js';
import {uploadWindowCloseHandler, closeUploadWindowWithoutErasing} from './upload-form-animation.js';

const UPLOAD_IMAGE_URL = 'https://27.javascript.pages.academy/kekstagram-simple';
const formElement = document.querySelector('#upload-select-image');
const submitButtonElement = formElement.querySelector('#upload-submit');

export function setupNewImageSending() {
  setupPristineValidationOfUploadForm();
  formElement.addEventListener('submit', imageUploadHandler);
}

function imageUploadHandler(evt) {
  evt.preventDefault();
  submitButtonElement.disabled = true;
  const formData = new FormData(evt.target);
  if(validateUploadForm()) {
    postData(UPLOAD_IMAGE_URL, formData)
      .then((response) => {
        if (response.ok) {
          uploadWindowCloseHandler();
          showMessageOnImageSuccess();
        } else {
          throw new Error(`${response.status} — ${response.statusText}`);
        }
      })
      .catch(() => {
        closeUploadWindowWithoutErasing();
        showErrorOnImageUploading();
      })
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  } else {
    submitButtonElement.disabled = false;
  }
}
