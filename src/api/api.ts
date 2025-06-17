import axios from 'axios';
import { config as appConfig } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/zustand/useAuthStore';

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  withCredentials: false,
});

const getAccessToken = async () => await AsyncStorage.getItem('token');
const getRefreshToken = async () => await AsyncStorage.getItem('refreshToken');
const getAnonId = async () => await AsyncStorage.getItem('anonId');

const generateUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : Math.floor(r * 0.3) + 8;
    return v.toString(16);
  });
};

const ensureAnonId = async () => {
  let anonId = await getAnonId();
  if (!anonId) {
    anonId = generateUniqueId();
    await AsyncStorage.setItem('anonId', anonId);
  }
  return anonId;
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.get(
      `${appConfig.apiUrl}/auth/refresh-token?refreshToken=${refreshToken}`
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    await AsyncStorage.setItem('token', accessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  } catch (error) {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    useAuthStore.getState().clear();
    throw error;
  }
};

api.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    const anonId = await ensureAnonId();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers['x-anon-id'] = anonId;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
