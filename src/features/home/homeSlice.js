import { createSlice } from '@reduxjs/toolkit';
import { getCategoryForHome } from './homeAction';

const initialState = {
  loading: {
    category: true,
  },
  data: {
    category: [],
  },
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryForHome.pending, state => {
        state.loading.category = true;
      })
      .addCase(getCategoryForHome.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading.category = false;
        state.data.category = payload.categories;
      })
      .addCase(getCategoryForHome.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = homeSlice.actions;

export const selectCategoryLoading = state => state?.home?.loading.category;
export const selectCategoryData = state => state?.home?.data?.category;

export default homeSlice.reducer;
