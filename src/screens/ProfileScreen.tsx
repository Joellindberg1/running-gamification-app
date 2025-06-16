import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import {
  getLevelFromXP,
  getProgressToNextLevel,
  getRemainingXPToNextLevel,
} from '../services/LevelService';

export default function ProfileScreen() {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text variant="bodyMedium">Ingen aktiv användare vald.</Text>
      </View>
    );
  }

  const level = getLevelFromXP(user.xp);
  const progress = getProgressToNextLevel(user.xp);
  const remainingXP = getRemainingXPToNextLevel(user.xp);

  const runHistory = user.runHistory || [];
  const totalDistance = runHistory.reduce((sum, run) => sum + run.distance, 0);
  const longestRun = runHistory.reduce((max, run) => Math.max(max, run.distance), 0);
  const totalRuns = runHistory.length;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Profil: {user.name}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">Level: {level}</Text>
          <Text variant="bodyMedium">XP: {user.xp}</Text>
          <Text variant="bodySmall">
            Progress till nästa nivå: {progress.toFixed(1)}%
          </Text>
          <Text variant="bodySmall">XP kvar: {remainingXP.toFixed(0)} XP</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">Antal loggade rundor: {totalRuns}</Text>
          <Text variant="bodyMedium">
            Total distans: {totalDistance.toFixed(2)} km
          </Text>
          <Text variant="bodyMedium">
            Längsta runda: {longestRun.toFixed(2)} km
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">Streak: (placeholder)</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 16 },
  card: { marginBottom: 16 },
});
