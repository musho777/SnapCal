import { ScrollView, StyleSheet, View } from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';
import { Category } from './components/Category';
import { RecipeCard } from '../../components/RecipeCard';

const MainScreen = ({ navigation }) => {
  const data = [
    {
      title: 'Chicken Salad',
      kcal: '480',
      image: require('../../assets/snack.png'),
    },
    {
      title: 'Chicken Salad',
      kcal: '480',
      image: require('../../assets/steak.png'),
    },
    {
      title: 'Chicken Salad',
      kcal: '480',
      image: require('../../assets/snack.png'),
    },
    {
      title: 'Chicken Salad',
      kcal: '480',
      image: require('../../assets/snack.png'),
    },
    {
      title: 'Chicken Salad',
      kcal: '480',
      image: require('../../assets/snack.png'),
    },
  ];
  const handleShowRecipients = () => {
    navigation.navigate('Recipient');
  };

  return (
    <View style={styles.page}>
      <Header />
      <ProAccessBanner />
      <Category />

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((elm, i) => {
          return (
            <View style={localStyled.recipeCardWrapper} key={i}>
              <RecipeCard
                onPress={() => handleShowRecipients()}
                data={elm}
                key={i}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const localStyled = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  recipeCardWrapper: {
    marginRight: 15,
    paddingBottom: 10,
  },
});

export default MainScreen;
