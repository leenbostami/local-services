import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import type { AuthSession } from '@/auth/api';

const key = 'homey.session';

export async function readStoredSession() {
  const raw = Platform.OS === 'web' ? readWeb() : await SecureStore.getItemAsync(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function writeStoredSession(session: AuthSession) {
  const raw = JSON.stringify(session);
  if (Platform.OS === 'web') {
    writeWeb(raw);
    return;
  }

  await SecureStore.setItemAsync(key, raw);
}

export async function clearStoredSession() {
  if (Platform.OS === 'web') {
    writeWeb(null);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

function readWeb() {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return localStorage.getItem(key);
}

function writeWeb(value: string | null) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  if (value === null) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, value);
}
