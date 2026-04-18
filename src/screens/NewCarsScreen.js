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
  const { colors, radius, mode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isGrid, setIsGrid] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="NEW CARS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          secondRightIcon={isGrid ? "view-list" : "grid-view"}
          onSecondRightPress={() => setIsGrid(!isGrid)}
          rightIcon="search"
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
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
          </ScrollView>
        </View>

        {/* Car Grid */}
        <View style={isGrid ? styles.gridWrap : styles.listWrap}>
          {newCars.map((car) => (
            <TouchableOpacity
              key={car.id}
              onPress={() => navigation.navigate('NewCarDetail', { car })}
              style={[isGrid ? styles.cardGrid : styles.cardList, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <Image source={{ uri: car.image }} style={isGrid ? styles.imgGrid : styles.imgList} />
              <View style={isGrid ? styles.detailsGrid : styles.detailsList}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14, flex: 1, marginRight: 8 }} numberOfLines={1}>
                    {car.title}
                  </Text>
                  <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
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
  listWrap: {
    paddingHorizontal: 16,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 12,
  },
  cardGrid: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 14,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  imgList: { width: 110, height: 110, borderRadius: 10, resizeMode: 'cover' },
  imgGrid: { width: '100%', height: 110, resizeMode: 'cover' },
  detailsList: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  detailsGrid: { paddingHorizontal: 10, paddingTop: 10 },
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
