import { FlatList, StyleSheet, View } from 'react-native';

import { styles } from '../../themes';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import UIInput from '../../common-ui/uIInput';
import NoResult from '../../components/noResult';

import { FoodCard } from '../../components/cards/FoodCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByCategory } from '../../features/singleCategory/singleCategoryAction';
import {
  selectDataByCategoryData,
  selectDataByCategoryLoading,
} from '../../features/singleCategory/singleCategorySlice';
import Loading from '../../components/loading/Loading';

const CategoryScreen = ({ navigation, route }) => {
  const { category, name } = route.params;
  const dispatch = useDispatch();
  const data = useSelector(selectDataByCategoryData);
  const loading = useSelector(selectDataByCategoryLoading);

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  useEffect(() => {
    dispatch(getDataByCategory({ category_ids: [category] }));
  }, [category]);

  console.log(data, 'aa');

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
          style={styles.flex}
          columnWrapperStyle={localStyles.columnWrapper}
          contentContainerStyle={localStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <NoResult text={`No recipes found for ${name}`} />
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
