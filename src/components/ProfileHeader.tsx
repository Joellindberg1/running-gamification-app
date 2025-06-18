import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { getLevelFromXP, getProgressToNextLevel, getRemainingXPToNextLevel } from '../services/LevelService';
import { User } from '../contexts/UserContext';

export default function ProfileHeader({ user }: { user: User }) {
  const level = getLevelFromXP(user.xp);
  const progress = getProgressToNextLevel(user.xp);
  const xpLeft = getRemainingXPToNextLevel(user.xp);
  const nextXP = user.xp + xpLeft;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text variant="bodyLarge">{user.name}</Text>
          <Text variant="bodyLarge">Level {level}</Text>
        </View>

        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${progress}%` }]} />
          <Text style={styles.barText}>{progress.toFixed(0)}%</Text>
        </View>

        <Text variant="bodySmall">XP: {user.xp} / {Math.round(nextXP)} — {Math.round(xpLeft)} kvar</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#ffebcd', // 🔲 offwhite bakgrund
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  barBackground: {
    height: 12,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 4,
  },
  barFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 6,
    left: 0,
    top: 0,
  },
  barText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
