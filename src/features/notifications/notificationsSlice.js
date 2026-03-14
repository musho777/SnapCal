import { createSlice } from '@reduxjs/toolkit';
import { getNotifications } from './notificationsAction';

const initialState = {
  loading: {
    notifications: true,
  },
  data: {
    notifications: {},
  },
  error: {},
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNotifications.pending, state => {
        state.loading.notifications = true;
      })
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.loading.notifications = false;
        state.data.notifications = payload;
      })
      .addCase(getNotifications.rejected, (state, { payload }) => {
        state.loading.notifications = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } =
  notificationsSlice.actions;

export const selectLoading = state =>
  state?.notifications?.loading.notifications;
export const selectData = state => state?.notifications?.data?.notifications;

export default notificationsSlice.reducer;
