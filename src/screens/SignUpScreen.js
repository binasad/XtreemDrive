import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen({ navigation }) {
  const { colors, toggle, mode } = useTheme();
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({ email: '', phone: '', password: '', confirm: '' });
  const set = (k) => (v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.brand, { color: colors.text }]}>XTREEM DRIVE</Text>
          <TouchableOpacity onPress={toggle} hitSlop={10}>
            <MaterialIcons
              name={mode === 'dark' ? 'light-mode' : 'dark-mode'}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.hero, { color: colors.text }]}>
              Welcome to <Text style={{ color: colors.primary, fontStyle: 'italic' }}>Xtreem Drive</Text>
            </Text>
            <Text style={[styles.heroSub, { color: colors.textMuted }]}>
              Join 50,000+ verified buyers & sellers.
            </Text>

            <View style={styles.statsRow}>
              <View style={[styles.stat, { borderLeftColor: colors.primary, backgroundColor: colors.surfaceAlt }]}>
                <Text style={[styles.statBig, { color: colors.text }]}>500+</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>Cars listed daily</Text>
              </View>
              <View style={[styles.stat, { borderLeftColor: colors.primary, backgroundColor: colors.surfaceAlt }]}>
                <Text style={[styles.statBig, { color: colors.text }]}>0.1s</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>Booking speed</Text>
              </View>
            </View>

            <View
              style={[
                styles.card,
                { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
              ]}
            >
              <InputField
                icon="mail"
                placeholder="Email address"
                value={form.email}
                onChangeText={set('email')}
                keyboardType="email-address"
              />
              <View style={{ height: 12 }} />
              <InputField
                icon="phone"
                placeholder="Phone (+1 555 555 5555)"
                value={form.phone}
                onChangeText={set('phone')}
                keyboardType="phone-pad"
              />
              <View style={{ height: 12 }} />
              <InputField
                icon="lock"
                placeholder="Password"
                secureTextEntry
                value={form.password}
                onChangeText={set('password')}
              />
              <View style={{ height: 12 }} />
              <InputField
                icon="lock-outline"
                placeholder="Confirm password"
                secureTextEntry
                value={form.confirm}
                onChangeText={set('confirm')}
              />

              <TouchableOpacity
                style={styles.agreeRow}
                onPress={() => setAgree((v) => !v)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.border,
                      backgroundColor: agree ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {agree && <MaterialIcons name="check" size={14} color="#fff" />}
                </View>
                <Text style={{ color: colors.textMuted, flex: 1, marginLeft: 10, fontSize: 12 }}>
                  I agree to the Terms & Conditions and Privacy Policy.
                </Text>
              </TouchableOpacity>

              <View style={{ height: 16 }} />
              <PrimaryButton
                title="Create Account"
                icon="rocket-launch"
                onPress={() => navigation.replace('Main')}
              />

              <View style={styles.bottomRow}>
                <Text style={{ color: colors.textMuted }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <Text style={{ color: colors.primary, fontWeight: '800' }}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  hero: { fontSize: 28, fontWeight: '900' },
  heroSub: { marginTop: 6, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  stat: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 3,
    marginRight: 6,
  },
  statBig: { fontSize: 22, fontWeight: '900' },
  card: { padding: 20, borderRadius: 24, borderWidth: StyleSheet.hairlineWidth },
  agreeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
});
