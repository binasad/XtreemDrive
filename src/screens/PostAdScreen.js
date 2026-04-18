import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const MAKES = ['Toyota', 'Honda', 'Suzuki', 'Porsche', 'Ferrari', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia'];
const YEARS = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => String(2026 - i));
const MODELS_BY_MAKE = {
  Toyota: ['Corolla', 'Corolla Altis', 'Yaris', 'Camry', 'Fortuner', 'Hilux', 'Prius'],
  Honda: ['Civic', 'City', 'Accord', 'BR-V', 'HR-V', 'CR-V'],
  Suzuki: ['Alto', 'Cultus', 'Swift', 'Wagon R', 'Mehran', 'Bolan'],
  Porsche: ['911', '911 GT3', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  Ferrari: ['488', 'F8', 'SF90', 'Roma', 'Portofino'],
  BMW: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'M3', 'M5'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'AMG GT'],
  Audi: ['A3', 'A4', 'A6', 'Q5', 'Q7', 'RS6'],
  Hyundai: ['Elantra', 'Tucson', 'Sonata', 'Santa Fe'],
  Kia: ['Picanto', 'Sportage', 'Sorento', 'Stonic'],
};
const VARIANTS = ['Standard', 'GLi', 'XLi', 'Altis Grande', 'Altis X', 'Altis Hybrid', 'Turbo'];
const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
];
const REGIONS = ['Un-Registered', 'Punjab', 'Sindh', 'Islamabad', 'KPK', 'Balochistan'];
const COLORS_LIST = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Silver', hex: '#cbd5e1' },
  { name: 'Black', hex: '#0f172a' },
  { name: 'Grey', hex: '#64748b' },
  { name: 'Blue', hex: '#1d4ed8' },
  { name: 'Green', hex: '#15803d' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Gold', hex: '#eab308' },
  { name: 'Maroon', hex: '#7f1d1d' },
  { name: 'Beige', hex: '#fed7aa' },
];
const QUICK_TAGS = [
  'Bumper-to-Bumper Original',
  'Like New',
  'Authorized Workshop Maintained',
  'First Owner',
];
const MAX_DESC = 1000;

const ENGINE_TYPES = ['Petrol', 'Diesel', 'LPG', 'CNG', 'Hybrid', 'PHEV', 'Electric', 'REEV'];
const TRANSMISSIONS = [
  { id: 'Manual', icon: 'settings' },
  { id: 'Automatic', icon: 'auto-mode' },
  { id: 'DHT', icon: 'bolt' },
];
const FEATURES_LIST = [
  'ABS', 'Air Bags', 'Air Conditioning', 'Alloy Rims', 'Android Auto', 'Apple CarPlay',
  '360 Camera', 'Climate Control', 'Cruise Control', 'DRLs', 'Fog Lights', 'Front Camera',
  'Front Speakers', 'Head Up Display (HUD)', 'Heated Seats', 'Immobilizer Key',
  'Infotainment System', 'Keyless Entry', 'LED Headlights', 'Paddle Shifters',
  'Panoramic Sunroof', 'Parking Sensors', 'Power Locks', 'Power Mirrors', 'Power Seats',
  'Power Steering', 'Push Start', 'Rear AC Vents', 'Rear Camera', 'Rear Speakers',
  'Steering Switches', 'Sun Roof', 'TPMS', 'Traction Control', 'Ventilated Seats',
];

