import type { ReactNode } from 'react';
import { ScrollView, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/ThemeProvider';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
};

export function Screen({ children, scroll = false, contentContainerStyle }: ScreenProps) {
  const { colors, writing } = useTheme();
  const body = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ paddingBottom: 28 }, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background, direction: writing.direction }}
    >
      {body}
    </SafeAreaView>
  );
}

export function ScreenBody({ children }: { children: ReactNode }) {
  const { spacing } = useTheme();

  return <View style={{ paddingHorizontal: spacing.xl, gap: spacing.lg }}>{children}</View>;
}
