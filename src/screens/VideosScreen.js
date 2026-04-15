import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { useCardStyle } from '../components/Card';
import { videos } from '../data/mock';

export default function VideosScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const cardStyle = useCardStyle();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[cardStyle, { borderRadius: radius.lg, marginBottom: 14, overflow: 'hidden' }]}
      activeOpacity={0.85}
    >
      <View>
        <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
        <View style={styles.playBadge}>
          <MaterialIcons name="play-arrow" size={28} color="#fff" />
        </View>
        <View style={styles.durationBadge}>
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>{item.duration}</Text>
        </View>
      </View>
      <View style={{ padding: 14 }}>
        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 15 }} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <MaterialIcons name="visibility" size={14} color={colors.textMuted} />
          <Text style={{ color: colors.textMuted, fontSize: 12, marginLeft: 4 }}>
            {item.views} views
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="VIDEO REVIEWS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />
      </SafeAreaView>
      <FlatList
        data={videos}
        keyExtractor={(v) => v.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: { width: '100%', height: 190, backgroundColor: '#222' },
  playBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
});
