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
