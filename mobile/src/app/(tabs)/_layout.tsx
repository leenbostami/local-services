import { NativeTabs } from 'expo-router/native-tabs';

import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
  const { copy } = useLocale();
  const { colors } = useTheme();
  const { bookings, threads } = useMarketplace();
  const pending = bookings.filter((booking) => booking.status === 'pending').length;
  const unread = threads.filter((thread) => thread.unread).length;

  return (
    <NativeTabs
      backgroundColor={colors.surface}
      tintColor={colors.primary}
      iconColor={{ default: colors.muted, selected: colors.primary }}
      indicatorColor={colors.primary}
      labelStyle={{
        default: { color: colors.muted },
        selected: { color: colors.primary },
      }}
      badgeBackgroundColor={colors.accent}
      badgeTextColor={colors.onPrimary}
      labelVisibilityMode="labeled"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{copy.home}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="bookings">
        <NativeTabs.Trigger.Label>{copy.bookings}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
        {pending > 0 ? (
          <NativeTabs.Trigger.Badge>{String(pending)}</NativeTabs.Trigger.Badge>
        ) : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="messages">
        <NativeTabs.Trigger.Label>{copy.messages}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="message" md="chat_bubble" />
        {unread > 0 ? <NativeTabs.Trigger.Badge>{String(unread)}</NativeTabs.Trigger.Badge> : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>{copy.profile}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