// ──────────────────────────────────────────────────────────────────────
// Theme tokens — maps to light/dark mode
// ──────────────────────────────────────────────────────────────────────
function useTokens() {
  const { mode } = useTheme();
  const isLight = mode === 'light';
  return useMemo(() => ({
    isLight,
    // surfaces
    bg:                    isLight ? '#f5f7f8' : '#0A0A0C',
    surfaceLow:            isLight ? '#ffffff' : '#111115',
    surfaceHigh:           isLight ? '#eef1f3' : '#1E1E24',
    surfaceHighest:        isLight ? '#e2e8f0' : '#2A2A32',
    headerBg:              isLight ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,12,0.85)',
    navBg:                 isLight ? 'rgba(255,255,255,0.92)' : 'rgba(17,17,21,0.92)',

    // text
    onSurface:             isLight ? '#1e293b' : '#F5F3F2',
    onSurfaceVariant:      isLight ? '#64748b' : '#B8B5B3',
    outlineVariant:        isLight ? '#cbd5e1' : '#2E2E36',
    placeholder:           isLight ? '#94a3b8' : '#6b6b72',

    // brand
    primary:               isLight ? '#006f62' : '#FF4D3D',
    primaryContainer:      isLight ? '#6de8dd' : 'rgba(255,77,61,0.25)',
    primarySoft:           isLight ? 'rgba(0,111,98,0.08)' : 'rgba(255,77,61,0.10)',
    primarySoftBorder:     isLight ? 'rgba(0,111,98,0.18)' : 'rgba(255,77,61,0.25)',
    gradientStart:         isLight ? '#006f62' : '#B51A0E',
    gradientEnd:           isLight ? '#0d9488' : '#FF4D3D',

    // tertiary
    tertiary:              isLight ? '#0d9488' : '#2ECC71',
    tertiaryContainer:     isLight ? 'rgba(204,251,241,0.5)' : 'rgba(46,204,113,0.12)',
    tertiaryBorder:        isLight ? 'rgba(13,148,136,0.25)' : 'rgba(46,204,113,0.28)',
    onTertiaryContainer:   isLight ? '#115e59' : '#7ee3a8',

    // inverse card (premium)
    inverseBg:             isLight ? '#2C3E50' : '#17171C',
    inverseText:           '#ffffff',
    inverseSub:            'rgba(255,255,255,0.72)',

    divider:               isLight ? '#e2e8f0' : '#2E2E36',
    shadowColor:           isLight ? 'rgba(0,0,0,0.04)' : 'transparent',
  }), [isLight]);
}

// ──────────────────────────────────────────────────────────────────────
// Small building blocks
// ──────────────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, right, t }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <MaterialIcons name={icon} size={22} color={t.primary} />
        <Text style={[styles.sectionTitle, { color: t.onSurface }]}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

function Label({ children, t }) {
  return (
    <Text style={[styles.label, { color: t.onSurfaceVariant }]}>{children}</Text>
  );
}

function Field({ t, children }) {
  return <View style={{ marginBottom: 0 }}>{children}</View>;
}

function TextField({ t, value, onChangeText, placeholder, keyboardType }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={t.placeholder}
      keyboardType={keyboardType || 'default'}
      style={[
        styles.input,
        { backgroundColor: t.surfaceHigh, color: t.onSurface },
      ]}
    />
  );
}

