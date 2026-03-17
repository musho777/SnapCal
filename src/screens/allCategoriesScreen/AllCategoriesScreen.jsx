import { useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import { Card } from './components/Card';
import { styles } from '../../themes';
import { getAllCategories } from '../../features/singleCategory/singleCategoryAction';
import {
  selectAllCategoriesData,
  selectAllCategoriesLoading,
  selectAllCategoriesLoadingMore,
  selectAllCategoriesHasMore,
  resetAllCategoriesData,
} from '../../features/singleCategory/singleCategorySlice';
import Loading from '../../components/loading/Loading';

const LIMIT = 20;

const AllCategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const allCategoriesData = useSelector(selectAllCategoriesData);
  const loading = useSelector(selectAllCategoriesLoading);
  const loadingMore = useSelector(selectAllCategoriesLoadingMore);
  const hasMore = useSelector(selectAllCategoriesHasMore);

  const categories = allCategoriesData?.categories || [];
  const currentOffset = allCategoriesData?.offset || 0;

  useEffect(() => {
    dispatch(getAllCategories({ limit: LIMIT, offset: 0 }));
    return () => {
      dispatch(resetAllCategoriesData());
    };
  }, [dispatch]);

  const handleCategoryPress = (categoryId, categoryName) => {
    navigation.navigate('Category', {
      category: categoryId,
      name: categoryName,
    });
  };

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && categories.length > 0) {
      const nextOffset = currentOffset + LIMIT;
      dispatch(getAllCategories({ limit: LIMIT, offset: nextOffset }));
    }
  }, [dispatch, loadingMore, hasMore, categories.length, currentOffset]);

  const renderItem = ({ item }) => (
    <Card data={item} onPress={() => handleCategoryPress(item.id, item.name)} />
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={localStyled.footer}>
        <ActivityIndicator size="small" color="#00C853" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={localStyled.emptyContainer}>
          <Loading />
        </View>
      );
    }
    return (
      <View style={localStyled.emptyContainer}>
        <Text style={styles.body}>No categories available</Text>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <ScreenHeader title="All Categories" />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => `category-${item.id}-${index}`}
        contentContainerStyle={localStyled.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const localStyled = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});

export default AllCategoriesScreen;
