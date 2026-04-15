import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { autoStoreCategories, autoStoreProducts } from '../data/mock';

export default function AutoStoreScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [active, setActive] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="AUTO STORE"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="shopping-cart"
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: '900' }}>
            Parts & <Text style={{ color: colors.primary }}>Accessories</Text>
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}>
            Quality auto parts delivered to your door
          </Text>
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Shop by Category</Text>
        <View style={styles.catGrid}>
          {autoStoreCategories.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => setActive(c.id === active ? null : c.id)}
              style={[
                styles.catCard,
                {
                  backgroundColor: active === c.id ? colors.primaryMuted : colors.surfaceAlt,
                  borderRadius: radius.md,
                  borderColor: active === c.id ? colors.primary : 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <MaterialIcons name={c.icon} size={24} color={colors.primary} />
              <Text style={{ color: colors.text, fontWeight: '800', fontSize: 12, marginTop: 6 }}>{c.title}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 10 }}>{c.count} items</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Products</Text>
        <View style={styles.prodGrid}>
          {autoStoreProducts.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.prodCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <Image source={{ uri: p.image }} style={styles.prodImg} />
              <View style={{ padding: 10 }}>
                <Text style={{ color: colors.textMuted, fontSize: 10, letterSpacing: 1, fontWeight: '800' }}>
                  {p.category.toUpperCase()}
                </Text>
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 13, marginTop: 4 }} numberOfLines={2}>
                  {p.title}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 14 }}>{p.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={12} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 11, marginLeft: 3 }}>{p.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: colors.primary }]}
                >
                  <MaterialIcons name="add-shopping-cart" size={14} color="#fff" />
                  <Text style={{ color: '#fff', fontWeight: '800', fontSize: 11, marginLeft: 4 }}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18, fontWeight: '800',
    paddingHorizontal: 20, marginTop: 24, marginBottom: 12,
  },
  catGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12,
  },
  catCard: {
    width: '22%', marginHorizontal: '1.5%',
    padding: 12, marginBottom: 10, alignItems: 'center',
  },
  prodGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12,
  },
  prodCard: {
    width: '47%', marginHorizontal: '1.5%', marginBottom: 14, overflow: 'hidden',
  },
  prodImg: { width: '100%', height: 110, resizeMode: 'cover' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 8, borderRadius: 8, marginTop: 8,
  },
});
