import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import { calculateStreak } from '../services/StreakService';
import ProfileHeader from '../components/ProfileHeader';

export default function StreakScreen() {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);

  if (!user) return <Text>Ingen användare vald.</Text>;

  const runHistory = user.runHistory || [];
  const { currentStreak, maxStreak, multiplier } = calculateStreak(runHistory);

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <Text style={styles.pageTitle}>Streak</Text>

      <View style={styles.grid}>
        <InfoCard title="Nuvarande streak" value={`${currentStreak} dagar`} />
        <InfoCard title="Multiplier" value={`x${multiplier.toFixed(2)}`} />
        <InfoCard title="Längsta streak" value={`${maxStreak} dagar`} />
      </View>
    </View>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  pageTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    aspectRatio: 1.6,
    borderRadius: 12,
    backgroundColor: '#ffcc80',
    marginBottom: 12,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});
