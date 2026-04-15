import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { chatMessages } from '../data/mock';

export default function ChatDetailScreen({ route, navigation }) {
  const { colors, radius } = useTheme();
  const conversation = route?.params?.conversation || {
    name: 'Premium Motors',
    avatar: 'https://i.pravatar.cc/150?img=12',
    online: true,
  };
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const listRef = useRef();

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 100);
  }, []);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { id: String(m.length + 1), text: input, fromMe: true, time: 'now' },
    ]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.surface }}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ color: colors.text, fontWeight: '800' }}>{conversation.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {conversation.online && (
                <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
              )}
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                {conversation.online ? 'Online' : 'Last seen recently'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginLeft: 8 }} hitSlop={10}>
            <MaterialIcons name="phone" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }} hitSlop={10}>
            <MaterialIcons name="more-vert" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Vehicle context card */}
      <View
        style={[
          styles.contextCard,
          { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg },
        ]}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
          }}
          style={styles.contextImg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ color: colors.text, fontWeight: '800' }}>2024 Porsche 911 Turbo S</Text>
          <Text style={{ color: colors.primary, fontWeight: '900', marginTop: 2 }}>
            $214,500
          </Text>
          <Text style={{ color: colors.success, fontSize: 11 }}>In stock</Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.fromMe
                  ? {
                      backgroundColor: colors.primary,
                      alignSelf: 'flex-end',
                      borderBottomRightRadius: 4,
                    }
                  : {
                      backgroundColor: colors.surfaceAlt,
                      alignSelf: 'flex-start',
                      borderBottomLeftRadius: 4,
                    },
              ]}
            >
              <Text
                style={{
                  color: item.fromMe ? '#fff' : colors.text,
                  fontSize: 14,
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  color: item.fromMe ? 'rgba(255,255,255,0.7)' : colors.textDim,
                  fontSize: 10,
                  marginTop: 4,
                  textAlign: 'right',
                }}
              >
                {item.time}
              </Text>
            </View>
          )}
        />

        <View style={[styles.inputBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="add" size={22} color={colors.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.surfaceAlt, color: colors.text },
            ]}
            placeholder="Message..."
            placeholderTextColor={colors.textDim}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
          />
          <TouchableOpacity
            onPress={send}
            style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          >
            <MaterialIcons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 10 },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  contextCard: {
    margin: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contextImg: { width: 60, height: 44, borderRadius: 8 },
  bubble: {
    maxWidth: '78%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    marginHorizontal: 6,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
