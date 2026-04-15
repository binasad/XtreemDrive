import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { useCardStyle } from '../components/Card';

const MAKES = ['Toyota', 'Honda', 'Suzuki', 'KIA', 'Hyundai', 'MG'];
const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

// Very rough base-price table per make (in PKR) for demo
const BASE_PRICE = {
  Toyota: 6200000,
  Honda: 7500000,
  Suzuki: 3500000,
  KIA: 9000000,
  Hyundai: 7800000,
  MG: 7200000,
};

function formatPKR(n) {
  if (!Number.isFinite(n) || n <= 0) return '—';
  if (n >= 1e7) return `PKR ${(n / 1e7).toFixed(2)} Cr`;
  return `PKR ${(n / 1e5).toFixed(2)} Lac`;
}

export default function CarValuationScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const cardStyle = useCardStyle({ featured: true });

  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [mileage, setMileage] = useState('40000');
  const [city, setCity] = useState('Lahore');
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    const base = BASE_PRICE[make] || 4500000;
    const y = parseInt(year, 10) || 2020;
    const currentYear = 2026;
    const age = Math.max(0, currentYear - y);
    // 8% depreciation per year, min 30%
    const ageFactor = Math.max(0.3, 1 - age * 0.08);
    const km = parseFloat(mileage) || 0;
    // 1% reduction per 10,000 km, capped at -20%
    const mileageFactor = Math.max(0.8, 1 - (km / 10000) * 0.01);
    // City premium for metros
    const cityFactor = city === 'Islamabad' ? 1.03 : city === 'Lahore' ? 1.02 : 1.0;
    const mid = base * ageFactor * mileageFactor * cityFactor;
    return { low: mid * 0.92, mid, high: mid * 1.08 };
  }, [make, year, mileage, city]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="CAR VALUATION"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {submitted ? (
          <View style={[cardStyle, { borderRadius: radius.xl, padding: 20, marginBottom: 16 }]}>
            <Text style={{ color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1.4 }}>
              ESTIMATED MARKET VALUE
            </Text>
            <Text style={{ color: colors.primary, fontSize: 28, fontWeight: '900', marginTop: 6 }}>
              {formatPKR(estimate.mid)}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}>
              Range {formatPKR(estimate.low)} – {formatPKR(estimate.high)}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 14, lineHeight: 18 }}>
              Based on {year} {make} {model || ''} with {parseInt(mileage, 10).toLocaleString()} km in {city}.
              Actual offers may vary by condition, paperwork, and local demand.
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 18 }}>
              <TouchableOpacity
                onPress={() => setSubmitted(false)}
                style={[styles.secondaryBtn, { borderColor: colors.border }]}
              >
                <Text style={{ color: colors.text, fontWeight: '800' }}>Re-estimate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SellForMe')}
                style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
              >
                <MaterialIcons name="storefront" size={16} color="#fff" />
                <Text style={styles.primaryBtnText}>Sell This Car</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <FieldLabel>MAKE</FieldLabel>
        <ChipRow items={MAKES} value={make} onSelect={setMake} colors={colors} />

        <FieldLabel>MODEL</FieldLabel>
        <Input
          value={model}
          onChangeText={setModel}
          placeholder="e.g. Corolla Altis"
          keyboardType="default"
          colors={colors}
          radius={radius}
          mode={mode}
        />

        <FieldLabel>YEAR</FieldLabel>
        <Input
          value={year}
          onChangeText={(t) => setYear(t.replace(/[^0-9]/g, '').slice(0, 4))}
          placeholder="e.g. 2022"
          colors={colors}
          radius={radius}
          mode={mode}
        />

        <FieldLabel>MILEAGE (km)</FieldLabel>
        <Input
          value={mileage}
          onChangeText={(t) => setMileage(t.replace(/[^0-9]/g, ''))}
          placeholder="e.g. 40000"
          colors={colors}
          radius={radius}
          mode={mode}
        />

        <FieldLabel>CITY</FieldLabel>
        <ChipRow items={CITIES} value={city} onSelect={setCity} colors={colors} />

        <TouchableOpacity
          onPress={() => setSubmitted(true)}
          style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="price-check" size={18} color="#fff" />
          <Text style={styles.ctaText}>Get Estimate</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function FieldLabel({ children }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.4,
        marginTop: 14,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function Input({ value, onChangeText, placeholder, keyboardType = 'number-pad', colors, radius, mode }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textDim}
      keyboardType={keyboardType}
      style={{
        backgroundColor: mode === 'light' ? '#ffffff' : colors.surfaceAlt,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        fontWeight: '700',
      }}
    />
  );
}

function ChipRow({ items, value, onSelect, colors }) {
  return (
    <View style={styles.chipRow}>
      {items.map((item) => {
        const active = item === value;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.surfaceAlt,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700', fontSize: 12 }}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 24,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 8,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '800',
    marginLeft: 6,
  },
  secondaryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});
