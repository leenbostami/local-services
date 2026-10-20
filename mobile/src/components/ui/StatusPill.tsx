import { Text, View } from 'react-native';

import type { BookingStatus } from '@/domain/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

const tones = {
  confirmed: 'primary',
  pending: 'highlight',
  issue: 'accent',
  verified: 'teal',
} as const;

type PillTone = keyof typeof tones;

export function StatusPill({
  status,
  label,
}: {
  status: BookingStatus | 'verified';
  label?: string;
}) {
  const { colors, fonts, radius } = useTheme();
  const { copy } = useLocale();
  const tone = tones[status as PillTone];
  const background = {
    primary: colors.primarySoft,
    highlight: colors.highlightSoft,
    accent: colors.accentSoft,
    teal: colors.tealSoft,
  }[tone];
  const textColor = {
    primary: colors.primary,
    highlight: colors.onHighlight,
    accent: colors.accent,
    teal: colors.primary,
  }[tone];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: background,
        borderRadius: radius.pill,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text style={{ color: textColor, fontFamily: fonts.semibold, fontSize: 12 }}>
        {label ?? copy[status]}
      </Text>
    </View>
  );
}
