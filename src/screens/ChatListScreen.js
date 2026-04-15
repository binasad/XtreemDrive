import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { conversations } from '../data/mock';

export default function ChatListScreen({ navigation }) {
  const { colors, radius } = useTheme();
  const [q, setQ] = useState('');
  const list = conversations.filter((c) =>
    q ? c.name.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="MESSAGES"
          leftIcon="menu"
          rightIcon="edit"
          secondRightIcon="search"
        />
      </SafeAreaView>

      <View style={{ padding: 20 }}>
        <View
          style={[
            styles.search,
            { backgroundColor: colors.surfaceAlt, borderRadius: radius.md },
          ]}
        >
          <MaterialIcons name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search conversations"
            placeholderTextColor={colors.textDim}
            value={q}
            onChangeText={setQ}
            style={{ flex: 1, marginLeft: 10, color: colors.text }}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      >
        <View style={styles.contact}>
          <View
            style={[
              styles.addCircle,
              { borderColor: colors.primary },
            ]}
          >
            <MaterialIcons name="add" size={22} color={colors.primary} />
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 6 }}>New</Text>
        </View>
        {conversations.map((c, i) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => navigation.navigate('Chat', { conversation: c })}
            style={styles.contact}
          >
            <View style={[styles.avatarWrap, { borderColor: i === 0 ? colors.primary : 'transparent' }]}>
              <Image source={{ uri: c.avatar }} style={styles.avatar} />
              {c.online && (
                <View style={[styles.onlineDot, { backgroundColor: colors.success, borderColor: colors.background }]} />
              )}
            </View>
            <Text
              numberOfLines={1}
              style={{ color: colors.text, fontSize: 11, marginTop: 6, maxWidth: 64 }}
            >
              {c.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120, paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { conversation: item })}
            style={[styles.row, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg }]}
          >
            <View style={styles.avatarWrap}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.online && (
                <View
                  style={[
                    styles.onlineDot,
                    { backgroundColor: colors.success, borderColor: colors.surfaceAlt },
                  ]}
                />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.rowTop}>
                <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.textDim, fontSize: 11 }}>{item.time}</Text>
              </View>
              <View style={styles.rowTop}>
                <Text
                  style={{ color: colors.textMuted, fontSize: 13, flex: 1 }}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
                {item.unread > 0 && (
                  <View style={[styles.unread, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '900' }}>
                      {item.unread}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  contact: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  addCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    padding: 1,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 28 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  unread: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
