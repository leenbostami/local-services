import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Screen, ScreenBody } from '@/components/ui/Screen';
import { workerById } from '@/domain/catalog';
import { formatTime } from '@/domain/format';
import { localize } from '@/domain/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function MessagesScreen() {
  const router = useRouter();
  const { locale, copy } = useLocale();
  const { colors, fonts, radius, spacing, shadow, writing } = useTheme();
  const { threads } = useMarketplace();

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
          {copy.messages}
        </Text>
        {threads.length === 0 ? (
          <Text
            style={{
              color: colors.muted,
              fontFamily: fonts.regular,
              fontSize: 16,
              textAlign: writing.align,
            }}
          >
            {copy.noMessages}
          </Text>
        ) : (
          threads.map((thread) => {
            const worker = workerById(thread.workerId);
            const last = thread.messages[thread.messages.length - 1];

            return (
              <Pressable
                key={thread.id}
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: '/message/[id]', params: { id: thread.id } })
                }
                style={({ pressed }) => ({
                  backgroundColor: colors.surface,
                  borderRadius: radius.lg,
                  padding: spacing.lg,
                  gap: 4,
                  opacity: pressed ? 0.8 : 1,
                  ...shadow.card,
                })}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: colors.text, fontFamily: fonts.bold, fontSize: 16 }}>
                    {worker ? localize(worker.name, locale) : thread.workerId}
                  </Text>
                  {thread.unread ? (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: colors.accent,
                      }}
                    />
                  ) : null}
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.muted,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    textAlign: writing.align,
                  }}
                >
                  {last ? localize(last.text, locale) : ''}
                </Text>
                <Text
                  style={{
                    color: colors.muted,
                    fontFamily: fonts.medium,
                    fontSize: 12,
                    textAlign: writing.align,
                  }}
                >
                  {last ? formatTime(last.sentAt, locale) : ''}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScreenBody>
    </Screen>
  );
}
