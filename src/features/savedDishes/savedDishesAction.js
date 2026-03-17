import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/axiosClient';
import { buildQueryString } from '../../utils/commonUtils';

export const saveDish = createAsyncThunk(
  'save/saveDish',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(`/dishes/${id}/save`);
      console.log(data);
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
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
