import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import ProfileHeader from '../components/ProfileHeader';

export default function StatsScreen() {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);

  if (!user) return <Text>Ingen användare vald.</Text>;

  const runHistory = [...(user.runHistory || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalKm = runHistory.reduce((sum, run) => sum + run.distance, 0);
  const avgKm = runHistory.length > 0 ? totalKm / runHistory.length : 0;
  const longestRun = runHistory.reduce((max, run) => Math.max(max, run.distance), 0);
  const avgXP = runHistory.length > 0
    ? runHistory.reduce((sum, run) => sum + run.xp, 0) / runHistory.length
    : 0;
  const lastRun = runHistory[0];

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <Text variant="titleMedium" style={styles.pageTitle}>Stats</Text>

      <View style={styles.grid}>
        <StatCard title="Totalt antal rundor" value={`${runHistory.length} st`} />
        <StatCard title="Totalt distans" value={`${totalKm.toFixed(2)} km`} />
        <StatCard title="Medel per runda" value={`${avgKm.toFixed(2)} km`} />
        <StatCard title="Längsta runda" value={`${longestRun.toFixed(2)} km`} />
        <StatCard title="Medel XP / runda" value={`${avgXP.toFixed(0)} XP`} />
        {lastRun ? (
          <StatCard
            title="Senaste runda"
            value={`${new Date(lastRun.date).toLocaleDateString()}\n${lastRun.distance} km – ${lastRun.xp} XP`}
          />
        ) : (
          <StatCard title="Senaste runda" value="Inga rundor ännu" />
        )}
      </View>
    </View>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
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
  title: { marginTop: 16, marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
    pageTitle: {
        marginTop: 16,
        marginBottom: 12,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
  card: {
    width: '48%',
    aspectRatio: 1.6,
    borderRadius: 12,
    backgroundColor: '#a5d6a7',
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
    marginBottom: 18,
    fontWeight: 'bold', 
  },
  cardValue: {
    fontSize: 16,
    textAlign: 'center',
  },
});
