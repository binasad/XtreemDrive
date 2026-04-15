import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function InputField({
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = 'none',
  style,
}) {
  const { colors, radius } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceAlt,
          borderRadius: radius.md,
          borderColor: focused ? colors.primary : 'transparent',
        },
        style,
      ]}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color={colors.textMuted}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 2,
  },
});
