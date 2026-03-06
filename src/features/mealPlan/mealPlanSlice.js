import { createSlice } from '@reduxjs/toolkit';
import { getMainPlanRange } from './mealPlanAction';

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
      });
  },
});
export const {} = mealPlanSlice.actions;

export const selectLoading = state => state?.mealPlan?.login.mealPlan;
export const selectMainPlan = state => state?.mealPlan?.data?.mealPlan;

export default mealPlanSlice.reducer;
