import {showAlertInMain} from './alert.js';

const postsContainerElement = document.querySelector('.pictures');
const templateElement = document.querySelector('#picture').content;


export function showRandomPosts() {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => {
      if (response.ok){
        return response.json();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((posts) => showPosts(posts))
    .catch(() => {
      showAlertInMain('Не удалось получить изображения с сервера');
    });
}


function showPosts(photoObjects){
  photoObjects.forEach((photoObject)=>{
    const newPost = templateElement.cloneNode(true);
    newPost.querySelector('.picture__img').src = photoObject.url;
    newPost.querySelector('.picture__likes').textContent = photoObject.likes;
    newPost.querySelector('.picture__comments').textContent = photoObject.comments;
    newPost.querySelector('.picture__img').alt = photoObject.description;
    postsContainerElement.append(newPost);
  });
}
