import { createSlice } from '@reduxjs/toolkit';
import { userLogin, updateUserMeasurements } from './authActions';

const initialState = {
  user: null,
  login: false,
  loginLoading: false,
  error: null,
  otp: null,
  measurementsLoading: false,
  measurementsError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loginLoading = true;
        state.login = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {})
      .addCase(userLogin.rejected, (state, { payload }) => {})
      .addCase(updateUserMeasurements.pending, state => {
        state.measurementsLoading = true;
        state.measurementsError = null;
      })
      .addCase(updateUserMeasurements.fulfilled, (state, { payload }) => {
        state.measurementsLoading = false;
        state.user = payload;
        state.measurementsError = null;
      })
      .addCase(updateUserMeasurements.rejected, (state, { payload }) => {
        state.measurementsLoading = false;
        state.measurementsError = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = authSlice.actions;

export default authSlice.reducer;
