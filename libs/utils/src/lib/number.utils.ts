export function getRandomArbitrary(min: number, max: number, precision = 4) {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
