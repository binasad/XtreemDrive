import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic Boost',
    price: 'PKR 500',
    duration: '3 Days',
    icon: 'trending-up',
    color: '#3498DB',
    features: [
      'Priority in search results',
      'Blue "Boosted" badge',
      'Up to 2x more views',
    ],
    popular: false,
  },
  {
    id: 'featured',
    name: 'Featured Ad',
    price: 'PKR 1,500',
    duration: '7 Days',
    icon: 'star',
    color: '#F39C12',
    features: [
      'Top of search results',
      'Gold "Featured" star badge',
      'Shown on home page carousel',
      'Up to 5x more views',
      'Priority in chat responses',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    price: 'PKR 3,500',
    duration: '15 Days',
    icon: 'workspace-premium',
    color: '#E74C3C',
    features: [
      'Everything in Featured +',
      'Banner ad on home screen',
      'Social media promotion',
      'Up to 10x more views',
      'Dedicated sales support',
      'Inspection report badge',
    ],
    popular: false,
  },
];

const ADD_ONS = [
  { id: 'inspect', label: 'Xtreem Inspection Report', price: 'PKR 4,999', icon: 'verified-user', desc: 'Full 200+ checkpoint car inspection' },
  { id: 'photo', label: 'Professional Photography', price: 'PKR 2,500', icon: 'camera-alt', desc: 'Studio-quality car photos (8 shots)' },
  { id: 'video', label: 'Video Walkaround', price: 'PKR 3,000', icon: 'videocam', desc: '60-sec professional video of your car' },
];

