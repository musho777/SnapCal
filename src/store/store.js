import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exploreReducer from '../features/explore/exploreSlice';
import mealPlanReducer from '../features/mealPlan/mealPlanSlice';
import userReducer from '../features/user/userSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import homeReducer from '../features/home/homeSlice';
import singleCategoryReducer from '../features/singleCategory/singleCategorySlice';
import savedDishesReducer from '../features/savedDishes/savedDishesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishList: exploreReducer,
    mealPlan: mealPlanReducer,
    user: userReducer,
    notifications: notificationsReducer,
    home: homeReducer,
    singleCategory: singleCategoryReducer,
    savedDishes: savedDishesReducer,
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
