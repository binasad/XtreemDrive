import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import TopAppBar from '../components/TopAppBar';
import { notifications } from '../data/mock';

export default function NotificationsScreen({ navigation }) {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <TopAppBar
          title="NOTIFICATIONS"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="settings"
          onRightPress={() => navigation.navigate('NotificationSettings')}
        />
      </SafeAreaView>

      <View style={styles.sectionRow}>
        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16 }}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: colors.surfaceAlt,
                borderRadius: radius.md,
                borderLeftColor: item.unread ? colors.primary : 'transparent',
              },
            ]}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <MaterialIcons name={item.icon} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.rowBetween}>
                <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.textDim, fontSize: 11 }}>{item.time}</Text>
              </View>
              <Text
                style={{ color: colors.textMuted, fontSize: 13, marginTop: 4 }}
                numberOfLines={2}
              >
                {item.body}
              </Text>
            </View>
            {item.unread && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                  marginLeft: 8,
                }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
