import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { apiRequest, ApiError, type AuthSession, type AuthUser } from '@/auth/api';
import { clearStoredSession, readStoredSession, writeStoredSession } from '@/auth/storage';

type Credentials = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signUp: (input: Credentials & { name: string }) => Promise<void>;
  logIn: (input: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function restore() {
      const stored = await readStoredSession();
      if (!stored) {
        if (active) setReady(true);
        return;
      }

      try {
        const result = await apiRequest<{ user: AuthUser }>('/auth/me', { token: stored.token });
        if (active) setSession({ token: stored.token, user: result.user });
      } catch (error) {
        if (error instanceof ApiError && error.code === 'invalid') {
          await clearStoredSession();
        } else if (active) {
          setSession(stored);
        }
      } finally {
        if (active) setReady(true);
      }
    }

    void restore();

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      ready,
      signUp: async (input) => {
        const next = await apiRequest<AuthSession>('/auth/signup', {
          method: 'POST',
          body: input,
        });
        await writeStoredSession(next);
        setSession(next);
      },
      logIn: async (input) => {
        const next = await apiRequest<AuthSession>('/auth/login', {
          method: 'POST',
          body: input,
        });
        await writeStoredSession(next);
        setSession(next);
      },
      logOut: async () => {
        await clearStoredSession();
        setSession(null);
      },
    }),
    [ready, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return value;
}
