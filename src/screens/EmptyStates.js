import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import PrimaryButton from '../components/PrimaryButton';

function Template({
  navigation,
  title,
  titleAccent,
  description,
  icon,
  ctaLabel,
  ctaIcon,
  onCta,
  image,
  topbar = true,
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {topbar && (
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
          <TopAppBar
            title="XTREEM DRIVE"
            leftIcon="arrow-back"
            onLeftPress={() => navigation.goBack()}
          />
        </SafeAreaView>
      )}
      <View style={styles.center}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <View style={[styles.iconCircle, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
            <MaterialIcons name={icon} size={54} color={colors.primary} />
          </View>
        )}
        <Text style={[styles.title, { color: colors.text }]}>
          {title}{' '}
          <Text style={{ color: colors.primary }}>{titleAccent}</Text>
        </Text>
        <Text style={[styles.desc, { color: colors.textMuted }]}>{description}</Text>
        <PrimaryButton
          title={ctaLabel}
          icon={ctaIcon}
          onPress={onCta}
          style={{ marginTop: 24, minWidth: 220 }}
        />
      </View>
    </View>
  );
}

export function EmptyFavorites({ navigation }) {
  return (
    <Template
      navigation={navigation}
      title="NO SAVED"
      titleAccent="CARS YET."
      description="Tap the heart icon on any listing to save it here for later."
      icon="favorite-border"
      ctaLabel="Browse Listings"
      ctaIcon="arrow-forward"
      onCta={() => navigation.navigate('Home')}
    />
  );
}

export function EmptySearch({ navigation }) {
  return (
    <Template
      navigation={navigation}
      title="VELOCITY"
      titleAccent="STALLED."
      description="Zero matches. Try widening the filters or clearing them to see everything."
      icon="search-off"
      ctaLabel="Clear all filters"
      ctaIcon="filter-list-off"
      onCta={() => navigation.goBack()}
    />
  );
}

export function NotFound({ navigation }) {
  return (
    <Template
      navigation={navigation}
      title="STALLED."
      titleAccent="404"
      description="This listing is no longer available. It may have been sold or removed by the seller."
      icon="error-outline"
      ctaLabel="Back to home"
      ctaIcon="home"
      onCta={() => navigation.navigate('Home')}
    />
  );
}

export function NetworkError({ navigation }) {
  return (
    <Template
      navigation={navigation}
      title="CONNECTION"
      titleAccent="LOST."
      description="Check your internet connection and try again."
      icon="signal-wifi-off"
      ctaLabel="Retry"
      ctaIcon="refresh"
      onCta={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 28,
  },
  img: { width: 200, height: 140, borderRadius: 16, marginBottom: 20 },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 320,
    lineHeight: 20,
  },
});
