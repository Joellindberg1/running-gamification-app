import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LogRunScreen from '../screens/LogRunScreen';
import ProfileScreen from '../screens/ProfileMainScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import TitlesScreen from '../screens/TitlesScreen';
import StatsScreen from '../screens/StatsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StreakScreen from '../screens/StreakScreen';




export type RootStackParamList = {
  Home: undefined;
  LogRun: undefined;
  Profile: undefined;
  Leaderboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hem' }} />
        <Stack.Screen name="LogRun" component={LogRunScreen} options={{ title: 'Logga runda' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
        <Stack.Screen name="Titles" component={TitlesScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Streak" component={StreakScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
