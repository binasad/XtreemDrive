import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const { colors } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => navigation.replace('Main'), 200);
    });
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View
        style={[
          styles.glow,
          { backgroundColor: colors.primary, opacity: 0.15 },
        ]}
      />
      <View style={styles.content}>
        <View style={[styles.logoWrap, { borderColor: colors.primary }]}>
          <MaterialIcons name="electric-bolt" size={54} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>XTREEM DRIVE</Text>
        <Text style={[styles.tag, { color: colors.primary }]}>IGNITE YOUR PERFORMANCE</Text>
      </View>

      <View style={styles.bottom}>
        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceAlt }]}>
          <Animated.View style={{ width: barWidth, height: '100%', borderRadius: 99 }}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, borderRadius: 99 }}
            />
          </Animated.View>
        </View>
        <Text style={[styles.sys, { color: colors.textMuted }]}>SYSTEM CHECK</Text>
        <Text style={[styles.copy, { color: colors.textDim }]}>© 2026 Xtreem Drive</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 80 },
  glow: {
    position: 'absolute',
    top: '30%',
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width,
  },
  content: { alignItems: 'center', marginTop: 120 },
  logoWrap: {
    width: 112,
    height: 112,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    fontStyle: 'italic',
  },
  tag: {
    marginTop: 8,
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '800',
  },
  bottom: { width: '80%', alignItems: 'center' },
  progressTrack: {
    height: 6,
    width: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  sys: { marginTop: 12, fontSize: 10, letterSpacing: 3, fontWeight: '700' },
  copy: { marginTop: 24, fontSize: 10, letterSpacing: 1 },
});
