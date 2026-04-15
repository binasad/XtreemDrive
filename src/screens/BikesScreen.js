import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { bikes } from '../data/mock';

export default function BikesScreen({ navigation }) {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="BIKES"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="search"
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: '900' }}>
            Popular <Text style={{ color: colors.primary }}>Bikes</Text>
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}>
            Browse new bikes in Pakistan
          </Text>
        </View>

        {/* Makes strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 14 }}
        >
          {['All', 'Honda', 'Yamaha', 'Suzuki', 'Benelli', 'BMW'].map((m, i) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.chip,
                {
                  backgroundColor: i === 0 ? colors.primary : colors.surfaceAlt,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ color: i === 0 ? '#fff' : colors.text, fontSize: 12, fontWeight: '700' }}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bike grid */}
        <View style={styles.grid}>
          {bikes.map((bike) => (
            <TouchableOpacity
              key={bike.id}
              style={[styles.card, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <Image source={{ uri: bike.image }} style={styles.cardImg} />
              <View style={{ padding: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14 }} numberOfLines={1}>
                  {bike.title}
                </Text>
                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 13, marginTop: 6 }}>
                  {bike.price}
                </Text>
                <View style={[styles.chipSmall, { backgroundColor: colors.primaryMuted, marginTop: 8 }]}>
                  <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '900' }}>VIEW DETAILS</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Browse by Make */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse by Make</Text>
        <View style={styles.makeRow}>
          {['Honda', 'Yamaha', 'Suzuki', 'BMW', 'Benelli', 'Kawasaki'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.makeBtn, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
            >
              <MaterialIcons name="two-wheeler" size={22} color={colors.primary} />
              <Text style={{ color: colors.text, fontWeight: '700', fontSize: 12, marginTop: 6 }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999, marginRight: 8, borderWidth: 1,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12,
  },
  card: {
    width: '47%', marginHorizontal: '1.5%', marginBottom: 14, overflow: 'hidden',
  },
  cardImg: { width: '100%', height: 130, resizeMode: 'cover' },
  chipSmall: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 6, alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '800',
    paddingHorizontal: 20, marginTop: 24, marginBottom: 12,
  },
  makeRow: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16,
  },
  makeBtn: {
    width: '30%', marginHorizontal: '1.5%',
    padding: 14, marginBottom: 10, alignItems: 'center',
  },
});
