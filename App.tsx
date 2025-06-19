import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './src/contexts/UserContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import { RunProvider } from './src/contexts/RunContext';

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <RunProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </RunProvider>
      </UserProvider>
    </PaperProvider>
  );
}
