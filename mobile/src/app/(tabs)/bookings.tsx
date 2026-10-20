import { useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

import { AppPressable } from '@/components/ui/Chip';
import { Screen, ScreenBody } from '@/components/ui/Screen';
import { StatusPill } from '@/components/ui/StatusPill';
import { areaById, serviceById, workerById } from '@/domain/catalog';
import { formatDay, formatMoney, formatTime } from '@/domain/format';
import { localize } from '@/domain/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function BookingsScreen() {
  const router = useRouter();
  const { locale, copy } = useLocale();
  const { colors, fonts, radius, spacing, shadow, writing } = useTheme();
  const { bookings, cancelBooking } = useMarketplace();

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
          {copy.bookings}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontFamily: fonts.regular,
            fontSize: 15,
            textAlign: writing.align,
          }}
        >
          {copy.upcoming}
        </Text>

        {bookings.length === 0 ? (
          <View style={{ gap: spacing.lg, paddingTop: spacing.xl }}>
            <Text
              style={{
                color: colors.muted,
                fontFamily: fonts.regular,
                fontSize: 16,
                textAlign: writing.align,
              }}
            >
              {copy.noBookings}
            </Text>
            <AppPressable
              onPress={() => router.push('/')}
              style={{
                backgroundColor: colors.primary,
                borderRadius: radius.pill,
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold, fontSize: 16 }}>
                {copy.bookAService}
              </Text>
            </AppPressable>
          </View>
        ) : (
          bookings.map((booking) => {
            const service = serviceById(booking.serviceId);
            const worker = workerById(booking.workerId);
            const area = areaById(booking.areaId);

            return (
              <View
                key={booking.id}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radius.lg,
                  padding: spacing.lg,
                  gap: spacing.sm,
                  ...shadow.card,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <StatusPill status={booking.status} />
                  <Text style={{ color: colors.primary, fontFamily: fonts.bold, fontSize: 14 }}>
                    {formatMoney(booking.price, locale)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: fonts.bold,
                    fontSize: 18,
                    textAlign: writing.align,
                  }}
                >
                  {service ? localize(service.name, locale) : booking.serviceId}
                </Text>
                <Text
                  style={{
                    color: colors.muted,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    textAlign: writing.align,
                  }}
                >
                  {worker ? localize(worker.name, locale) : ''} ·{' '}
                  {area ? localize(area.name, locale) : ''}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: fonts.medium,
                    fontSize: 14,
                    textAlign: writing.align,
                  }}
                >
                  {formatDay(booking.date, locale)} · {formatTime(booking.time, locale)}
                </Text>
                <Text
                  onPress={() => {
                    Alert.alert(copy.cancelTitle, copy.cancelBody, [
                      { text: copy.keepBooking, style: 'cancel' },
                      {
                        text: copy.cancelBooking,
                        style: 'destructive',
                        onPress: () => cancelBooking(booking.id),
                      },
                    ]);
                  }}
                  style={{
                    color: colors.accent,
                    fontFamily: fonts.semibold,
                    fontSize: 14,
                    textAlign: writing.align,
                  }}
                >
                  {copy.cancelBooking}
                </Text>
              </View>
            );
          })
        )}
      </ScreenBody>
    </Screen>
  );
}
