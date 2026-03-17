import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';
import { buildQueryString } from '../../utils/commonUtils';

export const getDataByCategory = createAsyncThunk(
  'get/byCategory',
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

export const getAllCategories = createAsyncThunk(
  'get/allCategories',
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
