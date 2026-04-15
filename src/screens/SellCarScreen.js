import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Available cities ───
const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Faisalabad',
];

// ─── Selling options data ───
const SELL_OPTIONS = [
  {
    id: 'self',
    icon: 'directions-car',
    title: 'Sell It Myself!',
    ctaLabel: 'POST AN AD',
    features: [
      { icon: 'check-circle', text: 'Post an ad in 2 minutes' },
      { icon: 'check-circle', text: '20 million users' },
      { icon: 'check-circle', text: 'Connect directly with buyers' },
    ],
    bgIcon: 'speed',
  },
  {
    id: 'premium',
    icon: 'stars',
    title: 'Sell It For Me',
    ctaLabel: 'REGISTER NOW',
    badge: 'Premium Service',
    features: [
      { icon: 'check-circle', text: 'Sell your car without hassle' },
      { icon: 'check-circle', text: 'Free Inspection & Featured ad' },
      { icon: 'check-circle', text: 'Maximize offer with sales agent' },
    ],
  },
];

export default function SellCarScreen({ navigation }) {
  const { colors, mode } = useTheme();
  const isLight = mode === 'light';

  // ─── Theme-aware design tokens ───
  // Light: Teal primary (#069494) matching the app's light theme
  // Dark: Cinematic red palette from app theme
  const t = {
    // Primary colors
    primary:              isLight ? '#069494' : colors.primary,
    primaryContainer:     isLight ? 'rgba(6,148,148,0.18)' : colors.primaryMuted,
    onPrimaryContainer:   isLight ? '#046f6f' : colors.text,
    gradientStart:        isLight ? '#046f6f' : colors.gradientStart,
    gradientEnd:          isLight ? '#069494' : colors.gradientEnd,

    // Surface / Background
    background:           isLight ? '#ffffff' : colors.background,
    surface:              isLight ? '#ffffff' : colors.background,
    surfaceContainerLow:  isLight ? '#f3f4f5' : colors.surface,
    surfaceContainerHigh: isLight ? '#e7e8e9' : colors.surfaceAlt,
    surfaceHighest:       isLight ? '#e1e3e4' : colors.surfaceElevated,

    // Text
    onSurface:            isLight ? '#0B132B' : colors.text,
    onSurfaceVariant:     isLight ? '#3d4a69' : colors.textMuted,
    outline:              isLight ? '#667393' : colors.textDim,

    // Accent / Tertiary (Green)
    tertiary:             isLight ? '#27AE60' : colors.success,
    tertiaryMuted:        isLight ? 'rgba(39,174,96,0.10)' : 'rgba(46,204,113,0.10)',

    // Header
    headerBg:             isLight ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,12,0.85)',

    // Card specific
    cardSelf:             isLight ? '#f3f4f5' : colors.surface,
    cardPremium:          isLight ? '#f3f4f5' : colors.surfaceAlt,

    // CTA Dark button
    ctaDark:              isLight ? '#069494' : colors.primary,
    ctaDarkText:          isLight ? '#ffffff' : '#ffffff',

    // Outline Variant
    outlineVariant:       isLight ? '#e1e3e4' : colors.border,

    // Glass
    glass:                isLight ? colors.glass : colors.glass,
  };

  // ─── Animations ───
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroSlide = useRef(new Animated.Value(30)).current;
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(heroFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(heroSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(card1Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(card2Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(footerAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: t.headerBg }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconBtn}
            hitSlop={12}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={t.primary}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.onSurface }]}>
            Xtreem Drive
          </Text>
          <View style={[styles.avatarPlaceholder, { backgroundColor: t.surfaceContainerHigh, borderColor: t.primaryContainer }]}>
            <MaterialIcons name="person" size={20} color={t.outline} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── Hero Section ─── */}
        <Animated.View
          style={[
            styles.heroSection,
            { opacity: heroFade, transform: [{ translateY: heroSlide }] },
          ]}
        >
          <Text style={[styles.heroTitle, { color: t.onSurface }]}>
            Sell Your Car Online{'\n'}in Pakistan{' '}
            <Text style={{ color: t.primary }}>
              Instantly!
            </Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: t.outline }]}>
            CHOOSE HOW TO SELL YOUR CAR
          </Text>
        </Animated.View>

        {/* ─── Selling Options ─── */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Sell It Myself */}
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: t.cardSelf,
                opacity: card1Anim,
                transform: [
                  {
                    translateY: card1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Background decorative icon */}
            <View style={styles.bgIconWrap}>
              <MaterialIcons name="speed" size={100} color={t.outlineVariant} style={{ opacity: 0.08 }} />
            </View>

            {/* Icon */}
            <View style={[styles.cardIconWrap, { backgroundColor: isLight ? '#ffffff' : colors.surfaceElevated }]}>
              <MaterialIcons name="directions-car" size={28} color={t.primary} />
            </View>

            <Text style={[styles.cardTitle, { color: t.onSurface }]}>
              Sell It Myself!
            </Text>

            {/* Features */}
            <View style={styles.featureList}>
              {SELL_OPTIONS[0].features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <MaterialIcons name="check-circle" size={22} color={t.tertiary} />
                  <Text style={[styles.featureText, { color: t.onSurfaceVariant }]}>
                    {f.text}
                  </Text>
                </View>
              ))}
            </View>

            {/* CTA Button with gradient */}
            <TouchableOpacity
              onPress={() => navigation.navigate('PostAd')}
              style={styles.ctaGradientWrap}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[t.gradientStart, t.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaGradientText}>POST AN AD</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Card 2: Sell It For Me (Premium) */}
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: t.cardPremium,
                opacity: card2Anim,
                transform: [
                  {
                    translateY: card2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Premium Badge */}
            <View style={[styles.premiumBadge, { backgroundColor: t.tertiaryMuted, borderColor: `${t.tertiary}33` }]}>
              <MaterialIcons name="verified" size={14} color={t.tertiary} />
              <Text style={[styles.premiumBadgeText, { color: t.tertiary }]}>
                PREMIUM SERVICE
              </Text>
            </View>

            {/* Artistic blur circle */}
            <View style={[styles.blurCircle, { backgroundColor: isLight ? 'rgba(112,93,0,0.04)' : 'rgba(255,77,61,0.04)' }]} />

            {/* Icon */}
            <View style={[styles.cardIconWrap, { backgroundColor: t.primaryContainer }]}>
              <MaterialIcons name="stars" size={28} color={t.onPrimaryContainer} />
            </View>

            <Text style={[styles.cardTitle, { color: t.onSurface }]}>
              Sell It For Me
            </Text>

            {/* Features */}
            <View style={styles.featureList}>
              {SELL_OPTIONS[1].features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <MaterialIcons name="check-circle" size={22} color={t.tertiary} />
                  <Text style={[styles.featureText, { color: t.onSurfaceVariant }]}>
                    {f.text}
                  </Text>
                </View>
              ))}
            </View>

            {/* CTA Button — dark solid */}
            <TouchableOpacity
              onPress={() => navigation.navigate('SellForMe')}
              style={[styles.ctaSolid, { backgroundColor: t.ctaDark }]}
              activeOpacity={0.9}
            >
              <Text style={[styles.ctaSolidText, { color: t.ctaDarkText }]}>
                REGISTER NOW
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* ─── Footer / Cities ─── */}
        <Animated.View
          style={[
            styles.footer,
            {
              borderTopColor: `${t.outlineVariant}26`,
              opacity: footerAnim,
            },
          ]}
        >
          <Text style={[styles.footerLabel, { color: t.outline }]}>
            AVAILABLE CITIES
          </Text>
          <Text style={[styles.footerCities, { color: t.onSurfaceVariant }]}>
            {CITIES.join('  •  ')}
          </Text>
          <Text style={[styles.footerDisclaimer, { color: t.outline }]}>
            * Service fees may apply for premium features. All listings are subject
            to verification and terms of service. Xtreem Drive acts as a platform
            and does not guarantee a sale. Inspection services are subject to
            location availability.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* ─── Desktop FAB ─── */}
      {Platform.OS === 'web' && (
        <TouchableOpacity style={styles.fabWrap} activeOpacity={0.9}>
          <LinearGradient
            colors={[t.gradientStart, t.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fab}
          >
            <MaterialIcons name="support-agent" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════════
// Styles
// ════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  // ─ Header ─
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // ─ Hero ─
  heroSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 14,
    textTransform: 'uppercase',
  },

  // ─ Cards Container ─
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 20,
  },

  // ─ Card ─
  card: {
    borderRadius: 32,
    padding: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  bgIconWrap: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  cardIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 20,
  },

  // ─ Features ─
  featureList: {
    marginBottom: 28,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    flex: 1,
  },

  // ─ CTA Buttons ─
  ctaGradientWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#705d00',
        shadowOpacity: 0.3,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 6 },
      default: {},
    }),
  },
  ctaGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaGradientText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  ctaSolid: {
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 6 },
      default: {},
    }),
  },
  ctaSolidText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // ─ Premium Badge ─
  premiumBadge: {
    position: 'absolute',
    top: 22,
    right: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // ─ Blur circle ─
  blurCircle: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
  },

  // ─ Footer ─
  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    paddingTop: 20,
    paddingHorizontal: 28,
    paddingBottom: 10,
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  footerCities: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  footerDisclaimer: {
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 360,
  },

  // ─ FAB ─
  fabWrap: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#705d00',
        shadowOpacity: 0.35,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 10 },
      default: {},
    }),
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
