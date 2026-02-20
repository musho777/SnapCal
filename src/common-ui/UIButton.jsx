import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from '../themes';

export const UIButton = () => {
  return (
    <TouchableOpacity style={localStyles.button}>
      <Text style={styles.button}>Go Pro</Text>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
});
