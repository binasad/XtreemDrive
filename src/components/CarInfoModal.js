import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const YEARS = Array.from({ length: 2026 - 1980 + 1 }, (_, i) => String(2026 - i));

const MAKES = [
  'Toyota', 'Honda', 'Suzuki', 'KIA', 'Hyundai', 'MG', 'BYD', 'Changan',
  'Chery', 'Daihatsu', 'Nissan', 'Mitsubishi', 'Mazda', 'BMW', 'Mercedes', 'Audi',
];

const MODELS_BY_MAKE = {
  Toyota: ['Corolla', 'Yaris', 'Fortuner', 'Hilux', 'Prado', 'Land Cruiser', 'Camry', 'Aqua'],
  Honda: ['Civic', 'City', 'BR-V', 'HR-V', 'Accord', 'Vezel'],
  Suzuki: ['Swift', 'Cultus', 'Alto', 'Wagon R', 'Mehran', 'Bolan', 'Vitara'],
  KIA: ['Sportage', 'Picanto', 'Stonic', 'Sorento', 'Carnival'],
  Hyundai: ['Tucson', 'Sonata', 'Elantra', 'Santa Fe', 'Porter'],
  MG: ['HS', 'ZS EV', 'MG5', 'MG6'],
  BYD: ['Atto 3', 'Seal', 'Dolphin'],
  Changan: ['Alsvin', 'Karvaan', 'Oshan X7'],
  Chery: ['Tiggo 4', 'Tiggo 8', 'QQ'],
  Daihatsu: ['Mira', 'Move', 'Hijet'],
  Nissan: ['Dayz', 'Roox', 'Clipper'],
  Mitsubishi: ['Lancer', 'Pajero', 'Mirage'],
  Mazda: ['CX-5', 'Axela', 'Demio'],
  BMW: ['3 Series', '5 Series', 'X1', 'X5'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC'],
  Audi: ['A4', 'A6', 'Q5', 'Q7'],
};

const VARIANTS = ['Base', 'GLi', 'XLi', 'Altis', 'Altis Grande', 'Oriel', 'RS', 'VX', 'VXL', 'AWD'];

const STEPS = [
  { key: 'year', title: 'Select Model Year', sub: 'Which year was your vehicle manufactured?' },
  { key: 'make', title: 'Select Make', sub: 'Choose the manufacturer of your car.' },
  { key: 'model', title: 'Select Model', sub: 'Pick the specific model.' },
  { key: 'variant', title: 'Select Variant', sub: 'Pick the trim / variant of your car.' },
];

export default function CarInfoModal({ visible, onClose, initial, onDone }) {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  const [stepIdx, setStepIdx] = useState(0);
  const [selection, setSelection] = useState({
    year: initial?.year || null,
    make: initial?.make || null,
    model: initial?.model || null,
    variant: initial?.variant || null,
  });

  // Light theme (matching HTML)
  const lightTheme = {
    backdrop: 'rgba(0,0,0,0.6)',
    sheet: '#1A1A1A',
    header: '#1A1A1A',
    headerBorder: '#333333',
    headerText: '#ffffff',
    dots: '#242424',
    dotsBorder: '#333333',
    descBlock: 'rgba(255,255,255,0.05)',
    descTitle: '#ffffff',
    descSub: 'rgba(255,255,255,0.5)',
    rowDefault: 'transparent',
    rowDefaultText: 'rgba(255,255,255,0.8)',
    rowActive: '#006f62',
    rowActiveText: '#ffffff',
    rowPressed: 'rgba(255,255,255,0.05)',
    footer: '#242424',
    footerBorder: '#333333',
    ctaBg: '#ffffff',
    ctaText: '#1A1A1A',
    dotActive: '#006f62',
    dotInactive: 'rgba(255,255,255,0.2)',
  };

  // Dark theme (cinematic red)
  const darkTheme = {
    backdrop: 'rgba(0,0,0,0.6)',
    sheet: colors.background,
    header: colors.background,
    headerBorder: colors.border,
    headerText: colors.text,
    dots: colors.surface,
    dotsBorder: colors.border,
    descBlock: 'rgba(255,77,61,0.08)',
    descTitle: colors.text,
    descSub: colors.textMuted,
    rowDefault: 'transparent',
    rowDefaultText: colors.textMuted,
    rowActive: colors.primary,
    rowActiveText: '#ffffff',
    rowPressed: 'rgba(255,255,255,0.05)',
    footer: colors.surface,
    footerBorder: colors.border,
    ctaBg: colors.primary,
    ctaText: '#ffffff',
    dotActive: colors.primary,
    dotInactive: colors.border,
  };

  const t = isDark ? darkTheme : lightTheme;

  const current = STEPS[stepIdx];
  const list = useMemo(() => {
    if (current.key === 'year') return YEARS;
    if (current.key === 'make') return MAKES;
    if (current.key === 'model') return MODELS_BY_MAKE[selection.make] || [];
    if (current.key === 'variant') return VARIANTS;
    return [];
  }, [current.key, selection.make]);

  const chosen = selection[current.key];

  const pick = (val) => {
    setSelection((s) => ({ ...s, [current.key]: val }));
  };

  const next = () => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      onDone?.(selection);
      reset();
    }
  };

  const back = () => {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  const reset = () => {
    setStepIdx(0);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const nextLabel = stepIdx < STEPS.length - 1
    ? `Continue to ${STEPS[stepIdx + 1].key.charAt(0).toUpperCase() + STEPS[stepIdx + 1].key.slice(1)}`
    : 'Done';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={[styles.backdrop, { backgroundColor: t.backdrop }]}>
        <View style={[styles.sheet, { backgroundColor: t.sheet }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: t.headerBorder, backgroundColor: t.header }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={stepIdx > 0 ? back : handleClose} style={{ padding: 4 }}>
                <MaterialIcons name={stepIdx > 0 ? 'arrow-back' : 'close'} size={24} color={t.headerText} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: t.headerText }]}>Car Info</Text>
            </View>
            <View style={[styles.dots, { backgroundColor: t.dots, borderColor: t.dotsBorder }]}>
              {STEPS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { backgroundColor: i === stepIdx ? t.dotActive : t.dotInactive },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Step description */}
          <View style={[styles.descBlock, { backgroundColor: t.descBlock }]}>
            <Text style={[styles.descTitle, { color: t.descTitle }]}>{current.title}</Text>
            <Text style={[styles.descSub, { color: t.descSub }]}>{current.sub}</Text>
          </View>

          {/* List */}
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            {list.length === 0 ? (
              <Text style={[styles.emptyText, { color: t.rowDefaultText }]}>No options available. Go back and choose first.</Text>
            ) : (
              list.map((item) => {
                const active = chosen === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => pick(item)}
                    style={({ pressed }) => [
                      styles.row,
                      { backgroundColor: active ? t.rowActive : pressed ? t.rowPressed : t.rowDefault },
                    ]}
                  >
                    <Text style={[styles.rowText, { color: active ? t.rowActiveText : t.rowDefaultText }]}>
                      {item}
                    </Text>
                    <MaterialIcons
                      name={active ? 'check-circle' : 'arrow-forward-ios'}
                      size={active ? 22 : 16}
                      color={active ? t.rowActiveText : isDark ? colors.textDim : 'rgba(255,255,255,0.18)'}
                    />
                  </Pressable>
                );
              })
            )}
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { backgroundColor: t.footer, borderTopColor: t.footerBorder }]}>
            <TouchableOpacity
              onPress={next}
              disabled={!chosen}
              style={[styles.cta, { backgroundColor: t.ctaBg }, !chosen && { opacity: 0.4 }]}
            >
              <Text style={[styles.ctaText, { color: t.ctaText }]}>{nextLabel}</Text>
              <MaterialIcons name="arrow-forward" size={20} color={t.ctaText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    height: '90%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    marginLeft: 14,
    letterSpacing: -0.4,
  },
  dots: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  descBlock: {
    paddingHorizontal: 30,
    paddingVertical: 24,
  },
  descTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  descSub: {
    fontSize: 13,
    marginTop: 4,
  },
  row: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    padding: 30,
  },
  footer: {
    padding: 20,
    paddingBottom: 28,
    borderTopWidth: 1,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '900',
    marginRight: 10,
    letterSpacing: -0.2,
  },
});
