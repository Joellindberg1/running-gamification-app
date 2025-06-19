// Title Service
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import {
  getLevelFromXP,
  getProgressToNextLevel,
  getRemainingXPToNextLevel,
} from '../services/LevelService';
import { calculateStreak } from '../services/StreakService';
import { assignTitles } from '../services/TitleService';

export default function LeaderboardScreen() {
  const { users, activeUserId } = useUserContext();

  const titles = assignTitles(users);
  const updatedUsers = users.map(user => {
    const userTitles = [];
    if (titles.longestRun === user.id) userTitles.push('Den nyfödde Eliud Kipchoge');
    if (titles.totalKm === user.id) userTitles.push('Ultra älskarn');
    if (titles.weekendAvg === user.id) userTitles.push('Helg förstöraren');
    if (titles.longestStreak === user.id) userTitles.push('Daaaaaviiiiiid GOGGINGS');
    return {
      ...user,
      title: userTitles.length === 0
        ? undefined
        : userTitles.length === 1
        ? userTitles[0] + '!'
        : userTitles.slice(0, -1).join(', ') + ' & ' + userTitles.slice(-1) + '!',
    };
  });

  const sorted = [...updatedUsers].sort((a, b) => {
    const levelA = getLevelFromXP(a.xp);
    const levelB = getLevelFromXP(b.xp);
    if (levelB === levelA) return b.xp - a.xp;
    return levelB - levelA;
  });

  let currentRank = 1;
  let previousLevel = getLevelFromXP(sorted[0]?.xp ?? 0);
  let previousXP = sorted[0]?.xp ?? 0;
  let duplicateCount = 0;

  const rankedUsers = sorted.map((user, index) => {
    const level = getLevelFromXP(user.xp);
    if (index === 0) {
      return { ...user, rank: currentRank, level };
    }

    if (level === previousLevel && user.xp === previousXP) {
      duplicateCount++;
      return { ...user, rank: currentRank, level };
    } else {
      currentRank += 1 + duplicateCount;
      duplicateCount = 0;
      previousLevel = level;
      previousXP = user.xp;
      return { ...user, rank: currentRank, level };
    }
  });

  const getCardStyle = (rank: number, isActive: boolean) => {
    let backgroundColor = '#f1f1f1';
    if (rank === 1) backgroundColor = '#c9b037'; // matt guld
    else if (rank === 2) backgroundColor = '#c0c0c0';
    else if (rank === 3) backgroundColor = '#cd7f32';

    return [
      styles.card,
      { backgroundColor },
      isActive && styles.activeBorder,
    ];
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Leaderboard</Text>
      <FlatList
        data={rankedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isActive = item.id === activeUserId;
          const progress = getProgressToNextLevel(item.xp);
          const remaining = getRemainingXPToNextLevel(item.xp);
          const nextTarget = item.xp + remaining;

          const runHistory = item.runHistory || [];
          const streakData = calculateStreak(runHistory);
          const streak = streakData.currentStreak;
          const longestStreak = streakData.maxStreak;
          const multiplier = streakData.multiplier;

          const totalKm = runHistory.reduce((sum, run) => sum + run.distance, 0);
          const longestRun = runHistory.reduce((max, run) => Math.max(max, run.distance), 0);
          const avgRun = runHistory.length > 0 ? totalKm / runHistory.length : 0;
          const avgXP = runHistory.length > 0 ? Math.round(item.xp / runHistory.length) : 0;
          const lastRun = runHistory[runHistory.length - 1];
          const lastRunDate = lastRun ? new Date(lastRun.date).toLocaleDateString() : '-';
          const lastRunKm = lastRun ? lastRun.distance : '-';

          return (
            <Card style={getCardStyle(item.rank, isActive)}>
              <Card.Content>
                <View style={styles.row}>
                    <View style={styles.columnLeft}><Text variant="bodyMedium">#{item.rank}</Text></View>
                    <View style={styles.columnCenter}><Text variant="bodyMedium">{item.name}</Text></View>
                    <View style={styles.columnRight}><Text variant="bodyMedium">Level {item.level}</Text></View>
                </View>

                {item.title && (
                  <Text variant="bodySmall" style={{ marginTop: 2, fontStyle: 'italic' }}>
                    {item.title}
                  </Text>
                )}

                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${progress}%` }]} />
                  <Text style={styles.barText}>{progress.toFixed(0)}%</Text>
                </View>
                <Text variant="bodySmall">XP: {item.xp} / {Math.round(nextTarget)}</Text>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text variant="bodySmall">Streak: {streak} dagar</Text>
                    <Text variant="bodySmall">Medel: {avgRun.toFixed(1)} km</Text>
                  </View>

                  <View style={styles.column}>
                    <Text variant="bodySmall">Längsta streak: {longestStreak}</Text>
                    <Text variant="bodySmall">Längsta: {longestRun.toFixed(1)} km</Text>
                  </View>

                  <View style={styles.column}>
                    <Text variant="bodySmall">Multiplier: x{multiplier}</Text>
                    <Text variant="bodySmall">Totalt: {totalKm.toFixed(1)} km</Text>
                  </View>
                </View>

                <View style={{ marginTop: 4 }}>
                    <Text variant="bodySmall">Senaste: {lastRunDate} – {lastRunKm} km</Text>
                    <Text variant="bodySmall">XP per runda: {avgXP} XP</Text>
                </View>

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
    borderRadius: 8,
    paddingBottom: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  activeBorder: {
    borderWidth: 3,
    borderColor: '#3f51b5',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  column: {
    flex: 1,
  },
  columnLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  columnCenter: {
    flex: 1,
    alignItems: 'center',
  },
  columnRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
