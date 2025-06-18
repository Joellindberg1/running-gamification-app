import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import ProfileHeader from '../components/ProfileHeader';

export default function TitlesScreen() {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);

  if (!user) return <Text>Ingen användare vald.</Text>;

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <Text variant="titleMedium" style={styles.title}>Titlar</Text>

      {/* Visa användarens titlar här */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { marginTop: 16 },
});
