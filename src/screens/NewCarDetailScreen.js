import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';

const { width } = Dimensions.get('window');

export default function NewCarDetailScreen({ route, navigation }) {
  const { colors, radius, mode } = useTheme();
  const car = route?.params?.car || {
    title: 'Toyota Corolla',
    price: 'PKR 61.94 - 78.04 Lac',
    image: 'https://images.unsplash.com/photo-1621007690695-45aaed9e7a3a?w=800',
    reviews: 648,
    rating: 4.2,
  };

  const specs = [
    { icon: 'speed', label: 'Engine', value: '1798 cc' },
    { icon: 'local-gas-station', label: 'Fuel', value: 'Petrol' },
    { icon: 'settings', label: 'Transmission', value: 'CVT' },
    { icon: 'bolt', label: 'Power', value: '138 hp' },
    { icon: 'event-seat', label: 'Seats', value: '5' },
    { icon: 'straighten', label: 'Body', value: 'Sedan' },
  ];

  const variants = [
    { name: 'XLi 1.6 MT', price: 'PKR 61.94 Lac' },
    { name: 'GLi 1.6 AT', price: 'PKR 66.34 Lac' },
    { name: 'Altis 1.8 AT', price: 'PKR 72.54 Lac' },
    { name: 'Altis X 1.8 AT', price: 'PKR 78.04 Lac' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconCircle, { backgroundColor: colors.glass }]}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconCircle, { backgroundColor: colors.glass }]}>
            <MaterialIcons name="share" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: car.image }} style={{ width, height: 280 }} />

        <View style={{ padding: 20 }}>
          <Text style={[styles.title, { color: colors.text }]}>{car.title}</Text>
          <Text style={[styles.price, { color: mode === 'light' ? '#000000' : colors.primary }]}>{car.price}</Text>

          {/* Specs Grid */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Specifications</Text>
          <View style={styles.specGrid}>
            {specs.map((s) => (
              <View
                key={s.label}
                style={[styles.specBox, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
              >
                <MaterialIcons name={s.icon} size={20} color={colors.primary} />
                <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 6 }}>{s.label}</Text>
                <Text style={{ color: colors.text, fontWeight: '800', marginTop: 2 }}>{s.value}</Text>
              </View>
            ))}
          </View>

          {/* Variants */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Variants & Prices</Text>
          {variants.map((v) => (
            <View
              key={v.name}
              style={[styles.variantRow, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
            >
              <Text style={{ color: colors.text, fontWeight: '700', flex: 1 }}>{v.name}</Text>
              <Text style={{ color: colors.primary, fontWeight: '900' }}>{v.price}</Text>
            </View>
          ))}

          {/* Compare button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CarComparison')}
            style={[styles.compareBtn, { borderColor: colors.primary }]}
          >
            <MaterialIcons name="compare-arrows" size={20} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: '800', marginLeft: 8 }}>
              Compare with other cars
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* CTA Bar */}
      <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.iconSquare, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
        >
          <MaterialIcons name="call" size={22} color={colors.primary} />
        </TouchableOpacity>
        <PrimaryButton
          title="Book Test Drive"
          icon="directions-car"
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16, paddingVertical: 10,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: '900' },
  price: { fontSize: 20, fontWeight: '900', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 12 },
  specGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  specBox: { width: '31%', padding: 12, marginBottom: 10 },
  variantRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, marginBottom: 8,
  },
  compareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 14, borderRadius: 14, borderWidth: 1.5, marginTop: 16,
  },
  ctaBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', alignItems: 'center',
  },
  iconSquare: {
    width: 48, height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
});
