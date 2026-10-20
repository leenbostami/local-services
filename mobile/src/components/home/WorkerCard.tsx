import { Text, View } from 'react-native';

import { AppPressable } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { StatusPill } from '@/components/ui/StatusPill';
import { areaById } from '@/domain/catalog';
import { formatCount, formatRating } from '@/domain/format';
import { localize, type Worker } from '@/domain/types';
import { yearsLabel } from '@/i18n/copy';
import { useLocale } from '@/i18n/LocaleProvider';
import { paletteTokens } from '@/theme/palette';
import { useTheme } from '@/theme/ThemeProvider';

export function WorkerCard({
  worker,
  index,
  onPress,
}: {
  worker: Worker;
  index: number;
  onPress?: () => void;
}) {
  const { colors, fonts, radius, spacing, shadow } = useTheme();
  const { locale, copy } = useLocale();
  const area = areaById(worker.areaId);
  const accent = colors[avatarTone(index)];
  const onAccent = accent === colors.highlight ? colors.onHighlight : colors.onPrimary;

  return (
    <AppPressable
      onPress={onPress}
      style={{
        width: 210,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        gap: spacing.sm,
        ...shadow.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: onAccent, fontFamily: fonts.bold, fontSize: 16 }}>
            {localize(worker.name, locale).slice(0, 1)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: colors.text, fontFamily: fonts.semibold, fontSize: 14 }}
            numberOfLines={1}
          >
            {localize(worker.name, locale)}
          </Text>
          <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 12 }}>
            {area ? localize(area.name, locale) : ''}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Icon name="star" color={colors.highlight} size={14} />
        <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontSize: 13 }}>
          {formatRating(worker.rating, locale)}
        </Text>
        <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 12 }}>
          ({formatCount(worker.jobsCompleted, locale)})
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontFamily: fonts.medium, fontSize: 12 }}>
          {yearsLabel(locale, formatCount(worker.years, locale))}
        </Text>
        {worker.verified ? <StatusPill status="verified" label={copy.verified} /> : null}
      </View>
    </AppPressable>
  );
}

function avatarTone(index: number) {
  const tones = ['primary', 'teal', 'accent', 'highlight'] as const;
  const tokenIndex = index % paletteTokens.length;
  return tones[tokenIndex % tones.length];
}
