import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import CarInfoModal from '../components/CarInfoModal';

const YEARS = ['Select Year', ...Array.from({ length: 2026 - 1990 + 1 }, (_, i) => String(2026 - i))];
const REGIONS = ['Un-Registered', 'Punjab', 'Sindh', 'Islamabad', 'KPK', 'Balochistan'];
const CITIES = ['Select City', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

const BENEFITS = [
  {
    icon: 'person',
    title: 'Dedicated Sales Expert',
    desc: 'A professional to manage every call and inquiry for you.',
  },
  {
    icon: 'payments',
    title: 'We Bargain for you',
    desc: 'Getting you the best market value through expert negotiation.',
  },
  {
    icon: 'security',
    title: 'Safe & Secure Transaction',
    desc: 'Verified buyers and secure payment documentation handled.',
  },
];

export default function SellForMeScreen({ navigation }) {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  // ------- Theme tokens -------
  // Dark = cinematic (from the HTML). Light = editorial white with teal accent.
  const accent = isDark ? '#E74C3C' : '#069494';
  const accentDark = isDark ? '#910807' : '#046f6f';

  const t = isDark
    ? {
        background: '#131313',
        surface: '#1c1b1b',
        surfaceHigh: '#353535',
        surfaceHighest: '#2a2a2a',
        surfaceInput: '#353535',
        text: '#e5e2e1',
        textMuted: '#848282',
        textSoft: '#c4c7c7',
        border: 'rgba(68,71,72,0.4)',
        divider: 'rgba(68,71,72,0.3)',
        tertiaryContainer: '#3e0000',
        logo: '#C8C6C5',
        toggleBg: '#353535',
        toggleActive: '#1c1b1b',
        heroGlow: 'rgba(62,0,0,0.2)',
        badgeBg: 'rgba(231,76,60,0.15)',
      }
    : {
        background: '#fafafa',
        surface: '#ffffff',
        surfaceHigh: '#f1f3f5',
        surfaceHighest: '#e9edf0',
        surfaceInput: '#f1f3f5',
        text: '#0b132b',
        textMuted: '#64748b',
        textSoft: '#475569',
        border: 'rgba(0,0,0,0.08)',
        divider: 'rgba(0,0,0,0.08)',
        tertiaryContainer: 'rgba(6,148,148,0.12)',
        logo: '#0b132b',
        toggleBg: '#e9edf0',
        toggleActive: '#ffffff',
        heroGlow: 'rgba(6,148,148,0.12)',
        badgeBg: 'rgba(6,148,148,0.08)',
      };

  // ------- State -------
  const [carInfoOpen, setCarInfoOpen] = useState(false);
  const [carInfo, setCarInfo] = useState(null);
  const [year, setYear] = useState(YEARS[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [city, setCity] = useState(CITIES[0]);
  const [assembly, setAssembly] = useState('Local');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [picker, setPicker] = useState(null); // 'year' | 'region' | 'city' | null
  const pickerItems =
    picker === 'year' ? YEARS : picker === 'region' ? REGIONS : picker === 'city' ? CITIES : [];

  const selectedCarLabel = carInfo
    ? [carInfo.year, carInfo.make, carInfo.model, carInfo.variant].filter(Boolean).join(' ')
    : 'Make, Model, Variant';

  const canSubmit =
    year !== 'Select Year' &&
    carInfo &&
    city !== 'Select City' &&
    fullName.trim() &&
    phone.trim() &&
    agreed;

  const onSubmit = () => {
    if (!canSubmit) {
      Alert.alert('Incomplete', 'Please fill all required fields and accept the terms.');
      return;
    }
    Alert.alert(
      'Request Registered',
      'Our expert will contact you within 2 hours to schedule the free inspection.',
      [{ text: 'Great', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      {/* Floating glass header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={[styles.headerRow, { backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : 'rgba(255,255,255,0.8)' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <MaterialIcons name="arrow-back" size={24} color={t.logo} />
          </TouchableOpacity>
          <Text style={[styles.logo, { color: t.logo }]}>XTREEM DRIVE</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 60 }}
      >
        {/* ---------- Hero ---------- */}
        <View style={styles.hero}>
          <View style={[styles.heroGlow, { backgroundColor: t.heroGlow }]} />
          <Text style={[styles.heroTitle, { color: t.text }]}>
            Get your car registered in{' '}
            <Text style={{ color: accent }}>Xtreem Drive Sell It For Me</Text>
          </Text>
          <Text style={[styles.heroSub, { color: t.textMuted }]}>
            Let Xtreem experts take the difficulty out of selling your car! We will manage your ad
            and find the best possible deal for you. Choose what's best for you today.
          </Text>
        </View>

        {/* ---------- Form ---------- */}
        <View style={styles.form}>
          {/* Model Year */}
          <FieldLabel t={t}>Model Year</FieldLabel>
          <SelectBox
            t={t}
            value={year}
            placeholder={year === 'Select Year'}
            onPress={() => setPicker('year')}
          />

          {/* Car Information */}
          <FieldLabel t={t} style={{ marginTop: 18 }}>
            Car Information
          </FieldLabel>
          <Pressable
            onPress={() => setCarInfoOpen(true)}
            style={({ pressed }) => [
              styles.input,
              {
                backgroundColor: t.surfaceInput,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
          >
            <Text
              style={{
                color: carInfo ? t.text : t.textMuted,
                fontSize: 15,
                fontWeight: carInfo ? '700' : '500',
                flex: 1,
              }}
              numberOfLines={1}
            >
              {selectedCarLabel}
            </Text>
            <MaterialIcons name="chevron-right" size={22} color={accent} />
          </Pressable>

          {/* Registered In + City */}
          <View style={{ flexDirection: 'row', marginTop: 18, gap: 12 }}>
            <View style={{ flex: 1 }}>
              <FieldLabel t={t}>Registered In</FieldLabel>
              <SelectBox t={t} value={region} onPress={() => setPicker('region')} />
            </View>
            <View style={{ flex: 1 }}>
              <FieldLabel t={t}>City</FieldLabel>
              <SelectBox
                t={t}
                value={city}
                placeholder={city === 'Select City'}
                onPress={() => setPicker('city')}
              />
            </View>
          </View>

          {/* Assembly toggle */}
          <FieldLabel t={t} style={{ marginTop: 18 }}>
            Assembly
          </FieldLabel>
          <View style={[styles.toggle, { backgroundColor: t.toggleBg }]}>
            {['Local', 'Imported'].map((opt) => {
              const active = assembly === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setAssembly(opt)}
                  style={[
                    styles.toggleOpt,
                    active && {
                      backgroundColor: t.toggleActive,
                      shadowColor: '#000',
                      shadowOpacity: isDark ? 0 : 0.06,
                      shadowRadius: 4,
                      elevation: 2,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? t.text : t.textMuted,
                      fontWeight: active ? '800' : '600',
                      fontSize: 13,
                    }}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Area */}
          <FieldLabel t={t} style={{ marginTop: 18 }}>
            Area / Location
          </FieldLabel>
          <Input value={area} onChangeText={setArea} placeholder="e.g. DHA Phase 6" t={t} />

          {/* Address */}
          <FieldLabel t={t} style={{ marginTop: 14 }}>
            Detailed Address
          </FieldLabel>
          <Input
            value={address}
            onChangeText={setAddress}
            placeholder="Street, House No, etc."
            t={t}
          />

          {/* Inspection slot */}
          <FieldLabel t={t} style={{ marginTop: 14 }}>
            Inspection Slot
          </FieldLabel>
          <Input
            value={slot}
            onChangeText={setSlot}
            placeholder="YYYY-MM-DD HH:MM"
            t={t}
            rightIcon="event"
            accent={accent}
          />

          {/* Contact */}
          <View style={[styles.divider, { backgroundColor: t.divider }]} />
          <Text style={[styles.sectionHeading, { color: t.text }]}>Contact Information</Text>
          <Input
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            t={t}
            style={{ marginTop: 12 }}
          />
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number (03XX-XXXXXXX)"
            keyboardType="phone-pad"
            t={t}
            style={{ marginTop: 12 }}
          />
        </View>

        {/* ---------- Benefits card ---------- */}
        <View style={[styles.benefitCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          {/* watermark icon */}
          <MaterialIcons
            name="verified-user"
            size={96}
            color={t.text}
            style={styles.benefitWatermark}
          />
          <Text style={[styles.benefitTitle, { color: t.text }]}>
            Let Xtreem Help You To Sell Your Car!
          </Text>
          <View style={{ marginTop: 20 }}>
            {BENEFITS.map((b) => (
              <View key={b.title} style={styles.benefitRow}>
                <View style={[styles.benefitIcon, { backgroundColor: t.tertiaryContainer }]}>
                  <MaterialIcons name={b.icon} size={22} color={accent} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={[styles.benefitName, { color: t.text }]}>{b.title}</Text>
                  <Text style={[styles.benefitDesc, { color: t.textMuted }]}>{b.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Service availability */}
          <View
            style={[
              styles.availBox,
              {
                backgroundColor: t.surfaceHigh,
                borderLeftColor: accent,
              },
            ]}
          >
            <Text style={[styles.availKicker, { color: t.textMuted }]}>SERVICE AVAILABILITY</Text>
            <Text style={[styles.availBody, { color: t.text }]}>
              Service available only in Karachi, Lahore, Islamabad, Rawalpindi, and Faisalabad.
            </Text>
          </View>
        </View>

        {/* ---------- Pricing + CTA ---------- */}
        <View style={[styles.pricingCard, { backgroundColor: t.surfaceHigh }]}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={[styles.priceAmount, { color: accent }]}>Rs. 2,000</Text>
            <Text style={[styles.priceUnit, { color: t.textMuted }]}> Initial Payment</Text>
          </View>
          <Text style={[styles.priceDesc, { color: t.text }]}>
            Initial payment starting from Rs. 2,000 will be charged. Final service fee is 1%
            commission once the car is sold.
          </Text>

          <Pressable onPress={() => setAgreed((v) => !v)} style={styles.agreeRow}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: agreed ? accent : t.textMuted,
                  backgroundColor: agreed ? accent : 'transparent',
                },
              ]}
            >
              {agreed && <MaterialIcons name="check" size={14} color="#fff" />}
            </View>
            <Text style={[styles.agreeText, { color: t.textMuted }]}>
              I agree to the{' '}
              <Text style={{ color: t.text, fontWeight: '700' }}>Terms of Service</Text> and{' '}
              <Text style={{ color: t.text, fontWeight: '700' }}>Privacy Policy</Text> for Sell It
              For Me.
            </Text>
          </Pressable>

          <TouchableOpacity
            onPress={onSubmit}
            activeOpacity={0.9}
            style={[
              styles.submitBtn,
              {
                backgroundColor: accent,
                shadowColor: accent,
                opacity: canSubmit ? 1 : 0.65,
              },
            ]}
          >
            <Text style={styles.submitText}>Register for Sell It For Me</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Featured Editorial Image ---------- */}
        <View style={styles.featured}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200',
            }}
            style={styles.featuredImg}
          />
          <LinearGradient
            colors={[
              'transparent',
              isDark ? 'rgba(19,19,19,0.4)' : 'rgba(250,250,250,0.4)',
              t.background,
            ]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.featuredBody}>
            <View style={[styles.featuredBadge, { backgroundColor: accent }]}>
              <Text style={styles.featuredBadgeText}>PRECISION GRADE</Text>
            </View>
            <Text style={styles.featuredHeadline}>READY FOR TAKEOFF?</Text>
          </View>
        </View>
      </ScrollView>

      {/* Picker modal for year / region / city */}
      <PickerModal
        visible={picker !== null}
        title={
          picker === 'year'
            ? 'Select Year'
            : picker === 'region'
            ? 'Registered In'
            : picker === 'city'
            ? 'Select City'
            : ''
        }
        items={pickerItems}
        current={picker === 'year' ? year : picker === 'region' ? region : city}
        onSelect={(v) => {
          if (picker === 'year') setYear(v);
          if (picker === 'region') setRegion(v);
          if (picker === 'city') setCity(v);
          setPicker(null);
        }}
        onClose={() => setPicker(null)}
        t={t}
        accent={accent}
      />

      {/* Car Info multi-step modal */}
      <CarInfoModal
        visible={carInfoOpen}
        initial={carInfo}
        onClose={() => setCarInfoOpen(false)}
        onDone={(info) => {
          setCarInfo(info);
          setCarInfoOpen(false);
        }}
      />
    </View>
  );
}

// --------- Small helpers ---------

function FieldLabel({ children, t, style }) {
  return (
    <Text
      style={[
        {
          color: t.textMuted,
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 1.6,
          marginBottom: 8,
        },
        style,
      ]}
    >
      {String(children).toUpperCase()}
    </Text>
  );
}

function SelectBox({ value, placeholder, onPress, t }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.input,
        {
          backgroundColor: t.surfaceInput,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text
        style={{
          color: placeholder ? t.textMuted : t.text,
          fontSize: 15,
          fontWeight: placeholder ? '500' : '700',
          flex: 1,
        }}
        numberOfLines={1}
      >
        {value}
      </Text>
      <MaterialIcons name="expand-more" size={22} color={t.textMuted} />
    </Pressable>
  );
}

function Input({ value, onChangeText, placeholder, keyboardType, t, style, rightIcon, accent }) {
  return (
    <View
      style={[
        styles.input,
        { backgroundColor: t.surfaceInput, paddingRight: rightIcon ? 14 : 18 },
        style,
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={t.textMuted}
        keyboardType={keyboardType}
        style={{
          color: t.text,
          fontSize: 15,
          fontWeight: '600',
          flex: 1,
          padding: 0,
        }}
      />
      {rightIcon && <MaterialIcons name={rightIcon} size={20} color={accent} />}
    </View>
  );
}

function PickerModal({ visible, title, items, current, onSelect, onClose, t, accent }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.pickerBackdrop}>
        <Pressable onPress={(e) => e.stopPropagation?.()} style={{ width: '100%' }}>
          <View style={[styles.pickerSheet, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={[styles.pickerHeader, { borderBottomColor: t.divider }]}>
              <Text style={[styles.pickerTitle, { color: t.text }]}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
                <MaterialIcons name="close" size={22} color={t.textMuted} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 360 }}>
              {items.map((it) => {
                const active = it === current;
                return (
                  <TouchableOpacity
                    key={it}
                    onPress={() => onSelect(it)}
                    style={[
                      styles.pickerRow,
                      { borderBottomColor: t.divider },
                      active && { backgroundColor: t.surfaceHigh },
                    ]}
                  >
                    <Text
                      style={{
                        color: t.text,
                        fontSize: 15,
                        fontWeight: active ? '800' : '600',
                      }}
                    >
                      {it}
                    </Text>
                    {active && <MaterialIcons name="check" size={18} color={accent} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerSafe: { zIndex: 50 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -0.5,
  },

  hero: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 26,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -60, left: -60,
    width: 220, height: 220, borderRadius: 110,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1.2,
    lineHeight: 42,
  },
  heroSub: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
    fontWeight: '400',
  },

  form: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  input: {
    minHeight: 54,
    borderRadius: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 14,
  },
  toggleOpt: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 30,
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },

  benefitCard: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 26,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  benefitWatermark: {
    position: 'absolute',
    top: 8, right: 8,
    opacity: 0.06,
  },
  benefitTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
  },
  benefitName: { fontSize: 14, fontWeight: '800' },
  benefitDesc: { fontSize: 12, marginTop: 3, lineHeight: 16 },
  availBox: {
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 8,
  },
  availKicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.6 },
  availBody: { fontSize: 13, marginTop: 4, lineHeight: 18, fontWeight: '500' },

  pricingCard: {
    marginTop: 18,
    marginHorizontal: 16,
    padding: 26,
    borderRadius: 22,
  },
  priceAmount: { fontSize: 26, fontWeight: '900', letterSpacing: -0.6 },
  priceUnit: { fontSize: 13, fontWeight: '600' },
  priceDesc: { fontSize: 13, lineHeight: 18, marginTop: 10, fontWeight: '500' },

  agreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 22,
    marginBottom: 10,
  },
  checkbox: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12, marginTop: 1,
  },
  agreeText: { fontSize: 12, flex: 1, lineHeight: 17 },

  submitBtn: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.2,
  },

  featured: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 320,
    borderRadius: 22,
    overflow: 'hidden',
  },
  featuredImg: {
    width: '100%',
    height: '100%',
  },
  featuredBody: {
    position: 'absolute',
    bottom: 24, left: 24,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  featuredHeadline: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1.2,
  },

  // Picker modal
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  pickerSheet: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerTitle: { fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
