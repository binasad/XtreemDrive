import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { comparisonPairs } from '../data/mock';

export default function CarComparisonScreen({ navigation }) {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="COMPARE CARS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '900' }}>
          Car <Text style={{ color: colors.primary }}>Comparison</Text>
        </Text>
        <Text style={{ color: colors.textMuted, marginTop: 4 }}>
          Compare specs, features & prices side by side
        </Text>

        {comparisonPairs.map((pair) => (
          <View
            key={pair.id}
            style={[styles.card, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
          >
            {/* Header */}
            <View style={styles.headerRow}>
              <View style={[styles.carHeader, { borderRightColor: colors.border }]}>
                <MaterialIcons name="directions-car" size={28} color={colors.primary} />
                <Text style={[styles.carName, { color: colors.text }]}>{pair.car1.title}</Text>
                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 12 }}>{pair.car1.price}</Text>
              </View>
              <View style={[styles.vsBadge, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 10 }}>VS</Text>
              </View>
              <View style={styles.carHeader}>
                <MaterialIcons name="directions-car" size={28} color={colors.primary} />
                <Text style={[styles.carName, { color: colors.text }]}>{pair.car2.title}</Text>
                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 12 }}>{pair.car2.price}</Text>
              </View>
            </View>

            {/* Spec rows */}
            {['engine', 'power', 'fuel', 'transmission'].map((key) => (
              <View key={key} style={[styles.specRow, { borderTopColor: colors.border }]}>
                <Text style={[styles.specVal, { color: colors.text }]}>{pair.car1[key]}</Text>
                <Text style={[styles.specLabel, { color: colors.textMuted }]}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={[styles.specVal, { color: colors.text }]}>{pair.car2[key]}</Text>
              </View>
            ))}

            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: colors.primaryMuted }]}>
              <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 12 }}>VIEW FULL COMPARISON</Text>
              <MaterialIcons name="chevron-right" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}

        {/* CTA */}
        <TouchableOpacity style={[styles.addCompare, { borderColor: colors.primary }]}>
          <MaterialIcons name="add" size={22} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: '800', marginLeft: 8 }}>
            Start New Comparison
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 20, overflow: 'hidden' },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    position: 'relative',
  },
  carHeader: {
    flex: 1, padding: 16, alignItems: 'center',
  },
  vsBadge: {
    position: 'absolute', alignSelf: 'center', left: '50%', marginLeft: -16,
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },
  carName: { fontWeight: '900', fontSize: 14, marginTop: 6, textAlign: 'center' },
  specRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth,
  },
  specVal: { flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 13 },
  specLabel: { width: 100, textAlign: 'center', fontSize: 11, fontWeight: '600' },
  detailBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 12,
  },
  addCompare: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 16, borderRadius: 16, borderWidth: 1.5, marginTop: 20,
    borderStyle: 'dashed',
  },
});
