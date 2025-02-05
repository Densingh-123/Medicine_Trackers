import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';

const MedicationCardItem = ({ medicine }) => {
  const router = useRouter();

  // Navigate to ActionModel page with the medicine's docId
  const handlePress = () => {
    router.push(`/ActionModel?docId=${medicine?.docId}`);
  };

  // Format Reminder Time
  const reminderTime = Array.isArray(medicine?.reminderTime)
    ? medicine.reminderTime
        .map((time) => (time?.toDate ? moment(time.toDate()).format('hh:mm A') : 'Invalid Time'))
        .join(', ')
    : medicine?.reminderTime?.toDate
    ? moment(medicine.reminderTime.toDate()).format('hh:mm A')
    : 'No Reminder';

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Taken':
        return <AntDesign name="checkcircle" size={20} color="green" />;
      case 'Missed':
        return <Entypo name="circle-with-cross" size={20} color="red" />;
      default:
        return <Entypo name="help-with-circle" size={20} color="gray" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        {/* Medication Icon */}
        <Image source={{ uri: medicine?.type?.icon }} style={styles.icon} />

        {/* Medication Details */}
        <View style={styles.details}>
          <Text style={styles.name}>{medicine?.name || 'N/A'}</Text>
          <Text style={styles.dose}>{medicine?.dose || 'N/A'}</Text>
        </View>

        {/* View Details Button */}
        <TouchableOpacity  style={styles.viewDetailsButton}>
          <AntDesign name="arrowright" size={24} color="#1e90ff" />
        </TouchableOpacity>
      </View>

      {/* Time and Status */}
      <View style={styles.bottomRight}>
        <Text style={styles.timeText}>{reminderTime}</Text>
        <View style={styles.statusIcon}>{renderStatusIcon(medicine?.actionStatus)}</View>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dose: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e90ff',
  },
  viewDetailsButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
  statusIcon: {
    marginLeft: 5,
  },
});
