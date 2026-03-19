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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import NotificationService from '../../services/notificationService/notificationService';

const FCM_TOKEN_STORAGE_KEY = 'last_sent_fcm_token';

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
  'get/user',
  async (_, { rejectWithValue }) => {
    try {
      const user = await ApiClient.get('/users/profile');
      await AsyncStorage.setItem('user', JSON.stringify(user));
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

export const updateUserMeasurements = createAsyncThunk(
  'auth/updateMeasurements',
  async ({ weight_kg, height_cm }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/users/measurements', {
        weight_kg,
        height_cm,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const sendFCMToken = createAsyncThunk(
  'auth/sendFCMToken',
  async ({ fcmToken }, { rejectWithValue }) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return { skipped: true, reason: 'not_authenticated', token: fcmToken };
      }

      const lastSentToken = await AsyncStorage.getItem(FCM_TOKEN_STORAGE_KEY);

      if (lastSentToken === fcmToken) {
        return { skipped: true, reason: 'token_unchanged', token: fcmToken };
      }

      const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';

      const data = await ApiClient.post('/settings/fcm-token', {
        fcm_token: fcmToken,
        device_type: deviceType,
      });

      await AsyncStorage.setItem(FCM_TOKEN_STORAGE_KEY, fcmToken);

      return { ...data, token: fcmToken };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteFCMToken = createAsyncThunk(
  'auth/deleteFCMToken',
  async (_, { rejectWithValue }) => {
    try {
      const lastSentToken = await AsyncStorage.getItem(FCM_TOKEN_STORAGE_KEY);

      if (!lastSentToken) {
        return { skipped: true };
      }
      await ApiClient.del('/settings/fcm-token');

      await AsyncStorage.removeItem(FCM_TOKEN_STORAGE_KEY);

      return { success: true };
    } catch (error) {
      await AsyncStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createGuestUser = createAsyncThunk(
  'auth/creteGuest',
  async (data, { rejectWithValue }) => {
    try {
      const fcmToken = await NotificationService.getToken();
      const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
      console.log(fcmToken, deviceType);
      const response = await ApiClient.post('/auth/guest/session', {
        date_of_birth: '2001-09-03',
        height_cm: data.height,
        current_weight_kg: data.weight,
        gender: data.gender,
        goal: data.goal,
        activity_level: data.activity,
        target_weight_kg: 0,
        target_calories: data.calorieGoal,
        target_protein_g: 0,
        target_carbs_g: 0,
        target_fats_g: 0,
        diet_tag_ids: [data.diet],
        measurement_system: 'metric',
        fcm_token: fcmToken || '',
        fcm_device_type: deviceType,
      });
      if (response.access_token) {
        await setAccessToken(response.access_token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
