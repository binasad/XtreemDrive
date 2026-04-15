import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useCardStyle } from './Card';

const { width: SCREEN_W } = Dimensions.get('window');

export function FeaturedCarCard({ car, onPress, width = SCREEN_W * 0.8 }) {
  const { colors, radius, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.featuredCard,
        {
          backgroundColor: isDark ? colors.surfaceAlt : '#f3f4f5',
          borderRadius: 32,
          width: width,
          marginRight: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 5,
        },
      ]}
    >
      <View style={{ height: 260, position: 'relative', overflow: 'hidden', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
        <Image source={{ uri: car.image }} style={styles.featuredImage} />
        {car.verified && (
          <View style={[styles.verifiedBadge, { backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)' }]}>
            <MaterialIcons name="verified" size={12} color={colors.primary} />
            <Text style={[styles.verifiedText, { color: colors.primary }]}>ATELIER VERIFIED</Text>
          </View>
        )}
      </View>
      <View style={{ padding: 24 }}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={[styles.featuredTitle, { color: colors.text }]} numberOfLines={1}>
              {car.title}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}>
              {car.year} • {car.mileage}
            </Text>
          </View>
          <Text style={[styles.featuredPrice, { color: colors.primary, fontSize: 20 }]}>{car.price}</Text>
        </View>
        <View style={styles.chipRow}>
          {car.tags.map((t) => (
            <View
              key={t}
              style={[
                styles.chip,
                { backgroundColor: isDark ? colors.surfaceHigh : '#f1f1f1' },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.textMuted }]}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function ListCarCard({ car, onPress, onFav }) {
  const { colors, radius, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.listCard,
        {
          backgroundColor: isDark ? colors.surfaceAlt : '#f3f4f5',
          borderRadius: 24,
          padding: 12,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2,
        }
      ]}
    >
      <Image source={{ uri: car.image }} style={{ width: 120, height: 120, borderRadius: 20 }} />
      <View style={styles.listBody}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={[styles.listKicker, { color: colors.primary }]}>JUST IN</Text>
          </View>
          <TouchableOpacity onPress={onFav} hitSlop={8}>
            <MaterialIcons name="favorite-border" size={18} color={colors.textDim} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.listTitle, { color: colors.text, fontSize: 16 }]} numberOfLines={1}>
          {car.title}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 12, marginBottom: 8 }}>
          {car.year} • {car.mileage} • {car.location || 'Pakistan'}
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.listPrice, { color: colors.text, fontSize: 16 }]}>{car.price}</Text>
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: colors.primaryMuted,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '800' }}>DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '900',
    marginLeft: 6,
    letterSpacing: 1.2,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  featuredPrice: {
    fontWeight: '900',
  },
  chipRow: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listBody: {
    flex: 1,
    paddingLeft: 16,
    height: 120,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  listKicker: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  listTitle: {
    fontWeight: '800',
  },
  listPrice: {
    fontWeight: '900',
  },
});
