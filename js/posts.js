import {createRandomPhotos} from './data.js';

function showRandomPosts() {
  // eslint-disable-next-line no-unused-vars
  const posts = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const photoObjects = createRandomPhotos(25);
  photoObjects.forEach((photoObject)=>{
    const newPost = template.cloneNode(true);
    newPost.querySelector('.picture__img').src = photoObject.url;
    newPost.querySelector('.picture__likes').textContent = photoObject.likes;
    newPost.querySelector('.picture__comments').textContent = photoObject.comments;
    posts.append(newPost);
  });
}

export {showRandomPosts};
