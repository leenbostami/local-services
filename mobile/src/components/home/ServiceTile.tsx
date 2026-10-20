import { Text, View } from 'react-native';

import { AppPressable } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { formatMoney } from '@/domain/format';
import { localize, type Service } from '@/domain/types';
import { fromPrice } from '@/i18n/copy';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

const tileSoft = {
  broom: 'primarySoft',
  sparkle: 'tealSoft',
  shirt: 'accentSoft',
  home: 'primarySoft',
  clock: 'highlightSoft',
  box: 'tealSoft',
} as const;

const tileColor = {
  broom: 'primary',
  sparkle: 'teal',
  shirt: 'accent',
  home: 'primary',
  clock: 'onHighlight',
  box: 'teal',
} as const;

export function ServiceTile({ service, onPress }: { service: Service; onPress: () => void }) {
  const { colors, fonts, spacing } = useTheme();
  const { locale } = useLocale();
  const iconColor = colors[tileColor[service.icon]];

  return (
    <AppPressable onPress={onPress} style={{ width: '25%', alignItems: 'center', gap: spacing.sm }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[tileSoft[service.icon]],
        }}
      >
        <Icon name={service.icon} color={iconColor} size={26} />
      </View>
      <Text
        numberOfLines={2}
        style={{
          color: colors.text,
          fontFamily: fonts.medium,
          fontSize: 12,
          lineHeight: 16,
          textAlign: 'center',
        }}
      >
        {localize(service.name, locale)}
      </Text>
      <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 11 }}>
        {fromPrice(locale, formatMoney(service.priceFrom, locale))}
      </Text>
    </AppPressable>
  );
}
