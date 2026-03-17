import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';
import { UIButton } from '../../common-ui/uIButton';

export const RecipeCard = ({ data, onPress, width = 200 }) => {
  return (
    <View style={[localStyled.container, { width: width }]}>
      <View style={styles.gap5}>
        <Text numberOfLines={1} style={styles.title}>
          {data.title}
        </Text>
        <View style={styles.alignStart}>
          <View style={localStyled.kcal}>
            <Text style={styles.caption}>{data.kcal} Kcal</Text>
          </View>
        </View>
      </View>
      <View>
        <Image style={localStyled.image} source={data.image} />
        <UIButton
          variant="card"
          backgroundColor={'#272727'}
          color={'white'}
          onPress={onPress}
          title={'Tell me Recipe'}
        />
      </View>
    </View>
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
    padding: 20,
    elevation: 1,
    borderRadius: 30,
  },
  image: {
    maxWidth: 150,
    width: '100%',
    height: 150,
  },
  kcal: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 1,
    borderRadius: 30,
  },
});
