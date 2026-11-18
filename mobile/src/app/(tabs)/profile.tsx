import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useAuth } from '@/auth/AuthProvider';
import { AppPressable, Chip } from '@/components/ui/Chip';
import { Screen, ScreenBody } from '@/components/ui/Screen';
import { cities, cityById } from '@/domain/catalog';
import { localize } from '@/domain/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProfileScreen() {
  const { locale, copy, setLocale } = useLocale();
  const { colors, fonts, radius, spacing, shadow, writing } = useTheme();
  const { cityId, setCityId, bookings } = useMarketplace();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const city = cityById(cityId);
  const workerCount = new Set(bookings.map((booking) => booking.workerId)).size;
  const name = user?.name ?? '';

  return (
    <Screen scroll>
      <ScreenBody>
        <Text
          style={{
            color: colors.text,
            fontFamily: fonts.bold,
            fontSize: 28,
            textAlign: writing.align,
          }}
        >
          {copy.profile}
        </Text>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.xl,
            gap: spacing.md,
            alignItems: 'center',
            ...shadow.card,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold, fontSize: 28 }}>
              {(user ? name : copy.guest).slice(0, 1)}
            </Text>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Text style={{ color: colors.text, fontFamily: fonts.bold, fontSize: 22 }}>
              {user ? name : copy.guest}
            </Text>
            {user ? (
              <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 14 }}>
                {user.email}
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.muted,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {copy.signInToBook}
              </Text>
            )}
            <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 14 }}>
              {city ? localize(city.name, locale) : ''} · {copy.jordan}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Stat label={copy.visits} value={String(bookings.length)} />
          <Stat label={copy.workers} value={String(workerCount)} />
        </View>

        {user ? (
          <AppPressable
            onPress={() => {
              void logOut();
            }}
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: colors.line,
              minHeight: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.accent, fontFamily: fonts.bold, fontSize: 16 }}>
              {copy.logOut}
            </Text>
          </AppPressable>
        ) : (
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <AppPressable
              onPress={() => router.push('/login')}
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: radius.pill,
                minHeight: 52,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold, fontSize: 16 }}>
                {copy.login}
              </Text>
            </AppPressable>
            <AppPressable
              onPress={() => router.push('/signup')}
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: colors.line,
                minHeight: 52,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.primary, fontFamily: fonts.bold, fontSize: 16 }}>
                {copy.signUp}
              </Text>
            </AppPressable>
          </View>
        )}

        <View style={{ gap: spacing.sm }}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fonts.bold,
              fontSize: 16,
              textAlign: writing.align,
            }}
          >
            {copy.yourHome}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {cities.map((item) => (
              <Chip
                key={item.id}
                label={localize(item.name, locale)}
                selected={item.id === cityId}
                onPress={() => setCityId(item.id)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fonts.bold,
              fontSize: 16,
              textAlign: writing.align,
            }}
          >
            {copy.language}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Chip label={copy.english} selected={locale === 'en'} onPress={() => setLocale('en')} />
            <Chip label={copy.arabic} selected={locale === 'ar'} onPress={() => setLocale('ar')} />
          </View>
        </View>
      </ScreenBody>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const { colors, fonts, radius, spacing, shadow } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        gap: 4,
        ...shadow.card,
      }}
    >
      <Text style={{ color: colors.primary, fontFamily: fonts.bold, fontSize: 24 }}>{value}</Text>
      <Text style={{ color: colors.muted, fontFamily: fonts.medium, fontSize: 13 }}>{label}</Text>
    </View>
  );
}
