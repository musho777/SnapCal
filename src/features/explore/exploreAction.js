import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';
import { buildQueryString } from '../../utils/commonUtils';

export const getDeash = createAsyncThunk(
  'get/deash',
  async (params, { rejectWithValue }) => {
    const queries = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/dishes?${queries}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getSingleDeash = createAsyncThunk(
  'get/single/deash',
  async (params, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`/dishes/${params.id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addDishToMeal = createAsyncThunk(
  'add/dish/to/meal',
  async (params, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/meals/add-dish', params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
