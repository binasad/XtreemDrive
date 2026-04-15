import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';

const STEPS = [
  { icon: 'fact-check', title: 'Free Inspection', desc: 'We inspect your car with 200+ checkpoints to verify its condition.' },
  { icon: 'camera-alt', title: 'Pro Photography', desc: 'Studio-quality photos to make your listing stand out.' },
  { icon: 'star', title: 'Featured Listing', desc: 'Your ad gets premium placement on our home page and search.' },
  { icon: 'support-agent', title: 'Sales Agent', desc: 'A dedicated agent handles calls, negotiations and showings.' },
  { icon: 'handshake', title: 'Close the Deal', desc: 'We handle paperwork, registration transfer, and secure payment.' },
];

const PACKAGES = [
  {
    id: 'standard',
    name: 'Standard',
    price: 'PKR 15,000',
    commission: '1%',
    features: ['Free Inspection', 'Featured Ad (7 days)', 'Sales Agent Support'],
    color: '#3498DB',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'PKR 25,000',
    commission: '0.5%',
    features: ['Free Inspection', 'Pro Photography', 'Featured Ad (15 days)', 'Dedicated Sales Agent', 'Social Media Promo'],
    color: '#F39C12',
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 'PKR 40,000',
    commission: '0%',
    features: ['Everything in Premium +', 'Video Walkaround', 'Featured Ad (30 days)', 'Priority Negotiations', 'Fully Managed Sale', 'Money-back guarantee'],
    color: '#E74C3C',
    popular: false,
  },
];

export default function SellForMeScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [selected, setSelected] = useState('premium');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar title="SELL IT FOR ME" leftIcon="arrow-back" onLeftPress={() => navigation.goBack()} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={['#9B59B6', '#3498DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <MaterialIcons name="storefront" size={56} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', right: 20, top: 20 }} />
          <Text style={styles.heroKicker}>LET US HANDLE IT</Text>
          <Text style={styles.heroTitle}>Sell Your Car{'\n'}Without Hassle</Text>
          <Text style={styles.heroSub}>
            We inspect, photograph, list, and sell your car while you relax.
          </Text>
        </LinearGradient>

        {/* How it works */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>How It Works</Text>
        {STEPS.map((step, i) => (
          <View
            key={step.title}
            style={[styles.stepRow, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
          >
            <View style={[styles.stepNumber, { backgroundColor: colors.primaryMuted }]}>
              <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 14 }}>{i + 1}</Text>
            </View>
            <View style={[styles.stepIcon, { backgroundColor: colors.primary + '20' }]}>
              <MaterialIcons name={step.icon} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: colors.text, fontWeight: '800', fontSize: 14 }}>{step.title}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>{step.desc}</Text>
            </View>
          </View>
        ))}

        {/* Packages */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 28 }]}>Choose a Package</Text>
        {PACKAGES.map((pkg) => {
          const isActive = selected === pkg.id;
          return (
            <TouchableOpacity
              key={pkg.id}
              onPress={() => setSelected(pkg.id)}
              activeOpacity={0.85}
              style={[
                styles.pkgCard,
                {
                  backgroundColor: isActive ? pkg.color + '12' : colors.surfaceAlt,
                  borderColor: isActive ? pkg.color : colors.border,
                  borderRadius: radius.lg,
                },
              ]}
            >
              {pkg.popular && (
                <View style={[styles.popularTag, { backgroundColor: pkg.color }]}>
                  <Text style={styles.popularText}>RECOMMENDED</Text>
                </View>
              )}

              <View style={styles.pkgHeader}>
                <View>
                  <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18 }}>{pkg.name}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
                    + {pkg.commission} commission on sale
                  </Text>
                </View>
                <Text style={{ color: pkg.color, fontWeight: '900', fontSize: 22 }}>{pkg.price}</Text>
              </View>

              <View style={{ marginTop: 14 }}>
                {pkg.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <MaterialIcons name="check-circle" size={16} color={pkg.color} />
                    <Text style={{ color: colors.text, marginLeft: 8, fontSize: 13 }}>{f}</Text>
                  </View>
                ))}
              </View>

              <View style={[styles.radioOuter, { borderColor: isActive ? pkg.color : colors.border }]}>
                {isActive && <View style={[styles.radioInner, { backgroundColor: pkg.color }]} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Testimonial */}
        <View style={[styles.testimonial, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
          <MaterialIcons name="format-quote" size={28} color={colors.primary} style={{ opacity: 0.4 }} />
          <Text style={{ color: colors.text, fontStyle: 'italic', lineHeight: 22, marginTop: 8 }}>
            "Sold my Civic in just 4 days! The team handled everything from photos to paperwork. 
            Couldn't have been easier."
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#fff', fontWeight: '900' }}>AK</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>Ahmed Khan</Text>
              <Text style={{ color: colors.textMuted, fontSize: 11 }}>Sold Honda Civic 2023 • Lahore</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ color: colors.textMuted, fontSize: 11 }}>Starting from</Text>
          <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 18 }}>
            {PACKAGES.find(p => p.id === selected).price}
          </Text>
        </View>
        <PrimaryButton
          title="Get Started"
          icon="arrow-forward"
          onPress={() => {
            Alert.alert(
              '🎉 Request Submitted!',
              `You selected the ${PACKAGES.find(p => p.id === selected).name} package. Our team will contact you within 2 hours to schedule a car inspection.`,
              [{ text: 'Great!', onPress: () => navigation.goBack() }]
            );
          }}
          style={{ flex: 1.5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 24, paddingTop: 28, paddingBottom: 30 },
  heroKicker: { color: 'rgba(255,255,255,0.8)', fontSize: 10, letterSpacing: 2, fontWeight: '900' },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: 8, lineHeight: 34 },
  heroSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 10, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '900', paddingHorizontal: 20, marginTop: 24, marginBottom: 12 },
  stepRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, padding: 14, marginBottom: 8,
  },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    position: 'absolute', left: -4, top: -4,
  },
  stepIcon: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  pkgCard: {
    marginHorizontal: 20, marginBottom: 14,
    padding: 18, borderWidth: 1.5, position: 'relative',
  },
  popularTag: {
    position: 'absolute', top: -1, right: 16,
    paddingHorizontal: 10, paddingVertical: 4,
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
  },
  popularText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  pkgHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  radioOuter: {
    position: 'absolute', top: 18, right: 18,
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6 },
  testimonial: { margin: 20, padding: 18 },
  avatar: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  ctaBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row', alignItems: 'center',
  },
});
