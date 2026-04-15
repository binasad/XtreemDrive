import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export default function NewsDetailScreen({ route, navigation }) {
  const { colors, radius } = useTheme();
  const article = route?.params?.article || {
    title: 'Breaking News',
    summary: 'Article content here.',
    time: 'Just now',
    image: 'https://images.unsplash.com/photo-1621007690695-45aaed9e7a3a?w=800',
    category: 'News',
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconCircle, { backgroundColor: colors.glass }]}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconCircle, { backgroundColor: colors.glass }]}>
            <MaterialIcons name="share" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={{ uri: article.image }} style={{ width, height: 260 }} />
        <View style={{ padding: 20 }}>
          <View style={[styles.badge, { backgroundColor: colors.primaryMuted }]}>
            <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1 }}>
              {article.category.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
          <Text style={{ color: colors.textMuted, marginTop: 8 }}>{article.time}</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={{ color: colors.text, lineHeight: 24, fontSize: 15 }}>
            {article.summary}
          </Text>
          <Text style={{ color: colors.textMuted, lineHeight: 22, marginTop: 16 }}>
            This is a placeholder for the full article content. In a production app, this would
            be fetched from a CMS or API and rendered with rich formatting, embedded images,
            and related articles.
          </Text>
          <Text style={{ color: colors.textMuted, lineHeight: 22, marginTop: 16 }}>
            Xtreem Drive brings you the latest automotive news, expert reviews, and buying guides 
            to help you make informed decisions. Stay tuned for more updates from Pakistan's 
            premier automotive marketplace.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16, paddingVertical: 10,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  title: { fontSize: 24, fontWeight: '900', marginTop: 12, lineHeight: 30 },
  divider: { height: 1, marginVertical: 16 },
});
