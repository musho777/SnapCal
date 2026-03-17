import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../themes';

export const Card = ({ data, onPress, width = 200 }) => {
  // Determine image source - support both API data (icon_url) and local data (image)
  const getImageSource = () => {
    if (data.icon_url) {
      // Use API URL for real data
      return {
        uri: `https://snapcal-back-production.up.railway.app${data.icon_url}`,
      };
    } else if (data.image) {
      // Use local image for fallback
      return data.image;
    }
    // Default fallback image
    return require('../../../assets/greekYogurt.png');
  };

  // Get category name from either 'name' (API) or 'title' (local)
  const categoryName = data.name || data.title || 'Category';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[localStyled.container, { width: width }]}
      activeOpacity={0.7}
    >
      <Image style={localStyled.image} source={getImageSource()} />
      <View style={localStyled.titleContainer}>
        <Text numberOfLines={1} style={styles.h4}>
          {categoryName}
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
