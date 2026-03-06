import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getDeash = createAsyncThunk(
  'get/deash',
  async (params, { rejectWithValue }) => {
    const query = Object.entries(params);
    try {
      const data = await ApiClient.get(`/dishes?${query}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getSingleDeash = createAsyncThunk(
  'get/single/deash',
  async (params, { rejectWithValue }) => {
    console.log('Fetching single dish with params:', params);
    try {
      const data = await ApiClient.get(`/dishes/${params.id}`);
      console.log('Single Dish Data:', data);
      return data;
    } catch (error) {
      console.log('Error fetching single dish:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addDishToMeal = createAsyncThunk(
  'add/dish/to/meal',
  async (params, { rejectWithValue }) => {
    console.log('Adding dish to meal with params:', params);
    try {
      const data = await ApiClient.post('/meals/add-dish', params);
      console.log('Dish added to meal successfully:', data);
      return data;
    } catch (error) {
      console.log('Error adding dish to meal:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
