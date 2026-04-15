import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { useCardStyle } from '../components/Card';
import { dealers } from '../data/mock';

const CITIES = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

export default function DealersScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const cardStyle = useCardStyle();
  const [city, setCity] = useState('All');

  const filtered = useMemo(() => {
    if (city === 'All') return dealers;
    return dealers.filter((d) => d.city === city);
  }, [city]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', { conversation: { id: item.id, name: item.name } })}
      style={[cardStyle, { borderRadius: radius.lg, padding: 14, marginBottom: 12, flexDirection: 'row' }]}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.logo} />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 15 }} numberOfLines={1}>
            {item.name}
          </Text>
          {item.verified && (
            <MaterialIcons
              name="verified"
              size={16}
              color={colors.primary}
              style={{ marginLeft: 4 }}
            />
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialIcons name="place" size={13} color={colors.textMuted} />
          <Text style={{ color: colors.textMuted, fontSize: 12, marginLeft: 2 }}>
            {item.area}, {item.city}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <View style={styles.starPill}>
            <MaterialIcons name="star" size={12} color="#F4B400" />
            <Text style={{ color: colors.text, fontWeight: '800', fontSize: 12, marginLeft: 3 }}>
              {item.rating}
            </Text>
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 11, marginLeft: 6 }}>
            ({item.reviews})
          </Text>
          <Text style={{ color: colors.textDim, fontSize: 12, marginHorizontal: 6 }}>·</Text>
          <Text style={{ color: colors.textMuted, fontSize: 12 }}>
            {item.listings} listings
          </Text>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={22} color={colors.textMuted} style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="DEALERS & SHOWROOMS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <View style={{ paddingTop: 12 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CITIES.map((c) => {
            const active = city === c;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setCity(c)}
                style={[
                  styles.cityChip,
                  {
                    backgroundColor: active ? colors.primary : colors.surfaceAlt,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700', fontSize: 12 }}>
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(d) => d.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={{ padding: 40, alignItems: 'center' }}>
            <MaterialIcons name="store" size={56} color={colors.textMuted} />
            <Text style={{ color: colors.textMuted, marginTop: 10 }}>No dealers in this city.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#222',
  },
  cityChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
