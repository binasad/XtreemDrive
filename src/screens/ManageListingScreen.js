import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';

const { width: SW } = Dimensions.get('window');

const RENEW_OPTIONS = [
  { id: '15', days: '15 Days', price: 'Free', desc: 'Standard renewal', icon: 'autorenew', color: '#3498DB' },
  { id: '30', days: '30 Days', price: 'PKR 200', desc: 'Extended visibility', icon: 'event-repeat', color: '#27AE60' },
  { id: '60', days: '60 Days', price: 'PKR 350', desc: 'Maximum exposure', icon: 'all-inclusive', color: '#F39C12' },
];

const MANAGE_ACTIONS = [
  { id: 'edit', icon: 'edit', label: 'Edit Listing', desc: 'Update price, details, photos', color: '#3498DB' },
  { id: 'boost', icon: 'rocket-launch', label: 'Boost / Feature', desc: 'Get more views with premium plans', color: '#F39C12' },
  { id: 'renew', icon: 'autorenew', label: 'Renew Listing', desc: 'Extend your listing duration', color: '#27AE60' },
  { id: 'analytics', icon: 'analytics', label: 'View Analytics', desc: 'Detailed performance stats', color: '#9B59B6' },
  { id: 'sold', icon: 'check-circle', label: 'Mark as Sold', desc: 'Remove listing from marketplace', color: '#1ABC9C' },
  { id: 'delete', icon: 'delete', label: 'Delete Listing', desc: 'Permanently remove this ad', color: '#E74C3C' },
];

