import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';
import { Header } from './components/Header';
import { FireIcon } from '../../assets/Icons';
import { CaloriesCard } from '../../components/CaloriesCard';
import { HealthScoreBar } from '../../components/HealthScoreBar';
import { calculateHealthScore } from '../../utils/healthScore';

const RecipeScreen = () => {
  const data = [
    {
      weight: 48,
      type: 'Carbs',
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

  const healthScoreData = calculateHealthScore(data);

  return (
    <View style={localStyles.container}>
      <Header />
      <View style={localStyles.imageContainer}>
        <Image
          style={localStyles.img}
          source={require('../../assets/snack.png')}
        />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={localStyles.spacer} />
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
          <HealthScoreBar score={healthScoreData.score} />
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    zIndex: 0,
  },
  img: {
    width: 300,
    height: 300,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  spacer: {
    height: 320,
  },
  details: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 30,
    minHeight: 300,
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
