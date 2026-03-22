import React, { createContext, useContext, useState } from 'react';

const CreateMealContext = createContext();

export const useCreateMeal = () => {
  const context = useContext(CreateMealContext);
  if (!context) {
    throw new Error('useCreateMeal must be used within CreateMealProvider');
  }
  return context;
};

export const CreateMealProvider = ({ children }) => {
  const [data, setData] = useState({
    name: '',
    category: '',
    mealType: '',
    totalCalories: '',
    image: null,
    diet_tag_ids: [],
    macros: [
      { weight: 0, type: 'Carbs' },
      { weight: 0, type: 'Protein' },
      { weight: 0, type: 'Fat' },
    ],
    recipeInfo: {
      description: '',
      prepTime: '',
      cookTime: '',
      servings: '4',
    },
    ingredients: [{ name: '', amount: '' }],
    cookingSteps: [''],
  });

  const resetData = () => {
    setData({
      name: '',
      category: '',
      mealType: '',
      totalCalories: '',
      image: null,
      diet_tag_ids: [],
      macros: [
        { weight: 0, type: 'Carbs' },
        { weight: 0, type: 'Protein' },
        { weight: 0, type: 'Fat' },
      ],
      recipeInfo: {
        description: '',
        prepTime: '',
        cookTime: '',
        servings: '4',
      },
      ingredients: [{ name: '', amount: '' }],
      cookingSteps: [''],
    });
  };

  return (
    <CreateMealContext.Provider value={{ data, setData, resetData }}>
      {children}
    </CreateMealContext.Provider>
  );
};
