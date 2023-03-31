function getRandomInt(from, to) {
  return Math.floor(to - (to - from)*Math.random());
}
// eslint-disable-next-line no-console
console.log(
  getRandomInt(1,5), // -> 1..4
  getRandomInt(5,1), // -> 1..4
  getRandomInt(5,5)  // -> 5
);

function stringLengthLessThan(str, maxLength) {
  return str.length <= maxLength;
}
// eslint-disable-next-line no-console
console.log(
  stringLengthLessThan('аб', 3),
  stringLengthLessThan('аб', 2),
  stringLengthLessThan('аб', 1)
);
