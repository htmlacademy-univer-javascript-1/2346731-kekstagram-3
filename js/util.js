export function getRandomInt(from, to) {
  return Math.floor(to - (to - from)*Math.random());
}

export function stringLengthLessThan(str, maxLength) {
  return str.length <= maxLength;
}
