import axios, { AxiosError } from 'axios';
import { ApiRes } from './interfaces';
import { getToken } from './services';
import { SERVER_BASE_URL } from './constants';

const TRANSIENT_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

export const isUnauthorizedError = (error: unknown): boolean => {
  return axios.isAxiosError(error) && error.response?.status === 401;
};

export const isTransientApiError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  const statusCode = error.response?.status;
  if (statusCode && TRANSIENT_STATUS_CODES.has(statusCode)) {
    return true;
  }

  // No response means the request did not reach the API or timed out.
  if (!error.response) {
    return true;
  }

  return error.code === 'ECONNABORTED';
};

export const getAdaptiveRetryDelay = (attemptIndex: number): number => {
  const baseDelayMs = 1000;
  const maxDelayMs = 15000;
  return Math.min(baseDelayMs * 2 ** attemptIndex, maxDelayMs);
};

export const api = axios.create({
  baseURL: `${SERVER_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    // Bypass ngrok browser interstitial for XHR/fetch
    'ngrok-skip-browser-warning': 'true',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiRes>) => {
    const errorMsg = error.response?.data.message ?? error ?? 'An error occurred';
    console.log({ type: 'error', text: errorMsg })

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