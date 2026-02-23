import React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FoodCard } from '../../../components/cards/FoodCard';
import { calculateHealthScore } from '../../../utils/healthScore';
import { getRecipeImage } from '../../../utils/imageMapper';
import { getBgColor } from '../../../utils/themesUtils';

const MyRecipesTab = ({ myRecipesList, onDelete, onAdd, onNavigate }) => {
  const transformRecipe = recipe => {
    if (!recipe) return null;
    const healthData = calculateHealthScore(recipe.macros || []);
    return {
      id: recipe.id.toString(),
      name: recipe.name,
      kcal: recipe.totalCalories,
      category: recipe.mealType,
      health: healthData.score,
      tag: recipe.category?.toUpperCase() || 'MEAL',
      bgColor: getBgColor(recipe.mealType),
      image: getRecipeImage(recipe.image),
    };
  };

  const handleToggleSave = id => {
    onDelete(parseInt(id, 10));
  };

  const renderRecipeCard = ({ item }) => {
    const transformedItem = transformRecipe(item);
    if (!transformedItem) return null;

    return (
      <FoodCard
        item={transformedItem}
        isSaved={false}
        onToggleSave={handleToggleSave}
        onRecipePress={() => onNavigate(item)}
      />
    );
  };

  const renderFooter = () => (
    <TouchableOpacity style={localStyles.addCTA} onPress={onAdd}>
      <Text style={localStyles.addEmoji}>👨‍🍳</Text>
      <Text style={localStyles.addTitle}>Add Your Own Recipe</Text>
      <Text style={localStyles.addSubtitle}>
        Create and save your custom recipes here
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={myRecipesList}
      renderItem={renderRecipeCard}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={localStyles.columnWrapper}
      contentContainerStyle={localStyles.listContent}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

const localStyles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  addCTA: {
    marginTop: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  addTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 4,
  },
  addSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default MyRecipesTab;
