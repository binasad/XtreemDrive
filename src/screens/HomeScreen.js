import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import FiltersSheet from '../components/FiltersSheet';
import { FeaturedCarCard, ListCarCard } from '../components/CarCard';
import {
  featuredCars, categories, services, newCars,
  newsArticles
} from '../data/mock';

const { width: SCREEN_W } = Dimensions.get('window');

const QUICK_FILTERS = ['All', 'Sedan', 'SUV', 'Hatchback', 'Under 50 Lac', 'Automatic', 'Diesel'];
const SORT_OPTIONS = ['Newest', 'Price: Low', 'Price: High', 'Popular'];

// Tag-matchable filter keys from the sheet (values are arrays of strings)
const TAG_FILTER_KEYS = ['body', 'transmission', 'fuel', 'assembly', 'color'];

function countFilters(f = {}) {
  let n = 0;
  for (const k of Object.keys(f)) {
    const v = f[k];
    if (Array.isArray(v)) n += v.length;
    else if (v) n += 1;
  }
  return n;
}

function applySheetFilters(list, f = {}) {
  let out = list;

  if (f.cities?.length) {
    const lower = f.cities.map((c) => c.toLowerCase());
    out = out.filter((c) =>
      lower.some((city) => c.location?.toLowerCase().includes(city))
    );
  }

  if (f.makes?.length) {
    const lower = f.makes.map((m) => m.toLowerCase());
    out = out.filter((c) =>
      lower.some((make) => c.title?.toLowerCase().includes(make))
    );
  }

  const yMin = parseInt(f.yearMin, 10);
  const yMax = parseInt(f.yearMax, 10);
  if (!Number.isNaN(yMin)) out = out.filter((c) => (c.year ?? 0) >= yMin);
  if (!Number.isNaN(yMax)) out = out.filter((c) => (c.year ?? 9999) <= yMax);

  for (const key of TAG_FILTER_KEYS) {
    const values = f[key];
    if (values?.length) {
      const lower = values.map((v) => v.toLowerCase());
      out = out.filter((c) =>
        c.tags?.some((t) => lower.some((v) => t.toLowerCase().includes(v)))
      );
    }
  }

  return out;
}

