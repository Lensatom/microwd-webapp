import axios, { AxiosError } from 'axios';
import { ApiRes } from './interfaces';
import { getToken } from './services';
import { SERVER_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiRes>) => {
    const errorMsg = error.response?.data.message ?? 'An error occurred';
    console.log({ type: 'error', text1: errorMsg, position: 'bottom' })
    // Toast.show({ type: 'error', text1: errorMsg, position: 'bottom' });

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export function tokenInterceptor(isServer = false) {
  const interceptor = api.interceptors.request.use(
    async (config) => {
      const token = await getToken(isServer);
      console.log('token:', token);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return () => {
    api.interceptors.request.eject(interceptor);
  };
}