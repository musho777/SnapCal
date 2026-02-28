import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { navigate } from './navigationService';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from './TokenService';
import { getSelectedCompany } from '../utils/companyStorage';

import { config } from '../../config';

let logoutInitiated = false;

class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiError extends AppError {
  status;

  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Function to get the current base URL
const getBaseURL = async () => {
  try {
    const company = await getSelectedCompany();
    if (company && company.url) {
      return company.url.endsWith('/') ? company.url : `${company.url}/`;
    }
  } catch (error) {
    console.warn('Failed to get selected company, using default URL:', error);
  }

  // Fallback to default config
  return process.env.NODE_ENV === 'development'
    ? config.APP_BASE_URL_LOCAL
    : config.APP_BASE_URL_SERVER;
};

const client = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.request.use(
  async requestConfig => {
    // Set baseURL dynamically
    if (!requestConfig.baseURL) {
      requestConfig.baseURL = await getBaseURL();
    }

    // Add authorization token
    const accessToken = await getAccessToken();
    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null;
    const message = error.response ? error.response.data?.message : null;
    const originalRequest = error.config;
    if (status === 401) {
      if (message === 'Unauthorized' && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await getRefreshToken();
          if (!refreshToken) {
            throw new ApiError('No refresh token available', 401);
          }
          const currentBaseURL = await getBaseURL();
          const response = await axios.post(
            `${currentBaseURL}auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );
          const { accessToken } = response.data;
          await setAccessToken(accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return client(originalRequest);
        } catch (err) {
          await removeAccessToken();
          await removeRefreshToken();
          navigate('login');
          throw new ApiError('Failed to refresh access token', 401);
        }
      } else {
        if (!logoutInitiated) {
          logoutInitiated = true;
          await removeAccessToken();
          await removeRefreshToken();
          navigate('login');
        }
        throw new ApiError(message || 'Authentication error', status);
      }
    } else if (status === 404) {
      throw new ApiError(message || 'Resource not found', 404);
    } else if (status === 500) {
      throw new ApiError(message || 'Internal Server Error', 500);
    } else {
      throw new ApiError(
        message || 'An unexpected error occurred',
        status || 500,
      );
    }
  },
);

// Helper function for requests
const request = async (options, customClient = null) => {
  const axiosInstance = customClient || client;
  try {
    const response = await axiosInstance(options);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      throw new Error(`${status}: ${data?.error?.text || 'Unknown Error'}`);
    }
    throw error;
  }
};

// GET request
const get = async (url, options = {}, customClient = null) => {
  return request(
    {
      method: 'GET',
      url,
      ...options,
    },
    customClient,
  );
};

// POST request
const post = async (
  url,
  data,
  headers = {},
  options = {},
  customClient = null,
) => {
  const requestHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };

  return request(
    {
      method: 'POST',
      url,
      data,
      headers: requestHeaders,
      ...options,
    },
    customClient,
  );
};

// PATCH request
const patch = async (
  url,
  data,
  headers = {},
  options = {},
  customClient = null,
) => {
  const requestHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };

  return request(
    {
      method: 'PATCH',
      url,
      data,
      headers: requestHeaders,
      ...options,
    },
    customClient,
  );
};

// PUT request
const put = async (url, data, options = {}, customClient = null) => {
  return request(
    {
      method: 'PUT',
      url,
      data,
      ...options,
    },
    customClient,
  );
};

// DELETE request
const del = async (url, options = {}, customClient = null) => {
  return request(
    {
      method: 'DELETE',
      url,
      ...options,
    },
    customClient,
  );
};

const ApiClient = {
  ApiError,
  get,
  post,
  patch,
  put,
  del,
};

export default ApiClient;
