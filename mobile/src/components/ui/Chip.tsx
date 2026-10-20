import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { colors, fonts, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: radius.pill,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderWidth: 1,
        borderColor: selected ? colors.primary : colors.line,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text
        style={{
          color: selected ? colors.onPrimary : colors.text,
          fontFamily: fonts.medium,
          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type AppPressableProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export function AppPressable({ style, disabled, ...props }: AppPressableProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [style, { opacity: disabled ? 0.45 : pressed ? 0.82 : 1 }]}
      {...props}
    />
  );
}
