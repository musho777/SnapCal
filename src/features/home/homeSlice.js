import { createSlice } from '@reduxjs/toolkit';
import { getCategoryForHome, getDishesRecommended } from './homeAction';

const initialState = {
  loading: {
    category: true,
    recommended: true,
  },
  data: {
    category: [],
    recommended: [],
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
        state.loading.category = false;
        state.data.category = payload.categories;
      })
      .addCase(getCategoryForHome.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.error = payload;
      })
      .addCase(getDishesRecommended.pending, state => {
        state.loading.recommended = true;
      })
      .addCase(getDishesRecommended.fulfilled, (state, { payload }) => {
        state.loading.recommended = false;
        console.log(payload);
        state.data.recommended = payload.dishes;
      })
      .addCase(getDishesRecommended.rejected, (state, { payload }) => {
        state.loading.recommended = false;
        state.error = payload;
      });
  },
});
export const { resetOtp, resetLogin, setResetError } = homeSlice.actions;

export const selectCategoryLoading = state => state?.home?.loading.category;
export const selectCategoryData = state => state?.home?.data?.category;

export const selectedRecommendedLoading = state =>
  state?.home?.loading.recommended;
export const selectedRecommendedData = state => state?.home?.data.recommended;

export default homeSlice.reducer;
