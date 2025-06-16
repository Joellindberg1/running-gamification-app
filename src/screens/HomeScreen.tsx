import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserSwitcher from '../components/UserSwitcher';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';




export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <UserSwitcher />
      <Text style={styles.text}>Välkommen till löparappen!</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LogRun')}
        style={{ marginTop: 24 }}
      >
        Gå till Logga runda
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
