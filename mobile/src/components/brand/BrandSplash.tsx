import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';

import { brandAssets } from '@/brand/assets';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

export function BrandSplash({ onFinish }: { onFinish: () => void }) {
  const { colors, fonts, spacing } = useTheme();
  const { copy } = useLocale();
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(onFinish, 1700);
    return () => clearTimeout(timer);
  }, [onFinish, opacity]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
      }}
    >
      <Animated.View style={{ alignItems: 'center', gap: spacing.md, opacity }}>
        <Image
          source={brandAssets.mark}
          style={{ width: 240, height: 64 }}
          contentFit="contain"
          accessibilityLabel="Homey"
        />
        <Text style={{ color: colors.primary, fontFamily: fonts.arabic, fontSize: 28 }}>هومي</Text>
        <Text
          style={{
            color: colors.muted,
            fontFamily: fonts.medium,
            fontSize: 15,
            textAlign: 'center',
          }}
        >
          {copy.tagline}
        </Text>
      </Animated.View>
    </View>
  );
}
