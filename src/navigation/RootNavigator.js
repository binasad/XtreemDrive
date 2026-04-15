import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import SellCarScreen from '../screens/SellCarScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import SellerDashboardScreen from '../screens/SellerDashboardScreen';
import NewCarsScreen from '../screens/NewCarsScreen';
import NewCarDetailScreen from '../screens/NewCarDetailScreen';
import BikesScreen from '../screens/BikesScreen';
import AutoStoreScreen from '../screens/AutoStoreScreen';
import CarComparisonScreen from '../screens/CarComparisonScreen';
import NewsScreen from '../screens/NewsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import BoostListingScreen from '../screens/BoostListingScreen';
import ManageListingScreen from '../screens/ManageListingScreen';
import SellForMeScreen from '../screens/SellForMeScreen';
import {
  EmptyFavorites,
  EmptySearch,
  NotFound,
  NetworkError,
} from '../screens/EmptyStates';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const { colors, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const activeColor = mode === 'dark' ? colors.primary : '#000000';
  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const icon = options.tabBarIconName;
        const label = options.tabBarLabel || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
            }}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabIconWrap,
                focused && { backgroundColor: colors.primaryMuted },
              ]}
            >
              <MaterialIcons
                name={icon}
                size={22}
                color={focused ? activeColor : colors.textMuted}
              />
            </View>
            <Text
              style={{
                color: focused ? activeColor : colors.textMuted,
                fontSize: 10,
                fontWeight: '700',
                marginTop: 2,
                letterSpacing: 0.8,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIconName: 'explore', tabBarLabel: 'EXPLORE' }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ tabBarIconName: 'article', tabBarLabel: 'NEWS' }}
      />
      <Tab.Screen
        name="Sell"
        component={SellCarScreen}
        options={{ tabBarIconName: 'add-circle', tabBarLabel: 'SELL' }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatListScreen}
        options={{ tabBarIconName: 'chat-bubble-outline', tabBarLabel: 'CHATS' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIconName: 'person', tabBarLabel: 'ME' }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { mode, colors } = useTheme();
  const navTheme = {
    ...(mode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
        <Stack.Screen name="Chat" component={ChatDetailScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
        {/* New PakWheels-inspired screens */}
        <Stack.Screen name="NewCars" component={NewCarsScreen} />
        <Stack.Screen name="NewCarDetail" component={NewCarDetailScreen} />
        <Stack.Screen name="Bikes" component={BikesScreen} />
        <Stack.Screen name="AutoStore" component={AutoStoreScreen} />
        <Stack.Screen name="CarComparison" component={CarComparisonScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        {/* Seller flow screens */}
        <Stack.Screen name="BoostListing" component={BoostListingScreen} />
        <Stack.Screen name="ManageListing" component={ManageListingScreen} />
        <Stack.Screen name="SellForMe" component={SellForMeScreen} />
        {/* End new screens */}
        <Stack.Screen name="Favorites" component={EmptyFavorites} />
        <Stack.Screen name="EmptySearch" component={EmptySearch} />
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="NetworkError" component={NetworkError} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIconWrap: {
    width: 44,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
