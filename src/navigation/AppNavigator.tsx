import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LogRunScreen from '../screens/LogRunScreen';


export type RootStackParamList = {
  Home: undefined;
  LogRun: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hem' }} />
        <Stack.Screen name="LogRun" component={LogRunScreen} options={{ title: 'Logga runda' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
