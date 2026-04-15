import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import CarInfoModal from '../components/CarInfoModal'; // Ensure this path is correct

const TOTAL_STEPS = 3;

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
];
const REGIONS = ['Un-Registered', 'Punjab', 'Sindh', 'Islamabad', 'KPK', 'Balochistan'];

const COLORS_LIST = [
  { name: 'White', hex: '#ffffff', border: '#e2e8f0' },
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

export default function PostAdScreen({ navigation }) {
  const { colors, mode } = useTheme();
  const isLight = mode === 'light';

  const [carInfo, setCarInfo] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [mileage, setMileage] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('Un-Registered');
  const [color, setColor] = useState('White');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  const step = 1;
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const L = {
    primary: '#069494',
    primaryContainer: 'rgba(6,148,148,0.18)',
    background: '#ffffff',
    onSurface: '#0B132B',
    onSurfaceVariant: '#3d4a69',
    surfaceContainerLow: '#ffffff',
    surfaceContainerHigh: '#eef1f3',
    surfaceContainerHighest: '#e2e8f0',
    tertiary: '#27AE60',
    tertiaryContainer: 'rgba(39,174,96,0.10)',
    onTertiaryContainer: '#115e59',
    outlineVariant: '#e1e3e4',
    inverseSurface: '#2C3E50',
  };

  const D = {
    primary: colors.primary,
    primaryContainer: colors.primaryMuted,
    background: colors.background,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    surfaceContainerLow: colors.surface,
    surfaceContainerHigh: colors.surfaceAlt,
    surfaceContainerHighest: colors.border,
    tertiary: colors.success,
    tertiaryContainer: 'rgba(46,204,113,0.1)',
    onTertiaryContainer: colors.success,
    outlineVariant: colors.border,
    inverseSurface: colors.surfaceElevated,
  };

  const t = isLight ? L : D;

  const selectedCarLabel = carInfo
    ? [carInfo.year, carInfo.make, carInfo.model, carInfo.variant].filter(Boolean).join(' ')
    : null;

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: isLight ? '#ffffff' : colors.background }}
      >
        <View style={[styles.header, { borderBottomColor: t.outlineVariant, backgroundColor: isLight ? '#ffffff' : colors.background }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={24} color={t.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.onSurface }]}>Post an Ad</Text>
          <View style={[styles.avatarWrap, { borderColor: t.surfaceContainerHighest }]}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=32' }} style={styles.avatar} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.stepHeader}>
          <View style={styles.stepInfoRow}>
            <View>
              <Text style={[styles.stepLabel, { color: t.primary }]}>
                STEP {String(step + 1).padStart(2, '0')} OF {String(TOTAL_STEPS).padStart(2, '0')}
              </Text>
              <Text style={[styles.stepTitle, { color: t.onSurface }]}>Listing Details</Text>
            </View>
            <Text style={[styles.progressText, { color: t.primary }]}>{Math.round(progress)}%</Text>
          </View>
          <View style={[styles.progressBase, { backgroundColor: t.surfaceContainerHighest }]}>
            <View
              style={[styles.progressFill, { width: `${progress}%`, backgroundColor: t.primary }]}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setInfoModalVisible(true)}
          activeOpacity={0.85}
          style={[
            styles.carInfoBtn,
            {
              backgroundColor: t.surfaceContainerLow,
              borderColor: carInfo ? t.primary : t.outlineVariant,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={[styles.carInfoIcon, { backgroundColor: t.primaryContainer }]}>
              <MaterialIcons name="directions-car" size={24} color={t.primary} />
            </View>
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={[styles.carInfoKicker, { color: t.primary }]}>SELECTED VEHICLE</Text>
              <Text style={[styles.carInfoTitle, { color: t.onSurface }]} numberOfLines={1}>
                {selectedCarLabel || 'Select Car Info'}
              </Text>
            </View>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={carInfo ? t.primary : t.primaryContainer}
          />
        </TouchableOpacity>

        <SectionHeader icon="speed" title="Condition & Mileage" primary={t.primary} onSurface={t.onSurface} />
        <Field label="MILEAGE (KM)" variant={t}>
          <TextInput
            value={mileage}
            onChangeText={(v) => setMileage(v.replace(/[^0-9]/g, ''))}
            placeholder="e.g. 45000"
            placeholderTextColor={t.onSurfaceVariant}
            keyboardType="number-pad"
            style={[styles.input, { backgroundColor: t.surfaceContainerHigh, color: t.onSurface }]}
          />
        </Field>

        <Field label="CITY" variant={t}>
          <SelectBox
            value={city || 'Select City'}
            placeholder={!city}
            icon="search"
            onPress={() => {
              setShowCityPicker((v) => !v);
              setShowRegionPicker(false);
            }}
            t={t}
          />
          {showCityPicker && (
            <PickerList
              items={CITIES}
              onSelect={(v) => {
                setCity(v);
                setShowCityPicker(false);
              }}
              t={t}
            />
          )}
        </Field>

        <Field label="REGISTERED IN" variant={t}>
          <SelectBox
            value={region}
            icon="location-on"
            onPress={() => {
              setShowRegionPicker((v) => !v);
              setShowCityPicker(false);
            }}
            t={t}
          />
          {showRegionPicker && (
            <PickerList
              items={REGIONS}
              onSelect={(v) => {
                setRegion(v);
                setShowRegionPicker(false);
              }}
              t={t}
            />
          )}
        </Field>

        <SectionHeader icon="palette" title="Exterior Color" primary={t.primary} onSurface={t.onSurface} />
        <View style={styles.colorGrid}>
          {COLORS_LIST.map((c) => {
            const active = color === c.name;
            return (
              <TouchableOpacity
                key={c.name}
                onPress={() => setColor(c.name)}
                style={styles.colorCell}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.colorSwatch,
                    {
                      backgroundColor: c.hex,
                      borderColor: active ? t.primary : c.border || t.outlineVariant,
                      borderWidth: active ? 3 : 2,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.colorLabel,
                    { color: active ? t.primary : t.onSurfaceVariant, fontWeight: active ? '800' : '700' },
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={[
            styles.priceCard,
            {
              backgroundColor: t.surfaceContainerLow,
              borderColor: t.outlineVariant,
            },
          ]}
        >
          <SectionHeader
            icon="payments"
            title="Price (PKR)"
            primary={t.primary}
            onSurface={t.onSurface}
            noMargin
          />
          <View style={[styles.priceWrap, { backgroundColor: t.surfaceContainerHigh }]}>
            <Text style={[styles.priceCurrency, { color: t.onSurfaceVariant }]}>Rs.</Text>
            <TextInput
              value={price}
              onChangeText={(v) => setPrice(v.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor={t.surfaceContainerHighest}
              keyboardType="number-pad"
              style={[styles.priceInput, { color: t.onSurface }]}
            />
          </View>
        </View>

        <View style={styles.descHeader}>
          <SectionHeader icon="description" title="Ad Description" primary={t.primary} onSurface={t.onSurface} noMargin />
          <TouchableOpacity onPress={() => setDescription('')}>
            <Text style={[styles.resetText, { color: t.primary }]}>RESET</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.textareaWrap, { backgroundColor: t.surfaceContainerHigh }]}>
          <TextInput
            value={description}
            onChangeText={(v) => setDescription(v.slice(0, 1000))}
            placeholder="Describe your car (features, modifications, history)..."
            placeholderTextColor={isLight ? '#94a3b8' : t.onSurfaceVariant}
            multiline
            style={[styles.textarea, { color: t.onSurface }]}
          />
        </View>
        <View style={styles.tagRow}>
          {QUICK_TAGS.map((tag) => {
            const inDesc = description.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() =>
                  setDescription((d) =>
                    inDesc ? d.replace(tag, '').trim() : (d ? d + ' ' : '') + tag
                  )
                }
                style={[
                  styles.tagChip,
                  {
                    backgroundColor: isLight ? '#ffffff' : colors.surfaceAlt,
                    borderColor: inDesc ? t.primary : t.outlineVariant,
                  },
                ]}
              >
                <Text style={{ color: inDesc ? t.primary : t.onSurfaceVariant, fontSize: 11 }}>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={[styles.ctaBtn, { backgroundColor: t.primary, shadowColor: t.primary }]}
          activeOpacity={0.9}
        >
          <View style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Next Step: Review Listing</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#fff" />
          </View>
        </TouchableOpacity>

      </ScrollView>

      <CarInfoModal
        visible={infoModalVisible}
        initial={carInfo}
        onClose={() => setInfoModalVisible(false)}
        onDone={(info) => {
          setCarInfo(info);
          setInfoModalVisible(false);
        }}
      />
    </View>
  );
}

function SectionHeader({ icon, title, primary, onSurface, noMargin }) {
  return (
    <View style={[styles.sectionHeader, !noMargin && { marginTop: 36 }]}>
      <MaterialIcons name={icon} size={22} color={primary} />
      <Text style={[styles.sectionTitle, { color: onSurface }]}>{title}</Text>
    </View>
  );
}

function Field({ label, children, variant }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: variant.onSurfaceVariant, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginLeft: 4, marginBottom: 8 }}>
        {label}
      </Text>
      {children}
    </View>
  );
}

function SelectBox({ value, placeholder, icon, onPress, t }) {
  return (
    <Pressable onPress={onPress} style={[styles.input, styles.selectBox, { backgroundColor: t.surfaceContainerHigh }]}>
      <Text style={{ color: placeholder ? t.onSurfaceVariant : t.onSurface, fontSize: 15, fontWeight: '600', flex: 1 }}>{value}</Text>
      <MaterialIcons name={icon || 'expand-more'} size={22} color={t.onSurfaceVariant} />
    </Pressable>
  );
}

function PickerList({ items, onSelect, t }) {
  return (
    <View style={[styles.pickerList, { backgroundColor: t.surfaceContainerLow, borderColor: t.outlineVariant }]}>
      <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
        {items.map((it) => (
          <TouchableOpacity key={it} onPress={() => onSelect(it)} style={[styles.pickerRow, { borderBottomColor: t.outlineVariant }]}>
            <Text style={{ color: t.onSurface, fontSize: 14, fontWeight: '600' }}>{it}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: StyleSheet.hairlineWidth },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, marginLeft: 8, fontSize: 18, fontWeight: '900', letterSpacing: 1.5 },
  avatarWrap: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 60 },
  stepHeader: { marginBottom: 30 },
  stepInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  stepLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  stepTitle: { fontSize: 28, fontWeight: '800', marginTop: 4, letterSpacing: -0.6 },
  progressText: { fontSize: 22, fontWeight: '900' },
  progressBase: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  carInfoBtn: { padding: 18, borderRadius: 20, borderWidth: 2, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1, marginBottom: 8 },
  carInfoIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  carInfoKicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  carInfoTitle: { fontSize: 17, fontWeight: '900', marginTop: 2, letterSpacing: -0.3 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginLeft: 10, letterSpacing: -0.3 },
  input: { height: 56, borderRadius: 14, paddingHorizontal: 18, fontSize: 15, fontWeight: '600' },
  selectBox: { flexDirection: 'row', alignItems: 'center' },
  pickerList: { marginTop: 6, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  pickerRow: { paddingHorizontal: 18, paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  colorCell: { width: '20%', alignItems: 'center', marginBottom: 14 },
  colorSwatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, marginBottom: 6 },
  colorLabel: { fontSize: 10, fontWeight: '700' },
  priceCard: { padding: 22, borderRadius: 24, borderWidth: 1, marginTop: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  priceWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 6, marginTop: 6 },
  priceCurrency: { fontSize: 18, fontWeight: '800', marginRight: 10 },
  priceInput: { flex: 1, fontSize: 26, fontWeight: '900', paddingVertical: 16 },
  descHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, marginBottom: 12 },
  resetText: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  textareaWrap: { borderRadius: 18, padding: 14, position: 'relative' },
  textarea: { minHeight: 130, fontSize: 14, fontWeight: '500', textAlignVertical: 'top' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  tagChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 1, marginRight: 6, marginBottom: 6 },
  ctaBtn: { borderRadius: 22, overflow: 'hidden', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6, marginTop: 24 },
  ctaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '900', marginRight: 10, letterSpacing: -0.3 },
});
