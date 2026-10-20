import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { Image } from 'expo-image';

import { brandAssets } from '@/brand/assets';
import { useTheme } from '@/theme/ThemeProvider';

export function BrandSplash({ onFinish }: { onFinish: () => void }) {
  const { colors } = useTheme();
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(onFinish, 1700);
    return () => clearTimeout(timer);
  }, [onFinish, opacity]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.View style={{ width: '88%', opacity }}>
        <Image
          source={brandAssets.lockup}
          style={{ width: '100%', aspectRatio: 1024 / 682 }}
          contentFit="contain"
          accessibilityLabel="Homey"
        />
      </Animated.View>
    </View>
  );
}
