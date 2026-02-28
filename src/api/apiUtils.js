import Clipboard from '@react-native-clipboard/clipboard';

export const handleApiRequest = async (
  apiRequestFn,
  thunkAPI,
  showNotification = false,
) => {
  try {
    const response = await apiRequestFn();
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || 'An error occurred';

    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const handleApiError = (error, thunkAPI) => {
  if (error?.response?.data?.message) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  } else {
    return thunkAPI.rejectWithValue(error?.message || 'An error occurred');
  }
};

export const handleApiResponse = async (response, errorMessage = null) => {
  if (response.status !== 'ok') {
    const message =
      errorMessage || response?.error?.text || 'An error occurred';

    throw new Error(message);
  }

  return response.data;
};

export const copyToClipboard = textToCopy => {
  Clipboard.setString(textToCopy);
};
