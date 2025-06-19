import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { RunLog } from '../contexts/RunContext';
import ProfileHeader from '../components/ProfileHeader';
import { assignTitles, TitleAssignments } from '../services/TitleService';
import { calculateStreak } from '../services/StreakService';
import { useUserContext } from '../contexts/UserContext';
import { useRunStats } from '../hooks/useRunStats';

export default function TitlesScreen() {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);
  const titleAssignments = assignTitles(users);

  if (!user) return <Text>Ingen användare vald.</Text>;

  const { totalKm, longestRun, runHistory } = useRunStats(user.id);
  const streak = calculateStreak(runHistory).currentStreak;

  const weekendAvg = getUserCategoryValue(user, 'weekendAvg');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader user={user} />
      <Text style={styles.title}>Titlar – Din progress</Text>

      <TitleCard
        title="Längsta rundan"
        value={longestRun}
        goal="12 km"
        userId={user.id}
        category="longestRun"
        users={users}
        titleAssignments={titleAssignments}
      />
      <TitleCard
        title="Totalt antal km"
        value={totalKm}
        goal="100 km"
        userId={user.id}
        category="totalKm"
        users={users}
        titleAssignments={titleAssignments}
      />
      <TitleCard
        title="Helgsnitt"
        value={weekendAvg}
        goal="9.0 km"
        userId={user.id}
        category="weekendAvg"
        users={users}
        titleAssignments={titleAssignments}
      />
      <TitleCard
        title="Streak"
        value={streak}
        goal="20 dagar"
        userId={user.id}
        category="longestStreak"
        users={users}
        titleAssignments={titleAssignments}
      />
    </ScrollView>
  );
}

function TitleCard({
  title,
  value,
  goal,
  userId,
  category,
  users,
  titleAssignments,
}: {
  title: string;
  value: number;
  goal: string;
  userId: string;
  category: keyof TitleAssignments;
  users: any[];
  titleAssignments: TitleAssignments;
}) {
  const titleHolderId = titleAssignments[category];
  const titleHolder = users.find(u => u.id === titleHolderId);
  const titleHolderName = titleHolder?.name || '-';
  const titleHolderValue = getUserCategoryValue(titleHolder, category);

  const sortedUsers = users
    .map(u => ({ id: u.id, value: getUserCategoryValue(u, category) }))
    .sort((a, b) => b.value - a.value);

  const runnerUp = sortedUsers.find(u => u.id !== titleHolderId);
  const isUserRunnerUp = runnerUp?.id === userId;
  const hasTitle = titleHolderId === userId;

  const showRunnerUp = hasTitle && runnerUp;
  const showYouAreRunnerUp = !hasTitle && titleHolder && isUserRunnerUp;
  const showHolderInfo = !hasTitle && titleHolder;

  return (
    <Card style={[styles.card, hasTitle && styles.cardWithTitle]}>
      <Card.Content>
        <Text variant="titleSmall" style={styles.cardTitle}>{title}</Text>
        <Text variant="bodyMedium">Ditt rekord: {value.toFixed(1)}</Text>
        <Text variant="bodySmall">Krav: {goal}</Text>

        {hasTitle && (
          <>
            <Text variant="bodySmall" style={styles.highlight}>✅ Du har titeln!</Text>
            {showRunnerUp && (
              <Text variant="bodySmall">Runner up: {getUserName(users, runnerUp.id)} – {runnerUp.value.toFixed(1)}</Text>
            )}
          </>
        )}

        {showYouAreRunnerUp && (
          <Text variant="bodySmall" style={styles.runnerUp}>🔥 Du är runner up!</Text>
        )}

        {showHolderInfo && (
          <Text variant="bodySmall">
            Titelhållare: {titleHolderName} – {titleHolderValue.toFixed(1)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

function getUserName(users: any[], id?: string): string {
  return users.find(u => u.id === id)?.name || '-';
}

function getUserCategoryValue(user: any, category: keyof TitleAssignments): number {
  const history = user?.runHistory || [];
  switch (category) {
    case 'longestRun':
      return Math.max(...history.map((r: RunLog) => r.distance), 0);
    case 'totalKm':
      return history.reduce((sum: number, r: RunLog) => sum + r.distance, 0);
    case 'weekendAvg': {
      const weekends: Record<string, number> = {};
      for (const run of history) {
        const d = new Date(run.date);
        const day = d.getDay();
        if (day === 0 || day === 6) {
          const key = `${d.getFullYear()}-W${Math.ceil(((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(d.getFullYear(), 0, 1).getDay()) / 7)}`;
          weekends[key] = (weekends[key] || 0) + run.distance;
        }
      }
      const values = Object.values(weekends).filter(km => km > 0);
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    }
    case 'longestStreak':
      return calculateStreak(history).currentStreak;
    default:
      return 0;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#90caf9',
  },
  cardWithTitle: {
    backgroundColor: '#a5d6a7',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  highlight: {
    color: 'green',
    marginTop: 4,
  },
  runnerUp: {
    color: '#00000',
    marginTop: 4,
  },
});
