import React from 'react';
import { useDispatch } from 'react-redux';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import { SuccessScreen as SuccessScreenComponent } from './components/SuccessScreen';
import { resetDishState } from '../../features/dishes/dishesSlice';

export const SuccessScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { resetData } = useCreateMeal();
  const { recipe, mealName } = route.params;

  const handleCreateAnother = () => {
    dispatch(resetDishState());
    resetData();
    navigation.navigate('Step1BasicInfo');
  };

  const handleViewRecipe = () => {
    if (recipe) {
      navigation.navigate('Home', {
        screen: 'Recipient',
        params: { recipeId: recipe.id },
      });
    }
  };

  return (
    <SuccessScreenComponent
      mealName={mealName}
      onCreateAnother={handleCreateAnother}
      onViewRecipe={handleViewRecipe}
    />
  );
};
