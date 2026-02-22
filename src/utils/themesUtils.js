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

export const getBgColor = mealType => {
  const colorMap = {
    breakfast: '#FFF4CC',
    lunch: '#E8F5E9',
    dinner: '#FFE8E8',
    snack: '#F5E8D3',
  };
  return colorMap[mealType] || '#F7F8FA';
};
