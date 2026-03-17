import { createSlice } from '@reduxjs/toolkit';
import { getMyDishes, getUserMeasurement } from './userAction';

const initialState = {
  loading: {
    measurement: true,
    myDishes: true,
  },
  data: {
    measurement: [],
    myDishes: [],
  },
  error: {},
};

const userSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserMeasurement.pending, state => {
        state.loading.measurement = true;
      })
      .addCase(getUserMeasurement.fulfilled, (state, { payload }) => {
        state.loading.measurement = false;
        state.data.measurement = payload;
      })
      .addCase(getUserMeasurement.rejected, (state, { payload }) => {
        state.loading.measurement = false;
      })
      .addCase(getMyDishes.pending, state => {
        state.loading.myDishes = true;
      })
      .addCase(getMyDishes.fulfilled, (state, { payload }) => {
        state.loading.myDishes = false;
        state.data.myDishes = payload;
      })
      .addCase(getMyDishes.rejected, (state, { payload }) => {
        state.loading.myDishes = false;
      });
  },
});
export const { toggleBurnedDishOptimistic, revertBurnedDishOptimistic } =
  userSlice.actions;

export const selectLoading = state => state?.user?.loading.measurement;
export const selectUserMeasurement = state => state?.user?.data?.measurement;

export const selectMyDishesLoading = state => state?.user?.loading.myDishes;
export const selectMyDishes = state => state?.user?.data.myDishes;

export default userSlice.reducer;
