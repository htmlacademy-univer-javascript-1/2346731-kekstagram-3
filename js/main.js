import {showRandomPosts} from './utils/random-posts-factory.js';
import {
  animateImageScalingAndFiltersApplying,
  animateOpeningAndClosingOfUploadForm
} from './upload_form/upload-form-animation.js';
import {setupNewImageSending} from './upload_form/upload-form-sending.js';

showRandomPosts();
animateOpeningAndClosingOfUploadForm();
animateImageScalingAndFiltersApplying();
setupNewImageSending();
