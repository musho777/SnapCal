import { createSlice } from '@reduxjs/toolkit';
import {
  getMainPlanRange,
  deleteMealDish,
  updateDailyLog,
} from './mealPlanAction';

const initialState = {
  login: {
    mealPlan: true,
  },
  data: {
    mealPlan: [],
  },
  error: {},
};

const mealPlanSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMainPlanRange.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(getMainPlanRange.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        state.data.mealPlan = payload;
      })
      .addCase(getMainPlanRange.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      })
      .addCase(deleteMealDish.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(deleteMealDish.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        const { mealDishId } = payload;

        // Remove the deleted dish from the meal plan
        state.data.mealPlan = state.data.mealPlan.map(dayPlan => ({
          ...dayPlan,
          meals: dayPlan.meals.map(meal => ({
            ...meal,
            meal_dishes: meal.meal_dishes.filter(
              dish => dish.id !== mealDishId,
            ),
          })),
        }));
      })
      .addCase(deleteMealDish.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      })
      .addCase(updateDailyLog.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(updateDailyLog.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        // Optionally update the state with the response data if needed
      })
      .addCase(updateDailyLog.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      });
  },
});
export const {} = mealPlanSlice.actions;

export const selectLoading = state => state?.mealPlan?.login.mealPlan;
export const selectMainPlan = state => state?.mealPlan?.data?.mealPlan;

export default mealPlanSlice.reducer;
