import {getRandomInt} from './utils/util.js';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel turpis molestie, tempor ligula et, sodales diam. Morbi suscipit facilisis ex, sit amet consequat ante. Donec ultricies urna arcu, eu egestas diam rhoncus ac. Phasellus at purus in libero pretium imperdiet. Phasellus tortor turpis, dapibus eu tortor vel, feugiat accumsan turpis. Aliquam erat volutpat. Cras at ex nisl. Morbi aliquet est dolor, sit amet ultricies mauris imperdiet sagittis. Suspendisse venenatis consectetur vulputate.';
const loremIpsumList = loremIpsum.split('.');

export function showRandomPosts() {
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

export function createRandomPhoto(id){
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: loremIpsumList[getRandomInt(1,9)],
    likes: getRandomInt(15,200),
    comments: getRandomInt(0,200)
  };
}

export function createRandomPhotos(quantity){
  const randomObjects = [];
  for (let i = 0; i <= quantity; i++) {
    randomObjects[i-1] = createRandomPhoto(i);
  }
  return randomObjects;
}
