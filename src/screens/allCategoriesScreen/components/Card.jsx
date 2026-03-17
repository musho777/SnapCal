import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../themes';

export const Card = ({ data, onPress }) => {
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
      style={localStyled.container}
      activeOpacity={0.7}
    >
      <View style={localStyled.imageWrapper}>
        <Image style={localStyled.image} source={getImageSource()} />
      </View>
      <View style={localStyled.textContainer}>
        <Text numberOfLines={2} style={styles.h4}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const localStyled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.05,
    elevation: 2,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 7,
    marginHorizontal: 5,
    padding: 5,
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
