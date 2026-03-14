import { createSlice } from '@reduxjs/toolkit';
import { getNotifications, markNotificationRead } from './notificationsAction';

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
      })
      .addCase(markNotificationRead.pending, (state, action) => {
        // Optimistic update - immediately mark as read
        if (state.data.notifications?.notifications) {
          const notification = state.data.notifications.notifications.find(
            n => n.id === action.meta.arg
          );
          if (notification) {
            notification.read = true;
            // Decrease unread count
            if (state.data.notifications.unread_count > 0) {
              state.data.notifications.unread_count -= 1;
            }
          }
        }
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        // Revert if API call fails
        if (state.data.notifications?.notifications) {
          const notification = state.data.notifications.notifications.find(
            n => n.id === action.meta.arg
          );
          if (notification) {
            notification.read = false;
            // Restore unread count
            state.data.notifications.unread_count += 1;
          }
        }
      });
  },
});
export const { resetOtp, resetLogin, setResetError } =
  notificationsSlice.actions;

export const selectLoading = state =>
  state?.notifications?.loading.notifications;
export const selectData = state => state?.notifications?.data?.notifications;

export default notificationsSlice.reducer;
