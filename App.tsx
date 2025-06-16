import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </PaperProvider>
  );
}

