const postsContainerElement = document.querySelector('.pictures');
const templateElement = document.querySelector('#picture').content;


export function showRandomPosts() {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data1')
    .then((response) => {
      if (response.ok){
        return response.json();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((posts) => showPosts(posts))
    .catch(() => {
      showFetchFailAlert();
    });
}


function showFetchFailAlert() {
  const alertElement = document.createElement('div');
  alertElement.style.height = '25px';
  alertElement.style.width = '50%';
  alertElement.style.marginLeft = '25%';
  alertElement.style.textAlign = 'center';
  alertElement.style.color = 'white';
  alertElement.style.background = 'red';
  alertElement.style.animation = 'myAnim 1s ease-in 0s 1 normal forwards';
  alertElement.textContent = 'Не удалось получить изображения';
  document.querySelector('main').insertAdjacentElement('afterbegin', alertElement);
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
