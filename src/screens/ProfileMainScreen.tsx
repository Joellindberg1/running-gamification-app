import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import ProfileHeader from '../components/ProfileHeader';

export default function ProfileMainScreen({ navigation }: any) {
  const { users, activeUserId } = useUserContext();
  const user = users.find((u) => u.id === activeUserId);

  if (!user) return <Text>Ingen användare vald.</Text>;

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />

      <View style={styles.gridWrapper}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#90caf9' }]} // matt blå
            onPress={() => navigation.navigate('Titles')}
          >
            <Text style={styles.buttonText}>Titlar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#a5d6a7' }]} // matt grön
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.buttonText}>Stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#ce93d8' }]} // matt lila
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.buttonText}>Löpningshistorik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#ffcc80' }]} // matt orange
            onPress={() => navigation.navigate('Streak')}
          >
            <Text style={styles.buttonText}>Streak</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // 🔲 offwhite bakgrund
  },
  gridWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // 🔄 centrerar hela gridet
    gap: 12,
  },
  button: {
    width: '48%',
    aspectRatio: 0.75,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    // fontWeight: 'bold',
  },
});
