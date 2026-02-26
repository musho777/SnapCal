import { FlatList, StyleSheet, View } from 'react-native';

import { styles } from '../../themes';
import recipesData from '../../data/recipes.json';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import UIInput from '../../common-ui/uIInput';
import NoResult from '../../components/noResult';
import { calculateHealthScore } from '../../utils/healthScore';
import { getBgColor } from '../../utils/themesUtils';
import { getRecipeImage } from '../../utils/imageMapper';
import { FoodCard } from '../../components/cards/FoodCard';

const CategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;

  const transformRecipesToFoodData = recipes => {
    return recipes.map(recipe => {
      const healthData = calculateHealthScore(recipe.macros);
      return {
        id: recipe.id.toString(),
        name: recipe.name,
        kcal: recipe.totalCalories,
        category: recipe.mealType,
        health: healthData.score,
        tag: recipe.category,
        bgColor: getBgColor(recipe.mealType),
        image: getRecipeImage(recipe.image),
        rating: recipe.rating,
      };
    });
  };

  const FOOD_DATA = transformRecipesToFoodData(recipesData.recipes);

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  const renderFoodCard = ({ item }) => (
    <FoodCard
      item={item}
      isSaved={false}
      onToggleSave={() => {}}
      onRecipePress={() => {
        handleShowRecipients(item.id);
      }}
    />
  );

  const renderListHeader = () => (
    <View style={localStyles.inputWrapper}>
      <UIInput placeholder="Search" showSearchIcon={true} />
    </View>
  );

  return (
    <View style={styles.page}>
      <ScreenHeader title={category} />
      <View style={localStyles.scrollContent}>
        <FlatList
          data={FOOD_DATA}
          renderItem={renderFoodCard}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={FOOD_DATA.length > 0 && renderListHeader}
          style={styles.flex}
          columnWrapperStyle={localStyles.columnWrapper}
          contentContainerStyle={localStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <NoResult text={`No recipes found for ${category}`} />
          }
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 80,
  },
  columnWrapper: {
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  inputWrapper: {
    marginBottom: 20,
  },
});

export default CategoryScreen;
