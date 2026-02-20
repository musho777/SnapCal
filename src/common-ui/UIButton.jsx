import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from '../themes';

export const UIButton = ({ title, color, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[localStyles.button, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.button, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
});
