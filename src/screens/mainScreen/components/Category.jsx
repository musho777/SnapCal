import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../themes';

export const Category = () => {
  const data = [
    {
      title: 'Vegan',
      image: require('../../../assets/apple.png'),
    },
    {
      title: 'Carb',
      image: require('../../../assets/carb.png'),
    },
    {
      title: 'Protein',
      image: require('../../../assets/protein.png'),
    },
    {
      title: 'Snack',
      image: require('../../../assets/snack.png'),
    },
    {
      title: 'Drink',
      image: require('../../../assets/drink.png'),
    },
    {
      title: 'Vegan',
      image: require('../../../assets/apple.png'),
    },
    {
      title: 'Vegan',
      image: require('../../../assets/apple.png'),
    },
  ];
  return (
    <View>
      <View style={localStyled.more}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.caption}>View More</Text>
        </TouchableOpacity>
      </View>
      <View style={localStyled.categories}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((elm, i) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={i}
                style={localStyled.box}
              >
                <View style={localStyled.imgWrapper}>
                  <Image style={localStyled.img} source={elm.image} />
                </View>
                <Text style={styles.captionPrimary}>{elm.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const localStyled = StyleSheet.create({
  more: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categories: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    gap: 7,
  },
  imgWrapper: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
    borderRadius: 45,
  },
  img: {
    width: 45,
    height: 35,
  },
});
