import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { UserProvider } from './src/contexts/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </PaperProvider>
  );
}

