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
import { inspectionSlots } from '../data/mock';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];
const PACKAGES = [
  { id: 'std', name: 'Standard', price: 'PKR 4,999', points: '200+ checkpoints' },
  { id: 'ext', name: 'Extended', price: 'PKR 7,499', points: '250+ checkpoints · warranty report' },
  { id: 'prem', name: 'Premium', price: 'PKR 9,999', points: '300+ checkpoints · engine scope · paint meter' },
];

function nextDates(count = 7) {
  const out = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export default function InspectionBookingScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const cardStyle = useCardStyle();

  const [carName, setCarName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [pkg, setPkg] = useState('std');
  const [dateIdx, setDateIdx] = useState(1);
  const [slot, setSlot] = useState(inspectionSlots[1]);
  const [confirmed, setConfirmed] = useState(false);

  const dates = useMemo(() => nextDates(7), []);
  const selected = dates[dateIdx];

  const dayLabel = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

  if (confirmed) {
    const pkgInfo = PACKAGES.find((p) => p.id === pkg);
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar
            title="BOOKING CONFIRMED"
            leftIcon="arrow-back"
            onLeftPress={() => navigation.goBack()}
          />
        </SafeAreaView>
        <View style={{ padding: 24, alignItems: 'center' }}>
          <View style={[styles.okBadge, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="check" size={40} color="#fff" />
          </View>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 18 }}>
            Inspection Booked
          </Text>
          <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 6 }}>
            An inspector will reach you on the scheduled day. You can reschedule from your bookings.
          </Text>

          <View style={[cardStyle, { borderRadius: radius.lg, padding: 16, marginTop: 20, width: '100%' }]}>
            <Row label="Car" value={carName || '—'} colors={colors} />
            <Row label="City" value={city} colors={colors} />
            <Row label="Package" value={`${pkgInfo.name} (${pkgInfo.price})`} colors={colors} />
            <Row
              label="Date"
              value={selected.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              colors={colors}
            />
            <Row label="Time" value={slot} colors={colors} last />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={[styles.ctaBtn, { backgroundColor: colors.primary, marginTop: 24, width: '100%' }]}
          >
            <Text style={styles.ctaText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="BOOK INSPECTION"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        <FieldLabel>CAR MAKE & MODEL</FieldLabel>
        <TextInput
          value={carName}
          onChangeText={setCarName}
          placeholder="e.g. Toyota Corolla 2022"
          placeholderTextColor={colors.textDim}
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

        <FieldLabel>CITY</FieldLabel>
        <View style={styles.chipRow}>
          {CITIES.map((c) => (
            <Chip key={c} label={c} active={city === c} onPress={() => setCity(c)} colors={colors} />
          ))}
        </View>

        <FieldLabel>PACKAGE</FieldLabel>
        {PACKAGES.map((p) => {
          const active = pkg === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              onPress={() => setPkg(p.id)}
              style={[
                styles.pkg,
                cardStyle,
                {
                  borderRadius: radius.lg,
                  borderColor: active ? colors.primary : cardStyle.borderColor,
                  borderWidth: active ? 2 : 1,
                },
              ]}
            >
              <MaterialIcons
                name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color={active ? colors.primary : colors.textMuted}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800' }}>{p.name}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>{p.points}</Text>
              </View>
              <Text style={{ color: colors.primary, fontWeight: '900' }}>{p.price}</Text>
            </TouchableOpacity>
          );
        })}

        <FieldLabel>PICK A DATE</FieldLabel>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((d, i) => {
            const active = i === dateIdx;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setDateIdx(i)}
                style={[
                  styles.dateCard,
                  {
                    backgroundColor: active ? colors.primary : colors.surfaceAlt,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: active ? '#fff' : colors.textMuted, fontSize: 10, fontWeight: '700' }}>
                  {dayLabel(d)}
                </Text>
                <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '900', fontSize: 20, marginTop: 4 }}>
                  {d.getDate()}
                </Text>
                <Text style={{ color: active ? 'rgba(255,255,255,0.8)' : colors.textMuted, fontSize: 10 }}>
                  {d.toLocaleDateString('en-US', { month: 'short' })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <FieldLabel>PICK A TIME SLOT</FieldLabel>
        <View style={styles.chipRow}>
          {inspectionSlots.map((s) => (
            <Chip key={s} label={s} active={slot === s} onPress={() => setSlot(s)} colors={colors} />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setConfirmed(true)}
          disabled={!carName.trim()}
          style={[
            styles.ctaBtn,
            { backgroundColor: carName.trim() ? colors.primary : colors.surfaceHigh, marginTop: 24 },
          ]}
        >
          <MaterialIcons name="verified-user" size={18} color="#fff" />
          <Text style={styles.ctaText}>Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
      <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700', fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
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
        marginTop: 18,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function Row({ label, value, colors, last }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: last ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ color: colors.textMuted }}>{label}</Text>
      <Text style={{ color: colors.text, fontWeight: '700' }}>{value}</Text>
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
  pkg: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
  },
  dateCard: {
    width: 60,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 8,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 8,
  },
  okBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});
