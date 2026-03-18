import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getMainPlanRange = createAsyncThunk(
  'get/daily',
  async ({}, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`/logs/range`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteMealDish = createAsyncThunk(
  'mealPlan/deleteDish',
  async (mealDishId, { rejectWithValue }) => {
    try {
      const data = await ApiClient.del(`/meals/dish/${mealDishId}`);
      return { mealDishId, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateDailyLog = createAsyncThunk(
  'mealPlan/updateDailyLog',
  async ({ date, calories_burned }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.put(`/logs/daily/${date}`, {
        log_date: date,
        calories_burned: calories_burned,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const burnCalory = createAsyncThunk(
  'mealPlan/burnCalory',
  async ({ date, mealDishId }, { rejectWithValue, getState }) => {
    try {
      // Find dishId and mealId from mealDishId
      const state = getState();
      const mealPlan = state.mealPlan?.data?.mealPlan || [];
      const dayPlan = mealPlan.find(d => d.log_date === date);

      let dishId = null;
      let mealId = null;

      if (dayPlan) {
        for (const meal of dayPlan.meals || []) {
          const foundDish = meal.meal_dishes?.find(d => d.id === mealDishId);
          if (foundDish) {
            dishId = foundDish.dish_id;
            mealId = meal.id;
            break;
          }
        }
      }

      if (!dishId || !mealId) {
        return rejectWithValue('Could not find dish or meal');
      }

      const data = await ApiClient.post(
        `/logs/daily/${date}/meal-dishes/${mealDishId}/toggle-burned
       `,
      );
      return { ...data, requestParams: { date, mealDishId } };
    } catch (error) {
      console.error('burnCalory error:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
