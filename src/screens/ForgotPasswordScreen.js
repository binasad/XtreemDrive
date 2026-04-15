import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function ForgotPasswordScreen({ navigation }) {
  const { colors, mode } = useTheme();
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400',
        }}
        style={{ height: 320 }}
        imageStyle={{ opacity: mode === 'dark' ? 0.4 : 0.3 }}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor:
                mode === 'dark' ? 'rgba(19,19,19,0.6)' : 'rgba(248,249,250,0.5)',
            },
          ]}
        />
        <SafeAreaView edges={['top']} style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.brand, { color: colors.text }]}>XTREEM DRIVE</Text>
          <View style={{ width: 24 }} />
        </SafeAreaView>
      </ImageBackground>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surfaceAlt,
              borderColor: colors.border,
              marginTop: -60,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.primaryMuted },
            ]}
          >
            <MaterialIcons name="lock-reset" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Forgot Password?</Text>
          <Text style={[styles.sub, { color: colors.textMuted }]}>
            Enter your email and we'll send you a link to reset your password.
          </Text>

          <View style={{ height: 20 }} />
          <InputField
            icon="mail"
            placeholder="Your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={{ height: 16 }} />
          <PrimaryButton
            title="Send Reset Link"
            icon="bolt"
            onPress={() =>
              Alert.alert('Link sent', 'Check your email for the reset link.')
            }
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20, alignSelf: 'center' }}
          >
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  card: {
    padding: 24,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'stretch',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: '900' },
  sub: { fontSize: 14, marginTop: 6 },
});
