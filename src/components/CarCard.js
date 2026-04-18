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
            <MaterialIcons name="verified" size={14} color={colors.primary} />
          </View>
        )}
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 18, flex: 1, marginRight: 8 }} numberOfLines={1}>
            {car.title}
          </Text>
          <TouchableOpacity onPress={() => {}} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="favorite-border" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: mode === 'light' ? '#000000' : colors.primary, fontWeight: '900', fontSize: 18, marginTop: 4 }}>
          {car.price}
        </Text>
        <View style={{ marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="local-gas-station" size={16} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 13, marginLeft: 6 }}>Fuel</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="speed" size={16} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 13, marginLeft: 6 }}>{car.mileage || '0 km'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="location-on" size={16} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 13, marginLeft: 6 }} numberOfLines={1}>{car.location || 'Karachi'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="calendar-today" size={16} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 13, marginLeft: 6 }}>{car.year || '2024'}</Text>
            </View>
          </View>
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
          padding: 10,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2,
        }
      ]}
    >
      <Image source={{ uri: car.image }} style={{ width: 110, height: 110, borderRadius: 10, resizeMode: 'cover' }} />
      <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14, flex: 1, marginRight: 8 }} numberOfLines={1}>
            {car.title}
          </Text>
          <TouchableOpacity onPress={onFav} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="favorite-border" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: mode === 'light' ? '#000000' : colors.primary, fontWeight: '900', fontSize: 13, marginTop: 4 }}>
          {car.price}
        </Text>
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="local-gas-station" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>Fuel</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="speed" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{car.mileage || '0 km'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="location-on" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }} numberOfLines={1}>{car.location || 'Karachi'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="calendar-today" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{car.year || '2024'}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function GridCarCard({ car, onPress, onFav }) {
  const { colors, radius, mode } = useTheme();
  const cardStyle = useCardStyle();
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        cardStyle,
        {
          flex: 1,
          borderRadius: radius.lg,
          marginBottom: 16,
          marginHorizontal: 6,
          backgroundColor: mode === 'dark' ? colors.surfaceAlt : '#ffffff',
          overflow: 'hidden',
          elevation: 2,
        }
      ]}
    >
      <Image source={{ uri: car.image }} style={{ width: '100%', height: 120, resizeMode: 'cover' }} />
      <View style={{ padding: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 13, flex: 1, marginRight: 8 }} numberOfLines={1}>
            {car.title}
          </Text>
          <TouchableOpacity onPress={onFav} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="favorite-border" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: mode === 'light' ? '#000000' : colors.primary, fontWeight: '900', fontSize: 13, marginTop: 4 }}>
          {car.price}
        </Text>
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="local-gas-station" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>Fuel</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="speed" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{car.mileage || '0 km'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="location-on" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }} numberOfLines={1}>{car.location || 'Karachi'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="calendar-today" size={11} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{car.year || '2024'}</Text>
            </View>
          </View>
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
