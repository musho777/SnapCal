import { createSlice } from '@reduxjs/toolkit';
import { getDeash, getSingleDeash } from './exploreAction';

const initialState = {
  login: {
    explore: true,
    single: false,
  },
  data: {
    explore: {},
    single: {},
  },
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDeash.pending, state => {
        state.login.explore = true;
      })
      .addCase(getDeash.fulfilled, (state, { payload }) => {
        state.login.explore = false;
        state.data.explore = payload;
      })
      .addCase(getDeash.rejected, (state, { payload }) => {
        state.login.explore = false;
        state.error = payload;
      })

      .addCase(getSingleDeash.pending, state => {
        state.login.single = true;
      })
      .addCase(getSingleDeash.fulfilled, (state, { payload }) => {
        state.login.single = false;
        state.data.single = payload;
      })
      .addCase(getSingleDeash.rejected, (state, { payload }) => {
        state.login.single = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = exploreSlice.actions;

export const selectLoading = state => state?.dishList?.login.explore;
export const selectData = state => state?.dishList?.data?.explore;
export const selectSingleLoading = state => state?.dishList?.login.single;
export const selectSingleData = state => state?.dishList?.data?.single;

export default exploreSlice.reducer;
