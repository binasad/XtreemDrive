import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { useCardStyle } from '../components/Card';
import { savedSearches as seed } from '../data/mock';

export default function SavedSearchesScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const cardStyle = useCardStyle();
  const [items, setItems] = useState(seed);

  const toggleAlerts = (id) =>
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, alerts: !s.alerts } : s))
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((s) => s.id !== id));

  const renderItem = ({ item }) => (
    <View style={[cardStyle, { borderRadius: radius.lg, padding: 16, marginBottom: 12 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 15 }}>{item.name}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{item.summary}</Text>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={{ padding: 4 }}>
          <MaterialIcons name="delete-outline" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <View
          style={[
            styles.matchPill,
            { backgroundColor: colors.primaryMuted },
          ]}
        >
          <MaterialIcons name="insights" size={12} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '800', marginLeft: 4 }}>
            {item.matches} matches
          </Text>
        </View>
      </View>

      <View style={styles.divider(colors)} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            name={item.alerts ? 'notifications-active' : 'notifications-off'}
            size={18}
            color={item.alerts ? colors.primary : colors.textMuted}
          />
          <Text style={{ color: colors.text, fontWeight: '700', marginLeft: 8, fontSize: 13 }}>
            Email alerts
          </Text>
        </View>
        <Switch
          value={item.alerts}
          onValueChange={() => toggleAlerts(item.id)}
          thumbColor={item.alerts ? colors.primary : '#f4f3f4'}
          trackColor={{ false: colors.border, true: colors.primaryMuted }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SearchResults', { filters: item.filters })}
        style={[styles.viewBtn, { backgroundColor: colors.primary }]}
      >
        <MaterialIcons name="search" size={16} color="#fff" />
        <Text style={{ color: '#fff', fontWeight: '800', marginLeft: 6, fontSize: 13 }}>
          View Results
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="SAVED SEARCHES"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <MaterialIcons name="bookmark-border" size={56} color={colors.textMuted} />
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16, marginTop: 10 }}>
            No saved searches
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4, textAlign: 'center', paddingHorizontal: 40 }}>
            Save a search from the filters sheet to get notified when new cars match.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(s) => s.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  matchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  divider: (colors) => ({
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 12,
  }),
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
