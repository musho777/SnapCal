import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabButton, Header } from './components';
import { FoodCard } from '../../components/cards/FoodCard';
import { getAllRecipes } from '../../utils/recipeStorage';
import { calculateHealthScore } from '../../utils/healthScore';
import { getRecipeImage } from '../../utils/imageMapper';
import { styles } from '../../themes';
import NoResult from '../../components/noResult';
import { getBgColor } from '../../utils/themesUtils';

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
  const [recipes, setRecipes] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const loadRecipes = async () => {
    const allRecipes = await getAllRecipes();
    setRecipes(allRecipes);
    setFoodData(transformRecipesToFoodData(allRecipes));
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadRecipes();
    }, [])
  );

  const toggleSave = id => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = foodData.filter(food => {
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
      onRecipePress={() => {
        navigation.navigate('ExploreRecipient', {
          recipeId: parseInt(item.id, 10),
        });
      }}
    />
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
        style={styles.flex}
        columnWrapperStyle={localStyles.columnWrapper}
        contentContainerStyle={localStyles.listContent}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={<NoResult />}
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
});
