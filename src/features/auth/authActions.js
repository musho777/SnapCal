import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../api/TokenService';
import ApiClient from '../../api/axiosClient';

export const loadTokens = createAsyncThunk('auth/loadTokens', async () => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  return { accessToken, refreshToken };
});

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/login', {
        email,
        password,
      });
      if (data.access_token && data.refresh_token) {
        await setAccessToken(data.access_token);
        await setRefreshToken(data.refresh_token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await ApiClient.post('/auth/log-out', {});
      await removeAccessToken();
      await removeRefreshToken();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  'get/contact',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await ApiClient.get('/users/me');
      return user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
