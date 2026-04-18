import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const ACCENT = '#E74C3C';

const OPTION_MYSELF = {
  bullets: [
    { icon: 'bolt', label: 'Post an ad in 2 minutes' },
    { icon: 'groups', label: '20 million users' },
    { icon: 'chat-bubble', label: 'Connect directly with buyers' },
  ],
  image:
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=60&sat=-100',
};

const OPTION_EXPERT = {
  bullets: [
    { icon: 'check-circle', label: 'Sell your car without hassle' },
    { icon: 'fact-check', label: 'Free Inspection & Featured ad' },
    { icon: 'trending-up', label: 'Maximize offer with sales agent' },
  ],
  image:
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=900&q=60',
};

export default function SellLandingScreen({ navigation }) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const accent = isDark ? ACCENT : '#069494';
  const myselfIconColor = isDark ? ACCENT : '#0B132B';

  const t = isDark
    ? {
        background: '#131313',
        monolithStart: '#1c1b1b',
        monolithEnd: '#131313',
        cardMyselfBg: '#1c1b1b',
        cardMyselfIcon: '#353535',
        cardMyselfTitle: '#e5e2e1',
        cardMyselfBullet: 'rgba(229,226,225,0.8)',
        cardMyselfCta: '#353535',
        cardMyselfCtaText: '#e5e2e1',
        cardExpertBg: '#2a2a2a',
        cardExpertTitle: '#e5e2e1',
        cardExpertBullet: 'rgba(229,226,225,0.8)',
        cardExpertBulletIcon: ACCENT,
        heroText: '#e5e2e1',
        subtitle: '#c4c7c7',
        dividerBorder: 'rgba(200,198,197,0.1)',
        muted: 'rgba(200,198,197,0.4)',
        logo: '#C8C6C5',
        headerBg: 'rgba(19,19,19,0.6)',
        avatarBorder: 'rgba(68,71,72,0.3)',
        avatarFill: '#353535',
      }
    : {
        background: '#f5f7f8',
        monolithStart: '#ffffff',
        monolithEnd: '#f5f7f8',
        cardMyselfBg: '#ffffff',
        cardMyselfIcon: 'rgba(0,111,98,0.10)',
        cardMyselfTitle: '#1e293b',
        cardMyselfBullet: '#64748b',
        cardMyselfCta: '#069494',
        cardMyselfCtaText: '#ffffff',
        cardExpertBg: '#ffffff',
        cardExpertTitle: '#1e293b',
        cardExpertBullet: '#64748b',
        cardExpertBulletIcon: '#069494',
        heroText: '#1e293b',
        subtitle: '#64748b',
        dividerBorder: 'rgba(30,41,59,0.10)',
        muted: '#94a3b8',
        logo: '#1e293b',
        headerBg: 'rgba(245,247,248,0.88)',
        avatarBorder: 'rgba(30,41,59,0.12)',
        avatarFill: '#eef1f3',
      };

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={[styles.headerRow, { backgroundColor: t.headerBg }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.openDrawer?.() || navigation.goBack()}>
              <MaterialIcons name="menu" size={24} color={t.logo} />
            </TouchableOpacity>
            <Text style={[styles.logo, { color: t.logo }]}>XTREEM DRIVE</Text>
          </View>
          <View style={[styles.avatarWrap, { borderColor: t.avatarBorder, backgroundColor: t.avatarFill }]}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=32' }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <LinearGradient
          colors={[t.monolithStart, t.monolithEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.monolith}
        >
          <View style={{ paddingTop: 20, paddingBottom: 42 }}>
            <Text style={[styles.heroLine, { color: t.heroText }]}>SELL YOUR CAR ONLINE</Text>
            <Text style={[styles.heroLine, { color: accent, marginTop: 2 }]}>
              IN PAKISTAN INSTANTLY!
            </Text>
            <Text style={[styles.subtitle, { color: t.subtitle }]}>
              CHOOSE HOW TO SELL YOUR CAR
            </Text>
          </View>

          <OptionCard
            variant="myself"
            t={t}
            isDark={isDark}
            accent={accent}
            myselfIconColor={myselfIconColor}
            onPress={() => navigation.navigate('PostAd')}
          />

          <View style={{ height: 20 }} />

          <OptionCard
            variant="expert"
            t={t}
            isDark={isDark}
            accent={accent}
            myselfIconColor={myselfIconColor}
            onPress={() => navigation.navigate('SellForMe')}
          />

          <View style={[styles.footer, { borderTopColor: t.dividerBorder }]}>
            <Text style={[styles.footerNote, { color: t.muted, fontStyle: 'italic' }]}>
              * Available only in limited cities
            </Text>
            <Text style={[styles.footerNote, { color: t.muted, marginTop: 6 }]}>
              By continuing, you agree to the Terms of Service and Privacy Policy.
            </Text>

            <View style={styles.footerLegal}>
              <Text style={[styles.footerLogo, { color: t.logo }]}>© 2026 XTREEM DRIVE</Text>
              <View style={styles.footerLinks}>
                <Text style={[styles.footerLink, { color: t.muted }]}>Privacy</Text>
                <Text style={[styles.footerLink, { color: t.muted }]}>Terms</Text>
                <Text style={[styles.footerLink, { color: t.muted }]}>Legal</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

function OptionCard({ variant, t, isDark, accent, myselfIconColor, onPress }) {
  const isExpert = variant === 'expert';
  const opt = isExpert ? OPTION_EXPERT : OPTION_MYSELF;

  const bgColor = isExpert ? t.cardExpertBg : t.cardMyselfBg;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: bgColor,
          transform: [{ scale: pressed ? 0.99 : 1 }],
          shadowColor: isExpert ? accent : '#000',
          shadowOpacity: isExpert ? (isDark ? 0.25 : 0.15) : isDark ? 0.4 : 0.08,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: isExpert ? 8 : 4,
        },
      ]}
    >
      {isExpert && <View style={[styles.ledStrip, { backgroundColor: accent }]} />}

      <Image
        source={{ uri: opt.image }}
        style={[
          styles.cardDecor,
          { opacity: isDark ? 0.12 : 0.08 },
        ]}
      />

      <View style={{ padding: 28, zIndex: 2 }}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconTile,
              {
                backgroundColor: isExpert ? accent : t.cardMyselfIcon,
              },
            ]}
          >
            <MaterialIcons
              name={isExpert ? 'verified' : 'directions-car'}
              size={30}
              color={isExpert ? '#fff' : myselfIconColor}
            />
          </View>
          {isExpert && (
            <View style={[styles.premiumPill, { backgroundColor: accent }]}>
              <Text style={styles.premiumPillText}>PREMIUM SERVICE</Text>
            </View>
          )}
        </View>

        <Text
          style={[
            styles.cardTitle,
            { color: isExpert ? t.cardExpertTitle : t.cardMyselfTitle },
          ]}
        >
          {isExpert ? 'SELL IT FOR ME' : 'SELL IT MYSELF!'}
        </Text>

        <View style={{ marginBottom: 28 }}>
          {opt.bullets.map((b) => (
            <View key={b.label} style={styles.bulletRow}>
              <MaterialIcons
                name={b.icon}
                size={16}
                color={isExpert ? t.cardExpertBulletIcon : (isDark ? accent : '#0B132B')}
              />
              <Text
                style={[
                  styles.bulletText,
                  { color: isExpert ? t.cardExpertBullet : t.cardMyselfBullet },
                ]}
              >
                {b.label}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.cta,
            {
              backgroundColor: isExpert ? accent : t.cardMyselfCta,
            },
          ]}
        >
          <Text
            style={[
              styles.ctaText,
              {
                color: isExpert ? '#fff' : t.cardMyselfCtaText,
              },
            ]}
          >
            {isExpert ? 'REGISTER NOW' : 'POST AN AD'}
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={18}
            color={isExpert ? '#fff' : t.cardMyselfCtaText}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerSafe: {
    position: 'absolute',
    top: 0, left: 0, right: 0, zIndex: 50,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginLeft: 14,
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    overflow: 'hidden',
  },
  monolith: {
    paddingTop: 110,
    paddingHorizontal: 24,
  },
  heroLine: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1.8,
    lineHeight: 44,
  },
  subtitle: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3.5,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  ledStrip: {
    height: 4,
    width: '100%',
  },
  cardDecor: {
    position: 'absolute',
    right: -60,
    bottom: -40,
    width: 280,
    height: 200,
    resizeMode: 'cover',
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumPill: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
  },
  premiumPillText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 22,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletText: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  footer: {
    marginTop: 40,
    paddingTop: 24,
    paddingBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerNote: {
    fontSize: 11,
    letterSpacing: -0.1,
  },
  footerLegal: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  footerLogo: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 14,
  },
  footerLink: {
    fontSize: 11,
    fontWeight: '600',
  },
});
