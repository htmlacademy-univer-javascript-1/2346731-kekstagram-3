function getRandomInt(from, to) {
  return Math.floor(to - (to - from)*Math.random());
}

function stringLengthLessThan(str, maxLength) {
  return str.length <= maxLength;
}
stringLengthLessThan('',0);


const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel turpis molestie, tempor ligula et, sodales diam. Morbi suscipit facilisis ex, sit amet consequat ante. Donec ultricies urna arcu, eu egestas diam rhoncus ac. Phasellus at purus in libero pretium imperdiet. Phasellus tortor turpis, dapibus eu tortor vel, feugiat accumsan turpis. Aliquam erat volutpat. Cras at ex nisl. Morbi aliquet est dolor, sit amet ultricies mauris imperdiet sagittis. Suspendisse venenatis consectetur vulputate.';
const loremIpsumList = loremIpsum.split('.');
function createRandomObject(id){
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: loremIpsumList[getRandomInt(1,9)],
    likes: getRandomInt(15,200),
    comments: getRandomInt(0,200)
  };
}

function createRandomObjects(quantity){
  const randomObjects = [];
  for (let i = 1; i <= quantity; i++) {
    randomObjects[i-1] = createRandomObject(i);
  }
  return randomObjects;
}

// eslint-disable-next-line no-console
console.log(createRandomObjects(25));
