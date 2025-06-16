import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';

export default function UserSwitcher() {
  const { users, activeUserId, setActiveUser } = useUserContext();

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Inga användare tillagda ännu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj användare:</Text>
      {users.map((user) => (
        <Button
          key={user.id}
          mode={user.id === activeUserId ? 'contained' : 'outlined'}
          onPress={() => setActiveUser(user.id)}
          style={styles.button}
        >
          {user.name}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  title: { fontSize: 16, marginBottom: 8 },
  button: { marginBottom: 8 },
});
