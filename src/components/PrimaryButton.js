import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function PrimaryButton({ title, onPress, icon, loading, style, variant = 'gradient' }) {
  const { colors, radius } = useTheme();

  const content = (
    <View style={styles.inner}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />}
          <Text style={styles.label}>{title}</Text>
        </>
      )}
    </View>
  );

  if (variant === 'solid') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[
          { backgroundColor: colors.primary, borderRadius: radius.lg, paddingVertical: 14 },
          style,
        ]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[{ borderRadius: radius.lg }, style]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius: radius.lg }]}
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
