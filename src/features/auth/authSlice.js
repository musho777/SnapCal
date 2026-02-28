import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

const initialState = {
  user: null,
  login: false,
  loginLoading: false,
  error: null,
  otp: null,
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
      .addCase(userLogin.rejected, (state, { payload }) => {});
  },
});
export const { resetOtp, resetLogin, setResetError } = authSlice.actions;

export default authSlice.reducer;
