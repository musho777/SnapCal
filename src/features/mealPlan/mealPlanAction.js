import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getMainPlanRange = createAsyncThunk(
  'get/daily',
  async (params, { rejectWithValue }) => {
    const query = Object.entries(params);
    try {
      const data = await ApiClient.get(
        `/logs/range?start_date=2026-03-05&end_date=2026-03-06`,
      );
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
      console.log(data);
      return data;
    } catch (error) {
      console.log(error, 'error');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
