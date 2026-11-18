import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

import { brandAssets } from '@/brand/assets';
import { AppPressable } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';

type AuthFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  alternateHref: '/login' | '/signup';
  alternatePrompt: string;
  alternateLabel: string;
  error?: string;
  submitting?: boolean;
  onSubmit: () => void;
  children: ReactNode;
};

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  alternateHref,
  alternatePrompt,
  alternateLabel,
  error,
  submitting = false,
  onSubmit,
  children,
}: AuthFormProps) {
  const { colors, fonts, radius, spacing, writing } = useTheme();
  const { copy } = useLocale();
  const router = useRouter();
  const goHome = () => router.dismissTo('/');

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.xxl,
            gap: spacing.lg,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.home}
            onPress={goHome}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: writing.align === 'right' ? 'flex-end' : 'flex-start',
              gap: spacing.sm,
            }}
          >
            <Image
              source={brandAssets.mark}
              style={{ width: 132, height: 36 }}
              contentFit="contain"
              accessibilityLabel="Homey"
            />
            <Text style={{ color: colors.primary, fontFamily: fonts.arabic, fontSize: 22 }}>
              هومي
            </Text>
          </Pressable>
          <View style={{ gap: spacing.xs }}>
            <Text
              style={{
                color: colors.text,
                fontFamily: fonts.bold,
                fontSize: 30,
                textAlign: writing.align,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontFamily: fonts.regular,
                fontSize: 15,
                lineHeight: 22,
                textAlign: writing.align,
              }}
            >
              {subtitle}
            </Text>
          </View>
          <View style={{ gap: spacing.md }}>{children}</View>
          {error ? (
            <Text
              style={{
                color: colors.accent,
                fontFamily: fonts.medium,
                fontSize: 14,
                textAlign: writing.align,
              }}
            >
              {error}
            </Text>
          ) : null}
          <AppPressable
            disabled={submitting}
            onPress={onSubmit}
            style={{
              backgroundColor: colors.primary,
              borderRadius: radius.pill,
              minHeight: 54,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold, fontSize: 16 }}>
              {submitting ? '...' : submitLabel}
            </Text>
          </AppPressable>
          <Text
            style={{
              color: colors.muted,
              fontFamily: fonts.regular,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {alternatePrompt}{' '}
            <Link
              href={alternateHref}
              style={{ color: colors.primary, fontFamily: fonts.semibold }}
            >
              {alternateLabel}
            </Link>
          </Text>
          <Pressable accessibilityRole="link" onPress={goHome} style={{ alignItems: 'center' }}>
            <Text style={{ color: colors.primary, fontFamily: fonts.semibold, fontSize: 14 }}>
              {copy.backHome}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
