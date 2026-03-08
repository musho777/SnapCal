import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getUserMeasurement = createAsyncThunk(
  'get/getUserMeasurement',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/users/measurements');
      console.log(data);
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
