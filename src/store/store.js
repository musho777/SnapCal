import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exploreReducer from '../features/explore/exploreSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishList: exploreReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});
