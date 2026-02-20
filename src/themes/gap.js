import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/themesUtils';

export default StyleSheet.create({
  gap5: {
    gap: moderateScale(5),
  },
  gap10: {
    gap: moderateScale(10),
  },
  gap15: {
    gap: moderateScale(15),
  },
  gap20: {
    gap: moderateScale(20),
  },
  gap25: {
    gap: moderateScale(25),
  },
  gap30: {
    gap: moderateScale(30),
  },
  rowGap10: {
    rowGap: moderateScale(10),
  },
  columnGap10: {
    columnGap: moderateScale(10),
  },
});
