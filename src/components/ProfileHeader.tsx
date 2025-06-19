import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { User } from '../contexts/UserContext';
import { getLevelFromXP, getProgressToNextLevel, getRemainingXPToNextLevel } from '../services/LevelService';
import { assignTitles } from '../services/TitleService';

export default function ProfileHeader({ user }: { user: User }) {
  const level = getLevelFromXP(user.xp);
  const progress = getProgressToNextLevel(user.xp);
  const remaining = getRemainingXPToNextLevel(user.xp);
  const nextTarget = user.xp + remaining;

  // Beräkna och tilldela titlar live
  const titles = assignTitles([user]);
  const userTitles = [];
  if (titles.longestRun === user.id) userTitles.push('Den nyfödde Eliud Kipchoge');
  if (titles.totalKm === user.id) userTitles.push('Ultra älskarn');
  if (titles.weekendAvg === user.id) userTitles.push('Helg förstöraren');
  if (titles.longestStreak === user.id) userTitles.push('Daaaaaviiiiiid GOGGINGS');
  const titleDisplay = userTitles.length === 0
    ? undefined
    : userTitles.length === 1
    ? userTitles[0] + '!'
    : userTitles.slice(0, -1).join(', ') + ' & ' + userTitles.slice(-1) + '!';

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.headerText}>{user.name} – Level {level}</Text>

        {titleDisplay && (
          <Text variant="bodySmall" style={{ fontStyle: 'italic', marginTop: 4 }}>
            {titleDisplay}
          </Text>
        )}

        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${progress}%` }]} />
          <Text style={styles.barText}>{progress.toFixed(0)}%</Text>
        </View>
        <Text variant="bodySmall">XP: {user.xp} / {Math.round(nextTarget)}</Text>
        <Text variant="bodySmall">XP kvar: {remaining.toFixed()}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  barBackground: {
    height: 14,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 7,
    marginTop: 8,
    marginBottom: 6,
    justifyContent: 'center',
  },
  barFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 7,
    left: 0,
    top: 0,
  },
  barText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
