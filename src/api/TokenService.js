import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: ACCESS_TOKEN_KEY,
    });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

export const setAccessToken = async accessToken => {
  try {
    await Keychain.setGenericPassword('token', accessToken, {
      service: ACCESS_TOKEN_KEY,
    });
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

export const removeAccessToken = async () => {
  try {
    await Keychain.resetGenericPassword({ service: ACCESS_TOKEN_KEY });
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: REFRESH_TOKEN_KEY,
    });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const setRefreshToken = async refreshToken => {
  try {
    await Keychain.setGenericPassword('token', refreshToken, {
      service: REFRESH_TOKEN_KEY,
    });
  } catch (error) {
    console.error('Error saving refresh token:', error);
  }
};

export const removeRefreshToken = async () => {
  try {
    await Keychain.resetGenericPassword({ service: REFRESH_TOKEN_KEY });
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};
