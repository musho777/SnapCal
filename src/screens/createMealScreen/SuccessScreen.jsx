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

  const handleClose = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.goBack();
    }
  };

  return (
    <SuccessScreenComponent
      mealName={mealName}
      onCreateAnother={handleCreateAnother}
      onClose={handleClose}
    />
  );
};
