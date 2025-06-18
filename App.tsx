import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './src/contexts/UserContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
}
