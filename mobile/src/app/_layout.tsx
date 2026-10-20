import {
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
} from '@expo-google-fonts/cairo';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { BrandSplash } from '@/components/brand/BrandSplash';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { MarketplaceProvider } from '@/state/MarketplaceProvider';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 450, fade: true });

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <LocaleProvider>
      <ThemeProvider>
        <MarketplaceProvider>
          <RootNavigator fontsReady={loaded || Boolean(error)} />
        </MarketplaceProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}

function RootNavigator({ fontsReady }: { fontsReady: boolean }) {
  const { colors } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: showSplash ? colors.black : colors.canvas,
        alignItems: 'center',
      }}
    >
      <StatusBar style={showSplash ? 'light' : 'dark'} />
      <View
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 480,
          backgroundColor: showSplash ? colors.black : colors.background,
        }}
      >
        {showSplash ? (
          <BrandSplash onFinish={finishSplash} />
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        )}
      </View>
    </View>
  );
}
