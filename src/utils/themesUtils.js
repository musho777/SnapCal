import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');
export const deviceWidth = viewportWidth;
export const deviceHeight = viewportHeight;

let sampleHeight = 812;
let sampleWidth = 375;

const scale = viewportWidth / 375;

export function getWidth(value) {
  return (value / sampleWidth) * deviceWidth;
}

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * deviceHeight;
}

//Responsive size function
export function moderateScale(size) {
  const newSize = size * scale;
  return Math.round(newSize);
}
