import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { AppPressable } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { formatDuration, formatMoney, formatRating } from '@/domain/format';
import { localize, type Service } from '@/domain/types';
import { fromPrice } from '@/i18n/copy';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

export function FeaturedService({ service, onPress }: { service: Service; onPress: () => void }) {
  const { colors, fonts, radius, spacing, shadow, writing } = useTheme();
  const { locale, isRTL } = useLocale();

  return (
    <AppPressable onPress={onPress} style={{ borderRadius: radius.xl, ...shadow.card }}>
      <LinearGradient
        colors={[colors.primary, colors.teal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: radius.xl, padding: spacing.xl, minHeight: 210, overflow: 'hidden' }}
      >
        <View
          style={{
            position: 'absolute',
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: colors.white,
            opacity: 0.12,
            top: -48,
            right: -28,
          }}
        />
        <Text style={{ color: colors.highlight, fontFamily: fonts.semibold, fontSize: 13 }}>
          {localize(service.category, locale)}
        </Text>
        <Text
          style={{
            color: colors.onPrimary,
            fontFamily: fonts.bold,
            fontSize: 28,
            lineHeight: 34,
            marginTop: spacing.sm,
            textAlign: writing.align,
          }}
        >
          {localize(service.name, locale)}
        </Text>
        <Text
          style={{
            color: colors.onPrimary,
            fontFamily: fonts.regular,
            fontSize: 15,
            lineHeight: 22,
            marginTop: spacing.sm,
            maxWidth: 240,
            opacity: 0.92,
          }}
        >
          {localize(service.summary, locale)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: spacing.xl,
          }}
        >
          <View>
            <Text style={{ color: colors.onPrimary, fontFamily: fonts.semibold, fontSize: 14 }}>
              {fromPrice(locale, formatMoney(service.priceFrom, locale))}
            </Text>
            <Text
              style={{
                color: colors.onPrimary,
                fontFamily: fonts.regular,
                fontSize: 13,
                marginTop: 2,
                opacity: 0.9,
              }}
            >
              {formatDuration(service.durationMinutes, locale)} ·{' '}
              {formatRating(service.rating, locale)}
            </Text>
          </View>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="arrow" color={colors.primary} size={20} mirrored={isRTL} />
          </View>
        </View>
      </LinearGradient>
    </AppPressable>
  );
}
