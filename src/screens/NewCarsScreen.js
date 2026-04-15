import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { newCars, newCarMakes } from '../data/mock';

const TABS = ['Popular', 'Upcoming', 'Newly Launched'];

export default function NewCarsScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="NEW CARS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="search"
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(i)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === i ? colors.primary : colors.surfaceAlt,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: activeTab === i ? '#fff' : colors.text,
                  fontSize: 12,
                  fontWeight: '800',
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Car Grid */}
        <View style={styles.grid}>
          {newCars.map((car) => (
            <TouchableOpacity
              key={car.id}
              onPress={() => navigation.navigate('NewCarDetail', { car })}
              style={[styles.card, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <Image source={{ uri: car.image }} style={styles.cardImg} />
              <View style={{ padding: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14 }} numberOfLines={1}>
                  {car.title}
                </Text>
                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 13, marginTop: 4 }}>
                  {car.price}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                  <MaterialIcons name="star" size={14} color={colors.primary} />
                  <Text style={{ color: colors.text, fontWeight: '700', marginLeft: 4, fontSize: 12 }}>
                    {car.rating}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 11, marginLeft: 4 }}>
                    ({car.reviews} reviews)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Browse by Make */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse by Make</Text>
        <View style={styles.makeGrid}>
          {newCarMakes.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.makeChip, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
            >
              <Text style={{ color: colors.text, fontWeight: '800' }}>{m.label}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 11 }}>{m.count} models</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  card: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardImg: { width: '100%', height: 110, resizeMode: 'cover' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  makeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  makeChip: {
    width: '47%',
    marginHorizontal: '1.5%',
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
});
