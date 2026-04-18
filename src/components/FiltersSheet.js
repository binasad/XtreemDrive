import React, { useMemo, useState, useCallback, memo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const { width: SW } = Dimensions.get('window');
const CARD_W = (SW - 32 - 10) / 2;  // 2-col card width
const BODY_W = (SW - 32 - 20) / 3;  // 3-col body card width

/* ─── Data ─────────────────────────────────────────────────────────────── */
const CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi',
  'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala', 'Sialkot', 'Quetta',
];
const MAKES = [
  { name: 'Toyota',    initials: 'TY' },
  { name: 'Honda',     initials: 'HN' },
  { name: 'Suzuki',    initials: 'SZ' },
  { name: 'KIA',       initials: 'KIA' },
  { name: 'Hyundai',   initials: 'HY' },
  { name: 'Nissan',    initials: 'NS' },
  { name: 'Daihatsu',  initials: 'DH' },
  { name: 'MG',        initials: 'MG' },
  { name: 'BMW',       initials: 'BMW' },
  { name: 'Mercedes',  initials: 'MB' },
  { name: 'Mitsubishi',initials: 'MI' },
  { name: 'Audi',      initials: 'AU' },
];
const CAR_MODELS = {
  Toyota:    ['Corolla', 'Yaris', 'Fortuner', 'Hilux', 'Prado', 'Land Cruiser'],
  Honda:     ['Civic', 'City', 'BR-V', 'HR-V', 'Accord'],
  Suzuki:    ['Swift', 'Cultus', 'Alto', 'Wagon R', 'Mehran'],
  KIA:       ['Sportage', 'Picanto', 'Stonic', 'Sorento'],
  Hyundai:   ['Tucson', 'Sonata', 'Elantra', 'Santa Fe'],
};
const BODY_TYPES = [
  { label: 'Sedan',      icon: 'directions-car' },
  { label: 'SUV',        icon: 'airport-shuttle' },
  { label: 'Hatchback',  icon: 'directions-car' },
  { label: 'Crossover',  icon: 'airport-shuttle' },
  { label: 'Pickup',     icon: 'local-shipping' },
  { label: 'Coupe',      icon: 'directions-car' },
  { label: 'Mini Van',   icon: 'airport-shuttle' },
  { label: 'Van',        icon: 'airport-shuttle' },
  { label: 'Convertible',icon: 'directions-car' },
  { label: 'Wagon',      icon: 'directions-car' },
];
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG'];
const PRICE_CARDS = [
  { label: 'Under 10 Lac',    value: 'Under 10 Lac' },
  { label: '10 – 25 Lac',     value: '10–25 Lac' },
  { label: '25 – 50 Lac',     value: '25–50 Lac' },
  { label: '50 Lac – 1 Cr',   value: '50 Lac – 1 Cr' },
  { label: '1 Cr – 2 Cr',     value: '1 Cr – 2 Cr' },
  { label: 'Above 2 Cr',      value: 'Above 2 Cr' },
];
const MILEAGE_CARDS = [
  { label: 'Under 20,000 km', value: 'Under 20k' },
  { label: '20k – 50k km',    value: '20k–50k' },
  { label: '50k – 100k km',   value: '50k–100k' },
  { label: '100k – 200k km',  value: '100k–200k' },
  { label: 'Above 200k km',   value: 'Above 200k' },
];
const ENGINE_CHIPS = [
  'Under 1000cc', '1000–1200cc', '1200–1500cc',
  '1500–1800cc', '1800–2000cc', 'Above 2000cc',
];
const COLOR_MAP = [
  { name: 'White',  hex: '#f5f5f5', dark: false },
  { name: 'Black',  hex: '#1a1a1a', dark: true  },
  { name: 'Silver', hex: '#c0c0c0', dark: false },
  { name: 'Grey',   hex: '#808080', dark: true  },
  { name: 'Beige',  hex: '#d4b896', dark: false },
  { name: 'Blue',   hex: '#1d4ed8', dark: true  },
  { name: 'Red',    hex: '#dc2626', dark: true  },
  { name: 'Brown',  hex: '#7c3f00', dark: true  },
  { name: 'Green',  hex: '#16a34a', dark: true  },
  { name: 'Gold',   hex: '#d97706', dark: false },
];
const DOOR_OPTIONS   = ['2', '3', '4', '5', '6+'];
const SEAT_OPTIONS   = ['2', '4', '5', '7', '8+'];
const AD_PROPERTIES  = [
  'Original Document', 'Service Records', 'Warranty Available',
  'Non-Accidental', 'Single Owner', 'Genuine Mileage',
];
const TRUSTED_OPTS = [
  'PakWheels Inspected', 'PakWheels Certified',
  'Auction Sheet Verified', 'Managed by PakWheels',
];
const MULTI_KEYS = [
  'cities','makes','models','body','transmission','fuel','assembly',
  'color','seller','trusted','price','mileage','engineCapacity',
  'doors','seating','properties','registeredIn',
];
const emptyState = () => ({
  keyword:'',
  cities:[], registeredIn:[],
  makes:[], models:[], body:[], transmission:[], fuel:[],
  engineCapacity:[], assembly:[], doors:[], seating:[], color:[],
  price:[], mileage:[],
  priceMin:'', priceMax:'',
  mileageMin:'', mileageMax:'',
  engineMin:'', engineMax:'',
  yearMin:'', yearMax:'',
  seller:[], trusted:[], properties:[],
});

