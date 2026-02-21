import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';
import { Header } from './components/Header';
import { FireIcon } from '../../assets/Icons';
import { CaloriesCard } from '../../components/CaloriesCard';

const RecipeScreen = () => {
  const data = [
    {
      weight: 48,
      type: 'Crabs',
    },
    {
      weight: 160,
      type: 'Protein',
    },
    {
      weight: 72,
      type: 'Fat',
    },
  ];
  return (
    <View>
      <Header />
      <View style={[styles.center, styles.mt15]}>
        <Image
          style={localStyles.img}
          source={require('../../assets/snack.png')}
        />
      </View>
      <View style={localStyles.details}>
        <View style={localStyles.titleWrapper}>
          <Text style={styles.title}>Chicken Salad</Text>
          <Text style={styles.caption}>4.9K</Text>
        </View>
        <View style={localStyles.kcal}>
          <Text style={styles.captionPrimary}>Total 280 Kcal</Text>
          <FireIcon />
        </View>
        <View style={localStyles.row}>
          {data.map((elm, i) => {
            return <CaloriesCard key={i} data={elm} />;
          })}
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
  },
  details: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 5,
    gap: 10,
    height: '100%',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kcal: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecipeScreen;