export default function ManageListingScreen({ route, navigation }) {
  const { colors, radius, mode } = useTheme();
  const listing = route?.params?.listing;
  const initialAction = route?.params?.action;
  const [view, setView] = useState(initialAction || 'overview'); // overview, edit, renew, analytics
  const [renewPlan, setRenewPlan] = useState('15');
  const [editForm, setEditForm] = useState({
    price: listing?.price || '',
    title: listing?.title || '',
    description: 'Well-maintained vehicle with full service history. Original paint, single owner.',
  });

  const handleAction = (id) => {
    if (id === 'edit') setView('edit');
    else if (id === 'renew') setView('renew');
    else if (id === 'analytics') setView('analytics');
    else if (id === 'boost') navigation.navigate('BoostListing', { listing });
    else if (id === 'sold') {
      Alert.alert('Mark as Sold?', 'This will remove the listing from the marketplace.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => { Alert.alert('Done!', 'Listing marked as sold.'); navigation.goBack(); } },
      ]);
    }
    else if (id === 'delete') {
      Alert.alert('Delete Listing?', 'This action cannot be undone.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => { Alert.alert('Deleted', 'Listing removed.'); navigation.goBack(); } },
      ]);
    }
  };

  // ── OVERVIEW ──
  if (view === 'overview') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar title="MANAGE LISTING" leftIcon="arrow-back" onLeftPress={() => navigation.goBack()} />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {/* Listing Header */}
          {listing && (
            <View>
              <Image source={{ uri: listing.image }} style={{ width: SW, height: 200 }} />
              <View style={[styles.listingInfo, { backgroundColor: colors.surfaceAlt }]}>
                <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18 }}>{listing.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                  <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 18 }}>{listing.price}</Text>
                  <View style={[styles.statusPill, { backgroundColor: listing.status === 'active' ? '#27AE60' : listing.status === 'expiring' ? '#F39C12' : '#95A5A6' }]}>
                    <Text style={styles.statusPillText}>{listing.status?.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
                  {listing.year} • {listing.mileage} • {listing.location}
                </Text>
                {listing.daysLeft > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <MaterialIcons name="schedule" size={14} color={listing.daysLeft <= 3 ? '#E74C3C' : colors.textMuted} />
                    <Text style={{ color: listing.daysLeft <= 3 ? '#E74C3C' : colors.textMuted, fontSize: 12, marginLeft: 4, fontWeight: '700' }}>
                      {listing.daysLeft} days remaining
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Quick Stats */}
          <View style={[styles.statsRow, { paddingHorizontal: 16 }]}>
            <StatBox icon="visibility" value={listing?.views || 0} label="Views" color="#3498DB" colors={colors} radius={radius} />
            <StatBox icon="mail" value={listing?.inquiries || 0} label="Inquiries" color="#F39C12" colors={colors} radius={radius} />
            <StatBox icon="favorite" value={listing?.favorites || 0} label="Saves" color="#E74C3C" colors={colors} radius={radius} />
          </View>

          {/* Actions */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={{ paddingHorizontal: 16 }}>
            {MANAGE_ACTIONS.map((a) => (
              <TouchableOpacity
                key={a.id}
                onPress={() => handleAction(a.id)}
                style={[styles.actionCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
              >
                <View style={[styles.actionIconWrap, { backgroundColor: a.color + '20' }]}>
                  <MaterialIcons name={a.icon} size={22} color={a.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: a.id === 'delete' ? '#E74C3C' : colors.text, fontWeight: '800' }}>{a.label}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>{a.desc}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── EDIT VIEW ──
  if (view === 'edit') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar title="EDIT LISTING" leftIcon="arrow-back" onLeftPress={() => setView('overview')} />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900' }}>
            Update <Text style={{ color: colors.primary }}>Details</Text>
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4 }}>Changes will be reflected instantly</Text>

          <EditField label="Title" value={editForm.title} onChange={(v) => setEditForm({ ...editForm, title: v })} colors={colors} />
          <EditField label="Price (PKR)" value={editForm.price} onChange={(v) => setEditForm({ ...editForm, price: v })} colors={colors} />
          <EditField label="Description" value={editForm.description} onChange={(v) => setEditForm({ ...editForm, description: v })} colors={colors} multiline />

          {/* Photo Management */}
          <Text style={[styles.editSubHeader, { color: colors.text }]}>Photos</Text>
          <View style={styles.photoGrid}>
            {[listing?.image, listing?.image, listing?.image, null, null, null].map((img, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.photoSlot, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
              >
                {img ? (
                  <View style={{ width: '100%', height: '100%' }}>
                    <Image source={{ uri: img }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                    <View style={[styles.photoRemove, { backgroundColor: colors.primary }]}>
                      <MaterialIcons name="close" size={14} color="#fff" />
                    </View>
                  </View>
                ) : (
                  <>
                    <MaterialIcons name="add-a-photo" size={22} color={colors.textMuted} />
                    <Text style={{ color: colors.textDim, fontSize: 9, marginTop: 4 }}>Add Photo</Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => setView('overview')}
            style={[styles.cancelBtn, { borderColor: colors.border }]}
          >
            <Text style={{ color: colors.text, fontWeight: '800' }}>Cancel</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="Save Changes"
            icon="check"
            onPress={() => { Alert.alert('Saved!', 'Your listing has been updated.'); setView('overview'); }}
            style={{ flex: 1, marginLeft: 10 }}
          />
        </View>
      </View>
    );
  }

  // ── RENEW VIEW ──
  if (view === 'renew') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar title="RENEW LISTING" leftIcon="arrow-back" onLeftPress={() => setView('overview')} />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900' }}>
            Renew <Text style={{ color: colors.primary }}>Your Ad</Text>
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4 }}>
            Keep your listing visible to millions of buyers
          </Text>

          {listing && (
            <View style={[styles.renewPreview, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
              <Image source={{ uri: listing.image }} style={{ width: 70, height: 52, borderRadius: 10 }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>{listing.title}</Text>
                <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 2, fontSize: 13 }}>{listing.price}</Text>
              </View>
              {listing.daysLeft > 0 && (
                <View style={[styles.daysLeftBadge, { backgroundColor: listing.daysLeft <= 3 ? '#E74C3C20' : '#27AE6020' }]}>
                  <Text style={{ color: listing.daysLeft <= 3 ? '#E74C3C' : '#27AE60', fontWeight: '900', fontSize: 12 }}>
                    {listing.daysLeft}d
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Renew Plans */}
          {RENEW_OPTIONS.map((opt) => {
            const isActive = renewPlan === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setRenewPlan(opt.id)}
                style={[
                  styles.renewCard,
                  {
                    backgroundColor: isActive ? opt.color + '15' : colors.surfaceAlt,
                    borderColor: isActive ? opt.color : colors.border,
                    borderRadius: radius.lg,
                  },
                ]}
              >
                <View style={[styles.renewIconWrap, { backgroundColor: opt.color + '20' }]}>
                  <MaterialIcons name={opt.icon} size={24} color={opt.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>{opt.days}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12 }}>{opt.desc}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: opt.color, fontWeight: '900', fontSize: 16 }}>{opt.price}</Text>
                </View>
                <View style={[styles.radioOuter, { borderColor: isActive ? opt.color : colors.border }]}>
                  {isActive && <View style={[styles.radioInner, { backgroundColor: opt.color }]} />}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Info Card */}
          <View style={[styles.infoCard, { backgroundColor: colors.primaryMuted, borderRadius: radius.md }]}>
            <MaterialIcons name="info" size={20} color={colors.primary} />
            <Text style={{ color: colors.text, fontSize: 12, marginLeft: 10, flex: 1, lineHeight: 18 }}>
              Renewing your ad pushes it back to the top of search results, giving it fresh visibility.
              Combined with a boost plan, you can reach 10x more buyers!
            </Text>
          </View>
        </ScrollView>

        <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ color: colors.textMuted, fontSize: 11 }}>Renewal cost</Text>
            <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 18 }}>
              {RENEW_OPTIONS.find(o => o.id === renewPlan).price}
            </Text>
          </View>
          <PrimaryButton
            title="Renew Now"
            icon="autorenew"
            onPress={() => {
              const opt = RENEW_OPTIONS.find(o => o.id === renewPlan);
              Alert.alert('✅ Renewed!', `Your listing has been renewed for ${opt.days}.`, [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            }}
            style={{ flex: 1.5 }}
          />
        </View>
      </View>
    );
  }

  // ── ANALYTICS VIEW ──
  if (view === 'analytics') {
    const weekData = [
      { day: 'Mon', views: 32 },
      { day: 'Tue', views: 45 },
      { day: 'Wed', views: 28 },
      { day: 'Thu', views: 56 },
      { day: 'Fri', views: 72 },
      { day: 'Sat', views: 64 },
      { day: 'Sun', views: 51 },
    ];
    const maxView = Math.max(...weekData.map(d => d.views));

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar title="LISTING ANALYTICS" leftIcon="arrow-back" onLeftPress={() => setView('overview')} />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900' }}>
            Performance <Text style={{ color: colors.primary }}>Stats</Text>
          </Text>

          {/* Summary Cards */}
          <View style={styles.analyticsSummary}>
            <AnalyticBox label="Total Views" value={listing?.views || 0} change="+24%" positive colors={colors} radius={radius} />
            <AnalyticBox label="Inquiries" value={listing?.inquiries || 0} change="+18%" positive colors={colors} radius={radius} />
          </View>
          <View style={styles.analyticsSummary}>
            <AnalyticBox label="Favorites" value={listing?.favorites || 0} change="+12%" positive colors={colors} radius={radius} />
            <AnalyticBox label="CTR" value="8.4%" change="+2.1%" positive colors={colors} radius={radius} />
          </View>

          {/* Bar Chart */}
          <View style={[styles.chartCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
            <Text style={{ color: colors.text, fontWeight: '800', marginBottom: 16 }}>Views This Week</Text>
            <View style={styles.chartBars}>
              {weekData.map((d) => (
                <View key={d.day} style={styles.barCol}>
                  <Text style={{ color: colors.textMuted, fontSize: 10, marginBottom: 4 }}>{d.views}</Text>
                  <View style={[styles.barTrack, { backgroundColor: colors.border }]}>
                    <LinearGradient
                      colors={[colors.gradientStart, colors.gradientEnd]}
                      style={[styles.barFill, { height: `${(d.views / maxView) * 100}%` }]}
                    />
                  </View>
                  <Text style={{ color: colors.textMuted, fontSize: 10, marginTop: 4 }}>{d.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Traffic Source */}
          <View style={[styles.chartCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}>
            <Text style={{ color: colors.text, fontWeight: '800', marginBottom: 12 }}>Traffic Sources</Text>
            <SourceRow label="Search Results" pct={62} color="#3498DB" colors={colors} />
            <SourceRow label="Home Page" pct={21} color="#27AE60" colors={colors} />
            <SourceRow label="Direct Link" pct={12} color="#F39C12" colors={colors} />
            <SourceRow label="Social Media" pct={5} color="#9B59B6" colors={colors} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
}

// ── Helper Components ──

function StatBox({ icon, value, label, color, colors, radius }) {
  return (
    <View style={[styles2.statBox, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}>
      <View style={[styles2.statIconWrap, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon} size={18} color={color} />
      </View>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '900', marginTop: 6 }}>{value}</Text>
      <Text style={{ color: colors.textMuted, fontSize: 10 }}>{label}</Text>
    </View>
  );
}

function EditField({ label, value, onChange, colors, multiline }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={{ color: colors.textMuted, fontSize: 12, marginBottom: 6, fontWeight: '700' }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        style={{
          backgroundColor: colors.surfaceAlt,
          color: colors.text,
          paddingHorizontal: 14, paddingVertical: 12,
          borderRadius: 12, borderWidth: 1, borderColor: colors.border,
          minHeight: multiline ? 100 : 48,
          textAlignVertical: multiline ? 'top' : 'center',
          fontSize: 15,
        }}
      />
    </View>
  );
}

function AnalyticBox({ label, value, change, positive, colors, radius }) {
  return (
    <View style={[styles2.analytBox, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}>
      <Text style={{ color: colors.textMuted, fontSize: 11 }}>{label}</Text>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 4 }}>{value}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <MaterialIcons name={positive ? 'trending-up' : 'trending-down'} size={14} color={positive ? '#27AE60' : '#E74C3C'} />
        <Text style={{ color: positive ? '#27AE60' : '#E74C3C', fontSize: 12, fontWeight: '800', marginLeft: 3 }}>{change}</Text>
      </View>
    </View>
  );
}

function SourceRow({ label, pct, color, colors }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ color: colors.text, fontSize: 13 }}>{label}</Text>
        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 13 }}>{pct}%</Text>
      </View>
      <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 99, overflow: 'hidden' }}>
        <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 99 }} />
      </View>
    </View>
  );
}

