import { createSlice } from '@reduxjs/toolkit';
import { getDataByCategory } from './singleCategoryAction';

const initialState = {
  loading: {
    category: true,
    loadingMore: false,
  },
  data: {
    category: {
      dishes: [],
      total: 0,
      limit: 50,
      offset: 0,
    },
  },
  hasMore: true,
};

const singleCategory = createSlice({
  name: 'singleCategory',
  initialState,
  reducers: {
    resetCategoryData: state => {
      state.data.category = {
        dishes: [],
        total: 0,
        limit: 50,
        offset: 0,
      };
      state.hasMore = true;
      state.loading.category = true;
      state.loading.loadingMore = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDataByCategory.pending, (state, { meta }) => {
        const isLoadingMore = meta.arg.offset > 0;
        if (isLoadingMore) {
          state.loading.loadingMore = true;
        } else {
          state.loading.category = true;
        }
      })
      .addCase(getDataByCategory.fulfilled, (state, { payload, meta }) => {
        const isLoadingMore = meta.arg.offset > 0;
        state.loading.category = false;
        state.loading.loadingMore = false;

        if (isLoadingMore) {
          // Append data for pagination
          state.data.category.dishes = [
            ...state.data.category.dishes,
            ...payload.dishes,
          ];
        } else {
          // Replace data for initial load or new search
          state.data.category.dishes = payload.dishes;
        }

        state.data.category.total = payload.total;
        state.data.category.limit = payload.limit;
        state.data.category.offset = payload.offset;

        // Check if there's more data to load
        const currentItemsCount = isLoadingMore
          ? state.data.category.dishes.length
          : payload.dishes.length;
        state.hasMore = currentItemsCount < payload.total;
      })
      .addCase(getDataByCategory.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.loading.loadingMore = false;
        state.error = payload;
      });
  },
});
export const { resetCategoryData } = singleCategory.actions;

export const selectDataByCategoryLoading = state =>
  state?.singleCategory?.loading.category;
export const selectDataByCategoryLoadingMore = state =>
  state?.singleCategory?.loading.loadingMore;
export const selectDataByCategoryData = state =>
  state?.singleCategory?.data?.category;
export const selectDataByCategoryHasMore = state =>
  state?.singleCategory?.hasMore;

export default singleCategory.reducer;
