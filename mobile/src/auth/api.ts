import Constants from 'expo-constants';
import { Platform } from 'react-native';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  cityId: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export class ApiError extends Error {
  code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

export function apiBaseUrl() {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];

  if (Platform.OS === 'android' && (!host || host === 'localhost' || host === '127.0.0.1')) {
    return 'http://10.0.2.2:3000/api';
  }

  return `http://${host ?? 'localhost'}:3000/api`;
}

export async function apiRequest<T>(
  path: string,
  options?: { method?: string; body?: unknown; token?: string },
) {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl()}${path}`, {
      method: options?.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError('network');
  }

  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new ApiError(payload.error ?? 'invalid');
  }

  return payload as T;
}
