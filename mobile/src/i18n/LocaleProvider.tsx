import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Locale } from '@/domain/types';
import { copyFor, type Copy } from '@/i18n/copy';

type LocaleContextValue = {
  locale: Locale;
  isRTL: boolean;
  copy: Copy;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const value = useMemo(
    () => ({
      locale,
      isRTL: locale === 'ar',
      copy: copyFor(locale),
      setLocale,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return value;
}
