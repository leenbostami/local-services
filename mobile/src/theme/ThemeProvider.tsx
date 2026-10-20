import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { useLocale } from '@/i18n/LocaleProvider';
import { createTheme, type Theme } from '@/theme/theme';

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const theme = useMemo(() => createTheme(locale), [locale]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return theme;
}
