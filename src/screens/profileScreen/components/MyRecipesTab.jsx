import React, { useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { FoodCard } from '../../../components/cards/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDishes } from '../../../features/user/userAction';
import {
  selectMyDishes,
  selectMyDishesLoading,
  selectMyDishesLoadingMore,
  selectMyDishesHasMore,
} from '../../../features/user/userSlice';
import Loading from '../../../components/loading/Loading';
import { useNavigation } from '@react-navigation/native';
import { useTabBarHeight } from '../../../hooks';

const MyRecipesTab = ({ onAdd }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMyDishesLoading);
  const loadingMore = useSelector(selectMyDishesLoadingMore);
  const hasMore = useSelector(selectMyDishesHasMore);
  const data = useSelector(selectMyDishes);
  const navigation = useNavigation();
  const tabBarHeight = useTabBarHeight();

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
      dispatch(getMyDishes(params));
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
        isSaved={item.is_saved || false}
        onRecipePress={() => handleNavigation(item)}
      />
    );
  };

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
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={localStyles.columnWrapper}
      contentContainerStyle={[
        localStyles.listContent,
        { paddingBottom: tabBarHeight + 16 },
      ]}
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
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
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
