import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';
import { featuredCars } from '../data/mock';

const { width: SW } = Dimensions.get('window');

const STATS = [
  { label: 'Active', value: '05', icon: 'list-alt', accent: '#27AE60' },
  { label: 'Views', value: '1,203', icon: 'visibility', accent: '#3498DB' },
  { label: 'Leads', value: '47', icon: 'mail', accent: '#F39C12' },
];

const QUICK_ACTIONS = [
  { id: 'post', icon: 'add-circle', label: 'Post New Ad', color: '#27AE60' },
  { id: 'boost', icon: 'rocket-launch', label: 'Boost Ad', color: '#F39C12' },
  { id: 'renew', icon: 'autorenew', label: 'Renew Ad', color: '#3498DB' },
  { id: 'sellfor', icon: 'storefront', label: 'Sell It For Me', color: '#9B59B6' },
];

// mock listing data with status
const MY_LISTINGS = [
  {
    ...featuredCars[0],
    status: 'active',
    daysLeft: 22,
    views: 248,
    inquiries: 12,
    favorites: 33,
    isFeatured: true,
    isBoosted: false,
    postedDate: '3 Apr 2026',
  },
  {
    ...featuredCars[1],
    status: 'active',
    daysLeft: 15,
    views: 180,
    inquiries: 8,
    favorites: 21,
    isFeatured: false,
    isBoosted: true,
    postedDate: '10 Apr 2026',
  },
  {
    ...featuredCars[2],
    status: 'expiring',
    daysLeft: 2,
    views: 420,
    inquiries: 25,
    favorites: 56,
    isFeatured: false,
    isBoosted: false,
    postedDate: '28 Mar 2026',
  },
  {
    ...featuredCars[3],
    status: 'sold',
    daysLeft: 0,
    views: 860,
    inquiries: 42,
    favorites: 78,
    isFeatured: true,
    isBoosted: true,
    postedDate: '15 Mar 2026',
  },
];

const TAB_FILTERS = ['All', 'Active', 'Expiring', 'Sold'];

