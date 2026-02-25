import { ScrollView, StyleSheet, View } from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';
import { Category } from './components/Category';
import recipesData from '../../data/recipes.json';
import { FoodCard } from '../../components/cards/FoodCard';
import { getBgColor } from '../../utils/themesUtils';
import { getRecipeImage } from '../../utils/imageMapper';

const imageMap = {
  'chicken.png': require('../../assets/chicken.png'),
  'snack.png': require('../../assets/snack.png'),
  'grilledSalmon.png': require('../../assets/grilledSalmon.png'),
  'pancakes.png': require('../../assets/pancakes.png'),
  'greekYogurt.png': require('../../assets/greekYogurt.png'),
  'steak.png': require('../../assets/steak.png'),
  'apple.png': require('../../assets/apple.png'),
  'drink.png': require('../../assets/drink.png'),
  'carb.png': require('../../assets/carb.png'),
  'protein.png': require('../../assets/protein.png'),
};

const getImageSource = imagePath => {
  const filename = imagePath.split('/').pop();
  return imageMap[filename] || imageMap['snack.png'];
};

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
              {/* <RecipeCard
                onPress={() => handleShowRecipients(elm.id)}
                data={elm}
                key={i}
              /> */}
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
