import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueryString } from '../../utils/commonUtils';
import ApiClient from '../../api/axiosClient';

export const getNotifications = createAsyncThunk(
  'get/notifications',
  async (params, { rejectWithValue }) => {
    const queries = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/notifications?${queries}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  'put/markNotificationRead',
  async (id, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch(`/notifications/${id}/read`);
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
