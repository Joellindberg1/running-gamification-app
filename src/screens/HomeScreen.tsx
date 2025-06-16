import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserSwitcher from '../components/UserSwitcher';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <UserSwitcher />
      <Text style={styles.text}>Välkommen till löparappen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
