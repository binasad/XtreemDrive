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
import { newsArticles, videos } from '../data/mock';

const TABS = ['All', 'News', 'Reviews', 'Guides'];

export default function NewsScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const filtered = activeTab === 0
    ? newsArticles
    : newsArticles.filter(a => a.category === TABS[activeTab]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="NEWS & REVIEWS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(i)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === i ? colors.primary : colors.surfaceAlt,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{ color: activeTab === i ? '#fff' : colors.text, fontSize: 12, fontWeight: '800' }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured article (first) */}
        {filtered.length > 0 && (
          <TouchableOpacity
            style={[styles.featuredCard, { borderRadius: radius.lg }]}
            onPress={() => navigation.navigate('NewsDetail', { article: filtered[0] })}
          >
            <Image source={{ uri: filtered[0].image }} style={styles.featuredImg} />
            <View style={[styles.featuredOverlay]}>
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1 }}>
                  {filtered[0].category.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.featuredTitle}>{filtered[0].title}</Text>
              <Text style={styles.featuredTime}>{filtered[0].time}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Article list */}
        {filtered.slice(1).map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => navigation.navigate('NewsDetail', { article })}
            style={[styles.articleRow, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
          >
            <Image source={{ uri: article.image }} style={styles.articleImg} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={[styles.badge, { backgroundColor: colors.primaryMuted, alignSelf: 'flex-start' }]}>
                <Text style={{ color: colors.primary, fontSize: 9, fontWeight: '900', letterSpacing: 1 }}>
                  {article.category.toUpperCase()}
                </Text>
              </View>
              <Text style={{ color: colors.text, fontWeight: '800', marginTop: 4 }} numberOfLines={2}>
                {article.title}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }} numberOfLines={2}>
                {article.summary}
              </Text>
              <Text style={{ color: colors.textDim, fontSize: 11, marginTop: 6 }}>{article.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Videos Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Videos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {videos.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={[styles.videoCard, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
            >
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: v.thumbnail }} style={styles.videoThumb} />
                <View style={styles.playBtn}>
                  <MaterialIcons name="play-arrow" size={28} color="#fff" />
                </View>
                <View style={styles.durationBadge}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{v.duration}</Text>
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 12 }} numberOfLines={2}>
                  {v.title}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 4 }}>
                  {v.views} views
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 999, marginRight: 8, borderWidth: 1,
  },
  featuredCard: {
    marginHorizontal: 20, height: 220, overflow: 'hidden',
  },
  featuredImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  featuredOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  featuredTitle: { color: '#fff', fontWeight: '900', fontSize: 16, marginTop: 6 },
  featuredTime: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4 },
  articleRow: {
    flexDirection: 'row', marginHorizontal: 20, padding: 10, marginTop: 10,
  },
  articleImg: { width: 100, height: 90, borderRadius: 12 },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', paddingHorizontal: 20, marginTop: 28, marginBottom: 14,
  },
  videoCard: { width: 220, marginRight: 12, overflow: 'hidden' },
  videoThumb: { width: '100%', height: 130, resizeMode: 'cover' },
  playBtn: {
    position: 'absolute', top: '50%', left: '50%',
    marginTop: -20, marginLeft: -20,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute', bottom: 8, right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4,
  },
});
