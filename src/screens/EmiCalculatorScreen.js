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

const TENURE_PRESETS = [12, 24, 36, 48, 60, 84];
const DOWN_PRESETS = [10, 20, 30, 40, 50];

function formatPKR(n) {
  if (!Number.isFinite(n)) return '—';
  if (n >= 1e7) return `PKR ${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `PKR ${(n / 1e5).toFixed(2)} Lac`;
  return `PKR ${Math.round(n).toLocaleString()}`;
}

export default function EmiCalculatorScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const cardStyle = useCardStyle();

  const [price, setPrice] = useState('5000000');
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState('18');
  const [tenure, setTenure] = useState(60);

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0;
    const down = (P * downPct) / 100;
    const principal = P - down;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = tenure;
    if (principal <= 0 || n <= 0) {
      return { emi: 0, total: 0, interest: 0, principal, down };
    }
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - principal;
    return { emi, total, interest, principal, down };
  }, [price, downPct, rate, tenure]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="EMI CALCULATOR"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {/* EMI result */}
        <View style={[cardStyle, { borderRadius: radius.xl, padding: 20, marginBottom: 20 }]}>
          <Text style={{ color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1.4 }}>
            MONTHLY PAYMENT
          </Text>
          <Text style={{ color: colors.primary, fontSize: 34, fontWeight: '900', marginTop: 6 }}>
            {formatPKR(calc.emi)}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 14 }}>
            <Stat label="Loan amount" value={formatPKR(calc.principal)} colors={colors} />
            <Stat label="Down payment" value={formatPKR(calc.down)} colors={colors} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Stat label="Total interest" value={formatPKR(calc.interest)} colors={colors} />
            <Stat label="Total payable" value={formatPKR(calc.total)} colors={colors} />
          </View>
        </View>

        <FieldLabel>CAR PRICE (PKR)</FieldLabel>
        <Input
          value={price}
          onChangeText={(t) => setPrice(t.replace(/[^0-9]/g, ''))}
          placeholder="e.g. 5,000,000"
          colors={colors}
          radius={radius}
          mode={mode}
        />

        <FieldLabel>DOWN PAYMENT (%)</FieldLabel>
        <View style={styles.chipRow}>
          {DOWN_PRESETS.map((p) => {
            const active = downPct === p;
            return (
              <Chip
                key={p}
                label={`${p}%`}
                active={active}
                onPress={() => setDownPct(p)}
                colors={colors}
              />
            );
          })}
        </View>

        <FieldLabel>INTEREST RATE (% per year)</FieldLabel>
        <Input
          value={rate}
          onChangeText={(t) => setRate(t.replace(/[^0-9.]/g, ''))}
          placeholder="e.g. 18"
          colors={colors}
          radius={radius}
          mode={mode}
          keyboardType="decimal-pad"
        />

        <FieldLabel>TENURE (months)</FieldLabel>
        <View style={styles.chipRow}>
          {TENURE_PRESETS.map((t) => (
            <Chip
              key={t}
              label={`${t} mo`}
              active={tenure === t}
              onPress={() => setTenure(t)}
              colors={colors}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', { conversation: { id: 'c1', name: 'Finance Desk' } })}
          style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="account-balance" size={18} color="#fff" />
          <Text style={styles.ctaText}>Apply for Car Finance</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, colors }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: colors.textMuted, fontSize: 11 }}>{label}</Text>
      <Text style={{ color: colors.text, fontWeight: '800', marginTop: 2 }}>{value}</Text>
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

function Input({ value, onChangeText, placeholder, colors, radius, mode, keyboardType = 'number-pad' }) {
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

function Chip({ label, active, onPress, colors }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.surfaceAlt,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}
    >
      <Text
        style={{
          color: active ? '#fff' : colors.text,
          fontWeight: '700',
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
});
