import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueryString } from '../../utils/commonUtils';
import ApiClient from '../../api/axiosClient';

export const getNotifications = createAsyncThunk(
  'get/notifications',
  async (params, { rejectWithValue }) => {
    const queries = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/notifications?${queries}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
