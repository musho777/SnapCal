import { createSlice } from '@reduxjs/toolkit';
import { getNotifications, markNotificationRead, deleteNotification, markAllNotificationsRead, clearAllNotifications } from './notificationsAction';

const initialState = {
  loading: {
    notifications: true,
  },
  data: {
    notifications: {},
  },
  error: {},
  deletedNotifications: {},
  previousUnreadNotifications: [],
  previousAllNotifications: [],
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
      })
      .addCase(deleteNotification.pending, (state, action) => {
        // Optimistic delete - immediately remove from list
        if (state.data.notifications?.notifications) {
          const index = state.data.notifications.notifications.findIndex(
            n => n.id === action.meta.arg
          );
          if (index !== -1) {
            // Store the deleted notification temporarily in case we need to restore it
            const deletedNotification = state.data.notifications.notifications[index];
            state.deletedNotifications[action.meta.arg] = {
              notification: deletedNotification,
              index: index
            };
            // Remove from array
            state.data.notifications.notifications.splice(index, 1);
            // Decrease total count
            if (state.data.notifications.total > 0) {
              state.data.notifications.total -= 1;
            }
            // Decrease unread count if it was unread
            if (!deletedNotification.read && state.data.notifications.unread_count > 0) {
              state.data.notifications.unread_count -= 1;
            }
          }
        }
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        // Delete successful - remove from temporary storage
        delete state.deletedNotifications[action.meta.arg];
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        // Revert if API call fails - restore the notification
        const deletedData = state.deletedNotifications[action.meta.arg];
        if (deletedData && state.data.notifications?.notifications) {
          // Restore notification at its original position
          state.data.notifications.notifications.splice(
            deletedData.index,
            0,
            deletedData.notification
          );
          // Restore total count
          state.data.notifications.total += 1;
          // Restore unread count if it was unread
          if (!deletedData.notification.read) {
            state.data.notifications.unread_count += 1;
          }
          // Remove from temporary storage
          delete state.deletedNotifications[action.meta.arg];
        }
      })
      .addCase(markAllNotificationsRead.pending, (state) => {
        // Optimistic update - immediately mark all as read
        if (state.data.notifications?.notifications) {
          // Store unread notifications IDs in case we need to revert
          state.previousUnreadNotifications = state.data.notifications.notifications
            .filter(n => !n.read)
            .map(n => n.id);

          // Mark all as read
          state.data.notifications.notifications.forEach(notification => {
            notification.read = true;
          });

          // Set unread count to 0
          state.data.notifications.unread_count = 0;
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        // Success - clear the backup
        state.previousUnreadNotifications = [];
      })
      .addCase(markAllNotificationsRead.rejected, (state) => {
        // Revert if API call fails
        if (state.data.notifications?.notifications && state.previousUnreadNotifications.length > 0) {
          // Restore unread status for previously unread notifications
          state.data.notifications.notifications.forEach(notification => {
            if (state.previousUnreadNotifications.includes(notification.id)) {
              notification.read = false;
            }
          });

          // Restore unread count
          state.data.notifications.unread_count = state.previousUnreadNotifications.length;

          // Clear the backup
          state.previousUnreadNotifications = [];
        }
      })
      .addCase(clearAllNotifications.pending, (state) => {
        // Optimistic update - immediately clear all notifications
        if (state.data.notifications?.notifications) {
          // Store all notifications in case we need to revert
          state.previousAllNotifications = [...state.data.notifications.notifications];

          // Clear all notifications
          state.data.notifications.notifications = [];

          // Set counts to 0
          state.data.notifications.total = 0;
          state.data.notifications.unread_count = 0;
        }
      })
      .addCase(clearAllNotifications.fulfilled, (state) => {
        // Success - clear the backup
        state.previousAllNotifications = [];
      })
      .addCase(clearAllNotifications.rejected, (state) => {
        // Revert if API call fails
        if (state.previousAllNotifications.length > 0) {
          // Restore all notifications
          state.data.notifications.notifications = state.previousAllNotifications;

          // Restore counts
          state.data.notifications.total = state.previousAllNotifications.length;
          state.data.notifications.unread_count = state.previousAllNotifications.filter(n => !n.read).length;

          // Clear the backup
          state.previousAllNotifications = [];
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
