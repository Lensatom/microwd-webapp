import { ACCESS_TOKEN_KEY, SERVER_BASE_URL } from './constants';

export const storeToken = async (token: string) => {
  await fetch('/api/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
}

export const getToken = async (isServer = false) => {
  if (isServer) {
    const cookieStore = await require('next/headers').cookies();
    const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    return token;
  }

  const res = await fetch('/api/auth/token');
  if (!res.ok) throw new Error('Failed to fetch token');
  const data = await res.json();
  return data.token;
}