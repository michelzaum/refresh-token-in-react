import { storageKeys } from '@/config/storageKeys';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(storageKeys.accessToken);

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
);
