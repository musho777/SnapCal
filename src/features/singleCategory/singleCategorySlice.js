import { createSlice } from '@reduxjs/toolkit';
import { getDataByCategory } from './singleCategoryAction';

const initialState = {
  loading: {
    category: true,
  },
  data: {
    category: {},
  },
};

const singleCategory = createSlice({
  name: 'singleCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataByCategory.pending, state => {
        state.loading.category = true;
      })
      .addCase(getDataByCategory.fulfilled, (state, { payload }) => {
        state.loading.category = false;
        state.data.category = payload;
      })
      .addCase(getDataByCategory.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = singleCategory.actions;

export const selectDataByCategoryLoading = state =>
  state?.singleCategory?.loading.category;
export const selectDataByCategoryData = state =>
  state?.singleCategory?.data?.category;

export default singleCategory.reducer;
