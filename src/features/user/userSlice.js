import { createSlice } from '@reduxjs/toolkit';
import { getUserMeasurement } from './userAction';

const initialState = {
  login: {
    measurement: true,
  },
  data: {
    measurement: [],
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
        state.login.measurement = true;
      })
      .addCase(getUserMeasurement.fulfilled, (state, { payload }) => {
        state.login.measurement = false;
        state.data.measurement = payload;
      })
      .addCase(getUserMeasurement.rejected, (state, { payload }) => {
        state.login.measurement = false;
      });
  },
});
export const { toggleBurnedDishOptimistic, revertBurnedDishOptimistic } =
  userSlice.actions;

export const selectLoading = state => state?.user?.login.measurement;
export const selectUserMeasurement = state => state?.user?.data?.measurement;

export default userSlice.reducer;
