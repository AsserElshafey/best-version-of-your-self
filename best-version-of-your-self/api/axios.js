import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Simple localStorage token utilities
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';

// Create axios instances
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Track if refresh is in progress
let isRefreshing = false;
let failedQueue = [];

// Process failed queue
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add token to requests automatically
axiosPrivate.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle token refresh on 401 errors
axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If 401 error and not already retrying
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosPrivate(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        
        if (!refreshToken) {
          // No refresh token, clear everything and redirect
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          localStorage.removeItem(USER_ID_KEY);
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Try to get a new token
        const response = await axiosPublic.post('/auth/refresh', {
          refreshToken: refreshToken
        });
        
        if (response.data?.accessToken) {
          // Store new token
          localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
          
          // Store new refresh token if provided
          if (response.data.refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
          }
          
          // Update auth header for this and future requests
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          
          // Process queued requests
          processQueue(null, response.data.accessToken);
          
          // Retry original request
          return axiosPrivate(originalRequest);
        } else {
          // Refresh token invalid or expired
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh request failed
        processQueue(refreshError);
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    
    // Handle 403 Forbidden errors
    if (error?.response?.status === 403) {
      clearAuth();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Utility function to clear all auth data
export const clearAuth = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

// Utility to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Simple function to store auth data
export const storeAuth = (data) => {
  if (data.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  }
  
  if (data.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  
  if (data.userId) {
    localStorage.setItem(USER_ID_KEY, data.userId);
  }
  
  return true;
};