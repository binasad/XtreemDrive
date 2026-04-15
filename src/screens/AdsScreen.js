import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import FiltersSheet from '../components/FiltersSheet';
import { featuredCars } from '../data/mock';

const SORT_OPTIONS = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'low', label: 'Price: Low to High' },
  { key: 'high', label: 'Price: High to Low' },
  { key: 'popular', label: 'Most Viewed' },
];

export default function AdsScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('recent');
  const [showSort, setShowSort] = useState(false);

  const results = useMemo(() => {
    let list = featuredCars;
    if (query) {
      list = list.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sort === 'low' || sort === 'high') {
      list = [...list].sort((a, b) => {
        const pa = Number(a.price.replace(/[^0-9]/g, ''));
        const pb = Number(b.price.replace(/[^0-9]/g, ''));
        return sort === 'low' ? pa - pb : pb - pa;
      });
    }
    return list;
  }, [query, sort, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="ADS"
          leftIcon="menu"
          rightIcon="notifications"
          onRightPress={() => navigation.navigate('Notifications')}
        />
      </SafeAreaView>

      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <Text style={[styles.heading, { color: colors.text }]}>
          All <Text style={{ color: colors.primary, fontStyle: 'italic' }}>Listings</Text>
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 2 }}>
          {results.length} ads available
        </Text>
      </View>

      {/* Search + filter */}
      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.surfaceAlt, borderRadius: radius.md },
        ]}
      >
        <MaterialIcons name="search" size={20} color={colors.textMuted} />
        <TextInput
          placeholder="Search ads..."
          placeholderTextColor={colors.textDim}
          style={{ flex: 1, marginLeft: 10, color: colors.text }}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
            <MaterialIcons name="close" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          style={[styles.filterBtn, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="tune" size={18} color="#fff" />
          {activeFilterCount > 0 && (
            <View style={[styles.badge, { borderColor: colors.background }]}>
              <Text style={styles.badgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Sort + view toggle row */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={() => setShowSort((v) => !v)}
          style={[
            styles.sortBtn,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
          ]}
        >
          <MaterialIcons name="sort" size={16} color={colors.text} />
          <Text style={{ color: colors.text, fontWeight: '700', fontSize: 12, marginLeft: 6 }}>
            {SORT_OPTIONS.find((s) => s.key === sort)?.label}
          </Text>
          <MaterialIcons name="expand-more" size={16} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => setView('grid')}
            style={[
              styles.viewBtn,
              { backgroundColor: view === 'grid' ? colors.primaryMuted : 'transparent' },
            ]}
          >
            <MaterialIcons
              name="grid-view"
              size={18}
              color={view === 'grid' ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setView('list')}
            style={[
              styles.viewBtn,
              { backgroundColor: view === 'list' ? colors.primaryMuted : 'transparent' },
            ]}
          >
            <MaterialIcons
              name="view-list"
              size={18}
              color={view === 'list' ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>

      {showSort && (
        <View
          style={[
            styles.sortMenu,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
          ]}
        >
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => {
                setSort(opt.key);
                setShowSort(false);
              }}
              style={styles.sortItem}
            >
              <Text
                style={{
                  color: sort === opt.key ? colors.primary : colors.text,
                  fontWeight: sort === opt.key ? '800' : '500',
                }}
              >
                {opt.label}
              </Text>
              {sort === opt.key && (
                <MaterialIcons name="check" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {results.length === 0 ? (
        <EmptyResults colors={colors} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={view === 'grid' ? 2 : 1}
          key={view}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 120 }}
          columnWrapperStyle={view === 'grid' ? { justifyContent: 'space-between' } : null}
          renderItem={({ item }) =>
            view === 'grid' ? (
              <GridCard
                car={item}
                colors={colors}
                radius={radius}
                onPress={() => navigation.navigate('CarDetails', { car: item })}
              />
            ) : (
              <RowCard
                car={item}
                colors={colors}
                radius={radius}
                onPress={() => navigation.navigate('CarDetails', { car: item })}
              />
            )
          }
        />
      )}

      <FiltersSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        initial={filters}
        onApply={setFilters}
      />
    </View>
  );
}

function GridCard({ car, colors, radius, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '48%',
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.lg,
        marginBottom: 14,
        overflow: 'hidden',
      }}
    >
      <Image source={{ uri: car.image }} style={{ width: '100%', height: 120 }} />
      {car.verified && (
        <View style={[styles.verBadge, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="verified" size={10} color="#fff" />
        </View>
      )}
      <View style={{ padding: 10 }}>
        <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800' }}>
          {car.title}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
          {car.year} • {car.mileage}
        </Text>
        <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 6 }}>
          {car.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function RowCard({ car, colors, radius, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.lg,
        padding: 10,
        marginBottom: 12,
      }}
    >
      <Image
        source={{ uri: car.image }}
        style={{ width: 110, height: 90, borderRadius: 10 }}
      />
      <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
        <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>
          {car.title}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 3 }}>
          {car.year} • {car.mileage} • {car.location}
        </Text>
        <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 6 }}>
          {car.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function EmptyResults({ colors }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <MaterialIcons name="search-off" size={60} color={colors.textDim} />
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 12 }}>
        No ads match.
      </Text>
      <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 6 }}>
        Try widening your filters or check back later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 26, fontWeight: '900' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 14,
    paddingLeft: 14,
    paddingVertical: 6,
    paddingRight: 6,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#e74c3c',
    fontSize: 10,
    fontWeight: '900',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortMenu: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 4,
    marginBottom: 10,
  },
  sortItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