export default function HomeScreen({ navigation }) {
  const { colors, radius, mode } = useTheme();
  const isDark = mode === 'dark';
  const isLight = !isDark;

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [showSort, setShowSort] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const searchInputRef = useRef(null);
  const activeFilterCount = countFilters(appliedFilters);

  let results = [...featuredCars];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q)
    );
  }

  if (activeQuickFilter > 0) {
    const f = QUICK_FILTERS[activeQuickFilter].toLowerCase();
    results = results.filter(c => {
      if (f.includes('lac')) return true; 
      return c.tags?.some(t => t.toLowerCase().includes(f)) ||
        c.title.toLowerCase().includes(f);
    });
  }

  results = applySheetFilters(results, appliedFilters);

  if (sortIdx === 1) results.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
  if (sortIdx === 2) results.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));

  const exitSearch = () => {
    setSearching(false);
    setQuery('');
    setActiveQuickFilter(0);
    searchInputRef.current?.blur();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="Xtreem Drive"
          leftIcon={searching ? 'arrow-back' : null}
          onLeftPress={searching ? exitSearch : undefined}
          rightIcon="notifications"
          onRightPress={() => navigation.navigate('Notifications')}
          showThemeToggle={!searching}
        />
      </SafeAreaView>

      {/* Sticky Search & Bar */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: isDark ? colors.surfaceAlt : '#ffffff',
              borderRadius: radius.md,
              borderWidth: 1.5,
              borderColor: isDark ? colors.border : '#111111',
            },
          ]}
        >
          <MaterialIcons name="search" size={20} color={isDark ? colors.textMuted : '#111111'} />
          <TextInput
            ref={searchInputRef}
            placeholder="Search by make, model, city..."
            placeholderTextColor={isDark ? colors.textDim : '#6b6b6b'}
            style={{ flex: 1, marginLeft: 10, color: colors.text, fontSize: 14 }}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setSearching(true)}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={{ padding: 4 }}>
              <MaterialIcons name="close" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            style={[styles.filterBtnWrap]}
          >
            {activeFilterCount > 0 ? (
              <View style={[styles.filterBtn, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                <MaterialIcons name="tune" size={18} color="#fff" />
                <View style={[styles.filterBadge, { backgroundColor: isDark ? '#fff' : '#111111' }]}>
                  <Text style={[styles.filterBadgeText, { color: isDark ? '#111111' : '#fff' }]}>{activeFilterCount}</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.filterBtn, { backgroundColor: isDark ? colors.surfaceAlt : '#ffffff', borderColor: isDark ? colors.border : '#111111' }]}>
                <MaterialIcons name="tune" size={18} color={colors.text} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Rendering */}
      {searching || query.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' }}>
              Marketplace Results
            </Text>
            <Text style={{ color: colors.text, fontSize: 32, fontWeight: '900', letterSpacing: -1, marginTop: 4 }}>
              Precision Performance
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 6 }}>
              {results.length} hand-selected vehicles found in your area.
            </Text>
          </View>

          <View style={[styles.resultsHeader, { borderBottomWidth: 0, paddingTop: 0 }]}>
            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              style={[styles.premiumControl, { backgroundColor: isLight ? '#f3f4f5' : colors.surfaceAlt, flex: 1, marginRight: 8 }]}
            >
              <MaterialIcons name="tune" size={18} color={colors.text} />
              <Text style={{ color: colors.text, fontWeight: '800', marginLeft: 8 }}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowSort(!showSort)}
              style={[styles.premiumControl, { backgroundColor: isLight ? '#f3f4f5' : colors.surfaceAlt, flex: 1, marginLeft: 8 }]}
            >
              <MaterialIcons name="swap-vert" size={18} color={colors.text} />
              <Text style={{ color: colors.text, fontWeight: '800', marginLeft: 8 }}>Sort: {SORT_OPTIONS[sortIdx]}</Text>
            </TouchableOpacity>
          </View>

          {showSort && (
            <View style={[styles.sortDropdown, { backgroundColor: colors.surfaceElevated, borderColor: colors.border, top: 120 }]}>
              {SORT_OPTIONS.map((s, i) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => { setSortIdx(i); setShowSort(false); }}
                  style={[styles.sortItem, { backgroundColor: sortIdx === i ? colors.primaryMuted : 'transparent' }]}
                >
                  <Text style={{ color: sortIdx === i ? colors.primary : colors.text, fontWeight: '700', fontSize: 13 }}>
                    {s}
                  </Text>
                  {sortIdx === i && <MaterialIcons name="check" size={16} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            numColumns={1}
            key="search-list"
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            renderItem={({ item }) => (
              <PremiumSearchCard 
                car={item} 
                colors={colors} 
                radius={radius} 
                isLight={isLight}
                onPress={() => navigation.navigate('CarDetails', { car: item })}
              />
            )}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        >
          {/* Quick Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          >
            {QUICK_FILTERS.map((f, i) => {
              const active = activeQuickFilter === i;
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => { setActiveQuickFilter(i); if (i > 0) setSearching(true); }}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? (isDark ? colors.primary : '#111111') : colors.surfaceAlt,
                      borderColor: active ? (isDark ? colors.primary : '#111111') : colors.border,
                    },
                  ]}
                >
                  {active && i > 0 && <MaterialIcons name="check" size={14} color="#fff" style={{ marginRight: 4 }} />}
                  <Text style={{ color: active ? '#fff' : colors.text, fontSize: 11, fontWeight: '700' }}>{f}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Hero Section */}
          <View style={{ paddingHorizontal: 20, paddingTop: 10, marginBottom: 24 }}>
            <Text style={[styles.heroTitle, { color: colors.text, fontSize: 32, fontWeight: '900', letterSpacing: -0.5 }]}>
              Find your next{'\n'}
              <Text style={{ color: colors.primary, fontStyle: 'italic' }}>masterpiece.</Text>
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '500', marginTop: 8 }}>
              Curated collection of engineering excellence.
            </Text>
          </View>

          {/* Category Bento Grid */}
          <View style={[styles.bento, { marginBottom: 32 }]}>
            <TouchableOpacity
              onPress={() => { setSearching(true); searchInputRef.current?.focus(); }}
              style={[styles.bigTile, { backgroundColor: isDark ? colors.surfaceAlt : colors.primary + '1A', borderRadius: 32 }]}
            >
              <View>
                <Text style={[styles.bigTileTitle, { color: colors.primary }]}>Used Cars</Text>
                <Text style={{ color: colors.primary + 'B3', fontSize: 12, marginTop: 4 }}>Verified pre-owned</Text>
              </View>
              <MaterialIcons name="directions-car" size={56} color={colors.primary + '40'} style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewCars')}
                style={[styles.smallTile, { backgroundColor: isDark ? colors.surfaceAlt : colors.secondary + '1A', borderRadius: 24, marginBottom: 12, height: 74 }]}
              >
                <Text style={{ color: isDark ? colors.text : colors.secondary, fontWeight: '800' }}>New Cars</Text>
                <MaterialIcons name="new-releases" size={24} color={isDark ? colors.primary : colors.secondary + '80'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Bikes')}
                style={[styles.smallTile, { backgroundColor: isDark ? colors.surfaceAlt : '#006f621A', borderRadius: 24, height: 74 }]}
              >
                <Text style={{ color: isDark ? colors.text : '#006f62', fontWeight: '800' }}>Bikes</Text>
                <MaterialIcons name="two-wheeler" size={24} color={isDark ? colors.primary : '#006f6280'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Featured Gallery */}
          <View style={{ marginBottom: 40 }}>
            <View style={{ px: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
              <View>
                <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2 }}>Curated</Text>
                <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 4 }}>Featured Gallery</Text>
              </View>
              <TouchableOpacity onPress={() => setSearching(true)}>
                <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 13 }}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              snapToInterval={SCREEN_W * 0.8 + 20}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {featuredCars.filter(c => c.featured).map((car) => (
                <FeaturedCarCard key={car.id} car={car} onPress={() => navigation.navigate('CarDetails', { car })} />
              ))}
            </ScrollView>
          </View>

          {/* Recent Arrivals */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 24 }}>Recent Arrivals</Text>
            {featuredCars.slice(0, 4).map((car) => (
              <ListCarCard 
                key={car.id} 
                car={car} 
                onPress={() => navigation.navigate('CarDetails', { car })}
                onFav={() => {}}
              />
            ))}
          </View>

          {/* Inspection Banner */}
          <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 32 }}>
            <LinearGradient
              colors={[colors.primary, colors.primary + 'E6']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ padding: 24, borderRadius: 24, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1.5 }}>INSPECTION SERVICE</Text>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '900', marginTop: 4 }}>Check Before You Buy</Text>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 }}>Starting from PKR 4,999</Text>
              </View>
              <MaterialIcons name="verified-user" size={42} color="#fff" style={{ opacity: 0.8 }} />
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      )}

      <FiltersSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        initial={appliedFilters}
        onApply={(f) => { setAppliedFilters(f); setSearching(true); }}
      />
    </View>
  );
}

