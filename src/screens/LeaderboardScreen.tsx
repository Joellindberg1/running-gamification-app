import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import { getLevelFromXP } from '../services/LevelService'; // ✅ Importera

export default function LeaderboardScreen() {
  const { users, activeUserId } = useUserContext();

  const sorted = [...users].sort((a, b) => {
    const levelA = getLevelFromXP(a.xp);
    const levelB = getLevelFromXP(b.xp);
    if (levelB === levelA) return b.xp - a.xp;
    return levelB - levelA;
  });

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Leaderboard</Text>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const level = getLevelFromXP(item.xp); // 👈 Använd level från XP
          return (
            <Card
              style={[
                styles.card,
                item.id === activeUserId && styles.activeCard,
              ]}
            >
              <Card.Content>
                <Text variant="bodyMedium">#{index + 1} – {item.name}</Text>
                <Text variant="bodySmall">Level: {level} | XP: {item.xp}</Text>
                <Text variant="bodySmall">Titel: (placeholder)</Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 16 },
  card: {
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
  },
  activeCard: {
    backgroundColor: '#cce5ff',
  },
});
