import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';

import { styles } from '../../themes';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import UIInput from '../../common-ui/uIInput';
import NoResult from '../../components/noResult';

import { FoodCard } from '../../components/cards/FoodCard';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByCategory } from '../../features/singleCategory/singleCategoryAction';
import {
  selectDataByCategoryData,
  selectDataByCategoryLoading,
  selectDataByCategoryLoadingMore,
  selectDataByCategoryHasMore,
  resetCategoryData,
} from '../../features/singleCategory/singleCategorySlice';
import Loading from '../../components/loading/Loading';
import { useDebounce } from '../../hooks';

const CategoryScreen = ({ navigation, route }) => {
  const { category, name } = route.params;
  const dispatch = useDispatch();
  const data = useSelector(selectDataByCategoryData);
  const loading = useSelector(selectDataByCategoryLoading);
  const loadingMore = useSelector(selectDataByCategoryLoadingMore);
  const hasMore = useSelector(selectDataByCategoryHasMore);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  const fetchData = useCallback(
    (offset = 0, query = '') => {
      const params = {
        category_ids: [category],
        offset,
        limit: 10,
      };

      if (query.trim()) {
        params.q = query.trim();
      }

      dispatch(getDataByCategory(params));
    },
    [category, dispatch],
  );

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && data?.dishes?.length > 0) {
      const nextOffset = data.dishes.length;
      fetchData(nextOffset, debouncedSearchQuery);
    }
  }, [
    loadingMore,
    hasMore,
    data?.dishes?.length,
    debouncedSearchQuery,
    fetchData,
  ]);

  useEffect(() => {
    dispatch(resetCategoryData());
    fetchData(0, debouncedSearchQuery);
  }, [category, debouncedSearchQuery, dispatch]);

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
      <UIInput
        placeholder="Search"
        showSearchIcon={true}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
    <View style={styles.page}>
      <ScreenHeader title={name} />
      <View style={localStyles.scrollContent}>
        <FlatList
          data={data?.dishes}
          renderItem={renderFoodCard}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderFooter}
          style={styles.flex}
          columnWrapperStyle={localStyles.columnWrapper}
          contentContainerStyle={localStyles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            !loading ? (
              <NoResult
                text={
                  searchQuery
                    ? `No recipes found for "${searchQuery}"`
                    : `No recipes found for ${name}`
                }
              />
            ) : null
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default CategoryScreen;
