import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const saveDish = createAsyncThunk(
  'save/saveDish',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(`/dishes/${id}/save`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const unSaveDish = createAsyncThunk(
  'unsave/unSaveDish',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.del(`/dishes/${id}/save`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getSavedDishes = createAsyncThunk(
  'get/getSavedDishes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { offset = 0, limit = 10 } = params;
      const data = await ApiClient.get('/dishes/saved/list', {
        params: { offset, limit },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
