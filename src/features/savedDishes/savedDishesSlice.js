import { createSlice } from '@reduxjs/toolkit';
import { getSavedDishes, unSaveDish } from './savedDishesAction';

const initialState = {
  loading: {
    savedDishes: true,
    savedDishesLoadingMore: false,
  },
  data: {
    savedDishes: {
      dishes: [],
      total: 0,
      limit: 10,
      offset: 0,
    },
  },
  hasMoreSavedDishes: true,
  error: {},
};

const savedDishesSlice = createSlice({
  name: 'savedDishesSlice',
  initialState,
  reducers: {
    resetSavedDishesData: state => {
      state.data.savedDishes = {
        dishes: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      state.hasMoreSavedDishes = true;
      state.loading.savedDishes = true;
      state.loading.savedDishesLoadingMore = false;
    },
    removeSavedDishOptimistic: (state, { payload }) => {
      state.data.savedDishes.dishes = state.data.savedDishes.dishes.filter(
        dish => dish.id !== payload.id,
      );
      state.data.savedDishes.total = Math.max(
        0,
        state.data.savedDishes.total - 1,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSavedDishes.pending, (state, { meta }) => {
        const isLoadingMore = meta.arg?.offset > 0;
        if (isLoadingMore) {
          state.loading.savedDishesLoadingMore = true;
        } else {
          state.loading.savedDishes = true;
        }
      })
      .addCase(getSavedDishes.fulfilled, (state, { payload, meta }) => {
        const isLoadingMore = meta.arg?.offset > 0;
        state.loading.savedDishes = false;
        state.loading.savedDishesLoadingMore = false;

        if (isLoadingMore) {
          // Append data for pagination
          state.data.savedDishes.dishes = [
            ...state.data.savedDishes.dishes,
            ...payload.dishes,
          ];
        } else {
          // Replace data for initial load
          state.data.savedDishes.dishes = payload.dishes;
        }

        state.data.savedDishes.total = payload.total;
        state.data.savedDishes.limit = payload.limit;
        state.data.savedDishes.offset = payload.offset;

        // Check if there's more data to load
        const currentItemsCount = state.data.savedDishes.dishes.length;
        state.hasMoreSavedDishes = currentItemsCount < payload.total;
      })
      .addCase(getSavedDishes.rejected, (state, { payload }) => {
        state.loading.savedDishes = false;
        state.loading.savedDishesLoadingMore = false;
        state.error.savedDishes = payload;
      })
      .addCase(unSaveDish.fulfilled, (state, { meta }) => {
        const dishId = meta.arg?.id;
        if (dishId) {
          state.data.savedDishes.dishes = state.data.savedDishes.dishes.filter(
            dish => dish.id !== dishId,
          );
          state.data.savedDishes.total = Math.max(
            0,
            state.data.savedDishes.total - 1,
          );
        }
      });
  },
});

export const { resetSavedDishesData, removeSavedDishOptimistic } =
  savedDishesSlice.actions;

export const selectSavedDishesLoading = state =>
  state?.savedDishes?.loading.savedDishes;
export const selectSavedDishesLoadingMore = state =>
  state?.savedDishes?.loading.savedDishesLoadingMore;
export const selectSavedDishes = state => state?.savedDishes?.data.savedDishes;
export const selectSavedDishesHasMore = state =>
  state?.savedDishes?.hasMoreSavedDishes;

export default savedDishesSlice.reducer;
