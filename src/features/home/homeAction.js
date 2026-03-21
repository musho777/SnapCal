import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';
import { buildQueryString } from '../../utils/commonUtils';

export const getCategoryForHome = createAsyncThunk(
  'get/categoryForHome',
  async (params, { rejectWithValue }) => {
    const queries = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/dishes/categories?${queries}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getDishesRecommended = createAsyncThunk(
  'get/recommended',
  async (params, { rejectWithValue }) => {
    const queries = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/dishes/recommended?${queries}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
