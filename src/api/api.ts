import axios from 'axios';
import { config as appConfig } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  withCredentials: false,
});

const getAccessToken = async () => await AsyncStorage.getItem('token');
const getRefreshToken = async () => await AsyncStorage.getItem('refreshToken');
const getAnonId = async () => await AsyncStorage.getItem('anonId');

api.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
