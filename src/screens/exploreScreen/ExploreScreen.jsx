import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TabButton, Header } from './components';
import { FoodCard } from '../../components/cards/FoodCard';
import { styles } from '../../themes';
import NoResult from '../../components/noResult';
import { useDispatch, useSelector } from 'react-redux';
import { getDeash } from '../../features/explore/exploreAction';
import { selectData, selectLoading } from '../../features/explore/exploreSlice';
import Loading from '../../components/loading/Loading';
import { useDebounce } from '../../hooks';

const MEAL_TABS = [
  { id: 'all', label: 'All', emoji: '✨', time: '' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅', time: '7–10 AM' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️', time: '12–2 PM' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙', time: '6–9 PM' },
  { id: 'snack', label: 'Snacks', emoji: '🍎', time: 'Anytime' },
];

const ExploreScreen = ({ navigation }) => {
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const params = {};
    if (debouncedSearchQuery) {
      params.q = debouncedSearchQuery;
    }
    if (activeTab !== 'all') {
      params.dish_type = activeTab;
    }
    dispatch(getDeash(params));
  }, [dispatch, debouncedSearchQuery, activeTab]);

  const renderFoodCard = ({ item }) => {
    return (
      <FoodCard
        item={item}
        isSaved={item.is_saved || false}
        onRecipePress={() => {
          navigation.navigate('Recipient', {
            recipeId: item.id,
          });
        }}
      />
    );
  };
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
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data?.dishes}
          renderItem={renderFoodCard}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.flex}
          keyboardDismissMode="on-drag"
          columnWrapperStyle={localStyles.columnWrapper}
          contentContainerStyle={localStyles.listContent}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={<NoResult />}
          showsVerticalScrollIndicator={false}
        />
      )}
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
