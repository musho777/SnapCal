import { createSlice } from '@reduxjs/toolkit';
import { analyzeFoodFromImage, askFoodQuestion } from './foodScanAction';

const initialState = {
  loading: {
    analyze: false,
    question: false,
  },
  data: {
    currentScan: null,
    scanHistory: [],
    questionAnswer: null,
  },
  error: null,
  currentImage: null,
};

const foodScanSlice = createSlice({
  name: 'foodScan',
  initialState,
  reducers: {
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload;
      state.data.currentScan = null;
      state.error = null;
    },
    clearCurrentScan: state => {
      state.data.currentScan = null;
      state.currentImage = null;
      state.error = null;
    },
    addToScanHistory: (state, action) => {
      state.data.scanHistory.unshift({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 20 scans
      if (state.data.scanHistory.length > 20) {
        state.data.scanHistory.pop();
      }
    },
    clearScanHistory: state => {
      state.data.scanHistory = [];
    },
    clearQuestionAnswer: state => {
      state.data.questionAnswer = null;
    },
  },
  extraReducers: builder => {
    builder
      // Analyze food image
      .addCase(analyzeFoodFromImage.pending, state => {
        state.loading.analyze = true;
        state.error = null;
      })
      .addCase(analyzeFoodFromImage.fulfilled, (state, { payload }) => {
        state.loading.analyze = false;
        state.data.currentScan = payload;
        state.error = null;
      })
      .addCase(analyzeFoodFromImage.rejected, (state, { payload }) => {
        state.loading.analyze = false;
        state.error = payload;
      })

      // Ask question about food
      .addCase(askFoodQuestion.pending, state => {
        state.loading.question = true;
        state.error = null;
      })
      .addCase(askFoodQuestion.fulfilled, (state, { payload }) => {
        state.loading.question = false;
        state.data.questionAnswer = payload;
        state.error = null;
      })
      .addCase(askFoodQuestion.rejected, (state, { payload }) => {
        state.loading.question = false;
        state.error = payload;
      });
  },
});

export const {
  setCurrentImage,
  clearCurrentScan,
  addToScanHistory,
  clearScanHistory,
  clearQuestionAnswer,
} = foodScanSlice.actions;

// Selectors
export const selectAnalyzeLoading = state => state?.foodScan?.loading?.analyze;
export const selectQuestionLoading = state => state?.foodScan?.loading?.question;
export const selectCurrentScan = state => state?.foodScan?.data?.currentScan;
export const selectScanHistory = state => state?.foodScan?.data?.scanHistory;
export const selectCurrentImage = state => state?.foodScan?.currentImage;
export const selectQuestionAnswer = state => state?.foodScan?.data?.questionAnswer;
export const selectError = state => state?.foodScan?.error;

export default foodScanSlice.reducer;
