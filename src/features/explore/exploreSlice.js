import { createSlice } from '@reduxjs/toolkit';
import { getDeash } from './exploreAction';

const initialState = {
  login: false,
  data: {},
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDeash.pending, state => {
        state.login = false;
      })
      .addCase(getDeash.fulfilled, (state, { payload }) => {
        state.login = true;
        state.data = payload;
      })
      .addCase(getDeash.rejected, (state, { payload }) => {
        state.login = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = exploreSlice.actions;

export const selectLoading = state => state?.dishList?.login;
export const selectData = state => state?.dishList?.data;

export default exploreSlice.reducer;