export default function SellerDashboardScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const [tab, setTab] = useState(0);

  const filtered = tab === 0
    ? MY_LISTINGS
    : MY_LISTINGS.filter(l => l.status === TAB_FILTERS[tab].toLowerCase());

  const statusColor = (s) => {
    if (s === 'active') return '#27AE60';
    if (s === 'expiring') return '#F39C12';
    if (s === 'sold') return '#95A5A6';
    return colors.textMuted;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="SELLER DASHBOARD"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="notifications"
          onRightPress={() => navigation.navigate('Notifications')}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <Text style={{ color: colors.textMuted, fontSize: 11, letterSpacing: 2, fontWeight: '900' }}>
            OVERVIEW
          </Text>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 4 }}>
            Performance this month
          </Text>
        </View>

        {/* ── Revenue Card ── */}
        <View style={{ paddingHorizontal: 16 }}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.bigCard, { borderRadius: radius.lg }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.revKicker}>TOTAL REVENUE</Text>
              <Text style={styles.revValue}>PKR 2.5M</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <MaterialIcons name="trending-up" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, marginLeft: 4 }}>
                  +12.4% vs last month
                </Text>
              </View>
            </View>
            <View style={styles.revCircle}>
              <MaterialIcons name="account-balance-wallet" size={28} color="rgba(255,255,255,0.6)" />
            </View>
          </LinearGradient>
        </View>

        {/* ── Stats Row ── */}
        <View style={[styles.statGrid, { paddingHorizontal: 12 }]}>
          {STATS.map((s) => (
            <View
              key={s.label}
              style={[styles.stat, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
            >
              <View style={[styles.statIconWrap, { backgroundColor: s.accent + '20' }]}>
                <MaterialIcons name={s.icon} size={18} color={s.accent} />
              </View>
              <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 8 }}>
                {s.value}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: '700' }}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((a) => (
            <TouchableOpacity
              key={a.id}
              onPress={() => {
                if (a.id === 'post') navigation.navigate('Sell');
                if (a.id === 'boost') navigation.navigate('BoostListing', { listing: MY_LISTINGS[0] });
                if (a.id === 'renew') navigation.navigate('ManageListing', { listing: MY_LISTINGS[2], action: 'renew' });
                if (a.id === 'sellfor') navigation.navigate('SellForMe');
              }}
              style={[styles.quickAction, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
            >
              <View style={[styles.quickIconWrap, { backgroundColor: a.color + '20' }]}>
                <MaterialIcons name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={{ color: colors.text, fontWeight: '800', fontSize: 11, marginTop: 8 }}>
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Performance Metrics ── */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={[styles.metric, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
            <View style={styles.rowBetween}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>Seller Performance</Text>
              <View style={[styles.performBadge, { backgroundColor: '#27AE60' + '20' }]}>
                <Text style={{ color: '#27AE60', fontSize: 10, fontWeight: '900' }}>EXCELLENT</Text>
              </View>
            </View>

            <View style={[styles.metricRow, { marginTop: 14 }]}>
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Response Time</Text>
              <Text style={{ color: colors.text, fontWeight: '900' }}>12 min</Text>
            </View>
            <View style={[styles.bar, { backgroundColor: colors.border }]}>
              <View style={{ width: '90%', height: '100%', backgroundColor: '#27AE60', borderRadius: 99 }} />
            </View>

            <View style={styles.metricRow}>
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Response Rate</Text>
              <Text style={{ color: colors.text, fontWeight: '900' }}>98%</Text>
            </View>
            <View style={[styles.bar, { backgroundColor: colors.border }]}>
              <View style={{ width: '98%', height: '100%', backgroundColor: '#3498DB', borderRadius: 99 }} />
            </View>

            <View style={styles.metricRow}>
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Buyer Rating</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="star" size={14} color={colors.primary} />
                <Text style={{ color: colors.text, fontWeight: '900', marginLeft: 3 }}>4.9 / 5</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11, marginLeft: 6 }}>(142)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── My Listings ── */}
        <View style={[styles.rowBetween, { paddingHorizontal: 16, marginTop: 24 }]}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>My Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sell')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="add" size={18} color={colors.primary} />
              <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 13, marginLeft: 2 }}>
                Post Ad
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TAB_FILTERS.map((t, i) => {
            const count = t === 'All' ? MY_LISTINGS.length : MY_LISTINGS.filter(l => l.status === t.toLowerCase()).length;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(i)}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: tab === i ? colors.primary : colors.surfaceAlt,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={{ color: tab === i ? '#fff' : colors.text, fontSize: 12, fontWeight: '800' }}>
                  {t} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Listing Cards */}
        <View style={{ paddingHorizontal: 16 }}>
          {filtered.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => navigation.navigate('ManageListing', { listing })}
              activeOpacity={0.85}
              style={[styles.listingCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              {/* Image + badges */}
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: listing.image }} style={styles.listingImg} />
                <View style={[styles.statusBadge, { backgroundColor: statusColor(listing.status) }]}>
                  <Text style={styles.statusText}>{listing.status.toUpperCase()}</Text>
                </View>
                {listing.isFeatured && (
                  <View style={[styles.featureBadge, { backgroundColor: 'rgba(243,156,18,0.9)' }]}>
                    <MaterialIcons name="star" size={10} color="#fff" />
                    <Text style={styles.featureText}>FEATURED</Text>
                  </View>
                )}
                {listing.isBoosted && (
                  <View style={[styles.boostBadge, { backgroundColor: 'rgba(231,76,60,0.9)' }]}>
                    <MaterialIcons name="rocket-launch" size={10} color="#fff" />
                    <Text style={styles.featureText}>BOOSTED</Text>
                  </View>
                )}
              </View>

              {/* Info */}
              <View style={{ padding: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 15 }} numberOfLines={1}>
                  {listing.title}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                  <Text style={{ color: colors.primary, fontWeight: '900' }}>{listing.price}</Text>
                  {listing.status !== 'sold' && (
                    <Text style={{ color: listing.daysLeft <= 3 ? '#E74C3C' : colors.textMuted, fontSize: 12, fontWeight: '700' }}>
                      {listing.daysLeft} days left
                    </Text>
                  )}
                </View>

                {/* Mini stats */}
                <View style={[styles.miniStats, { borderTopColor: colors.border }]}>
                  <Mini icon="visibility" label={listing.views} colors={colors} />
                  <Mini icon="mail" label={listing.inquiries} colors={colors} />
                  <Mini icon="favorite" label={listing.favorites} colors={colors} />
                  <Text style={{ color: colors.textDim, fontSize: 10 }}>Posted {listing.postedDate}</Text>
                </View>

                {/* Action Buttons */}
                {listing.status !== 'sold' && (
                  <View style={styles.actionRow}>
                    {!listing.isFeatured && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('BoostListing', { listing })}
                        style={[styles.actionBtn, { backgroundColor: '#F39C12' + '15', borderColor: '#F39C12' }]}
                      >
                        <MaterialIcons name="star" size={14} color="#F39C12" />
                        <Text style={{ color: '#F39C12', fontWeight: '800', fontSize: 10, marginLeft: 4 }}>FEATURE</Text>
                      </TouchableOpacity>
                    )}
                    {!listing.isBoosted && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('BoostListing', { listing })}
                        style={[styles.actionBtn, { backgroundColor: colors.primaryMuted, borderColor: colors.primary }]}
                      >
                        <MaterialIcons name="rocket-launch" size={14} color={colors.primary} />
                        <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 10, marginLeft: 4 }}>BOOST</Text>
                      </TouchableOpacity>
                    )}
                    {listing.status === 'expiring' && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ManageListing', { listing, action: 'renew' })}
                        style={[styles.actionBtn, { backgroundColor: '#3498DB' + '15', borderColor: '#3498DB' }]}
                      >
                        <MaterialIcons name="autorenew" size={14} color="#3498DB" />
                        <Text style={{ color: '#3498DB', fontWeight: '800', fontSize: 10, marginLeft: 4 }}>RENEW</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ManageListing', { listing })}
                      style={[styles.actionBtn, { backgroundColor: colors.surfaceHigh, borderColor: colors.border }]}
                    >
                      <MaterialIcons name="edit" size={14} color={colors.text} />
                      <Text style={{ color: colors.text, fontWeight: '800', fontSize: 10, marginLeft: 4 }}>MANAGE</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Pricing Plans CTA ── */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BoostListing', { listing: MY_LISTINGS[0] })}
          >
            <LinearGradient
              colors={['#F39C12', '#E74C3C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.promoBanner, { borderRadius: radius.lg }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.promoKicker}>PREMIUM PLANS</Text>
                <Text style={styles.promoTitle}>Sell 10x Faster</Text>
                <Text style={styles.promoSub}>Feature your ad from PKR 500/day</Text>
              </View>
              <MaterialIcons name="workspace-premium" size={48} color="rgba(255,255,255,0.35)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function Mini({ icon, label, colors }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
      <MaterialIcons name={icon} size={13} color={colors.textMuted} />
      <Text style={{ color: colors.textMuted, fontSize: 11, marginLeft: 3, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  revKicker: { color: 'rgba(255,255,255,0.8)', fontSize: 10, letterSpacing: 2, fontWeight: '900' },
  revValue: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 4 },
  revCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  statGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  stat: { flex: 1, padding: 14, marginHorizontal: 4, alignItems: 'center' },
  statIconWrap: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  quickGrid: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, marginTop: 18,
  },
  quickAction: { flex: 1, padding: 14, marginHorizontal: 4, alignItems: 'center' },
  quickIconWrap: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  metric: { padding: 18, marginTop: 18 },
  metricRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 12,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bar: { height: 6, borderRadius: 99, marginTop: 6, overflow: 'hidden' },
  performBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tabRow: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10,
  },
  tabChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
    marginRight: 8, borderWidth: 1,
  },
  listingCard: { marginBottom: 14, overflow: 'hidden' },
  listingImg: { width: '100%', height: 160, resizeMode: 'cover' },
  statusBadge: {
    position: 'absolute', top: 10, left: 10,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  statusText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  featureBadge: {
    position: 'absolute', top: 10, right: 10,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  boostBadge: {
    position: 'absolute', top: 36, right: 10,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  featureText: { color: '#fff', fontSize: 8, fontWeight: '900', marginLeft: 3 },
  miniStats: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 10, paddingTop: 10, borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionRow: {
    flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8,
  },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1,
  },
  promoBanner: {
    padding: 20, flexDirection: 'row', alignItems: 'center',
  },
  promoKicker: { color: 'rgba(255,255,255,0.85)', fontSize: 10, letterSpacing: 2, fontWeight: '900' },
  promoTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 4 },
  promoSub: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 4 },
});
