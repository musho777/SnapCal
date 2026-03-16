import { createSlice } from '@reduxjs/toolkit';
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  markAllNotificationsRead,
  clearAllNotifications,
  getPreferences,
  updatePreference,
} from './notificationsAction';

const initialState = {
  loading: {
    notifications: true,
    loadingMore: false,
    refreshing: false,
    preferences: false,
  },
  data: {
    notifications: {},
    preferences: [],
  },
  error: {},
  deletedNotifications: {},
  previousUnreadNotifications: [],
  previousAllNotifications: [],
  previousPreferenceStates: {},
  hasMore: true,
  currentOffset: 0,
  currentFilter: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationsData: state => {
      // Clear data immediately when filter changes
      state.data.notifications = {};
      state.currentOffset = 0;
      state.hasMore = true;
    },
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNotifications.pending, (state, action) => {
        const isRefreshing = action.meta.arg?.refresh;
        const isLoadingMore = action.meta.arg?.offset > 0;

        if (isRefreshing) {
          state.loading.refreshing = true;
        } else if (isLoadingMore) {
          state.loading.loadingMore = true;
        } else {
          state.loading.notifications = true;
        }
      })
      .addCase(getNotifications.fulfilled, (state, { payload, meta }) => {
        const isRefreshing = meta.arg?.refresh;
        const isLoadingMore = meta.arg?.offset > 0;
        const requestFilter = meta.arg?.filter;

        // Check if this response matches the current filter (prevent race conditions)
        const filterMatches =
          JSON.stringify(requestFilter) === JSON.stringify(state.currentFilter);

        state.loading.notifications = false;
        state.loading.loadingMore = false;
        state.loading.refreshing = false;

        // Only update data if the filter matches (prevents old responses from overwriting new data)
        if (filterMatches) {
          if (isRefreshing || !isLoadingMore) {
            // Initial load or refresh - replace data
            state.data.notifications = payload;
            state.currentOffset = payload.limit || 0;
          } else {
            // Load more - append data
            const existingNotifications =
              state.data.notifications?.notifications || [];
            state.data.notifications = {
              ...payload,
              notifications: [
                ...existingNotifications,
                ...payload.notifications,
              ],
            };
            state.currentOffset = meta.arg.offset + (payload.limit || 0);
          }

          // Check if there's more data to load
          const totalLoaded =
            state.data.notifications?.notifications?.length || 0;
          const total = payload.total || 0;
          state.hasMore = totalLoaded < total;
        }
      })
      .addCase(getNotifications.rejected, (state, { payload }) => {
        state.loading.notifications = false;
        state.loading.loadingMore = false;
        state.loading.refreshing = false;
        state.error = payload;
      })
      .addCase(markNotificationRead.pending, (state, action) => {
        // Optimistic update - immediately mark as read
        if (state.data.notifications?.notifications) {
          const notification = state.data.notifications.notifications.find(
            n => n.id === action.meta.arg,
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
            n => n.id === action.meta.arg,
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
            n => n.id === action.meta.arg,
          );
          if (index !== -1) {
            // Store the deleted notification temporarily in case we need to restore it
            const deletedNotification =
              state.data.notifications.notifications[index];
            state.deletedNotifications[action.meta.arg] = {
              notification: deletedNotification,
              index: index,
            };
            // Remove from array
            state.data.notifications.notifications.splice(index, 1);
            // Decrease total count
            if (state.data.notifications.total > 0) {
              state.data.notifications.total -= 1;
            }
            // Decrease unread count if it was unread
            if (
              !deletedNotification.read &&
              state.data.notifications.unread_count > 0
            ) {
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
            deletedData.notification,
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
      .addCase(markAllNotificationsRead.pending, state => {
        // Optimistic update - immediately mark all as read
        if (state.data.notifications?.notifications) {
          // Store unread notifications IDs in case we need to revert
          state.previousUnreadNotifications =
            state.data.notifications.notifications
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
      .addCase(markAllNotificationsRead.fulfilled, state => {
        // Success - clear the backup
        state.previousUnreadNotifications = [];
      })
      .addCase(markAllNotificationsRead.rejected, state => {
        // Revert if API call fails
        if (
          state.data.notifications?.notifications &&
          state.previousUnreadNotifications.length > 0
        ) {
          // Restore unread status for previously unread notifications
          state.data.notifications.notifications.forEach(notification => {
            if (state.previousUnreadNotifications.includes(notification.id)) {
              notification.read = false;
            }
          });

          // Restore unread count
          state.data.notifications.unread_count =
            state.previousUnreadNotifications.length;

          // Clear the backup
          state.previousUnreadNotifications = [];
        }
      })
      .addCase(clearAllNotifications.pending, state => {
        // Optimistic update - immediately clear all notifications
        if (state.data.notifications?.notifications) {
          // Store all notifications in case we need to revert
          state.previousAllNotifications = [
            ...state.data.notifications.notifications,
          ];

          // Clear all notifications
          state.data.notifications.notifications = [];

          // Set counts to 0
          state.data.notifications.total = 0;
          state.data.notifications.unread_count = 0;
        }
      })
      .addCase(clearAllNotifications.fulfilled, state => {
        // Success - clear the backup
        state.previousAllNotifications = [];
      })
      .addCase(clearAllNotifications.rejected, state => {
        // Revert if API call fails
        if (state.previousAllNotifications.length > 0) {
          // Restore all notifications
          state.data.notifications.notifications =
            state.previousAllNotifications;

          // Restore counts
          state.data.notifications.total =
            state.previousAllNotifications.length;
          state.data.notifications.unread_count =
            state.previousAllNotifications.filter(n => !n.read).length;

          // Clear the backup
          state.previousAllNotifications = [];
        }
      })
      .addCase(getPreferences.pending, state => {
        state.loading.preferences = true;
      })
      .addCase(getPreferences.fulfilled, (state, { payload }) => {
        state.loading.preferences = false;
        state.data.preferences = payload;
      })
      .addCase(getPreferences.rejected, state => {
        state.loading.preferences = false;
      })
      .addCase(updatePreference.pending, (state, action) => {
        // Optimistic update - immediately update the preference
        const { id, is_enabled } = action.meta.arg;
        const preferences = state.data.preferences;

        if (preferences && Array.isArray(preferences)) {
          const preference = preferences.find(p => p.id === id);
          if (preference) {
            // Store the previous state in case we need to revert
            state.previousPreferenceStates[id] = preference.is_enabled;
            // Update immediately
            preference.is_enabled = is_enabled;
          }
        }
      })
      .addCase(updatePreference.fulfilled, (state, action) => {
        // Success - clear the backup for this preference
        const { id } = action.meta.arg;
        delete state.previousPreferenceStates[id];
      })
      .addCase(updatePreference.rejected, (state, action) => {
        // Revert if API call fails
        const { id } = action.meta.arg;
        const preferences = state.data.preferences;
        const previousState = state.previousPreferenceStates[id];

        if (
          preferences &&
          Array.isArray(preferences) &&
          previousState !== undefined
        ) {
          const preference = preferences.find(p => p.id === id);
          if (preference) {
            // Restore the previous state
            preference.is_enabled = previousState;
          }
          // Clear the backup
          delete state.previousPreferenceStates[id];
        }
      });
  },
});
export const { clearNotificationsData, setCurrentFilter } =
  notificationsSlice.actions;

export const selectLoading = state =>
  state?.notifications?.loading.notifications;
export const selectLoadingMore = state =>
  state?.notifications?.loading.loadingMore;
export const selectRefreshing = state =>
  state?.notifications?.loading.refreshing;
export const selectHasMore = state => state?.notifications?.hasMore;
export const selectCurrentOffset = state => state?.notifications?.currentOffset;
export const selectData = state => state?.notifications?.data?.notifications;

export const selectPreference = state =>
  state?.notifications?.data?.preferences || [];

export const selectLoadingPreference = state =>
  state?.notifications?.loading?.preferences;

export default notificationsSlice.reducer;
