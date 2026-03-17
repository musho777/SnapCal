import React, { useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FoodCard } from '../../../components/cards/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDishes } from '../../../features/user/userAction';
import {
  selectMyDishes,
  selectMyDishesLoading,
} from '../../../features/user/userSlice';
import Loading from '../../../components/loading/Loading';
import { useNavigation } from '@react-navigation/native';

const MyRecipesTab = ({ onAdd }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMyDishesLoading);
  const data = useSelector(selectMyDishes);
  const navigation = useNavigation();

  const handleToggleSave = () => {};
  const handleNavigation = item => {
    navigation.navigate('Recipient', {
      recipeId: item.id,
    });
  };

  useEffect(() => {
    dispatch(getMyDishes({}));
  }, [dispatch]);

  const renderRecipeCard = ({ item }) => {
    return (
      <FoodCard
        item={item}
        isSaved={false}
        onToggleSave={handleToggleSave}
        onRecipePress={() => handleNavigation(item)}
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

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data.dishes}
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
