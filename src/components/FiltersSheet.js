import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import PrimaryButton from './PrimaryButton';

/* PakWheels-inspired filter taxonomy */
const CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Gujranwala', 'Sialkot', 'Quetta',
];
const MAKES = [
  'Toyota', 'Suzuki', 'Honda', 'Daihatsu', 'KIA', 'Hyundai',
  'Nissan', 'Mitsubishi', 'MG', 'BMW', 'Mercedes', 'Audi',
];
const BODY_TYPES = [
  'Sedan', 'Hatchback', 'SUV', 'Crossover', 'Coupe',
  'Pickup', 'Mini Van', 'Van', 'Convertible', 'Wagon',
];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const FUELS = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG', 'LPG'];
const ASSEMBLIES = ['Local', 'Imported'];
const COLORS_OPTS = [
  'White', 'Black', 'Silver', 'Grey', 'Beige',
  'Blue', 'Red', 'Brown', 'Green', 'Gold',
];
const SELLER_TYPES = ['Individuals', 'Dealers'];
const TRUSTED = [
  'PakWheels Inspected',
  'PakWheels Certified',
  'Auction Sheet Verified',
  'Managed by PakWheels',
];
const PRICE_PRESETS = [
  'Under 10 Lac', '10–25 Lac', '25–50 Lac',
  '50 Lac – 1 Cr', '1 Cr – 2 Cr', 'Above 2 Cr',
];
const MILEAGE_PRESETS = [
  'Under 20k', '20k–50k', '50k–100k', '100k–200k', 'Above 200k',
];

const MULTI_KEYS = [
  'cities', 'makes', 'body', 'transmission', 'fuel',
  'assembly', 'color', 'seller', 'trusted', 'price', 'mileage',
];

const emptyState = () => ({
  cities: [],
  makes: [],
  body: [],
  transmission: [],
  fuel: [],
  assembly: [],
  color: [],
  seller: [],
  trusted: [],
  price: [],
  mileage: [],
  yearMin: '',
  yearMax: '',
});

export default function FiltersSheet({ visible, onClose, onApply, initial = {} }) {
  const { colors, radius } = useTheme();
  const [state, setState] = useState(() => ({ ...emptyState(), ...initial }));

  const toggle = (key, value) =>
    setState((s) => ({
      ...s,
      [key]: s[key].includes(value)
        ? s[key].filter((v) => v !== value)
        : [...s[key], value],
    }));

  const setField = (key, value) => setState((s) => ({ ...s, [key]: value }));

  const reset = () => setState(emptyState());

  const totalSelected = useMemo(() => {
    let n = 0;
    for (const k of MULTI_KEYS) n += state[k]?.length || 0;
    if (state.yearMin) n += 1;
    if (state.yearMax) n += 1;
    return n;
  }, [state]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xxl,
            borderTopRightRadius: radius.xxl,
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.border }]} />

        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: '900' }}>
              Filters
            </Text>
            {totalSelected > 0 && (
              <View style={[styles.countPill, { backgroundColor: colors.primary }]}>
                <Text style={styles.countPillText}>{totalSelected}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={reset}>
            <Text style={{ color: colors.primary, fontWeight: '800' }}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ maxHeight: 520 }} showsVerticalScrollIndicator={false}>
          <ChipGroup
            title="City"
            options={CITIES}
            values={state.cities}
            onToggle={(v) => toggle('cities', v)}
            colors={colors}
          />
          <ChipGroup
            title="Make"
            options={MAKES}
            values={state.makes}
            onToggle={(v) => toggle('makes', v)}
            colors={colors}
          />
          <ChipGroup
            title="Price Range"
            options={PRICE_PRESETS}
            values={state.price}
            onToggle={(v) => toggle('price', v)}
            colors={colors}
          />

          <YearRange
            yearMin={state.yearMin}
            yearMax={state.yearMax}
            setField={setField}
            colors={colors}
            radius={radius}
          />

          <ChipGroup
            title="Mileage (km)"
            options={MILEAGE_PRESETS}
            values={state.mileage}
            onToggle={(v) => toggle('mileage', v)}
            colors={colors}
          />
          <ChipGroup
            title="Body Type"
            options={BODY_TYPES}
            values={state.body}
            onToggle={(v) => toggle('body', v)}
            colors={colors}
          />
          <ChipGroup
            title="Transmission"
            options={TRANSMISSIONS}
            values={state.transmission}
            onToggle={(v) => toggle('transmission', v)}
            colors={colors}
          />
          <ChipGroup
            title="Engine / Fuel"
            options={FUELS}
            values={state.fuel}
            onToggle={(v) => toggle('fuel', v)}
            colors={colors}
          />
          <ChipGroup
            title="Assembly"
            options={ASSEMBLIES}
            values={state.assembly}
            onToggle={(v) => toggle('assembly', v)}
            colors={colors}
          />
          <ChipGroup
            title="Color"
            options={COLORS_OPTS}
            values={state.color}
            onToggle={(v) => toggle('color', v)}
            colors={colors}
          />
          <ChipGroup
            title="Seller Type"
            options={SELLER_TYPES}
            values={state.seller}
            onToggle={(v) => toggle('seller', v)}
            colors={colors}
          />
          <ChipGroup
            title="Trusted Cars"
            options={TRUSTED}
            values={state.trusted}
            onToggle={(v) => toggle('trusted', v)}
            colors={colors}
          />
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title={totalSelected > 0 ? `Apply Filters (${totalSelected})` : 'Apply Filters'}
            icon="check"
            onPress={() => {
              onApply?.(state);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

function ChipGroup({ title, options, values, onToggle, colors }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: colors.textMuted,
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 1.6,
          marginBottom: 10,
        }}
      >
        {title.toUpperCase()}
      </Text>
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const active = values.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => onToggle(opt)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary : colors.surfaceAlt,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              {active && (
                <MaterialIcons name="check" size={14} color="#fff" style={{ marginRight: 4 }} />
              )}
              <Text
                style={{
                  color: active ? '#fff' : colors.text,
                  fontWeight: '700',
                  fontSize: 11,
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function YearRange({ yearMin, yearMax, setField, colors, radius }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: colors.textMuted,
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 1.6,
          marginBottom: 10,
        }}
      >
        YEAR
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={[
            styles.input,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderRadius: radius.md },
          ]}
        >
          <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: '700' }}>FROM</Text>
          <TextInput
            placeholder="e.g. 2015"
            placeholderTextColor={colors.textDim}
            keyboardType="number-pad"
            maxLength={4}
            value={yearMin}
            onChangeText={(t) => setField('yearMin', t.replace(/[^0-9]/g, ''))}
            style={{ color: colors.text, fontSize: 14, fontWeight: '700', padding: 0, marginTop: 2 }}
          />
        </View>
        <View
          style={[
            styles.input,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderRadius: radius.md },
          ]}
        >
          <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: '700' }}>TO</Text>
          <TextInput
            placeholder="e.g. 2024"
            placeholderTextColor={colors.textDim}
            keyboardType="number-pad"
            maxLength={4}
            value={yearMax}
            onChangeText={(t) => setField('yearMax', t.replace(/[^0-9]/g, ''))}
            style={{ color: colors.text, fontSize: 14, fontWeight: '700', padding: 0, marginTop: 2 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  countPill: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    minWidth: 22,
    alignItems: 'center',
  },
  countPillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    minHeight: 32,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  footer: {
    marginTop: 12,
  },
});
