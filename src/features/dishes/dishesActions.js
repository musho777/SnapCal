import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const createDish = createAsyncThunk(
  'dishes/create',
  async (dishData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Add image if exists
      if (dishData.image) {
        const imageUri = dishData.image.uri || dishData.image;
        const imageName = dishData.image.fileName || imageUri.split('/').pop();
        const imageType = dishData.image.type || 'image/jpeg';

        formData.append('image', {
          uri: imageUri,
          name: imageName,
          type: imageType,
        });
      }

      // Required fields
      formData.append('name', dishData.name);
      formData.append('servings', Number(dishData.servings));
      formData.append('calories', Number(dishData.calories));
      formData.append('protein_g', Number(dishData.protein_g));
      formData.append('carbs_g', Number(dishData.carbs_g));
      formData.append('fats_g', Number(dishData.fats_g));

      // Optional fields
      if (dishData.description) {
        formData.append('description', dishData.description);
      }
      if (dishData.prep_time_minutes) {
        formData.append(
          'prep_time_minutes',
          Number(dishData.prep_time_minutes),
        );
      }
      if (dishData.cook_time_minutes) {
        formData.append(
          'cook_time_minutes',
          Number(dishData.cook_time_minutes),
        );
      }
      if (dishData.fiber_g) {
        formData.append('fiber_g', Number(dishData.fiber_g));
      }
      if (dishData.sugar_g) {
        formData.append('sugar_g', Number(dishData.sugar_g));
      }
      if (dishData.sodium_mg) {
        formData.append('sodium_mg', Number(dishData.sodium_mg));
      }

      // Always set is_public to false
      formData.append('is_public', false);

      // Arrays - append each item individually
      if (dishData.diet_tag_ids && dishData.diet_tag_ids.length > 0) {
        dishData.diet_tag_ids.forEach(id => {
          formData.append('diet_tag_ids[]', id);
        });
      }
      if (dishData.dish_type && dishData.dish_type.length > 0) {
        dishData.dish_type.forEach(type => {
          formData.append('dish_type[]', type);
        });
      }
      if (dishData.category_ids && dishData.category_ids.length > 0) {
        dishData.category_ids.forEach(id => {
          formData.append('category_ids[]', id);
        });
      }

      if (dishData.ingredients && dishData.ingredients.length > 0) {
        formData.append('ingredients', JSON.stringify(dishData.ingredients));
      }

      if (dishData.cooking_steps && dishData.cooking_steps.length > 0) {
        formData.append(
          'cooking_steps',
          JSON.stringify(dishData.cooking_steps),
        );
      }

      console.log(dishData);

      const response = await ApiClient.post('/dishes', formData, {
        'Content-Type': 'multipart/form-data',
      });

      return response;
    } catch (error) {
      console.log('Create dish error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to create dish. Please check your connection and try again.';
      return rejectWithValue(errorMessage);
    }
  },
);
