import { ScrollView, StyleSheet, View } from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';
import { Category } from './components/Category';
import recipesData from '../../data/recipes.json';
import { FoodCard } from '../../components/cards/FoodCard';
import { getBgColor } from '../../utils/themesUtils';
import { getRecipeImage } from '../../utils/imageMapper';

const MainScreen = ({ navigation }) => {
  const data = recipesData.recipes.map(recipe => ({
    id: recipe.id.toString(),
    name: recipe.name,
    kcal: recipe.totalCalories,
    category: recipe.mealType,
    health: 100,
    tag: recipe.category,
    bgColor: getBgColor(recipe.mealType),
    image: getRecipeImage(recipe.image),
    rating: recipe.rating,
  }));
  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  return (
    <View style={styles.page}>
      <Header />
      <ProAccessBanner />
      <Category navigation={navigation} />

      <ScrollView
        style={localStyled.paddingLeft}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((elm, i) => {
          return (
            <View
              style={[
                localStyled.recipeCardWrapper,
                i === data.length - 1 && localStyled.marginLeft,
              ]}
              key={i}
            >
              <FoodCard
                item={elm}
                flex={false}
                isSaved={false}
                onToggleSave={() => {}}
                onRecipePress={() => handleShowRecipients(elm.id)}
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
    width: 175,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
  marginLeft: {
    marginLeft: 0,
  },
});

export default MainScreen;