function SectionHeader({ title, onSeeAll, colors }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={[styles.sectionHeader2, { color: colors.text }]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 13 }}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function PremiumSearchCard({ car, colors, radius, isLight, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 32,
        marginBottom: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.05,
        shadowRadius: 30,
        elevation: 10,
        borderWidth: isLight ? 1 : 0,
        borderColor: 'rgba(0,0,0,0.03)',
      }}
    >
      <View style={{ height: 240 }}>
        <Image source={{ uri: car.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
        <View style={{ position: 'absolute', top: 16, left: 16 }}>
          <View style={{ 
            backgroundColor: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)', 
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
            flexDirection: 'row', alignItems: 'center'
          }}>
            <MaterialIcons name="verified" size={12} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '900', marginLeft: 4 }}>VERIFIED</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>{car.title}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>{car.make} • {car.year}</Text>
          </View>
          <Text style={{ color: colors.primary, fontSize: 22, fontWeight: '900' }}>{car.price}</Text>
        </View>
        <TouchableOpacity 
          onPress={onPress}
          style={{ marginTop: 24 }}
        >
          <LinearGradient
            colors={[colors.primary, colors.primary + 'CC']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '800' }}>View Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heroTitle: { fontSize: 26, fontWeight: '900', lineHeight: 32 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: 14, paddingVertical: 4, paddingRight: 4,
  },
  filterBtn: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', borderWidth: 1,
  },
  filterBtnWrap: { borderRadius: 10 },
  filterBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  filterBadgeText: { fontSize: 9, fontWeight: '900' },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999, marginRight: 10, borderWidth: 1,
  },
  resultsHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  premiumControl: {
    height: 48, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  sortDropdown: {
    position: 'absolute', zIndex: 100, right: 16,
    borderRadius: 12, borderWidth: 1, overflow: 'hidden',
    elevation: 8,
  },
  sortItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, minWidth: 160,
  },
  quickRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, marginTop: 20,
  },
  bento: { flexDirection: 'row', paddingHorizontal: 20 },
  bigTile: { flex: 1, padding: 24, borderRadius: 32, height: 160, justifyContent: 'space-between' },
  bigTileTitle: { fontSize: 20, fontWeight: '900' },
  smallTile: { flex: 1, borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginTop: 32, marginBottom: 16,
  },
  sectionHeader2: { fontSize: 18, fontWeight: '900' },
});
