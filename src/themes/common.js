import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  page: {
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    gap: 10,
    backgroundColor: '#F9FAFB',
    height: '100%',
  },
});
