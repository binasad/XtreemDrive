import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';

const SETTINGS = [
  {
    group: 'ENGAGEMENT ALERTS',
    items: [
      { key: 'msg', icon: 'chat', title: 'New Message Alerts', desc: 'Ping me when a buyer replies.' },
      { key: 'views', icon: 'analytics', title: 'Listing View Reports', desc: 'Weekly summary of listing performance.' },
      { key: 'price', icon: 'local-offer', title: 'Price Alerts', desc: 'Notify me when similar cars drop in price.' },
    ],
  },
  {
    group: 'ACCOUNT & SYSTEM',
    items: [
      { key: 'renew', icon: 'autorenew', title: 'Auto-renew Reminders', desc: 'Reminders before a listing expires.' },
      { key: 'promo', icon: 'campaign', title: 'Promotions', desc: 'Deals, offers and feature launches.' },
    ],
  },
];

export default function NotificationSettingsScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const iconColor = mode === 'light' ? '#000000' : colors.primary;
  const [master, setMaster] = useState(true);
  const [state, setState] = useState({
    msg: true,
    views: true,
    price: false,
    renew: true,
    promo: false,
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="NOTIFICATION SETTINGS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        <Text style={[styles.hero, { color: colors.text }]}>Alert Center</Text>
        <Text style={{ color: colors.textMuted, marginTop: 4 }}>
          Tune what you hear from Xtreem Drive.
        </Text>

        <View
          style={[
            styles.masterCard,
            { backgroundColor: colors.primaryMuted, borderRadius: radius.lg },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 15 }}>
              Push Notifications
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>
              Master control for all alerts below.
            </Text>
          </View>
          <Switch
            value={master}
            onValueChange={setMaster}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor="#fff"
          />
        </View>

        {SETTINGS.map((group) => (
          <View key={group.group} style={{ marginTop: 24 }}>
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 11,
                letterSpacing: 2,
                fontWeight: '900',
                marginBottom: 10,
              }}
            >
              {group.group}
            </Text>
            {group.items.map((item) => (
              <View
                key={item.key}
                style={[
                  styles.row,
                  { backgroundColor: colors.surfaceAlt, borderRadius: radius.md },
                ]}
              >
                <View style={styles.iconBox}>
                  <MaterialIcons name={item.icon} size={22} color={iconColor} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>{item.title}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>
                    {item.desc}
                  </Text>
                </View>
                <Switch
                  value={master && state[item.key]}
                  disabled={!master}
                  onValueChange={(v) => setState((s) => ({ ...s, [item.key]: v }))}
                  trackColor={{ true: colors.primary, false: colors.border }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { fontSize: 26, fontWeight: '900' },
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
