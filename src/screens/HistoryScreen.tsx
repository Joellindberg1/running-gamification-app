import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal, Pressable, Platform } from 'react-native';
import { Text, Card, TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUserContext } from '../contexts/UserContext';
import { calculateTotalXP } from '../services/XPService';
import ProfileHeader from '../components/ProfileHeader';
import { calculateStreak } from '../services/StreakService';
import { useRunContext } from '../contexts/RunContext';

export default function HistoryScreen() {
  const {
    users,
    activeUserId,
  } = useUserContext();
  const {
    removeRunFromUser,
    editRunForUser,
  } = useRunContext();

  const user = users.find((u) => u.id === activeUserId);
  if (!user) return <Text>Ingen användare vald.</Text>;

  const runHistory = [...(user.runHistory || [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [modalVisible, setModalVisible] = useState(false);
  const [editRunId, setEditRunId] = useState<string | null>(null);
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openEditModal = (runId: string) => {
    const run = runHistory.find(r => r.id === runId);
    if (!run) return;
    setEditRunId(runId);
    setDistance(run.distance.toString());
    setDate(new Date(run.date));
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (!editRunId || !user) return;
    const parsedDistance = parseFloat(distance.replace(',', '.'));
    const streak = calculateStreak(user.runHistory || []);
    const newXP = calculateTotalXP(parsedDistance, streak.currentStreak);
    const updatedRun = {
      distance: parsedDistance,
      xp: newXP,
      date: date.toISOString(),
    };
    editRunForUser(user.id, editRunId, updatedRun);
    setModalVisible(false);
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <Text style={styles.pageTitle}>Löpningshistorik</Text>

      {runHistory.length === 0 ? (
        <Text style={styles.noRuns}>Inga rundor loggade ännu.</Text>
      ) : (
        <FlatList
          data={runHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.detail}>Distans: {item.distance} km</Text>
                <Text style={styles.detail}>XP: {item.xp}</Text>

                <View style={styles.actions}>
                  <Pressable style={styles.editButton} onPress={() => openEditModal(item.id)}>
                    <Text style={styles.buttonText}>Redigera</Text>
                  </Pressable>
                  <Pressable style={styles.deleteButton} onPress={() => removeRunFromUser(user.id, item.id)}>
                    <Text style={styles.buttonText}>Ta bort</Text>
                  </Pressable>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Redigera runda</Text>

            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              Välj datum: {date.toLocaleDateString()}
            </Button>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChangeDate}
              />
            )}

            <TextInput
              label="Distans (km)"
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Avbryt</Text>
              </Pressable>
              <Pressable onPress={saveEdit} style={styles.saveButton}>
                <Text style={styles.saveText}>Spara</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#ce93d8',
    borderRadius: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 12,
  },
  editButton: {
    backgroundColor: '#9575cd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ef5350',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noRuns: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: '#888',
  },
  saveButton: {
    padding: 10,
  },
  saveText: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
});
