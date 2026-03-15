import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueryString } from '../../utils/commonUtils';
import ApiClient from '../../api/axiosClient';

const buildFilterParams = filter => {
  const params = {};

  if (filter?.value) {
    params.type = filter.value;
  }

  if (filter?.label === 'Unread') {
    params.unread = true;
  }

  return params;
};

export const getNotifications = createAsyncThunk(
  'get/notifications',
  async (params, { rejectWithValue }) => {
    const { filter, ...otherParams } = params || {};

    const filterParams = filter ? buildFilterParams(filter) : {};
    const allParams = { ...otherParams, ...filterParams };
    console.log(allParams);

    const queries = buildQueryString(allParams);
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

export const deleteNotification = createAsyncThunk(
  'delete/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      const data = await ApiClient.del(`/notifications/${id}`);
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const markAllNotificationsRead = createAsyncThunk(
  'put/markAllNotificationsRead',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch('/notifications/read-all');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const clearAllNotifications = createAsyncThunk(
  'delete/clearAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.del('/notifications');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
