const loadButton = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__overlay');
const imagePreview = document.querySelector('#image-preview');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('#upload-cancel');

loadButton.addEventListener('click', () => {
  showUploadWindow();
});

closeButton.addEventListener('click', closeUploadWindow);

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
      imagePreview.src = URL.createObjectURL(file);
    }
    uploadForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
  document.addEventListener('keydown', escapeKeyListener);
}


function closeUploadWindow(){
  uploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyListener);
  fileInput.value='';
}