export default function BoostListingScreen({ route, navigation }) {
  const { colors, radius, mode } = useTheme();
  const listing = route?.params?.listing;
  const [selected, setSelected] = useState('featured');
  const [addOns, setAddOns] = useState([]);

  const toggleAddOn = (id) => {
    setAddOns((prev) => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const selectedPlan = PLANS.find(p => p.id === selected);

  const handleCheckout = () => {
    const addOnTotal = addOns.reduce((sum, id) => {
      const addon = ADD_ONS.find(a => a.id === id);
      return sum + parseInt(addon.price.replace(/[^0-9]/g, ''));
    }, 0);
    const planPrice = parseInt(selectedPlan.price.replace(/[^0-9]/g, ''));
    const total = planPrice + addOnTotal;

    Alert.alert(
      '🎉 Order Confirmed!',
      `${selectedPlan.name} activated for ${selectedPlan.duration}.\n\nTotal: PKR ${total.toLocaleString()}\n\nYour listing "${listing?.title || 'Car'}" is now boosted!`,
      [
        { text: 'Back to Dashboard', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="BOOST YOUR AD"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Listing Preview */}
        {listing && (
          <View style={[styles.preview, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
            <Image source={{ uri: listing.image }} style={styles.previewImg} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>{listing.title}</Text>
              <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 2 }}>{listing.price}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>{listing.year} • {listing.mileage}</Text>
            </View>
          </View>
        )}

        {/* Header */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: '900' }}>
            Choose Your <Text style={{ color: colors.primary }}>Plan</Text>
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4 }}>
            Sell faster with premium visibility
          </Text>
        </View>

        {/* Plans */}
        {PLANS.map((plan) => {
          const isActive = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.85}
              style={[
                styles.planCard,
                {
                  backgroundColor: isActive ? plan.color + '15' : colors.surfaceAlt,
                  borderColor: isActive ? plan.color : colors.border,
                  borderRadius: radius.lg,
                },
              ]}
            >
              {/* Popular tag */}
              {plan.popular && (
                <View style={[styles.popularTag, { backgroundColor: plan.color }]}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}

              {/* Header row */}
              <View style={styles.planHeader}>
                <View style={[styles.planIconWrap, { backgroundColor: plan.color + '20' }]}>
                  <MaterialIcons name={plan.icon} size={24} color={plan.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>{plan.name}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12 }}>{plan.duration}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: plan.color, fontWeight: '900', fontSize: 20 }}>{plan.price}</Text>
                </View>
              </View>

              {/* Features */}
              <View style={{ marginTop: 14 }}>
                {plan.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <MaterialIcons name="check-circle" size={16} color={plan.color} />
                    <Text style={{ color: colors.text, marginLeft: 8, fontSize: 13 }}>{f}</Text>
                  </View>
                ))}
              </View>

              {/* Selection indicator */}
              <View style={[styles.radioOuter, { borderColor: isActive ? plan.color : colors.border }]}>
                {isActive && <View style={[styles.radioInner, { backgroundColor: plan.color }]} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add-ons */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>
            Add-on <Text style={{ color: colors.primary }}>Services</Text>
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
            Boost your listing even further
          </Text>
        </View>

        {ADD_ONS.map((addon) => {
          const isOn = addOns.includes(addon.id);
          return (
            <TouchableOpacity
              key={addon.id}
              onPress={() => toggleAddOn(addon.id)}
              style={[
                styles.addonCard,
                {
                  backgroundColor: isOn ? colors.primaryMuted : colors.surfaceAlt,
                  borderColor: isOn ? colors.primary : colors.border,
                  borderRadius: radius.md,
                },
              ]}
            >
              <View style={[styles.addonIcon, { backgroundColor: isOn ? colors.primary + '20' : colors.surfaceHigh }]}>
                <MaterialIcons name={addon.icon} size={20} color={isOn ? colors.primary : colors.textMuted} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800' }}>{addon.label}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>{addon.desc}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 13 }}>{addon.price}</Text>
                <View style={[styles.checkbox, { borderColor: isOn ? colors.primary : colors.border, backgroundColor: isOn ? colors.primary : 'transparent' }]}>
                  {isOn && <MaterialIcons name="check" size={14} color="#fff" />}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Summary */}
        <View style={[styles.summary, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
          <Text style={{ color: colors.textMuted, fontSize: 11, letterSpacing: 2, fontWeight: '900' }}>ORDER SUMMARY</Text>
          <View style={[styles.summaryRow, { marginTop: 12 }]}>
            <Text style={{ color: colors.text }}>{selectedPlan.name} ({selectedPlan.duration})</Text>
            <Text style={{ color: colors.text, fontWeight: '800' }}>{selectedPlan.price}</Text>
          </View>
          {addOns.map((id) => {
            const a = ADD_ONS.find(x => x.id === id);
            return (
              <View key={id} style={styles.summaryRow}>
                <Text style={{ color: colors.text }}>{a.label}</Text>
                <Text style={{ color: colors.text, fontWeight: '800' }}>{a.price}</Text>
              </View>
            );
          })}
          <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>Total</Text>
            <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 20 }}>
              PKR {(
                parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) +
                addOns.reduce((s, id) => s + parseInt(ADD_ONS.find(a => a.id === id).price.replace(/[^0-9]/g, '')), 0)
              ).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ color: colors.textMuted, fontSize: 11 }}>Total</Text>
          <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 18 }}>
            PKR {(
              parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) +
              addOns.reduce((s, id) => s + parseInt(ADD_ONS.find(a => a.id === id).price.replace(/[^0-9]/g, '')), 0)
            ).toLocaleString()}
          </Text>
        </View>
        <PrimaryButton
          title="Proceed to Pay"
          icon="payment"
          onPress={handleCheckout}
          style={{ flex: 1.5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    flexDirection: 'row', alignItems: 'center',
    margin: 20, marginBottom: 16, padding: 10,
  },
  previewImg: { width: 80, height: 60, borderRadius: 10 },
  planCard: {
    marginHorizontal: 20, marginTop: 14,
    padding: 18, borderWidth: 1.5, position: 'relative',
  },
  popularTag: {
    position: 'absolute', top: -1, right: 16,
    paddingHorizontal: 10, paddingVertical: 4,
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
  },
  popularText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  planHeader: { flexDirection: 'row', alignItems: 'center' },
  planIconWrap: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  featureRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 6,
  },
  radioOuter: {
    position: 'absolute', top: 18, right: 18,
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6 },
  addonCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginTop: 10, padding: 14, borderWidth: 1,
  },
  addonIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', marginTop: 6,
  },
  summary: { margin: 20, padding: 18 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 14, paddingTop: 14, borderTopWidth: 1,
  },
  ctaBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row', alignItems: 'center',
  },
});
