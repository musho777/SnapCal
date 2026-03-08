import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exploreReducer from '../features/explore/exploreSlice';
import mealPlanReducer from '../features/mealPlan/mealPlanSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishList: exploreReducer,
    mealPlan: mealPlanReducer,
    user: userReducer,
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
