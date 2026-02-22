import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TabButton, Header } from './components';
import { FoodCard } from '../../components/cards/FoodCard';

const FOOD_DATA = [
  // Breakfast
  {
    id: '1',
    name: 'Avocado Toast',
    kcal: 320,
    category: 'breakfast',
    health: 9,
    tag: 'Vegan',
    emoji: '🥑',
    bgColor: '#D4F1D4',
  },
  {
    id: '2',
    name: 'Greek Yogurt Bowl',
    kcal: 250,
    category: 'breakfast',
    health: 8,
    tag: 'Protein',
    emoji: '🥣',
    bgColor: '#FFE8D6',
  },
  {
    id: '3',
    name: 'Banana Pancakes',
    kcal: 380,
    category: 'breakfast',
    health: 6,
    tag: 'Sweet',
    emoji: '🥞',
    bgColor: '#FFF4CC',
  },
  {
    id: '4',
    name: 'Oatmeal Bowl',
    kcal: 290,
    category: 'breakfast',
    health: 9,
    tag: 'Fiber',
    emoji: '🥗',
    bgColor: '#F5E8D3',
  },
  // Lunch
  {
    id: '5',
    name: 'Caesar Salad',
    kcal: 420,
    category: 'lunch',
    health: 7,
    tag: 'Fresh',
    emoji: '🥗',
    bgColor: '#E8F5E9',
  },
  {
    id: '6',
    name: 'Grilled Chicken',
    kcal: 480,
    category: 'lunch',
    health: 8,
    tag: 'Protein',
    emoji: '🍗',
    bgColor: '#FFF3E0',
  },
  {
    id: '7',
    name: 'Quinoa Bowl',
    kcal: 390,
    category: 'lunch',
    health: 9,
    tag: 'Vegan',
    emoji: '🥙',
    bgColor: '#E3F2FD',
  },
  {
    id: '8',
    name: 'Tuna Sandwich',
    kcal: 450,
    category: 'lunch',
    health: 7,
    tag: 'Quick',
    emoji: '🥪',
    bgColor: '#FFF8E1',
  },
  // Dinner
  {
    id: '9',
    name: 'Salmon Fillet',
    kcal: 520,
    category: 'dinner',
    health: 9,
    tag: 'Omega-3',
    emoji: '🐟',
    bgColor: '#FFE5E5',
  },
  {
    id: '10',
    name: 'Beef Steak',
    kcal: 650,
    category: 'dinner',
    health: 6,
    tag: 'Rich',
    emoji: '🥩',
    bgColor: '#FFDCD6',
  },
  {
    id: '11',
    name: 'Pasta Primavera',
    kcal: 540,
    category: 'dinner',
    health: 7,
    tag: 'Italian',
    emoji: '🍝',
    bgColor: '#FFF4D6',
  },
  {
    id: '12',
    name: 'Veggie Stir Fry',
    kcal: 380,
    category: 'dinner',
    health: 8,
    tag: 'Vegan',
    emoji: '🥘',
    bgColor: '#E8F5E1',
  },
  // Snacks
  {
    id: '13',
    name: 'Mixed Nuts',
    kcal: 180,
    category: 'snacks',
    health: 8,
    tag: 'Healthy',
    emoji: '🥜',
    bgColor: '#F5E8D3',
  },
  {
    id: '14',
    name: 'Fruit Salad',
    kcal: 120,
    category: 'snacks',
    health: 10,
    tag: 'Fresh',
    emoji: '🍓',
    bgColor: '#FFE8E8',
  },
  {
    id: '15',
    name: 'Protein Bar',
    kcal: 220,
    category: 'snacks',
    health: 7,
    tag: 'Energy',
    emoji: '🍫',
    bgColor: '#E8D4F1',
  },
  {
    id: '16',
    name: 'Hummus & Veggies',
    kcal: 150,
    category: 'snacks',
    health: 9,
    tag: 'Vegan',
    emoji: '🥕',
    bgColor: '#FFE8CC',
  },
];

const MEAL_TABS = [
  { id: 'all', label: 'All', emoji: '✨', time: '' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅', time: '7–10 AM' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️', time: '12–2 PM' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙', time: '6–9 PM' },
  { id: 'snacks', label: 'Snacks', emoji: '🍎', time: 'Anytime' },
];

const ExploreScreen = () => {
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
        // Handle recipe button press
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

  return (
    <View style={localStyles.container}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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

      <FlatList
        data={filteredData}
        renderItem={renderFoodCard}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{ flex: 1 }}
        columnWrapperStyle={localStyles.columnWrapper}
        contentContainerStyle={localStyles.listContent}
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
    height: 125,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 45,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
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
