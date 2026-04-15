import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function TopAppBar({
  title = 'XTREEM DRIVE',
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  secondRightIcon,
  onSecondRightPress,
  showThemeToggle,
}) {
  const { colors, toggle, mode } = useTheme();
  const paddingTop = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 60;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.leftGroup}>
          {leftIcon ? (
            <TouchableOpacity onPress={onLeftPress} style={styles.iconBtn} hitSlop={10}>
              <MaterialIcons name={leftIcon} size={24} color={colors.text} />
            </TouchableOpacity>
          ) : (
            <Text style={[styles.branding, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightGroup}>
          {showThemeToggle && (
            <TouchableOpacity onPress={toggle} style={[styles.iconBtn, { marginRight: 12 }]} hitSlop={10}>
              <MaterialIcons
                name={mode === 'dark' ? 'light-mode' : 'dark-mode'}
                size={22}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
          {secondRightIcon && (
            <TouchableOpacity onPress={onSecondRightPress} style={[styles.iconBtn, { marginRight: 12 }]} hitSlop={10}>
              <MaterialIcons name={secondRightIcon} size={22} color={colors.text} />
            </TouchableOpacity>
          )}
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} hitSlop={10}>
              <MaterialIcons name={rightIcon} size={22} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  branding: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