function SelectField({ t, value, options, onSelect, placeholder, trailingIcon = 'expand-more' }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((o) => !o)}
        style={[styles.input, styles.selectInput, { backgroundColor: t.surfaceHigh }]}
      >
        <Text
          style={{
            color: value ? t.onSurface : t.placeholder,
            fontSize: 15,
            fontWeight: '500',
            flex: 1,
          }}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <MaterialIcons name={trailingIcon} size={20} color={t.onSurfaceVariant} />
      </TouchableOpacity>
      {open && (
        <View style={[styles.dropdown, { backgroundColor: t.surfaceLow, borderColor: t.outlineVariant }]}>
          <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => { onSelect(opt); setOpen(false); }}
                style={[
                  styles.dropdownItem,
                  value === opt && { backgroundColor: t.primarySoft },
                ]}
              >
                <Text style={{
                  color: value === opt ? t.primary : t.onSurface,
                  fontWeight: value === opt ? '700' : '500',
                  fontSize: 14,
                }}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Car Info Modal — Year → Make → Model → Variant (dark bottom sheet)
// ──────────────────────────────────────────────────────────────────────
const STEPS = [
  { key: 'year', label: 'Model Year', question: 'Which year was your vehicle manufactured?', next: 'Continue to Make' },
  { key: 'make', label: 'Make', question: 'Who manufactured your vehicle?', next: 'Continue to Model' },
  { key: 'model', label: 'Model', question: 'Which model is your vehicle?', next: 'Continue to Variant' },
  { key: 'variant', label: 'Variant', question: 'Pick the exact trim / variant', next: 'Done' },
];

function CarInfoModal({ visible, initial, onClose, onDone }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [picks, setPicks] = useState(initial || {});

  React.useEffect(() => {
    if (visible) {
      setStepIdx(0);
      setPicks(initial || {});
    }
  }, [visible, initial]);

  const step = STEPS[stepIdx];
  const current = picks[step.key];

  const options = useMemo(() => {
    if (step.key === 'year') return YEARS;
    if (step.key === 'make') return MAKES;
    if (step.key === 'model') return MODELS_BY_MAKE[picks.make] || [];
    return VARIANTS;
  }, [step.key, picks.make]);

  const handlePick = (val) => {
    const next = { ...picks, [step.key]: val };
    // reset downstream picks if re-picking
    if (step.key === 'year') { next.make = undefined; next.model = undefined; next.variant = undefined; }
    if (step.key === 'make') { next.model = undefined; next.variant = undefined; }
    if (step.key === 'model') { next.variant = undefined; }
    setPicks(next);
  };

  const canContinue = !!current;
  const goNext = () => {
    if (stepIdx < STEPS.length - 1) setStepIdx(stepIdx + 1);
    else onDone(picks);
  };
  const goBack = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
    else onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={modalStyles.backdrop}>
        <View style={modalStyles.sheet}>
          {/* Header */}
          <View style={modalStyles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <TouchableOpacity onPress={goBack} hitSlop={10}>
                <MaterialIcons name={stepIdx === 0 ? 'close' : 'arrow-back'} size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={modalStyles.title}>Car Info</Text>
            </View>
            <View style={modalStyles.dotsRow}>
              {STEPS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    modalStyles.dot,
                    { backgroundColor: i === stepIdx ? '#006f62' : 'rgba(255,255,255,0.22)' },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Question */}
          <View style={modalStyles.questionBlock}>
            <Text style={modalStyles.questionTitle}>Select {step.label}</Text>
            <Text style={modalStyles.questionBody}>{step.question}</Text>
          </View>

          {/* List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {options.map((opt) => {
              const selected = current === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => handlePick(opt)}
                  style={[
                    modalStyles.item,
                    selected && { backgroundColor: '#006f62' },
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={[modalStyles.itemText, selected && { color: '#fff' }]}>{opt}</Text>
                  <MaterialIcons
                    name={selected ? 'check-circle' : 'arrow-forward-ios'}
                    size={selected ? 22 : 14}
                    color={selected ? '#fff' : 'rgba(255,255,255,0.15)'}
                  />
                </TouchableOpacity>
              );
            })}
            {options.length === 0 && (
              <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 40 }}>
                Pick a Make first.
              </Text>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <TouchableOpacity
              onPress={goNext}
              disabled={!canContinue}
              style={[
                modalStyles.cta,
                { backgroundColor: canContinue ? '#ffffff' : 'rgba(255,255,255,0.3)' },
              ]}
              activeOpacity={0.9}
            >
              <Text style={modalStyles.ctaText}>{step.next}</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#131313" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#1A1A1A',
    height: '90%',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    overflow: 'hidden',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 22, paddingBottom: 18,
    borderBottomWidth: 1, borderBottomColor: '#333333',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '900', fontStyle: 'italic', letterSpacing: -0.3 },
  dotsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#242424', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
    borderWidth: 1, borderColor: '#333333',
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  questionBlock: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 28, paddingVertical: 22,
  },
  questionTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  questionBody: { color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 4 },
  item: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    borderRadius: 14, marginBottom: 4,
  },
  itemText: { color: 'rgba(255,255,255,0.82)', fontSize: 17, fontWeight: '700' },
  footer: {
    padding: 18, backgroundColor: '#242424',
    borderTopWidth: 1, borderTopColor: '#333333',
  },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 18, borderRadius: 14,
  },
  ctaText: { color: '#131313', fontSize: 15, fontWeight: '900', letterSpacing: -0.2 },
});

// ──────────────────────────────────────────────────────────────────────
// Main screen
// ──────────────────────────────────────────────────────────────────────
export default function PostAdScreen({ navigation }) {
  const t = useTokens();

  const [carInfoModal, setCarInfoModal] = useState(false);
  const [carInfo, setCarInfo] = useState(null); // { year, make, model, variant }
  const [mileage, setMileage] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('Un-Registered');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [mobile, setMobile] = useState('');
  const [secondary, setSecondary] = useState('');
  const [boost, setBoost] = useState(false);
  const [engineType, setEngineType] = useState('Petrol');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [assembly, setAssembly] = useState('Local');
  const [transmission, setTransmission] = useState('Automatic');
  const [features, setFeatures] = useState(new Set([
    'ABS', 'Air Bags', 'Air Conditioning', 'Android Auto', 'Apple CarPlay',
    'Climate Control', 'Cruise Control', 'Front Speakers', 'Immobilizer Key',
    'Infotainment System', 'Keyless Entry', 'LED Headlights', 'Parking Sensors',
    'Power Locks', 'Power Mirrors', 'Power Steering', 'Push Start', 'Rear AC Vents',
    'Rear Camera', 'Rear Speakers', 'Steering Switches', 'TPMS', 'Traction Control',
  ]));

  const toggleFeature = (f) => {
    setFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f); else next.add(f);
      return next;
    });
  };
  const allFeaturesSelected = features.size === FEATURES_LIST.length;
  const toggleAllFeatures = () => {
    setFeatures(allFeaturesSelected ? new Set() : new Set(FEATURES_LIST));
  };

  const remainingChars = MAX_DESC - description.length;

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* ─── Header ─── */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: t.headerBg }}>
        <View style={[styles.header, { borderBottomColor: t.divider }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, { backgroundColor: t.surfaceHigh }]}
            hitSlop={10}
          >
            <MaterialIcons name="arrow-back" size={22} color={t.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.brand, { color: t.onSurface }]}>Xtreem Drive</Text>
          <View style={[styles.avatar, { backgroundColor: t.surfaceHighest, borderColor: t.outlineVariant }]}>
            <MaterialIcons name="person" size={20} color={t.onSurfaceVariant} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ─── Progress ─── */}
        <View style={styles.progressBlock}>
          <View style={styles.progressTop}>
            <View>
              <Text style={[styles.stepLabel, { color: t.primary }]}>STEP 02 OF 03</Text>
              <Text style={[styles.stepTitle, { color: t.onSurface }]}>Listing Details</Text>
            </View>
            <Text style={[styles.stepPct, { color: t.primary }]}>66%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: t.surfaceHighest }]}>
            <LinearGradient
              colors={[t.gradientStart, t.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: '66%' }]}
            />
          </View>
        </View>

        {/* ─── Vehicle Info ─── */}
        <View style={styles.section}>
          <SectionHeader icon="directions-car" title="Vehicle Info" t={t} />

          {/* Car Info quick-entry card */}
          <TouchableOpacity
            onPress={() => setCarInfoModal(true)}
            activeOpacity={0.85}
            style={[
              styles.carInfoCard,
              { backgroundColor: t.surfaceLow, borderColor: t.primarySoftBorder },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
              <View style={[styles.carInfoIcon, { backgroundColor: t.primarySoft }]}>
                <MaterialIcons name="directions-car" size={24} color={t.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.carInfoEyebrow, { color: t.primary }]}>SELECTED VEHICLE</Text>
                <Text style={[styles.carInfoTitle, { color: t.onSurface }]} numberOfLines={1}>
                  {carInfo
                    ? `${carInfo.year} ${carInfo.make} ${carInfo.model}${carInfo.variant ? ' ' + carInfo.variant : ''}`
                    : 'Select Car Info'}
                </Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color={t.primary} />
          </TouchableOpacity>

          {/* Condition & Mileage */}
          <View style={{ marginTop: 18, gap: 14 }}>
            <View>
              <Label t={t}>MILEAGE (KM)</Label>
              <TextField t={t} value={mileage} onChangeText={setMileage} placeholder="e.g. 45000" keyboardType="number-pad" />
            </View>
            <View>
              <Label t={t}>CITY</Label>
              <SelectField t={t} value={city} options={CITIES} onSelect={setCity} placeholder="Select City" trailingIcon="search" />
            </View>
            <View>
              <Label t={t}>REGISTERED IN</Label>
              <SelectField t={t} value={region} options={REGIONS} onSelect={setRegion} placeholder="Select" trailingIcon="location-on" />
            </View>
          </View>
        </View>

        {/* ─── Engine & Drivetrain ─── */}
        <View style={styles.section}>
          <View style={[styles.divHeader, { borderLeftColor: t.primary }]}>
            <Text style={[styles.divHeaderText, { color: t.onSurface }]}>Engine & Drivetrain</Text>
          </View>

          {/* Engine Type */}
          <Label t={t}>ENGINE TYPE</Label>
          <View style={styles.chipWrap}>
            {ENGINE_TYPES.map((e) => {
              const active = engineType === e;
              return (
                <TouchableOpacity
                  key={e}
                  onPress={() => setEngineType(e)}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: active ? t.primary : t.surfaceHigh,
                    },
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={{
                    fontSize: 11,
                    fontWeight: '800',
                    letterSpacing: 1.2,
                    color: active ? (t.isLight ? '#fff' : '#fff') : t.onSurfaceVariant,
                  }}>
                    {e.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Capacity + Assembly */}
          <View style={[styles.row2, { marginTop: 18 }]}>
            <View style={{ flex: 1 }}>
              <Label t={t}>ENGINE CAPACITY (CC)</Label>
              <TextField t={t} value={engineCapacity} onChangeText={setEngineCapacity} placeholder="e.g. 1800" keyboardType="number-pad" />
            </View>
            <View style={{ flex: 1 }}>
              <Label t={t}>ASSEMBLY</Label>
              <View style={[styles.segmentWrap, { backgroundColor: t.surfaceHigh }]}>
                {['Local', 'Imported'].map((opt) => {
                  const active = assembly === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => setAssembly(opt)}
                      style={[
                        styles.segmentBtn,
                        active && { backgroundColor: t.surfaceHighest },
                      ]}
                      activeOpacity={0.85}
                    >
                      <Text style={{
                        fontSize: 11, fontWeight: '800', letterSpacing: 1.2,
                        color: active ? t.onSurface : t.onSurfaceVariant,
                      }}>
                        {opt.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Transmission */}
          <View style={{ marginTop: 18 }}>
            <Label t={t}>TRANSMISSION</Label>
            <View style={styles.transWrap}>
              {TRANSMISSIONS.map((tr) => {
                const active = transmission === tr.id;
                return (
                  <TouchableOpacity
                    key={tr.id}
                    onPress={() => setTransmission(tr.id)}
                    style={[
                      styles.transBtn,
                      {
                        borderColor: active ? t.primary : t.outlineVariant,
                        backgroundColor: active ? t.primarySoft : 'transparent',
                        borderWidth: active ? 2 : 1,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    <MaterialIcons
                      name={tr.icon}
                      size={22}
                      color={active ? t.primary : t.onSurfaceVariant}
                    />
                    <Text style={{
                      fontSize: 10, fontWeight: '800', letterSpacing: 1.2,
                      marginTop: 6,
                      color: active ? t.primary : t.onSurfaceVariant,
                    }}>
                      {tr.id.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ─── Features ─── */}
        <View style={styles.section}>
          <View style={styles.featuresHeaderRow}>
            <View style={[styles.divHeader, { borderLeftColor: t.primary, marginBottom: 0 }]}>
              <Text style={[styles.divHeaderText, { color: t.onSurface }]}>Features</Text>
            </View>
            <TouchableOpacity onPress={toggleAllFeatures}>
              <Text style={{ fontSize: 11, fontWeight: '800', letterSpacing: 1.2, color: t.primary }}>
                {allFeaturesSelected ? 'CLEAR ALL' : 'SELECT ALL'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuresGrid}>
            {FEATURES_LIST.map((f) => {
              const checked = features.has(f);
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => toggleFeature(f)}
                  activeOpacity={0.85}
                  style={[
                    styles.featureItem,
                    { backgroundColor: checked ? t.primarySoft : t.surfaceLow, borderColor: checked ? t.primarySoftBorder : 'transparent' },
                  ]}
                >
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: checked ? t.primary : 'transparent',
                        borderColor: checked ? t.primary : t.outlineVariant,
                      },
                    ]}
                  >
                    {checked && <MaterialIcons name="check" size={14} color="#fff" />}
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: checked ? t.onSurface : t.onSurfaceVariant,
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── Exterior Color ─── */}
        <View style={styles.section}>
          <SectionHeader icon="palette" title="Exterior Color" t={t} />
          <View style={styles.colorGrid}>
            {COLORS_LIST.map((c) => {
              const selected = color === c.name;
              return (
                <TouchableOpacity
                  key={c.name}
                  onPress={() => setColor(c.name)}
                  style={styles.colorItem}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: c.hex, borderColor: selected ? t.primary : t.outlineVariant },
                      selected && styles.colorSwatchSelected,
                    ]}
                  />
                  <Text style={[styles.colorLabel, { color: selected ? t.primary : t.onSurfaceVariant }]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── Price ─── */}
        <View style={[styles.priceCard, {
          backgroundColor: t.surfaceLow,
          borderColor: t.outlineVariant,
        }]}>
          <SectionHeader icon="payments" title="Price (PKR)" t={t} />
          <View style={[styles.priceInputWrap, { backgroundColor: t.surfaceHigh }]}>
            <Text style={[styles.priceCurrency, { color: t.onSurfaceVariant }]}>Rs.</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0"
              placeholderTextColor={t.placeholder}
              keyboardType="number-pad"
              style={[styles.priceInput, { color: t.onSurface }]}
            />
          </View>
          <View style={[styles.infoBanner, { backgroundColor: t.primarySoft, borderColor: t.primarySoftBorder }]}>
            <MaterialIcons name="info" size={16} color={t.primary} />
            <Text style={[styles.infoText, { color: t.onSurfaceVariant }]}>
              Please enter a{' '}
              <Text style={{ color: t.primary, fontWeight: '800' }}>realistic price</Text>{' '}
              to get more genuine responses.
            </Text>
          </View>
        </View>

        {/* ─── Ad Description ─── */}
        <View style={styles.section}>
          <SectionHeader
            icon="description"
            title="Ad Description"
            t={t}
            right={
              <TouchableOpacity onPress={() => { setDescription(''); setActiveTags([]); }}>
                <Text style={[styles.resetLink, { color: t.primary }]}>RESET</Text>
              </TouchableOpacity>
            }
          />
          <View style={[styles.textareaWrap, { backgroundColor: t.surfaceHigh }]}>
            <TextInput
              value={description}
              onChangeText={(v) => v.length <= MAX_DESC && setDescription(v)}
              placeholder="Describe your car (features, modifications, history)..."
              placeholderTextColor={t.placeholder}
              multiline
              textAlignVertical="top"
              style={[styles.textarea, { color: t.onSurface }]}
            />
            <View style={[styles.charCounter, { backgroundColor: t.isLight ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.35)' }]}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: t.onSurfaceVariant }}>
                Remaining <Text style={{ color: t.primary }}>{remainingChars}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.tagsWrap}>
            {QUICK_TAGS.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tagChip,
                    {
                      backgroundColor: active ? t.primarySoft : t.surfaceLow,
                      borderColor: active ? t.primary : t.outlineVariant,
                    },
                  ]}
                >
                  <Text style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: active ? t.primary : t.onSurfaceVariant,
                  }}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── Upload Photos ─── */}
        <View style={styles.section}>
          <SectionHeader
            icon="add-a-photo"
            title="Upload Photos"
            t={t}
            right={
              <View style={[styles.counterPill, { backgroundColor: t.surfaceHighest }]}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: t.onSurfaceVariant }}>0/20</Text>
              </View>
            }
          />
          <View style={styles.photoGrid}>
            <TouchableOpacity
              style={[
                styles.coverPhoto,
                { backgroundColor: t.surfaceHigh, borderColor: t.outlineVariant },
              ]}
              activeOpacity={0.85}
            >
              <View style={[styles.coverIconCircle, { backgroundColor: t.primarySoft }]}>
                <MaterialIcons name="cloud-upload" size={26} color={t.primary} />
              </View>
              <Text style={[styles.coverLabel, { color: t.onSurfaceVariant }]}>COVER PHOTO</Text>
            </TouchableOpacity>
            <View style={styles.photoCol}>
              <TouchableOpacity style={[styles.photoSlot, { backgroundColor: t.surfaceLow, borderColor: t.outlineVariant }]}>
                <MaterialIcons name="add" size={26} color={t.outlineVariant} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.photoSlot, { backgroundColor: t.surfaceLow, borderColor: t.outlineVariant }]}>
                <MaterialIcons name="add" size={26} color={t.outlineVariant} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.verifiedBanner, { backgroundColor: t.tertiaryContainer, borderColor: t.tertiaryBorder }]}>
            <MaterialIcons name="verified" size={18} color={t.tertiary} />
            <Text style={{ fontSize: 12, color: t.onTertiaryContainer, flex: 1, lineHeight: 16 }}>
              Adding at least <Text style={{ fontWeight: '800' }}>8 pictures</Text> improves the chances for a quick sale.
            </Text>
          </View>
        </View>

        {/* ─── Contact Info ─── */}
        <View style={styles.section}>
          <SectionHeader icon="contact-phone" title="Contact Information" t={t} />
          <View style={{ gap: 14 }}>
            <View>
              <Label t={t}>MOBILE NUMBER</Label>
              <TextField t={t} value={mobile} onChangeText={setMobile} placeholder="03XXXXXXXXX" keyboardType="phone-pad" />
            </View>
            <View>
              <Label t={t}>SECONDARY NUMBER (OPTIONAL)</Label>
              <TextField t={t} value={secondary} onChangeText={setSecondary} placeholder="e.g. 03XXXXXXXXX" keyboardType="phone-pad" />
            </View>
          </View>
        </View>

        {/* ─── Premium Placement ─── */}
        <View style={[styles.premiumCard, { backgroundColor: t.inverseBg }]}>
          <View style={[styles.premiumBlur1, { backgroundColor: 'rgba(255,77,61,0.18)' }]} />
          <View style={[styles.premiumBlur2, { backgroundColor: t.primaryContainer }]} />
          <View style={styles.premiumRow}>
            <MaterialIcons name="bolt" size={20} color={t.primaryContainer} />
            <Text style={[styles.premiumEyebrow, { color: t.primaryContainer }]}>PREMIUM PLACEMENT</Text>
          </View>
          <Text style={[styles.premiumTitle, { color: t.inverseText }]}>Boost Your Ad</Text>
          <Text style={[styles.premiumBody, { color: t.inverseSub }]}>
            Reach 5x more buyers with featured placement at the top of search results.
          </Text>
          <View style={styles.premiumFooter}>
            <View style={styles.premiumPriceRow}>
              <Text style={[styles.premiumPrice, { color: t.primaryContainer }]}>$19</Text>
              <Text style={[styles.premiumPriceSub, { color: t.inverseSub }]}>/ 7 days</Text>
            </View>
            <Switch
              value={boost}
              onValueChange={setBoost}
              trackColor={{ false: 'rgba(255,255,255,0.2)', true: t.primaryContainer }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* ─── Submit ─── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <TouchableOpacity activeOpacity={0.9} style={styles.submitWrap}>
            <LinearGradient
              colors={[t.gradientStart, t.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitBtn}
            >
              <Text style={styles.submitText}>Next Step: Review Listing</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 16, alignItems: 'center' }}>
            <Text style={[styles.draftText, { color: t.onSurfaceVariant }]}>SAVE AS DRAFT</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <CarInfoModal
        visible={carInfoModal}
        initial={carInfo}
        onClose={() => setCarInfoModal(false)}
        onDone={(picks) => { setCarInfo(picks); setCarInfoModal(false); }}
      />
    </View>
  );
}

// ══════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  // Header
  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  brand: {
    flex: 1, marginLeft: 12,
    fontSize: 18, fontWeight: '900',
    fontStyle: 'italic', letterSpacing: -0.3,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },

  scroll: { paddingBottom: 20 },

  // Progress
  progressBlock: {
    paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8,
  },
  progressTop: {
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'space-between', marginBottom: 12,
  },
  stepLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  stepTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.6, marginTop: 4 },
  stepPct: { fontSize: 22, fontWeight: '900' },
  progressTrack: {
    height: 6, borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 3 },

  // Section
  section: {
    paddingHorizontal: 20, paddingTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },

  label: {
    fontSize: 11, fontWeight: '800',
    letterSpacing: 1.2, marginBottom: 8, marginLeft: 4,
  },

  input: {
    borderRadius: 14,
    paddingHorizontal: 18, paddingVertical: 14,
    fontSize: 15, fontWeight: '500',
  },
  selectInput: {
    flexDirection: 'row', alignItems: 'center',
  },
  dropdown: {
    marginTop: 6,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 18, paddingVertical: 12,
  },

  row2: { flexDirection: 'row', gap: 12 },

  // Colors
  colorGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', rowGap: 16,
  },
  colorItem: {
    width: '20%', alignItems: 'center',
  },
  colorSwatch: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 2,
  },
  colorSwatchSelected: {
    ...Platform.select({
      ios: { shadowColor: '#006f62', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
    }),
  },
  colorLabel: {
    fontSize: 10, fontWeight: '700', marginTop: 6,
  },

  // Price
  priceCard: {
    marginHorizontal: 20, marginTop: 28,
    borderRadius: 24, padding: 22,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 1 },
    }),
  },
  priceInputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 18, paddingHorizontal: 18, paddingVertical: 8,
    marginBottom: 14,
  },
  priceCurrency: { fontSize: 20, fontWeight: '800', marginRight: 10 },
  priceInput: {
    flex: 1, fontSize: 26, fontWeight: '900',
    paddingVertical: 14,
  },
  infoBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    padding: 12, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth,
  },
  infoText: { fontSize: 12, flex: 1, lineHeight: 18 },

  // Description
  resetLink: { fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  textareaWrap: {
    borderRadius: 18, padding: 14, position: 'relative',
  },
  textarea: {
    fontSize: 14, fontWeight: '500',
    minHeight: 130, paddingRight: 0,
  },
  charCounter: {
    position: 'absolute', bottom: 10, right: 12,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  tagsWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 8, marginTop: 14,
  },
  tagChip: {
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 999, borderWidth: 1,
  },

  // Photos
  counterPill: {
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999,
  },
  photoGrid: {
    flexDirection: 'row', gap: 10, height: 280,
  },
  coverPhoto: {
    flex: 2,
    borderRadius: 24, borderWidth: 2, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  coverIconCircle: {
    width: 50, height: 50, borderRadius: 25,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  coverLabel: {
    fontSize: 11, fontWeight: '800', letterSpacing: 2,
  },
  photoCol: { flex: 1, gap: 10 },
  photoSlot: {
    flex: 1, borderRadius: 18, borderWidth: 2, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  verifiedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 16, borderWidth: StyleSheet.hairlineWidth,
    marginTop: 18,
  },

  // Premium
  premiumCard: {
    marginHorizontal: 20, marginTop: 28,
    borderRadius: 24, padding: 22,
    overflow: 'hidden', position: 'relative',
  },
  premiumBlur1: {
    position: 'absolute', right: -30, top: -30,
    width: 120, height: 120, borderRadius: 60, opacity: 0.6,
  },
  premiumBlur2: {
    position: 'absolute', left: -30, bottom: -30,
    width: 100, height: 100, borderRadius: 50, opacity: 0.2,
  },
  premiumRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  premiumEyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  premiumTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5, marginTop: 10 },
  premiumBody: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  premiumFooter: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 16,
  },
  premiumPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  premiumPrice: { fontSize: 26, fontWeight: '900' },
  premiumPriceSub: { fontSize: 11, fontWeight: '700' },

  // Submit
  submitWrap: {
    borderRadius: 18, overflow: 'hidden', marginTop: 20,
    ...Platform.select({
      ios: { shadowColor: '#006f62', shadowOpacity: 0.3, shadowRadius: 16, shadowOffset: { width: 0, height: 10 } },
      android: { elevation: 6 },
    }),
  },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 18,
  },
  submitText: {
    color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: -0.2,
  },
  draftText: {
    fontSize: 12, fontWeight: '800', letterSpacing: 2,
  },

  // Divider header (Engine / Features)
  divHeader: {
    borderLeftWidth: 4, paddingLeft: 12,
    marginBottom: 16,
  },
  divHeaderText: {
    fontSize: 17, fontWeight: '800', letterSpacing: -0.3,
  },

  // Engine type pills
  chipWrap: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
  },
  pill: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 8,
  },

  // Assembly segment
  segmentWrap: {
    flexDirection: 'row',
    borderRadius: 10, padding: 4, gap: 4,
  },
  segmentBtn: {
    flex: 1, paddingVertical: 12,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 8,
  },

  // Transmission
  transWrap: {
    flexDirection: 'row', gap: 10,
  },
  transBtn: {
    flex: 1, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 12,
  },

  // Features
  featuresHeaderRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 8,
  },
  featureItem: {
    width: '48.5%',
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 12,
    borderRadius: 10, borderWidth: 1,
  },
  checkbox: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },

  // Car Info quick-entry card
  carInfoCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 18, borderRadius: 18, borderWidth: 2,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 1 },
    }),
  },
  carInfoIcon: {
    width: 48, height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  carInfoEyebrow: {
    fontSize: 10, fontWeight: '800', letterSpacing: 1.6,
  },
  carInfoTitle: {
    fontSize: 17, fontWeight: '800', letterSpacing: -0.3, marginTop: 2,
  },
});
