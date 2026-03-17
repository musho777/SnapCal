import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getUserMeasurement = createAsyncThunk(
  'get/getUserMeasurement',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/users/measurements');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getMyDishes = createAsyncThunk(
  'get/getMyDishes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/dishes/my');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
