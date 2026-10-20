import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { StackHeader } from '@/components/brand/AppHeader';
import { Screen } from '@/components/ui/Screen';
import { workerById } from '@/domain/catalog';
import { formatTime } from '@/domain/format';
import { localize } from '@/domain/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function MessageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const threadId = Array.isArray(id) ? id[0] : id;
  const { locale, copy } = useLocale();
  const { colors, fonts, radius, spacing, writing } = useTheme();
  const { threads, markThreadRead } = useMarketplace();
  const thread = threads.find((item) => item.id === threadId);
  const worker = thread ? workerById(thread.workerId) : undefined;

  useEffect(() => {
    if (thread?.unread && threadId) {
      markThreadRead(threadId);
    }
  }, [markThreadRead, thread?.unread, threadId]);

  return (
    <Screen>
      <StackHeader title={worker ? localize(worker.name, locale) : copy.messages} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: spacing.xxl,
          gap: spacing.md,
        }}
      >
        {thread?.messages.map((message) => {
          const mine = message.from === 'family';

          return (
            <View
              key={message.id}
              style={{
                alignSelf: mine ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                backgroundColor: mine ? colors.primary : colors.surface,
                borderRadius: radius.lg,
                padding: spacing.md,
                gap: 4,
              }}
            >
              <Text
                style={{
                  color: mine ? colors.onPrimary : colors.text,
                  fontFamily: fonts.regular,
                  fontSize: 15,
                  lineHeight: 22,
                  textAlign: writing.align,
                }}
              >
                {localize(message.text, locale)}
              </Text>
              <Text
                style={{
                  color: mine ? colors.onPrimary : colors.muted,
                  fontFamily: fonts.medium,
                  fontSize: 11,
                  textAlign: writing.align,
                  opacity: 0.8,
                }}
              >
                {formatTime(message.sentAt, locale)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
