import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function LogRunScreen() {
    const { users, activeUserId } = useUserContext();
    const [distance, setDistance] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);


    const activeUser = users.find((u) => u.id === activeUserId);

    const handleLogRun = () => {
    const parsed = parseFloat(distance.replace(',', '.'));
    if (isNaN(parsed) || parsed < 1.0) {
      setShowError(true);
      return;
    }

    // Här lägger vi till logik senare: XP, streak, runHistory
    console.log(`User ${activeUser?.name} loggade ${parsed} km`);
    setDistance('');
    setShowSuccess(true);
    };

    const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
    };


    if (!activeUser) {
        return (
        <View style={styles.container}>
            <Text>Ingen användare vald.</Text>
        </View>
        );
    }

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <Text style={styles.label}>Logga löprunda för {activeUser.name}</Text>
        <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.input}>
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
        <Button mode="contained" onPress={handleLogRun}>
        Logga runda
        </Button>

        <Snackbar visible={showSuccess} onDismiss={() => setShowSuccess(false)} duration={3000}>
        Rundan loggad!
        </Snackbar>

        <Snackbar visible={showError} onDismiss={() => setShowError(false)} duration={3000}>
        Ange minst 1.0 km
        </Snackbar>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 12 },
  input: { marginBottom: 20 },
});
