import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address' | 'default';
  autoCapitalize?: 'none' | 'words';
};

export function Field({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: FieldProps) {
  const { colors, fonts, radius, spacing, writing } = useTheme();

  return (
    <View style={{ gap: spacing.xs }}>
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.semibold,
          fontSize: 14,
          textAlign: writing.align,
        }}
      >
        {label}
        <Text style={{ color: colors.accent }}> *</Text>
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? 'sentences'}
        autoCorrect={false}
        placeholderTextColor={colors.muted}
        style={{
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.line,
          color: colors.text,
          fontFamily: fonts.regular,
          fontSize: 16,
          paddingHorizontal: spacing.lg,
          paddingVertical: 14,
          textAlign: writing.align,
        }}
      />
    </View>
  );
}
