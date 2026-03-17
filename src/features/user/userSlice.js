import { createSlice } from '@reduxjs/toolkit';
import { getMyDishes, getUserMeasurement } from './userAction';
import { addSavedDishHandlers } from '../savedDishes/savedDishesHelpers';

const initialState = {
  loading: {
    measurement: true,
    myDishes: true,
    myDishesLoadingMore: false,
  },
  data: {
    measurement: [],
    myDishes: {
      dishes: [],
      total: 0,
      limit: 10,
      offset: 0,
    },
  },
  hasMoreMyDishes: true,
  error: {},
};

const userSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    resetMyDishesData: state => {
      state.data.myDishes = {
        dishes: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      state.hasMoreMyDishes = true;
      state.loading.myDishes = true;
      state.loading.myDishesLoadingMore = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserMeasurement.pending, state => {
        state.loading.measurement = true;
      })
      .addCase(getUserMeasurement.fulfilled, (state, { payload }) => {
        state.loading.measurement = false;
        state.data.measurement = payload;
      })
      .addCase(getUserMeasurement.rejected, (state, { payload }) => {
        state.loading.measurement = false;
      })
      .addCase(getMyDishes.pending, (state, { meta }) => {
        const isLoadingMore = meta.arg?.offset > 0;
        if (isLoadingMore) {
          state.loading.myDishesLoadingMore = true;
        } else {
          state.loading.myDishes = true;
        }
      })
      .addCase(getMyDishes.fulfilled, (state, { payload, meta }) => {
        const isLoadingMore = meta.arg?.offset > 0;
        state.loading.myDishes = false;
        state.loading.myDishesLoadingMore = false;

        if (isLoadingMore) {
          // Append data for pagination
          state.data.myDishes.dishes = [
            ...state.data.myDishes.dishes,
            ...payload.dishes,
          ];
        } else {
          // Replace data for initial load
          state.data.myDishes.dishes = payload.dishes;
        }

        state.data.myDishes.total = payload.total;
        state.data.myDishes.limit = payload.limit;
        state.data.myDishes.offset = payload.offset;

        // Check if there's more data to load
        const currentItemsCount = state.data.myDishes.dishes.length;
        state.hasMoreMyDishes = currentItemsCount < payload.total;
      })
      .addCase(getMyDishes.rejected, (state, { payload }) => {
        state.loading.myDishes = false;
        state.loading.myDishesLoadingMore = false;
      });

    addSavedDishHandlers(builder, state => state.data.myDishes.dishes);
  },
});
export const {
  toggleBurnedDishOptimistic,
  revertBurnedDishOptimistic,
  resetMyDishesData,
} = userSlice.actions;

export const selectLoading = state => state?.user?.loading.measurement;
export const selectUserMeasurement = state => state?.user?.data?.measurement;

export const selectMyDishesLoading = state => state?.user?.loading.myDishes;
export const selectMyDishesLoadingMore = state =>
  state?.user?.loading.myDishesLoadingMore;
export const selectMyDishes = state => state?.user?.data.myDishes;
export const selectMyDishesHasMore = state => state?.user?.hasMoreMyDishes;

export default userSlice.reducer;
