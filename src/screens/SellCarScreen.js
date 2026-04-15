import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';

const { width: SCREEN_W } = Dimensions.get('window');

const TOTAL_STEPS = 3;

export default function SellCarScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const isLight = mode === 'light';

  const [step, setStep] = useState(1); // Set to 1 to match the user's provided step (Step 02)
  const [form, setForm] = useState({
    year: '2024',
    make: 'Porsche',
    model: '911 GT3',
    price: '',
    boost: false,
  });

  const set = (k) => (v) => setForm((s) => ({ ...s, [k]: v }));
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  // Custom colors for the specific light mode design requested
  const lightDesign = {
    primary: '#006f62',
    primaryContainer: '#6de8dd',
    background: '#f5f7f8',
    onSurface: '#1e293b',
    onSurfaceVariant: '#64748b',
    surfaceContainerLow: '#ffffff',
    surfaceContainerHigh: '#eef1f3',
    surfaceContainerHighest: '#e2e8f0',
    tertiary: '#0d9488',
    tertiaryContainer: '#ccfbf1',
    onTertiaryContainer: '#115e59',
    outlineVariant: '#cbd5e1',
    inverseSurface: '#2C3E50',
  };

  const themeColors = isLight ? lightDesign : {
    primary: colors.primary,
    primaryContainer: colors.primaryMuted,
    background: colors.background,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    surfaceContainerLow: colors.surface,
    surfaceContainerHigh: colors.surfaceAlt,
    surfaceContainerHighest: colors.border,
    tertiary: colors.success,
    tertiaryContainer: 'rgba(39,174,96,0.1)',
    onTertiaryContainer: colors.success,
    outlineVariant: colors.border,
    inverseSurface: colors.surfaceElevated,
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: isLight ? '#ffffff' : colors.background }}>
        <View style={[styles.header, { borderBottomColor: themeColors.outlineVariant }]}>
          <TouchableOpacity 
            onPress={() => (step > 0 ? setStep(step - 1) : navigation.goBack())}
            style={styles.backBtn}
          >
            <MaterialIcons name="arrow-back" size={24} color={themeColors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.onSurface }]}>Xtreem Drive</Text>
          <View style={[styles.avatarWrap, { borderColor: themeColors.surfaceContainerHighest }]}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=32' }} 
              style={styles.avatar}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]}
      >
        {/* Progress Header */}
        <View style={styles.stepHeader}>
          <View style={styles.stepInfoRow}>
            <View>
              <Text style={[styles.stepLabel, { color: themeColors.primary }]}>
                STEP {String(step + 1).padStart(2, '0')} OF {String(TOTAL_STEPS).padStart(2, '0')}
              </Text>
              <Text style={[styles.stepTitle, { color: themeColors.onSurface }]}>Listing Details</Text>
            </View>
            <Text style={[styles.progressText, { color: themeColors.primary }]}>
              {Math.round(progress)}%
            </Text>
          </View>
          <View style={[styles.progressBarBase, { backgroundColor: themeColors.surfaceContainerHighest }]}>
            <LinearGradient
              colors={[themeColors.primary, themeColors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

        {/* Vehicle Info Section */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="directions-car" size={24} color={themeColors.primary} style={{ opacity: 0.9 }} />
          <Text style={[styles.sectionTitle, { color: themeColors.onSurface }]}>Vehicle Info</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: themeColors.onSurfaceVariant }]}>YEAR OF MANUFACTURE</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.surfaceContainerHigh, color: themeColors.onSurface }]}
            placeholder="e.g. 2024"
            placeholderTextColor={themeColors.onSurfaceVariant}
            keyboardType="numeric"
            value={form.year}
            onChangeText={set('year')}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={[styles.fieldLabel, { color: themeColors.onSurfaceVariant }]}>MAKE</Text>
            <View style={[styles.selectWrap, { backgroundColor: themeColors.surfaceContainerHigh }]}>
              <Text style={[styles.selectText, { color: themeColors.onSurface }]}>{form.make}</Text>
              <MaterialIcons name="expand-more" size={24} color={themeColors.onSurfaceVariant} />
            </View>
          </View>
          <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={[styles.fieldLabel, { color: themeColors.onSurfaceVariant }]}>MODEL</Text>
            <TextInput
              style={[styles.input, { backgroundColor: themeColors.surfaceContainerHigh, color: themeColors.onSurface }]}
              placeholder="e.g. 911 GT3"
              placeholderTextColor={themeColors.onSurfaceVariant}
              value={form.model}
              onChangeText={set('model')}
            />
          </View>
        </View>

        {/* Price Section */}
        <View style={[styles.priceCard, { backgroundColor: themeColors.surfaceContainerLow, borderColor: themeColors.outlineVariant }]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="payments" size={24} color={themeColors.primary} />
            <Text style={[styles.sectionTitle, { color: themeColors.onSurface }]}>Price</Text>
          </View>
          <View style={styles.priceInputRow}>
            <Text style={[styles.currency, { color: themeColors.onSurfaceVariant }]}>$</Text>
            <TextInput
              style={[styles.priceInput, { color: themeColors.onSurface }]}
              placeholder="0.00"
              placeholderTextColor={themeColors.surfaceContainerHighest}
              keyboardType="numeric"
              value={form.price}
              onChangeText={set('price')}
            />
          </View>
          <Text style={[styles.suggestion, { color: themeColors.onSurfaceVariant }]}>
            Set a competitive price. Most vehicles in this category sell for between 
            <Text style={{ color: themeColors.primary, fontWeight: '700' }}> $85k - $105k</Text>.
          </Text>
        </View>

        {/* Photos Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="add-a-photo" size={24} color={themeColors.primary} />
            <Text style={[styles.sectionTitle, { color: themeColors.onSurface }]}>Upload Photos</Text>
          </View>
          <View style={[styles.countBadge, { backgroundColor: themeColors.surfaceContainerHighest }]}>
            <Text style={[styles.countText, { color: themeColors.onSurfaceVariant }]}>0/6</Text>
          </View>
        </View>

        <View style={styles.photoGrid}>
          <TouchableOpacity style={[styles.coverPhoto, { backgroundColor: themeColors.surfaceContainerHigh, borderColor: themeColors.outlineVariant }]}>
            <View style={[styles.photoIconCircle, { backgroundColor: isLight ? '#006f6215' : 'rgba(255,255,255,0.1)' }]}>
              <MaterialIcons name="cloud-upload" size={28} color={themeColors.primary} />
            </View>
            <Text style={[styles.photoLabel, { color: themeColors.onSurfaceVariant }]}>COVER PHOTO</Text>
          </TouchableOpacity>
          <View style={styles.smallPhotosCol}>
            <TouchableOpacity style={[styles.smallPhoto, { backgroundColor: themeColors.surfaceContainerLow, borderColor: themeColors.outlineVariant }]}>
              <MaterialIcons name="add" size={24} color={themeColors.outlineVariant} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallPhoto, { backgroundColor: themeColors.surfaceContainerLow, borderColor: themeColors.outlineVariant }]}>
              <MaterialIcons name="add" size={24} color={themeColors.outlineVariant} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.tipBanner, { backgroundColor: isLight ? '#ccfbf140' : 'rgba(13,148,136,0.1)', borderColor: isLight ? '#0d948830' : 'rgba(13,148,136,0.2)' }]}>
          <MaterialIcons name="verified" size={20} color={themeColors.tertiary} />
          <Text style={[styles.tipText, { color: themeColors.onTertiaryContainer }]}>
            High-quality photos increase sale speed by up to 40%.
          </Text>
        </View>

        {/* Boost Section */}
        <View style={[styles.boostCard, { backgroundColor: themeColors.inverseSurface }]}>
          <View style={styles.boostContent}>
            <View style={styles.boostHeader}>
              <MaterialIcons name="bolt" size={20} color={themeColors.primaryContainer} />
              <Text style={[styles.boostKicker, { color: themeColors.primaryContainer }]}>PREMIUM PLACEMENT</Text>
            </View>
            <Text style={styles.boostTitle}>Boost Your Ad</Text>
            <Text style={styles.boostDesc}>Reach 5x more buyers with featured placement at the top of search results.</Text>
            <View style={styles.boostFooter}>
              <View style={styles.boostPriceRow}>
                <Text style={[styles.boostPrice, { color: themeColors.primaryContainer }]}>$19</Text>
                <Text style={styles.boostUnit}>/ 7 days</Text>
              </View>
              <Switch
                value={form.boost}
                onValueChange={set('boost')}
                trackColor={{ false: 'rgba(255,255,255,0.2)', true: themeColors.primaryContainer }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.mainBtn, { backgroundColor: themeColors.primary, shadowColor: themeColors.primary }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.mainBtnText}>Next Step: Review Listing</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.draftBtn}>
            <Text style={[styles.draftBtnText, { color: themeColors.onSurfaceVariant }]}>SAVE AS DRAFT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    flex: 1,
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  stepHeader: {
    marginBottom: 40,
  },
  stepInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.8,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '900',
  },
  progressBarBase: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 12,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1.2,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
  selectWrap: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  selectText: {
    fontSize: 15,
    fontWeight: '600',
  },
  priceCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  currency: {
    fontSize: 32,
    fontWeight: '800',
    marginRight: 10,
  },
  priceInput: {
    fontSize: 32,
    fontWeight: '900',
    flex: 1,
  },
  suggestion: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  countText: {
    fontSize: 11,
    fontWeight: '800',
  },
  photoGrid: {
    flexDirection: 'row',
    height: 300,
    marginBottom: 16,
  },
  coverPhoto: {
    flex: 2,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  photoIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  smallPhotosCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallPhoto: {
    flex: 0.48,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 32,
  },
  tipText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  boostCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 40,
  },
  boostContent: {
    zIndex: 10,
  },
  boostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boostKicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginLeft: 6,
  },
  boostTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  boostDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
    marginTop: 4,
  },
  boostFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  boostPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  boostPrice: {
    fontSize: 28,
    fontWeight: '900',
  },
  boostUnit: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
    marginLeft: 4,
  },
  actions: {
    marginTop: 10,
  },
  mainBtn: {
    height: 72,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  mainBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 10,
  },
  draftBtn: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  draftBtnText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});
