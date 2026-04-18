import React, { useState } from 'react';
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
  const { colors, radius, mode } = useTheme();
  const [isGrid, setIsGrid] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="BIKES"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          secondRightIcon={isGrid ? "view-list" : "grid-view"}
          onSecondRightPress={() => setIsGrid(!isGrid)}
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

        {/* Bike grid/list */}
        <View style={isGrid ? styles.gridWrap : styles.listWrap}>
          {bikes.map((bike) => (
            <TouchableOpacity
              key={bike.id}
              onPress={() => navigation.navigate('BikeDetails', { bike })}
              style={[isGrid ? styles.cardGrid : styles.cardList, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <Image source={{ uri: bike.image }} style={isGrid ? styles.imgGrid : styles.imgList} />
              <View style={isGrid ? styles.detailsGrid : styles.detailsList}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14, flex: 1, marginRight: 8 }} numberOfLines={1}>
                    {bike.title}
                  </Text>
                  <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <MaterialIcons name="favorite-border" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: mode === 'light' ? '#000000' : colors.primary, fontWeight: '900', fontSize: 13, marginTop: 4 }}>
                  {bike.price}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="local-gas-station" size={11} color={colors.textMuted} />
                      <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>Fuel</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="speed" size={11} color={colors.textMuted} />
                      <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{bike.mileage || '0 km'}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <MaterialIcons name="location-on" size={11} color={colors.textMuted} />
                      <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }} numberOfLines={1}>{bike.location || 'Karachi'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="calendar-today" size={11} color={colors.textMuted} />
                      <Text style={{ color: colors.textMuted, fontSize: 10, marginLeft: 4 }}>{bike.year || '2024'}</Text>
                    </View>
                  </View>
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