// ── Styles ──

const styles = StyleSheet.create({
  listingInfo: { padding: 16 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusPillText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  actionCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, marginBottom: 8,
  },
  actionIconWrap: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  editSubHeader: { fontSize: 16, fontWeight: '800', marginTop: 24, marginBottom: 12 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  photoSlot: {
    width: '31%', aspectRatio: 1, borderRadius: 14,
    borderWidth: 1, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
    overflow: 'hidden',
  },
  photoRemove: {
    position: 'absolute', top: 4, right: 4,
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  renewPreview: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, marginTop: 16,
  },
  daysLeftBadge: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
  },
  renewCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, marginTop: 12, borderWidth: 1.5,
    position: 'relative',
  },
  renewIconWrap: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuter: {
    position: 'absolute', top: 16, right: 16,
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6 },
  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 14, marginTop: 20,
  },
  ctaBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row', alignItems: 'center',
  },
  cancelBtn: {
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 14, borderWidth: 1,
  },
  analyticsSummary: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  chartCard: { padding: 18, marginTop: 18 },
  chartBars: { flexDirection: 'row', justifyContent: 'space-between', height: 120, alignItems: 'flex-end' },
  barCol: { alignItems: 'center', flex: 1 },
  barTrack: { width: 20, height: 80, borderRadius: 10, overflow: 'hidden', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 10 },
});

const styles2 = StyleSheet.create({
  statBox: { flex: 1, padding: 14, marginHorizontal: 4, alignItems: 'center' },
  statIconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  analytBox: { flex: 1, padding: 14, marginHorizontal: 4 },
});