/* ─── Sub-components ────────────────────────────────────────────────────── */

function SectionHead({ title, count, colors }) {
  return (
    <View style={S.secHead}>
      <Text style={[S.secTitle, { color: colors.text }]}>{title}</Text>
      {count > 0 && (
        <View style={[S.secBadge, { backgroundColor: colors.primary }]}>
          <Text style={S.secBadgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

/** Large pill chips (city, fuel, etc.) */
function PillChips({ options, values, onToggle, colors }) {
  return (
    <View style={S.pillWrap}>
      {options.map((opt) => {
        const on = values.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onToggle(opt)}
            activeOpacity={0.75}
            style={[
              S.pill,
              on
                ? { backgroundColor: colors.primary + '12', borderColor: colors.primary }
                : { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 14, fontWeight: '600' }}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** Horizontal brand logo scroll */
function BrandScroll({ values, onToggle, colors, isDark }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingBottom: 4 }}>
      {MAKES.map(({ name, initials }) => {
        const on = values.includes(name);
        return (
          <TouchableOpacity
            key={name}
            onPress={() => onToggle(name)}
            activeOpacity={0.8}
            style={[
              S.brandCard,
              on
                ? { borderColor: colors.primary, backgroundColor: colors.primary + '08' }
                : { borderColor: 'transparent', backgroundColor: isDark ? colors.surfaceAlt : '#f0f4f4' },
            ]}
          >
            <View style={[S.brandCircle, { backgroundColor: on ? colors.primary + '18' : colors.surface }]}>
              <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 }}>
                {initials}
              </Text>
            </View>
            <Text style={[S.brandLabel, { color: on ? colors.primary : colors.textMuted }]}>{name}</Text>
            {on && (
              <View style={[S.brandCheck, { backgroundColor: colors.primary }]}>
                <MaterialIcons name="check" size={9} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

/** Custom model picker dropdown */
function ModelPicker({ makes, values, onToggle, colors }) {
  const [open, setOpen] = useState(false);
  const models = makes.flatMap((m) => CAR_MODELS[m] || []);
  if (!models.length) return null;
  const label = values.length ? values.join(', ') : 'Select a model...';
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[S.fieldLabel, { color: colors.textMuted }]}>SELECT MODEL</Text>
      <TouchableOpacity
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.8}
        style={[S.pickerBtn, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
      >
        <Text style={{ flex: 1, color: values.length ? colors.text : colors.textDim, fontSize: 15, fontWeight: '600' }} numberOfLines={1}>
          {label}
        </Text>
        <MaterialIcons name={open ? 'expand-less' : 'unfold-more'} size={22} color={colors.textMuted} />
      </TouchableOpacity>
      {open && (
        <View style={[S.pickerList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {models.map((m) => {
            const on = values.includes(m);
            return (
              <TouchableOpacity
                key={m}
                onPress={() => onToggle(m)}
                style={[S.pickerItem, { borderBottomColor: colors.border }]}
              >
                <Text style={{ flex: 1, color: colors.text, fontSize: 15, fontWeight: '600' }}>{m}</Text>
                {on && <MaterialIcons name="check" size={18} color={colors.primary} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
function isDark(colors) { return colors.background === '#0A0A0C'; }

/** 3-column body type grid */
function BodyGrid({ values, onToggle, colors }) {
  const rows = [];
  for (let i = 0; i < BODY_TYPES.length; i += 3) rows.push(BODY_TYPES.slice(i, i + 3));
  return (
    <View style={{ gap: 10 }}>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', gap: 10 }}>
          {row.map(({ label, icon }) => {
            const on = values.includes(label);
            return (
              <TouchableOpacity
                key={label}
                onPress={() => onToggle(label)}
                activeOpacity={0.8}
                style={[
                  S.bodyCard,
                  { width: BODY_W },
                  on
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#f0f4f4', borderColor: colors.border },
                ]}
              >
                <MaterialIcons name={icon} size={28} color={on ? '#fff' : colors.textMuted} style={{ marginBottom: 6 }} />
                <Text style={{ color: on ? '#fff' : colors.text, fontSize: 12, fontWeight: '800', textAlign: 'center' }}>{label}</Text>
              </TouchableOpacity>
            );
          })}
          {row.length < 3 && Array(3 - row.length).fill(0).map((_, i) => <View key={i} style={{ width: BODY_W }} />)}
        </View>
      ))}
    </View>
  );
}

/** Segmented pill (for Transmission / Assembly) — multi-select */
function SegmentedPill({ options, values, onToggle, colors }) {
  return (
    <View style={[S.segWrap, { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#eaefee' }]}>
      {options.map((opt) => {
        const on = values.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onToggle(opt)}
            activeOpacity={0.8}
            style={[
              S.segBtn,
              on
                ? { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }
                : { backgroundColor: 'transparent' },
            ]}
          >
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 13, fontWeight: '900', letterSpacing: 0.3 }}>
              {opt.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** 2-column budget / mileage range cards */
function RangeCards({ cards, values, onToggle, colors }) {
  const rows = [];
  for (let i = 0; i < cards.length; i += 2) rows.push(cards.slice(i, i + 2));
  return (
    <View style={{ gap: 10, marginBottom: 16 }}>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', gap: 10 }}>
          {row.map(({ label, value }) => {
            const on = values.includes(value);
            return (
              <TouchableOpacity
                key={value}
                onPress={() => onToggle(value)}
                activeOpacity={0.8}
                style={[
                  S.rangeCard,
                  { width: CARD_W },
                  on
                    ? { backgroundColor: colors.primary + '0D', borderColor: colors.primary }
                    : { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={{ flex: 1 }}>
                  {on && (
                    <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', marginBottom: 2 }}>
                      Selected
                    </Text>
                  )}
                  <Text style={{ color: colors.text, fontSize: 14, fontWeight: '700' }}>{label}</Text>
                </View>
                <MaterialIcons
                  name={on ? 'check-circle' : 'add-circle-outline'}
                  size={22}
                  color={on ? colors.primary : colors.border}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            );
          })}
          {row.length === 1 && <View style={{ width: CARD_W }} />}
        </View>
      ))}
    </View>
  );
}

/** Min / Max text inputs */
function RangeInputs({ minLabel, maxLabel, minValue, maxValue, minPh, maxPh, onMinChange, onMaxChange, colors }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {[
        { label: minLabel, val: minValue, ph: minPh, change: onMinChange },
        { label: maxLabel, val: maxValue, ph: maxPh, change: onMaxChange },
      ].map(({ label, val, ph, change }) => (
        <View key={label} style={[S.inputBox, { flex: 1, backgroundColor: isDark(colors) ? colors.surfaceAlt : '#eaefee', borderColor: colors.border }]}>
          <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: '700', marginBottom: 4 }}>{label}</Text>
          <TextInput
            placeholder={ph}
            placeholderTextColor={colors.textDim}
            keyboardType="number-pad"
            value={val}
            onChangeText={change}
            style={{ color: colors.text, fontSize: 16, fontWeight: '700', padding: 0 }}
          />
        </View>
      ))}
    </View>
  );
}

/** Horizontal color dot scroll */
function ColorScroll({ values, onToggle, colors }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingVertical: 4 }}>
      {COLOR_MAP.map(({ name, hex, dark }) => {
        const on = values.includes(name);
        return (
          <TouchableOpacity key={name} onPress={() => onToggle(name)} activeOpacity={0.8} style={{ alignItems: 'center', gap: 6 }}>
            <View style={[S.colorCircle, { backgroundColor: hex, borderWidth: on ? 2.5 : (name === 'White' ? 1 : 0), borderColor: on ? colors.primary : '#ddd' }]}>
              {on && <MaterialIcons name="check" size={16} color={dark ? '#fff' : colors.primary} />}
            </View>
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 10, fontWeight: '700' }}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

/** Segmented control for doors / seats (numbers) */
function NumberSegment({ options, values, onToggle, suffix, colors }) {
  return (
    <View style={[S.numSeg, { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#eaefee' }]}>
      {options.map((opt) => {
        const on = values.includes(opt + (suffix || ''));
        const val = opt + (suffix || '');
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onToggle(val)}
            activeOpacity={0.8}
            style={[
              S.numBtn,
              on ? { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 } : {},
            ]}
          >
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 13, fontWeight: '900' }}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** Individual / Dealer seller toggle */
function SellerToggle({ values, onToggle, colors }) {
  const opts = [
    { key: 'Individuals', label: 'Individual', icon: 'person' },
    { key: 'Dealers',     label: 'Dealer',     icon: 'store' },
  ];
  return (
    <View style={[S.sellerWrap, { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#f0f4f4' }]}>
      {opts.map(({ key, label, icon }) => {
        const on = values.includes(key);
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onToggle(key)}
            activeOpacity={0.8}
            style={[
              S.sellerBtn,
              on ? { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 } : {},
            ]}
          >
            <MaterialIcons name={icon} size={20} color={on ? colors.primary : colors.textMuted} />
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 12, fontWeight: '900', marginLeft: 6, letterSpacing: 0.5 }}>
              {label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** Verified / Trusted / other trust option buttons */
function TrustChips({ options, values, onToggle, colors }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {options.map((opt) => {
        const on = values.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onToggle(opt)}
            activeOpacity={0.8}
            style={[
              S.trustChip,
              on
                ? { backgroundColor: colors.primary + '18', borderColor: colors.primary }
                : { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <MaterialIcons
              name={on ? 'verified' : 'shield'}
              size={18}
              color={on ? colors.primary : colors.textMuted}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: on ? colors.primary : colors.textMuted, fontSize: 12, fontWeight: '800' }}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ─── Main Sheet ────────────────────────────────────────────────────────── */
function FiltersSheetImpl({ visible, onClose, onApply, initial = {} }) {
  const { colors, mode } = useTheme();
  const dark = mode === 'dark';
  const bg = dark ? colors.background : '#f6fafa';
  const secBg = dark ? colors.surface : '#ffffff';

  const [state, setState] = useState(() => ({ ...emptyState(), ...initial }));

  const toggle = useCallback((key, value) => {
    setState((s) => ({
      ...s,
      [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value],
    }));
  }, []);
  const setField = useCallback((key, value) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);
  const reset = useCallback(() => setState(emptyState()), []);

  const totalSelected = useMemo(() => {
    let n = 0;
    for (const k of MULTI_KEYS) n += state[k]?.length || 0;
    if (state.keyword)  n += 1;
    if (state.yearMin  || state.yearMax)   n += 1;
    if (state.priceMin || state.priceMax)  n += 1;
    if (state.mileageMin || state.mileageMax) n += 1;
    if (state.engineMin || state.engineMax) n += 1;
    return n;
  }, [state]);

  const cnt = {
    location: state.cities.length + state.registeredIn.length,
    vehicle:  state.makes.length + state.models.length + state.body.length +
              state.transmission.length + state.fuel.length + state.assembly.length,
    price:    state.price.length + (state.priceMin || state.priceMax ? 1 : 0),
    mileage:  state.mileage.length + (state.mileageMin || state.mileageMax ? 1 : 0),
    year:     (state.yearMin || state.yearMax ? 1 : 0) + state.engineCapacity.length,
    physical: state.doors.length + state.seating.length + state.color.length,
    seller:   state.seller.length + state.trusted.length + state.properties.length,
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={S.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={[S.sheet, { backgroundColor: bg }]}>
        {/* ── AppBar ──────────────────────────────────────────────── */}
        <View style={[S.appBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={S.closeBtn} activeOpacity={0.7}>
            <MaterialIcons name="close" size={22} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={[S.appBarTitle, { color: colors.primary }]}>Filter Cars</Text>
            <Text style={[S.appBarSub, { color: colors.textMuted }]}>
              {totalSelected > 0
                ? `${totalSelected} filter${totalSelected > 1 ? 's' : ''} selected`
                : 'Find exactly what you want'}
            </Text>
          </View>
          {totalSelected > 0 && (
            <TouchableOpacity onPress={reset} activeOpacity={0.7} style={S.clearBtn}>
              <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 14 }}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

          {/* ── Where? ─────────────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: bg, borderBottomColor: colors.border }]}>
            <SectionHead title="Where?" count={cnt.location} colors={colors} />
            <PillChips options={CITIES} values={state.cities} onToggle={(v) => toggle('cities', v)} colors={colors} />
            <TouchableOpacity style={[S.registeredRow, { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#eaefee' }]}>
              <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>Registered City</Text>
              <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '800' }}>
                {state.registeredIn.length ? state.registeredIn.join(', ') : 'ALL CITIES'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Which Car? ─────────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: secBg, borderBottomColor: colors.border }]}>
            <SectionHead title="Which Car?" count={cnt.vehicle} colors={colors} />

            <Text style={[S.fieldLabel, { color: colors.textMuted }]}>CAR BRAND</Text>
            <BrandScroll values={state.makes} onToggle={(v) => toggle('makes', v)} colors={colors} isDark={dark} />

            <ModelPicker makes={state.makes} values={state.models} onToggle={(v) => toggle('models', v)} colors={colors} />

            <Text style={[S.fieldLabel, { color: colors.textMuted, marginTop: 20 }]}>BODY TYPE</Text>
            <BodyGrid values={state.body} onToggle={(v) => toggle('body', v)} colors={colors} />

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>TRANSMISSION</Text>
                <SegmentedPill
                  options={['Automatic', 'Manual']}
                  values={state.transmission}
                  onToggle={(v) => toggle('transmission', v)}
                  colors={colors}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>ASSEMBLY</Text>
                <SegmentedPill
                  options={['Local', 'Imported']}
                  values={state.assembly}
                  onToggle={(v) => toggle('assembly', v)}
                  colors={colors}
                />
              </View>
            </View>

            <Text style={[S.fieldLabel, { color: colors.textMuted, marginTop: 20 }]}>FUEL TYPE</Text>
            <PillChips options={FUELS} values={state.fuel} onToggle={(v) => toggle('fuel', v)} colors={colors} />
          </View>

          {/* ── Budget? ─────────────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: bg, borderBottomColor: colors.border }]}>
            <SectionHead title="Budget?" count={cnt.price} colors={colors} />
            <RangeCards cards={PRICE_CARDS} values={state.price} onToggle={(v) => toggle('price', v)} colors={colors} />
            <RangeInputs
              minLabel="Min (PKR)" maxLabel="Max (PKR)"
              minValue={state.priceMin} maxValue={state.priceMax}
              minPh="0" maxPh="Any"
              onMinChange={(t) => setField('priceMin', t.replace(/[^0-9]/g, ''))}
              onMaxChange={(t) => setField('priceMax', t.replace(/[^0-9]/g, ''))}
              colors={colors}
            />
          </View>

          {/* ── How Far Driven? ─────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: secBg, borderBottomColor: colors.border }]}>
            <SectionHead title="How Far Driven?" count={cnt.mileage} colors={colors} />
            <RangeCards cards={MILEAGE_CARDS} values={state.mileage} onToggle={(v) => toggle('mileage', v)} colors={colors} />
            <RangeInputs
              minLabel="Min KM" maxLabel="Max KM"
              minValue={state.mileageMin} maxValue={state.mileageMax}
              minPh="0" maxPh="Any"
              onMinChange={(t) => setField('mileageMin', t.replace(/[^0-9]/g, ''))}
              onMaxChange={(t) => setField('mileageMax', t.replace(/[^0-9]/g, ''))}
              colors={colors}
            />
          </View>

          {/* ── Year & Engine ────────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: bg, borderBottomColor: colors.border }]}>
            <SectionHead title="Year & Engine" count={cnt.year} colors={colors} />
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>YEAR RANGE</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TextInput
                    placeholder="2018"
                    placeholderTextColor={colors.textDim}
                    keyboardType="number-pad"
                    maxLength={4}
                    value={state.yearMin}
                    onChangeText={(t) => setField('yearMin', t.replace(/[^0-9]/g, ''))}
                    style={[S.yearInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
                  />
                  <Text style={{ color: colors.textMuted, fontWeight: '700' }}>to</Text>
                  <TextInput
                    placeholder="2024"
                    placeholderTextColor={colors.textDim}
                    keyboardType="number-pad"
                    maxLength={4}
                    value={state.yearMax}
                    onChangeText={(t) => setField('yearMax', t.replace(/[^0-9]/g, ''))}
                    style={[S.yearInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>ENGINE SIZE</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {ENGINE_CHIPS.map((cc) => {
                    const on = state.engineCapacity.includes(cc);
                    return (
                      <TouchableOpacity
                        key={cc}
                        onPress={() => toggle('engineCapacity', cc)}
                        activeOpacity={0.8}
                        style={[S.ccChip, on ? { backgroundColor: colors.primary, borderColor: colors.primary } : { backgroundColor: isDark(colors) ? colors.surfaceAlt : '#eaefee', borderColor: 'transparent' }]}
                      >
                        <Text style={{ color: on ? '#fff' : colors.text, fontSize: 11, fontWeight: '800' }}>{cc}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          {/* ── Car Details ──────────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: secBg, borderBottomColor: colors.border }]}>
            <SectionHead title="Car Details" count={cnt.physical} colors={colors} />

            <Text style={[S.fieldLabel, { color: colors.textMuted }]}>COLOR SELECTION</Text>
            <ColorScroll values={state.color} onToggle={(v) => toggle('color', v)} colors={colors} />

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>DOORS</Text>
                <NumberSegment
                  options={DOOR_OPTIONS}
                  values={state.doors}
                  onToggle={(v) => toggle('doors', v)}
                  suffix=" Doors"
                  colors={colors}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[S.fieldLabel, { color: colors.textMuted }]}>SEATING</Text>
                <NumberSegment
                  options={SEAT_OPTIONS}
                  values={state.seating}
                  onToggle={(v) => toggle('seating', v)}
                  suffix=" Seater"
                  colors={colors}
                />
              </View>
            </View>
          </View>

          {/* ── Seller & Trust ───────────────────────────────────────── */}
          <View style={[S.sec, { backgroundColor: secBg, borderBottomColor: 'transparent' }]}>
            <SectionHead title="Seller & Trust" count={cnt.seller} colors={colors} />
            <SellerToggle values={state.seller} onToggle={(v) => toggle('seller', v)} colors={colors} />
            <View style={{ marginTop: 14 }}>
              <Text style={[S.fieldLabel, { color: colors.textMuted }]}>TRUSTED CARS</Text>
              <TrustChips options={TRUSTED_OPTS} values={state.trusted} onToggle={(v) => toggle('trusted', v)} colors={colors} />
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={[S.fieldLabel, { color: colors.textMuted }]}>AD PROPERTIES</Text>
              <PillChips options={AD_PROPERTIES} values={state.properties} onToggle={(v) => toggle('properties', v)} colors={colors} />
            </View>
          </View>

        </ScrollView>

        {/* ── Fixed Bottom CTA ────────────────────────────────────── */}
        <View style={[S.footer, { backgroundColor: colors.surface + 'E8', borderTopColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => { onApply?.(state); onClose(); }}
            activeOpacity={0.9}
            style={S.ctaWrap}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark ?? colors.primary]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={S.cta}
            >
              <Text style={S.ctaText}>Show Cars</Text>
              {totalSelected > 0 && (
                <View style={S.ctaBadge}>
                  <Text style={S.ctaBadgeText}>{totalSelected} filter{totalSelected > 1 ? 's' : ''}</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default memo(FiltersSheetImpl);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const S = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    maxHeight: '96%', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    overflow: 'hidden',
  },

  /* AppBar */
  appBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 10,
    borderBottomWidth: 1,
  },
  closeBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginRight: 8 },
  appBarTitle: { fontSize: 17, fontWeight: '800' },
  appBarSub: { fontSize: 11, fontWeight: '500', marginTop: 1 },
  clearBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },

  /* Section */
  sec: { paddingHorizontal: 16, paddingVertical: 20, borderBottomWidth: 1 },
  secHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  secTitle: { fontSize: 16, fontWeight: '800', fontFamily: 'System' },
  secBadge: { marginLeft: 8, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, minWidth: 22, alignItems: 'center' },
  secBadgeText: { color: '#fff', fontSize: 11, fontWeight: '900' },

  /* Field label */
  fieldLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },

  /* Pills */
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { height: 44, paddingHorizontal: 18, borderRadius: 999, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },

  /* Registered row */
  registeredRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 12, padding: 14, borderRadius: 16,
  },

  /* Brand scroll */
  brandCard: {
    alignItems: 'center', padding: 10, borderRadius: 16,
    borderWidth: 2, position: 'relative', width: 72,
  },
  brandCircle: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  brandLabel: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
  brandCheck: {
    position: 'absolute', top: 4, right: 4,
    width: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },

  /* Model picker */
  pickerBtn: {
    height: 56, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, borderRadius: 16, borderWidth: 1,
  },
  pickerList: {
    borderWidth: 1, borderRadius: 16, marginTop: 4, overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1,
  },

  /* Body grid */
  bodyCard: {
    height: 88, borderRadius: 16, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', padding: 8,
  },

  /* Segmented pill */
  segWrap: { flexDirection: 'row', padding: 4, borderRadius: 999, height: 52 },
  segBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 999 },

  /* Range cards */
  rangeCard: {
    height: 68, borderRadius: 16, borderWidth: 1.5,
    flexDirection: 'row', alignItems: 'center', padding: 14,
  },

  /* Inputs */
  inputBox: { padding: 12, borderRadius: 16, borderWidth: 1 },

  /* Year */
  yearInput: {
    flex: 1, height: 44, borderRadius: 12, borderWidth: 1,
    textAlign: 'center', fontSize: 15, fontWeight: '700',
    paddingHorizontal: 8,
  },

  /* cc chips */
  ccChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },

  /* Color */
  colorCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },

  /* Number segment */
  numSeg: { flexDirection: 'row', padding: 4, borderRadius: 12, height: 48 },
  numBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },

  /* Seller */
  sellerWrap: { flexDirection: 'row', padding: 6, borderRadius: 20, height: 56 },
  sellerBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 16 },

  /* Trust */
  trustChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 14, borderWidth: 1.5,
  },

  /* Footer CTA */
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, borderTopWidth: 1,
  },
  ctaWrap: { borderRadius: 18, overflow: 'hidden' },
  cta: {
    height: 64, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 18,
  },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '900' },
  ctaBadge: {
    marginLeft: 12, backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999,
  },
  ctaBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
