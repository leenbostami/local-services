import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { brandAssets } from '@/brand/assets';
import { Icon } from '@/components/ui/Icon';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

export function AppHeader() {
  const router = useRouter();
  const { colors, fonts, spacing } = useTheme();
  const { copy, isRTL } = useLocale();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        paddingBottom: spacing.md,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copy.home}
        onPress={() => router.dismissTo('/')}
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 }}
      >
        <Image
          source={brandAssets.mark}
          style={{ width: 132, height: 36 }}
          contentFit="contain"
          accessibilityLabel="Homey"
        />
        <Text style={{ color: colors.primary, fontFamily: fonts.arabic, fontSize: 22 }}>هومي</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copy.notifications}
        onPress={() => router.push('/messages')}
        style={({ pressed }) => ({
          width: 42,
          height: 42,
          borderRadius: 21,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface,
          opacity: pressed ? 0.75 : 1,
        })}
      >
        <Icon name="bell" color={colors.text} size={20} mirrored={isRTL} />
      </Pressable>
    </View>
  );
}

export function StackHeader({ title }: { title: string }) {
  const router = useRouter();
  const { colors, fonts, spacing, writing } = useTheme();
  const { copy, isRTL } = useLocale();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.md,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copy.back}
        hitSlop={8}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
            return;
          }

          router.replace('/');
        }}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface,
          opacity: pressed ? 0.75 : 1,
        })}
      >
        <Icon name="arrow" color={colors.text} size={18} mirrored={!isRTL} />
      </Pressable>
      <Text
        style={{
          flex: 1,
          color: colors.text,
          fontFamily: fonts.bold,
          fontSize: 20,
          textAlign: writing.align,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
