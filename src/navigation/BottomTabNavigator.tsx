// BottomTabNavigator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import LogRunScreen from '../screens/LogRunScreen';
import ProfileMainScreen from '../screens/ProfileMainScreen';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitlesScreen from '../screens/TitlesScreen';
import StatsScreen from '../screens/StatsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StreakScreen from '../screens/StreakScreen';
import UserSwitcherScreen from '../screens/UserSwitcherScreen';

export type BottomTabParamList = {
  Home: undefined;
  LogRun: undefined;
  Profile: undefined;
  Leaderboard: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Leaderboard"
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <MaterialCommunityIcons
            name="account-switch"
            size={26}
            color="#333"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('UserSwitcher' as never)}
          />
        ),
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#6200ee',
      }}
    >
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          title: 'Hem',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="LogRun"
        component={LogRunScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.fabContainer}>
              <MaterialCommunityIcons name="plus" color="white" size={28} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileMainScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="Titles"
        component={TitlesScreen}
        options={{ title: 'Titlar' }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{ title: 'Statistik' }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'Historik' }}
      />
      <Stack.Screen
        name="Streak"
        component={StreakScreen}
        options={{ title: 'Streak' }}
      />
      <Stack.Screen
        name="UserSwitcher"
        component={UserSwitcherScreen}
        options={{
          title: '',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
