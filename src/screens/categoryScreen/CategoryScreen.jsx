import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';
import { RecipeCard } from '../../components/RecipeCard';
import recipesData from '../../data/recipes.json';
import { ScreenHeader } from '../../components/headers/ScreenHeader';

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

const CategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;

  const filteredRecipes = recipesData.recipes.filter(
    recipe => recipe.category.toLowerCase() === category.toLowerCase(),
  );

  const data = filteredRecipes.map(recipe => ({
    id: recipe.id,
    title: recipe.name,
    kcal: recipe.totalCalories.toString(),
    image: getImageSource(recipe.image),
  }));

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  return (
    <View style={styles.page}>
      <ScreenHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyled.scrollContent}
      >
        {data.length > 0 ? (
          data.map((elm, i) => (
            <View style={localStyled.recipeCardWrapper} key={i}>
              <RecipeCard
                onPress={() => handleShowRecipients(elm.id)}
                data={elm}
              />
            </View>
          ))
        ) : (
          <View style={localStyled.emptyContainer}>
            <Text style={localStyled.emptyText}>
              No recipes found for "{category}"
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const localStyled = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipeCardWrapper: {
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CategoryScreen;
