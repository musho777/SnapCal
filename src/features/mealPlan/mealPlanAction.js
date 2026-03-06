import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';

export const getMainPlanRange = createAsyncThunk(
  'get/daily',
  async (params, { rejectWithValue }) => {
    const query = Object.entries(params);
    try {
      const data = await ApiClient.get(
        `/logs/range?start_date=2026-03-05&end_date=2026-03-06`,
      );
      console.log(data, 'data');
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
