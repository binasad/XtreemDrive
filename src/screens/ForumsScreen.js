import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { useCardStyle } from '../components/Card';
import { forumThreads } from '../data/mock';

const CATEGORIES = ['All', 'Buying Advice', 'Reviews', 'Modifications', 'Maintenance', 'Ownership'];

export default function ForumsScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const cardStyle = useCardStyle();
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() => {
    if (cat === 'All') return forumThreads;
    return forumThreads.filter((t) => t.category === cat);
  }, [cat]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[cardStyle, { borderRadius: radius.lg, padding: 14, marginBottom: 10 }]}
      activeOpacity={0.85}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        {item.pinned && (
          <View style={[styles.pinPill, { backgroundColor: colors.primaryMuted }]}>
            <MaterialIcons name="push-pin" size={11} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '800', marginLeft: 3 }}>
              PINNED
            </Text>
          </View>
        )}
        <View
          style={[
            styles.catPill,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
          ]}
        >
          <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.8 }}>
            {item.category.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={{ color: colors.text, fontWeight: '800', fontSize: 15 }} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <MaterialIcons name="person" size={14} color={colors.textMuted} />
        <Text style={{ color: colors.textMuted, fontSize: 12, marginLeft: 4 }}>{item.author}</Text>
        <Text style={{ color: colors.textDim, fontSize: 12, marginHorizontal: 6 }}>·</Text>
        <Text style={{ color: colors.textMuted, fontSize: 12 }}>{item.time}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <Metric icon="forum" label={`${item.replies} replies`} colors={colors} />
        <View style={{ width: 14 }} />
        <Metric icon="visibility" label={`${item.views} views`} colors={colors} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="COMMUNITY"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="add"
        />
      </SafeAreaView>

      <View style={{ paddingTop: 12 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setCat(c)}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: active ? colors.primary : colors.surfaceAlt,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700', fontSize: 12 }}>
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      />
    </View>
  );
}

function Metric({ icon, label, colors }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialIcons name={icon} size={14} color={colors.textMuted} />
      <Text style={{ color: colors.textMuted, fontSize: 12, marginLeft: 4 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
  },
  pinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginRight: 6,
  },
  catPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
});
