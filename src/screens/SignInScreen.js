import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
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

export default function SignInScreen({ navigation }) {
  const { colors, toggle, mode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400',
        }}
        style={StyleSheet.absoluteFillObject}
        imageStyle={{ opacity: mode === 'dark' ? 0.3 : 0.15 }}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor:
              mode === 'dark' ? 'rgba(19,19,19,0.85)' : 'rgba(248,249,250,0.85)',
          },
        ]}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.header}>
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
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Sign in to continue your journey.
              </Text>

              <View style={{ height: 24 }} />
              <InputField
                icon="person"
                placeholder="Email or phone"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={{ height: 12 }} />
              <InputField
                icon="lock"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{ alignSelf: 'flex-end', marginTop: 12 }}
              >
                <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 13 }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
              <PrimaryButton
                title="Sign In"
                icon="login"
                onPress={() => navigation.replace('Main')}
              />

              <View style={styles.divider}>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
                <Text style={{ color: colors.textDim, marginHorizontal: 10, fontSize: 12 }}>
                  OR
                </Text>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
              </View>

              <View style={styles.socialRow}>
                <SocialBtn icon="g-translate" label="Google" colors={colors} />
                <SocialBtn icon="facebook" label="Facebook" colors={colors} />
              </View>

              <View style={styles.bottomRow}>
                <Text style={{ color: colors.textMuted }}>No account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{ color: colors.primary, fontWeight: '800' }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function SocialBtn({ icon, label, colors }) {
  return (
    <TouchableOpacity
      style={[
        styles.socialBtn,
        { backgroundColor: colors.surfaceHigh, borderColor: colors.border },
      ]}
    >
      <MaterialIcons name={icon} size={18} color={colors.text} />
      <Text style={{ color: colors.text, marginLeft: 8, fontWeight: '700' }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 3,
    fontStyle: 'italic',
  },
  scroll: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 24,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: { flex: 1, height: 1 },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
