import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import { useCardStyle } from '../components/Card';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200',
  'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
];

const SPECS = [
  { icon: 'speed', label: 'Mileage', value: '4,200 km' },
  { icon: 'local-gas-station', label: 'Fuel', value: 'Petrol' },
  { icon: 'settings', label: 'Transmission', value: 'Manual' },
  { icon: 'bolt', label: 'Power', value: '640 hp' },
  { icon: 'palette', label: 'Color', value: 'Silver' },
  { icon: 'location-on', label: 'Location', value: 'Berlin' },
];

export default function CarDetailsScreen({ route, navigation }) {
  const { colors, radius, mode } = useTheme();
  const specCardStyle = useCardStyle();
  const car = route?.params?.car || {
    title: 'Porsche 911 Turbo S',
    price: '$214,500',
    year: 2023,
    mileage: '4,200 km',
    tags: ['Manual', 'Petrol'],
  };
  const [active, setActive] = useState(0);
  const [fav, setFav] = useState(false);

  const isLight = mode === 'light';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <View style={styles.topBar}>
          <IconBtn icon="arrow-back" onPress={() => navigation.goBack()} colors={colors} />
          <View style={{ flexDirection: 'row' }}>
            <IconBtn icon="share" colors={colors} />
            <View style={{ width: 10 }} />
            <IconBtn
              icon={fav ? 'favorite' : 'favorite-border'}
              onPress={() => setFav((v) => !v)}
              colors={colors}
              accent={fav}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActive(Math.round(e.nativeEvent.contentOffset.x / width))
            }
          >
            {GALLERY.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={{ width, height: 340 }} />
            ))}
          </ScrollView>
          <View style={styles.dots}>
            {GALLERY.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === active ? colors.primary : 'rgba(255,255,255,0.5)',
                    width: i === active ? 20 : 6,
                  },
                ]}
              />
            ))}
          </View>
          <View style={[styles.inspBadge, { backgroundColor: colors.glass }]}>
            <MaterialIcons name="verified" size={14} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '900', marginLeft: 4 }}>
              INSPECTED
            </Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2 }}>
            SPORTS CAR
          </Text>
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text style={[styles.title, { color: colors.text, flex: 1 }]} numberOfLines={2}>
              {car.title}
            </Text>
          </View>
          <View style={[styles.rowBetween, { marginTop: 6 }]}>
            <Text style={[styles.price, { color: colors.primary }]}>{car.price}</Text>
            <Text style={{ color: colors.textDim, textDecorationLine: 'line-through' }}>
              MSRP $230,000
            </Text>
          </View>

          <View style={styles.specGrid}>
            {SPECS.map((s) => (
              <View
                key={s.label}
                style={[styles.specBox, specCardStyle, { borderRadius: radius.md }]}
              >
                <MaterialIcons name={s.icon} size={20} color={colors.primary} />
                <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 6 }}>
                  {s.label}
                </Text>
                <Text style={{ color: colors.text, fontWeight: '800', marginTop: 2 }}>
                  {s.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Seller */}
          <Pressable
            onPress={() => navigation.navigate('Chat', { conversation: { id: 'c1', name: 'Premium Motors' } })}
            style={({ pressed }) => [
              styles.seller,
              {
                backgroundColor:
                  isLight && pressed
                    ? colors.primaryMuted
                    : isLight
                    ? '#ffffff'
                    : colors.surfaceAlt,
                borderRadius: radius.lg,
                borderWidth: isLight ? 1 : 0,
                borderColor: isLight && pressed
                  ? colors.primary
                  : isLight
                  ? 'rgba(0,0,0,0.08)'
                  : 'transparent',
              },
            ]}
          >
            {({ pressed }) => {
              const accent = isLight && pressed ? colors.primary : colors.text;
              const subColor = isLight && pressed ? colors.primary : colors.textMuted;
              return (
                <>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: accent, fontWeight: '800' }}>Premium Motors</Text>
                      <MaterialIcons
                        name="verified"
                        size={16}
                        color={colors.primary}
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                    <Text style={{ color: subColor, fontSize: 12, marginTop: 2 }}>
                      98% response rate • Member since 2021
                    </Text>
                  </View>
                  <View style={[styles.chatIcon, { backgroundColor: colors.primary }]}>
                    <MaterialIcons name="chat-bubble-outline" size={16} color="#fff" />
                  </View>
                </>
              );
            }}
          </Pressable>

          {/* Description */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={{ color: colors.textMuted, lineHeight: 20 }}>
            Factory-fresh Porsche 911 Turbo S with full service history, sport chrono package, and
            premium interior. Original paint, single owner, and every option box ticked. Includes
            Atelier certified inspection and 12-month warranty.
          </Text>

          {/* Inspection card */}
          <Pressable
            style={({ pressed }) => [
              styles.inspectionCard,
              {
                backgroundColor:
                  isLight && !pressed ? '#ffffff' : colors.primaryMuted,
                borderColor: colors.primary,
              },
            ]}
          >
            {({ pressed }) => {
              const active = !isLight || pressed;
              return (
                <>
                  <MaterialIcons
                    name="description"
                    size={22}
                    color={active ? colors.primary : '#000000'}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ color: active ? colors.text : '#000000', fontWeight: '800' }}>
                      Inspection Report
                    </Text>
                    <Text style={{ color: active ? colors.textMuted : '#4a4a4a', fontSize: 12 }}>
                      200+ checkpoints passed
                    </Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={22}
                    color={active ? colors.primary : '#000000'}
                  />
                </>
              );
            }}
          </Pressable>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => setFav((v) => !v)}
          style={[
            styles.iconSquare,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name={fav ? 'favorite' : 'favorite-border'}
            size={22}
            color={fav ? colors.primary : colors.text}
          />
        </TouchableOpacity>
        <PrimaryButton
          title="Contact Seller"
          icon="chat"
          style={{ flex: 1, marginLeft: 10 }}
          onPress={() => navigation.navigate('Chat', { conversation: { id: 'c1', name: 'Premium Motors' } })}
        />
      </View>
    </View>
  );
}

function IconBtn({ icon, onPress, colors, accent }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconCircle,
        { backgroundColor: colors.glass, borderColor: colors.border },
      ]}
    >
      <MaterialIcons name={icon} size={20} color={accent ? colors.primary : colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dots: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  inspBadge: {
    position: 'absolute',
    top: 70,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: '900' },
  price: { fontSize: 26, fontWeight: '900' },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  specBox: {
    width: '31%',
    padding: 12,
    marginBottom: 10,
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginTop: 20,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 8,
  },
  inspectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 20,
  },
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSquare: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
