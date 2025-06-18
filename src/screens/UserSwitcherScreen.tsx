import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserSwitcher from '../components/UserSwitcher';

export default function UserSwitcherScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.overlay}>
      <Card style={styles.modal}>
        <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
        <Text variant="titleMedium" style={styles.title}>Byt användare</Text>
        <UserSwitcher />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
