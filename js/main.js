import {showRandomPosts} from './utils/randomPostsFactory.js';
import {
  animateImageScalingAndFiltersApplying,
  animateOpeningAndClosingOfUploadForm
} from './upload_form/upload_form_animation.js';
import {activatePristineValidationOfUploadForm} from './upload_form/upload_form_validation.js';

showRandomPosts();
animateOpeningAndClosingOfUploadForm();
activatePristineValidationOfUploadForm();
animateImageScalingAndFiltersApplying();
