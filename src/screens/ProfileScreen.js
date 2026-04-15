import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';

const SECTIONS = [
  {
    title: 'Explore',
    items: [
      { icon: 'fiber-new', label: 'New Cars', route: 'NewCars' },
      { icon: 'two-wheeler', label: 'Bikes', route: 'Bikes' },
      { icon: 'build', label: 'Auto Store', route: 'AutoStore' },
      { icon: 'compare-arrows', label: 'Compare Cars', route: 'CarComparison' },
      { icon: 'article', label: 'News & Reviews', route: 'News' },
      { icon: 'play-circle-outline', label: 'Video Reviews', route: 'Videos' },
      { icon: 'store', label: 'Dealers & Showrooms', route: 'Dealers' },
    ],
  },
  {
    title: 'Tools & Services',
    items: [
      { icon: 'account-balance', label: 'EMI Calculator', route: 'EmiCalculator' },
      { icon: 'price-check', label: 'Car Valuation', route: 'CarValuation' },
      { icon: 'verified-user', label: 'Book Inspection', route: 'InspectionBooking' },
      { icon: 'storefront', label: 'Sell It For Me', route: 'SellForMe' },
    ],
  },
  {
    title: 'Community',
    items: [
      { icon: 'forum', label: 'Forums', route: 'Forums' },
      { icon: 'bookmark', label: 'Saved Searches', route: 'SavedSearches' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: 'notifications', label: 'Notifications', route: 'NotificationSettings' },
      { icon: 'favorite', label: 'Saved Listings', route: 'Favorites' },
      { icon: 'insert-chart', label: 'Seller Dashboard', route: 'SellerDashboard' },
      { icon: 'shield', label: 'Privacy & Security' },
      { icon: 'help-outline', label: 'Help Center' },
      { icon: 'info-outline', label: 'About Xtreem Drive' },
      { icon: 'logout', label: 'Log out', danger: true, route: 'SignIn' },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const { colors, radius, toggle, mode } = useTheme();
  const isLight = mode === 'light';

  // Light mode: strict black & white palette. Primary (teal) only appears on press.
  const mono = {
    text: isLight ? '#000000' : colors.text,
    muted: isLight ? '#4a4a4a' : colors.textMuted,
    surface: isLight ? '#ffffff' : colors.surfaceAlt,
    border: isLight ? 'rgba(0,0,0,0.12)' : colors.border,
    dividerBorder: isLight ? 'rgba(0,0,0,0.35)' : colors.border,
    iconBg: isLight ? '#f2f2f2' : colors.primaryMuted,
    accent: isLight ? '#000000' : colors.primary,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="PROFILE"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="settings"
          showThemeToggle
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View
          style={[
            styles.hero,
            {
              backgroundColor: isLight ? '#ffffff' : colors.surfaceAlt,
              borderColor: mono.border,
            },
          ]}
        >
          <View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=8' }}
              style={styles.avatar}
            />
            <View
              style={[
                styles.verifyBadge,
                { backgroundColor: mono.accent, borderColor: colors.background },
              ]}
            >
              <MaterialIcons name="verified" size={14} color="#ffffff" />
            </View>
          </View>

          <Text style={[styles.name, { color: mono.text }]}>DOMINIC TORETTO</Text>
          <View style={styles.eliteRow}>
            <MaterialIcons name="workspace-premium" size={14} color={mono.text} />
            <Text style={{ color: mono.text, fontWeight: '900', marginLeft: 4, fontSize: 12 }}>
              ELITE SELLER
            </Text>
          </View>
          <Text style={{ color: mono.muted, fontSize: 12, marginTop: 4 }}>
            Member since Jan 2021
          </Text>

          <View style={styles.statsRow}>
            <Stat label="Rating" value="—" subIcon="star" mono={mono} />
            <Divider color={mono.dividerBorder} />
            <Stat label="Reviews" value="—" mono={mono} />
            <Divider color={mono.dividerBorder} />
            <Stat label="Response" value="—" mono={mono} />
          </View>

          <View style={styles.btnRow}>
            <HoverBtn
              isLight={isLight}
              primary={colors.primary}
              baseBg={isLight ? '#000000' : colors.primary}
              baseBorder={isLight ? '#000000' : colors.primary}
              baseTextColor="#ffffff"
              icon="edit"
              label="Edit"
            />
            <HoverBtn
              isLight={isLight}
              primary={colors.primary}
              baseBg={isLight ? '#ffffff' : colors.surface}
              baseBorder={isLight ? '#000000' : colors.border}
              baseTextColor={isLight ? '#000000' : colors.text}
              icon="share"
              label="Share"
            />
            <HoverBtn
              isLight={isLight}
              primary={colors.primary}
              baseBg={isLight ? '#ffffff' : colors.surface}
              baseBorder={isLight ? '#000000' : colors.border}
              baseTextColor={isLight ? '#000000' : colors.text}
              icon="star"
              label="Ratings"
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <Pressable
            onPress={toggle}
            style={({ pressed }) => [
              styles.settingRow,
              {
                backgroundColor:
                  isLight && pressed ? colors.primaryMuted : mono.surface,
                borderRadius: radius.md,
                borderWidth: isLight ? 1 : 0,
                borderColor: isLight && pressed ? colors.primary : mono.border,
              },
            ]}
          >
            {({ pressed }) => {
              const accent = isLight && pressed ? colors.primary : mono.text;
              return (
                <>
                  <View style={styles.settingLeft}>
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor:
                            isLight && pressed ? colors.primaryMuted : mono.iconBg,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name={mode === 'dark' ? 'dark-mode' : 'light-mode'}
                        size={18}
                        color={accent}
                      />
                    </View>
                    <Text style={{ color: accent, fontWeight: '700', marginLeft: 12 }}>
                      {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.toggleTrack,
                      {
                        backgroundColor:
                          mode === 'dark' ? colors.primary : mono.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.toggleThumb,
                        { alignSelf: mode === 'dark' ? 'flex-end' : 'flex-start' },
                      ]}
                    />
                  </View>
                </>
              );
            }}
          </Pressable>

          {SECTIONS.map((section) => (
            <View key={section.title}>
              <Text
                style={{
                  color: mono.muted,
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 1.6,
                  marginTop: 20,
                  marginBottom: 8,
                  marginLeft: 4,
                }}
              >
                {section.title.toUpperCase()}
              </Text>
              {section.items.map((s) => (
                <Pressable
                  key={s.label}
                  onPress={() => s.route && navigation.navigate(s.route)}
                  style={({ pressed }) => [
                    styles.settingRow,
                    {
                      backgroundColor:
                        isLight && pressed ? colors.primaryMuted : mono.surface,
                      borderRadius: radius.md,
                      marginTop: 8,
                      borderWidth: isLight ? 1 : 0,
                      borderColor: isLight && pressed ? colors.primary : mono.border,
                    },
                  ]}
                >
                  {({ pressed }) => {
                    const accent = isLight && pressed ? colors.primary : mono.text;
                    const labelColor = s.danger ? colors.error : accent;
                    return (
                      <>
                        <View style={styles.settingLeft}>
                          <View
                            style={[
                              styles.iconBox,
                              {
                                backgroundColor: s.danger
                                  ? 'rgba(231,76,60,0.15)'
                                  : isLight && pressed
                                  ? colors.primaryMuted
                                  : mono.iconBg,
                              },
                            ]}
                          >
                            <MaterialIcons
                              name={s.icon}
                              size={18}
                              color={s.danger ? colors.error : accent}
                            />
                          </View>
                          <Text
                            style={{
                              color: labelColor,
                              fontWeight: '700',
                              marginLeft: 12,
                            }}
                          >
                            {s.label}
                          </Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={22} color={accent} />
                      </>
                    );
                  }}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function HoverBtn({ isLight, primary, baseBg, baseBorder, baseTextColor, icon, label }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: isLight && pressed ? primary : baseBg,
          borderColor: isLight && pressed ? primary : baseBorder,
        },
      ]}
    >
      {({ pressed }) => {
        const color = isLight && pressed ? '#ffffff' : baseTextColor;
        return (
          <>
            <MaterialIcons name={icon} size={16} color={color} />
            <Text style={{ color, fontWeight: '800', marginLeft: 6, fontSize: 12 }}>
              {label}
            </Text>
          </>
        );
      }}
    </Pressable>
  );
}

function Stat({ label, value, subIcon, mono }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {subIcon && <MaterialIcons name={subIcon} size={14} color={mono.text} />}
        <Text style={{ color: mono.text, fontWeight: '900', fontSize: 18, marginLeft: subIcon ? 4 : 0 }}>
          {value}
        </Text>
      </View>
      <Text style={{ color: mono.muted, fontSize: 11 }}>{label}</Text>
    </View>
  );
}

function Divider({ color }) {
  return <View style={{ width: 1, backgroundColor: color, marginVertical: 4 }} />;
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  verifyBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  name: { fontSize: 20, fontWeight: '900', marginTop: 14, letterSpacing: 1.5 },
  eliteRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    width: '85%',
    justifyContent: 'space-between',
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 18,
    paddingHorizontal: 16,
    gap: 8,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
