import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    category: '4439d330-2a2e-46f5-b4ac-e2fab645218c',
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
  },
};

const createMealSlice = createSlice({
  name: 'createMeal',
  initialState,
  reducers: {
    updateFormData: (state, { payload }) => {
      state.formData = { ...state.formData, ...payload };
    },
    resetFormData: state => {
      state.formData = initialState.formData;
    },
  },
});

export const { updateFormData, resetFormData } = createMealSlice.actions;

export default createMealSlice.reducer;
