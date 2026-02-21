import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';

const NoResult = ({ text = 'No Result Found ' }) => {
  return (
    <View style={localStyles.container}>
      <Image
        style={localStyles.image}
        source={require('../../assets/notFound.webp')}
      />
      <Text style={styles.h5}>{text}</Text>
    </View>
  );
};

export const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  image: {
    width: 200,
    height: 150,
  },
});

export default NoResult;
