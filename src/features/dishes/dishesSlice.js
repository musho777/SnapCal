import { createSlice } from '@reduxjs/toolkit';
import { createDish } from './dishesActions';

const initialState = {
  dishes: [],
  createdDish: null,
  loading: false,
  error: null,
  success: false,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    resetDishState: state => {
      state.createdDish = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearDishError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createDish.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDish.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.createdDish = payload;
        state.success = true;
        state.error = null;
        // Optionally add to dishes array
        state.dishes.push(payload);
      })
      .addCase(createDish.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export const { resetDishState, clearDishError } = dishesSlice.actions;

export default dishesSlice.reducer;
