import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TabButton, Header } from './components';
import { FoodCard } from '../../components/cards/FoodCard';
import recipesData from '../../data/recipes.json';
import { calculateHealthScore } from '../../utils/healthScore';
import { getRecipeImage } from '../../utils/imageMapper';

const getBgColor = mealType => {
  const colorMap = {
    breakfast: '#FFF4CC',
    lunch: '#E8F5E9',
    dinner: '#FFE8E8',
    snack: '#F5E8D3',
  };
  return colorMap[mealType] || '#F7F8FA';
};

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

// Use recipes from JSON file
const FOOD_DATA = transformRecipesToFoodData(recipesData.recipes);

const MEAL_TABS = [
  { id: 'all', label: 'All', emoji: '✨', time: '' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅', time: '7–10 AM' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️', time: '12–2 PM' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙', time: '6–9 PM' },
  { id: 'snack', label: 'Snacks', emoji: '🍎', time: 'Anytime' },
];

const ExploreScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState({});

  const toggleSave = id => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = FOOD_DATA.filter(food => {
    const matchesTab = activeTab === 'all' || food.category === activeTab;
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderFoodCard = ({ item }) => (
    <FoodCard
      item={item}
      isSaved={savedItems[item.id]}
      onToggleSave={toggleSave}
      onPress={() => {
        // Handle card press
      }}
      onRecipePress={() => {
        navigation.navigate('ExploreRecipient', { recipeId: parseInt(item.id) });
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={localStyles.emptyState}>
      <Text style={localStyles.emptyEmoji}>🍽</Text>
      <Text style={localStyles.emptyTitle}>No results found</Text>
      <Text style={localStyles.emptyHint}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  const renderListHeader = () => (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={localStyles.tabsScrollView}
        contentContainerStyle={localStyles.tabsContainer}
      >
        {MEAL_TABS.map(tab => (
          <TabButton
            key={tab.id}
            emoji={tab.emoji}
            label={tab.label}
            time={tab.time}
            isActive={activeTab === tab.id}
            onPress={() => setActiveTab(tab.id)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={localStyles.container}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FlatList
        data={filteredData}
        renderItem={renderFoodCard}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{ flex: 1 }}
        columnWrapperStyle={localStyles.columnWrapper}
        contentContainerStyle={localStyles.listContent}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExploreScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  tabsScrollView: {
    maxHeight: 80,
    flexGrow: 0,
    marginBottom: 16,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#272727',
    marginBottom: 4,
  },
  emptyHint: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
