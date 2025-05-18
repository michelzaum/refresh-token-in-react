import axios from 'axios';

import { storageKeys } from '@/config/storageKeys';
import { AuthService } from './AuthService';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(storageKeys.refreshToken);

    if (originalRequest.url === '/refresh-token') {
      localStorage.clear();
      return Promise.reject(error);
    }

    if ((error.response && error.response.status !== 401) || !refreshToken) {
      return Promise.reject(error);
    }

    const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

    return httpClient(originalRequest);
  },
);
