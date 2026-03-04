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
