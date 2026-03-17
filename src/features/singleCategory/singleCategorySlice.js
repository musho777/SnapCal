import { createSlice } from '@reduxjs/toolkit';
import { getDataByCategory, getAllCategories } from './singleCategoryAction';

const initialState = {
  loading: {
    category: true,
    loadingMore: false,
    allCategories: true,
    allCategoriesLoadingMore: false,
  },
  data: {
    category: {
      dishes: [],
      total: 0,
      limit: 50,
      offset: 0,
    },
    allCategories: {
      categories: [],
      total: 0,
      limit: 20,
      offset: 0,
    },
  },
  hasMore: true,
  hasMoreCategories: true,
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
    resetAllCategoriesData: state => {
      state.data.allCategories = {
        categories: [],
        total: 0,
        limit: 20,
        offset: 0,
      };
      state.hasMoreCategories = true;
      state.loading.allCategories = true;
      state.loading.allCategoriesLoadingMore = false;
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
      })
      // All Categories
      .addCase(getAllCategories.pending, (state, { meta }) => {
        const isLoadingMore = meta.arg.offset > 0;
        if (isLoadingMore) {
          state.loading.allCategoriesLoadingMore = true;
        } else {
          state.loading.allCategories = true;
        }
      })
      .addCase(getAllCategories.fulfilled, (state, { payload, meta }) => {
        const isLoadingMore = meta.arg.offset > 0;
        state.loading.allCategories = false;
        state.loading.allCategoriesLoadingMore = false;

        if (isLoadingMore) {
          // Append data for pagination
          state.data.allCategories.categories = [
            ...state.data.allCategories.categories,
            ...payload.categories,
          ];
        } else {
          // Replace data for initial load
          state.data.allCategories.categories = payload.categories;
        }

        state.data.allCategories.total = payload.total || payload.categories.length;
        state.data.allCategories.limit = meta.arg.limit || 20;
        state.data.allCategories.offset = meta.arg.offset || 0;

        // Check if there's more data to load
        const currentItemsCount = state.data.allCategories.categories.length;
        const totalItems = payload.total || payload.categories.length;
        state.hasMoreCategories = currentItemsCount < totalItems;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.loading.allCategories = false;
        state.loading.allCategoriesLoadingMore = false;
        state.error = payload;
      });
  },
});
export const { resetCategoryData, resetAllCategoriesData } = singleCategory.actions;

export const selectDataByCategoryLoading = state =>
  state?.singleCategory?.loading.category;
export const selectDataByCategoryLoadingMore = state =>
  state?.singleCategory?.loading.loadingMore;
export const selectDataByCategoryData = state =>
  state?.singleCategory?.data?.category;
export const selectDataByCategoryHasMore = state =>
  state?.singleCategory?.hasMore;

export const selectAllCategoriesLoading = state =>
  state?.singleCategory?.loading.allCategories;
export const selectAllCategoriesLoadingMore = state =>
  state?.singleCategory?.loading.allCategoriesLoadingMore;
export const selectAllCategoriesData = state =>
  state?.singleCategory?.data?.allCategories;
export const selectAllCategoriesHasMore = state =>
  state?.singleCategory?.hasMoreCategories;

export default singleCategory.reducer;
