// RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import TitlesScreen from '../screens/TitlesScreen';
import StatsScreen from '../screens/StatsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StreakScreen from '../screens/StreakScreen';
import UserSwitcherScreen from '../screens/UserSwitcherScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Titles: undefined;
  Stats: undefined;
  History: undefined;
  Streak: undefined;
  UserSwitcher: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Titles" component={TitlesScreen} options={{ title: 'Titlar' }} />
      <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Statistik' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historik' }} />
      <Stack.Screen name="Streak" component={StreakScreen} options={{ title: 'Streak' }} />
      <Stack.Screen name="UserSwitcher" component={UserSwitcherScreen} options={{ title: 'Byt användare' }} />
    </Stack.Navigator>
  );
}
