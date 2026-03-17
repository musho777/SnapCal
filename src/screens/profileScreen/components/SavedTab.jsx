import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FoodCard } from '../../../components/cards/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSavedDishes,
  unSaveDish,
} from '../../../features/savedDishes/savedDishesAction';
import {
  selectSavedDishes,
  selectSavedDishesLoading,
  selectSavedDishesLoadingMore,
  selectSavedDishesHasMore,
  removeSavedDishOptimistic,
} from '../../../features/savedDishes/savedDishesSlice';
import Loading from '../../../components/loading/Loading';
import { useNavigation } from '@react-navigation/native';

const SavedTab = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectSavedDishesLoading);
  const loadingMore = useSelector(selectSavedDishesLoadingMore);
  const hasMore = useSelector(selectSavedDishesHasMore);
  const data = useSelector(selectSavedDishes);
  const navigation = useNavigation();

  const handleToggleSave = id => {
    // Optimistically remove from UI
    dispatch(removeSavedDishOptimistic({ id }));
    // Make API call
    dispatch(unSaveDish({ id }));
  };

  const handleNavigation = item => {
    navigation.navigate('Recipient', {
      recipeId: item.id,
    });
  };

  const fetchData = useCallback(
    (offset = 0) => {
      const params = {
        offset,
        limit: 10,
      };
      dispatch(getSavedDishes(params));
    },
    [dispatch],
  );

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && data?.dishes?.length > 0) {
      const nextOffset = data.dishes.length;
      fetchData(nextOffset);
    }
  }, [loadingMore, hasMore, data?.dishes?.length, fetchData]);

  useEffect(() => {
    fetchData(0);
  }, [dispatch]);

  const renderRecipeCard = ({ item }) => {
    return (
      <FoodCard
        item={item}
        isSaved={true}
        onToggleSave={handleToggleSave}
        onRecipePress={() => handleNavigation(item)}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={localStyles.emptyContainer}>
      <Text style={localStyles.emptyEmoji}>🤍</Text>
      <Text style={localStyles.emptyTitle}>No saved recipes yet</Text>
      <Text style={localStyles.emptySubtitle}>
        Start exploring and save your favorite meals!
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={localStyles.footerLoader}>
        <ActivityIndicator size="small" color="#00C853" />
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data?.dishes}
      renderItem={renderRecipeCard}
      keyExtractor={item => item?.id.toString()}
      numColumns={2}
      columnWrapperStyle={localStyles.columnWrapper}
      contentContainerStyle={localStyles.listContent}
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SavedTab;
