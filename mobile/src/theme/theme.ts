import type { Locale } from '@/domain/types';
import { alpha, mix, palette, paletteTokens } from '@/theme/palette';

const white = '#FFFFFF';
const black = '#000000';

export function createTheme(locale: Locale) {
  const arabic = locale === 'ar';

  return {
    palette,
    paletteTokens,
    colors: {
      background: palette.background,
      canvas: mix(palette.background, palette.primaryGreen, 0.08),
      surface: mix(palette.background, white, 0.72),
      text: palette.textDark,
      muted: palette.neutralGray,
      primary: palette.primaryGreen,
      teal: palette.lightTeal,
      accent: palette.accentOrange,
      highlight: palette.accentYellow,
      white,
      black,
      onPrimary: white,
      onHighlight: palette.textDark,
      primarySoft: alpha(palette.primaryGreen, 0.12),
      tealSoft: alpha(palette.lightTeal, 0.18),
      accentSoft: alpha(palette.accentOrange, 0.14),
      highlightSoft: alpha(palette.accentYellow, 0.34),
      line: alpha(palette.neutralGray, 0.22),
      shadow: alpha(palette.textDark, 0.08),
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    radius: {
      sm: 12,
      md: 16,
      lg: 22,
      xl: 28,
      pill: 999,
    },
    fonts: {
      regular: arabic ? 'Cairo_400Regular' : 'PlusJakartaSans_400Regular',
      medium: arabic ? 'Cairo_500Medium' : 'PlusJakartaSans_500Medium',
      semibold: arabic ? 'Cairo_600SemiBold' : 'PlusJakartaSans_600SemiBold',
      bold: arabic ? 'Cairo_700Bold' : 'PlusJakartaSans_700Bold',
      brand: 'PlusJakartaSans_700Bold',
      arabic: 'Cairo_700Bold',
    },
    writing: {
      direction: arabic ? ('rtl' as const) : ('ltr' as const),
      align: arabic ? ('right' as const) : ('left' as const),
    },
    shadow: {
      card: {
        shadowColor: palette.textDark,
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 3,
      },
    },
  };
}

export type Theme = ReturnType<typeof createTheme>;
