import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
import { styles } from '../../themes';
import { RecipeCard } from '../../components/cards/RecipeCard';
import recipesData from '../../data/recipes.json';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import UIInput from '../../common-ui/uIInput';
import NoResult from '../../components/noResult';
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
      <ScreenHeader title={category} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyled.scrollContent}
      >
        {data.length > 0 && (
          <UIInput placeholder="Search" showSearchIcon={true} />
        )}
        {data.length > 0 ? (
          <View style={localStyled.gridContainer}>
            {data.map((elm, i) => (
              <RecipeCard
                width={(screenWidth - 30) / 2}
                key={i}
                onPress={() => handleShowRecipients(elm.id)}
                data={elm}
              />
            ))}
          </View>
        ) : (
          <NoResult text={`No recipes found for ${category}`} />
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
    flexGrow: 1,
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    paddingBottom: 80,
    marginTop: 20,
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
