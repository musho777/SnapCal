import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../themes';

export const Card = ({ data, onPress, width = 200 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[localStyled.container, { width: width }]}
      activeOpacity={0.7}
    >
      <Image style={localStyled.image} source={data.image} />
      <View style={localStyled.titleContainer}>
        <Text numberOfLines={1} style={styles.h4}>
          {data.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const localStyled = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 80,
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
});
