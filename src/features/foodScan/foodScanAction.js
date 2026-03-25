import { createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeFoodImage, askAboutFood } from '../../services/claudeService';

/**
 * Analyze food image using Claude AI
 */
export const analyzeFoodFromImage = createAsyncThunk(
  'foodScan/analyze',
  async ({ base64Image, mediaType }, { rejectWithValue }) => {
    try {
      const result = await analyzeFoodImage(base64Image, mediaType);
      if (result.error) {
        return rejectWithValue(result.message);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to analyze food image');
    }
  },
);

/**
 * Ask a custom question about the food image
 */
export const askFoodQuestion = createAsyncThunk(
  'foodScan/askQuestion',
  async ({ base64Image, question, mediaType }, { rejectWithValue }) => {
    try {
      const response = await askAboutFood(base64Image, question, mediaType);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get answer');
    }
  },
);
