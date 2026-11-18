import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/auth/AuthProvider';
import { StackHeader } from '@/components/brand/AppHeader';
import { AppPressable, Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { Screen } from '@/components/ui/Screen';
import { StatusPill } from '@/components/ui/StatusPill';
import { areasInCity, serviceById, visitTimes, workerById, workersFor } from '@/domain/catalog';
import {
  formatDay,
  formatDuration,
  formatMoney,
  formatRating,
  formatTime,
  upcomingDates,
} from '@/domain/format';
import { localize } from '@/domain/types';
import { bookingScheduled, fromPrice } from '@/i18n/copy';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function ServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const serviceId = Array.isArray(id) ? id[0] : id;
  const service = serviceId ? serviceById(serviceId) : undefined;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { locale, copy, isRTL } = useLocale();
  const { colors, fonts, radius, spacing, writing } = useTheme();
  const { cityId, book } = useMarketplace();
  const { user } = useAuth();
  const [areaId, setAreaId] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(visitTimes[2] ?? '12:00');
  const [confirmedWhen, setConfirmedWhen] = useState('');

  if (!service) {
    return (
      <Screen>
        <StackHeader title={copy.home} />
      </Screen>
    );
  }

  const areas = areasInCity(cityId);
  const availableWorkers = workersFor(service.id, cityId);
  const selectedArea = areaId || areas[0]?.id || '';
  const selectedWorker = availableWorkers.some((worker) => worker.id === workerId)
    ? workerId
    : (availableWorkers[0]?.id ?? '');
  const dates = upcomingDates(6);
  const selectedDate = date || dates[0] || '';
  const worker = workerById(selectedWorker);

  const confirm = () => {
    if (!selectedWorker || !selectedArea || !selectedDate) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    book({
      serviceId: service.id,
      workerId: selectedWorker,
      areaId: selectedArea,
      date: selectedDate,
      time,
      price: service.priceFrom,
      status: 'confirmed',
    });
    setConfirmedWhen(`${selectedDate} ${time}`);
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <StackHeader title={localize(service.name, locale)} />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            paddingBottom: spacing.xxl,
            gap: spacing.lg,
          }}
        >
          {confirmedWhen ? (
            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: radius.lg,
                padding: spacing.lg,
                gap: spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.bold,
                  fontSize: 20,
                  textAlign: writing.align,
                }}
              >
                {copy.bookingConfirmed}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: fonts.regular,
                  fontSize: 15,
                  textAlign: writing.align,
                }}
              >
                {bookingScheduled(
                  locale,
                  localize(service.name, locale),
                  `${formatDay(selectedDate, locale)} · ${formatTime(time, locale)}`,
                )}
              </Text>
              <AppPressable
                onPress={() => router.push('/bookings')}
                style={{
                  marginTop: spacing.sm,
                  backgroundColor: colors.primary,
                  borderRadius: radius.pill,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold }}>
                  {copy.viewBookings}
                </Text>
              </AppPressable>
            </View>
          ) : (
            <>
              <View style={{ gap: spacing.xs }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: fonts.semibold,
                    fontSize: 13,
                    textAlign: writing.align,
                  }}
                >
                  {localize(service.category, locale)}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    lineHeight: 24,
                    textAlign: writing.align,
                  }}
                >
                  {localize(service.description, locale)}
                </Text>
                <Text
                  style={{
                    color: colors.muted,
                    fontFamily: fonts.medium,
                    fontSize: 14,
                    textAlign: writing.align,
                  }}
                >
                  {fromPrice(locale, formatMoney(service.priceFrom, locale))} ·{' '}
                  {formatDuration(service.durationMinutes, locale)} ·{' '}
                  {formatRating(service.rating, locale)}
                </Text>
              </View>

              <ChoiceGroup title={copy.chooseArea}>
                {areas.map((area) => (
                  <Chip
                    key={area.id}
                    label={localize(area.name, locale)}
                    selected={area.id === selectedArea}
                    onPress={() => setAreaId(area.id)}
                  />
                ))}
              </ChoiceGroup>

              <View style={{ gap: spacing.sm }}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: fonts.bold,
                    fontSize: 16,
                    textAlign: writing.align,
                  }}
                >
                  {copy.workersAvailable}
                </Text>
                {availableWorkers.length === 0 ? (
                  <Text
                    style={{
                      color: colors.muted,
                      fontFamily: fonts.regular,
                      fontSize: 14,
                      textAlign: writing.align,
                    }}
                  >
                    {copy.noWorkers}
                  </Text>
                ) : (
                  availableWorkers.map((item) => {
                    const selected = item.id === selectedWorker;
                    return (
                      <AppPressable
                        key={item.id}
                        onPress={() => setWorkerId(item.id)}
                        style={{
                          borderRadius: radius.md,
                          borderWidth: 1,
                          borderColor: selected ? colors.primary : colors.line,
                          backgroundColor: selected ? colors.primarySoft : colors.surface,
                          padding: spacing.md,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{ gap: 4, flex: 1 }}>
                          <Text
                            style={{
                              color: colors.text,
                              fontFamily: fonts.semibold,
                              fontSize: 15,
                              textAlign: writing.align,
                            }}
                          >
                            {localize(item.name, locale)}
                          </Text>
                          <Text
                            style={{
                              color: colors.muted,
                              fontFamily: fonts.regular,
                              fontSize: 13,
                              textAlign: writing.align,
                            }}
                          >
                            {formatRating(item.rating, locale)}
                          </Text>
                        </View>
                        {item.verified ? <StatusPill status="verified" /> : null}
                      </AppPressable>
                    );
                  })
                )}
              </View>

              <ChoiceGroup title={copy.chooseDay}>
                {dates.map((item) => (
                  <Chip
                    key={item}
                    label={formatDay(item, locale)}
                    selected={item === selectedDate}
                    onPress={() => setDate(item)}
                  />
                ))}
              </ChoiceGroup>

              <ChoiceGroup title={copy.chooseTime}>
                {visitTimes.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    selected={item === time}
                    onPress={() => setTime(item)}
                  />
                ))}
              </ChoiceGroup>
            </>
          )}
        </ScrollView>

        {confirmedWhen ? null : (
          <View
            style={{
              paddingHorizontal: spacing.xl,
              paddingTop: spacing.sm,
              paddingBottom: insets.bottom + spacing.md,
            }}
          >
            <AppPressable
              disabled={!worker}
              onPress={confirm}
              style={{
                backgroundColor: colors.accent,
                borderRadius: radius.pill,
                minHeight: 54,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: spacing.sm,
              }}
            >
              <Text style={{ color: colors.onPrimary, fontFamily: fonts.bold, fontSize: 16 }}>
                {copy.bookNow} · {formatMoney(service.priceFrom, locale)}
              </Text>
              <Icon name="arrow" color={colors.onPrimary} size={18} mirrored={isRTL} />
            </AppPressable>
          </View>
        )}
      </View>
    </Screen>
  );
}

function ChoiceGroup({ title, children }: { title: string; children: ReactNode }) {
  const { colors, fonts, spacing, writing } = useTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.bold,
          fontSize: 16,
          textAlign: writing.align,
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{children}</View>
    </View>
  );
}
