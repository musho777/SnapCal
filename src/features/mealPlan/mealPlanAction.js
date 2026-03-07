import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getMainPlanRange = createAsyncThunk(
  'get/daily',
  async ({ start_date, end_date }, { rejectWithValue }) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayPlus7 = new Date(yesterday);
    yesterdayPlus7.setDate(yesterday.getDate() + 7);
    const defaultStart = new Date(yesterday.setHours(0, 0, 0, 0))
      .toISOString()
      .split('T')[0];
    const defaultEnd = new Date(yesterdayPlus7.setHours(23, 59, 59, 999))
      .toISOString()
      .split('T')[0];
    const finalStart = start_date || defaultStart;
    const finalEnd = end_date || defaultEnd;
    try {
      const data = await ApiClient.get(
        `/logs/range?start_date=${finalStart}&end_date=${finalEnd}`,
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

export const burnCalory = createAsyncThunk(
  'mealPlan/burnCalory',
  async ({ date, dishId, mealId }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(
        `/logs/daily/${date}/meals/${mealId}/burned-dishes/${dishId}`,
      );
      return { ...data, requestParams: { date, dishId, mealId } };
    } catch (error) {
      console.error('burnCalory error:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
