import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const MediTrackerIntro = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://tateeda.com/wp-content/uploads/2022/07/img-2-2.png' }} 
          style={styles.headerImage} 
        />
        <Text style={styles.name}>Welcome to MediTracker</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.description}>
          MediTracker helps you manage and track all your medications effectively. It provides reminders, tracks your medication history, and allows you to add personal notes.
        </Text>
        <Text style={styles.serviceTitle}>Key Features:</Text>
        <Text style={styles.serviceText}>✅ Add Medication - Log new prescriptions with details.</Text>
        <Text style={styles.serviceText}>✅ My Medications - View and manage your current medications.</Text>
        <Text style={styles.serviceText}>✅ Medication History - Keep track of past doses.</Text>
        <Text style={styles.serviceText}>✅ Comments - Add notes or doctor's advice.</Text>
        <Text style={styles.serviceText}>✅ Clear Comments - Delete notes when no longer needed.</Text>
        <Text style={styles.serviceText}>✅ Reminders - Get notifications for each dose.</Text>
        <Text style={styles.serviceText}>✅ Medication Guide - Detailed usage and side effects info.</Text>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>📍 Set reminders to never miss a dose.</Text>
        <Text style={styles.infoText}>📞 Contact support for medical assistance.</Text>
        <Text style={styles.infoText}>⭐ Rate and review medications for better guidance.</Text>
        <Text style={styles.infoText}>💬 Add and manage personal comments with ease.</Text>
      </View>
    </ScrollView>
  );
};

export default MediTrackerIntro;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 380,
    height: 250,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  additionalInfo: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
});
