import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: {
    saveList: true,
  },
  data: {
    saveList: {
      saveList: [],
      total: 0,
      limit: 50,
      offset: 0,
    },
  },
};

const savedDishesSlice = createSlice({
  name: 'savedDishesSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder;
  },
});

export default savedDishesSlice.reducer;
