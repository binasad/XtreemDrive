import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { featuredCars } from '../data/mock';

const QUICK_FILTERS = ['Sedan', 'SUV', 'Hatchback', 'Under $100k', 'Automatic', 'Electric'];

export default function SearchResultsScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const results = featuredCars.filter((c) =>
    query ? c.title.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="SEARCH"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="tune"
        />
      </SafeAreaView>

      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.surfaceAlt, borderRadius: radius.md },
        ]}
      >
        <MaterialIcons name="search" size={20} color={colors.textMuted} />
        <TextInput
          placeholder="Toyota, Porsche, BMW…"
          placeholderTextColor={colors.textDim}
          style={{ flex: 1, marginLeft: 10, color: colors.text }}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      >
        {QUICK_FILTERS.map((f, i) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.chip,
              {
                backgroundColor: i === 0 ? colors.primary : colors.surfaceAlt,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: i === 0 ? '#fff' : colors.text,
                fontSize: 12,
                fontWeight: '700',
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.resultsHeader}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>
          {results.length} results{' '}
          {query ? (
            <Text style={{ color: colors.textMuted, fontWeight: '500' }}>for "{query}"</Text>
          ) : null}
        </Text>
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
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
      <View style={{ padding: 10 }}>
        <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800' }}>
          {car.title}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
          {car.year} • {car.mileage}
        </Text>
        <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 6 }}>{car.price}</Text>
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
        Nothing matched.
      </Text>
      <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 6 }}>
        Try widening your filters or check back later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
