import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import RnDateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { TypeList, whenToMake } from './Options';
import { getLocalStorage } from '../service/Storage';
import { useRouter } from 'expo-router';
import { getDateRange } from '../service/ConvertDateTime';
import moment from 'moment';

const AddMedicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: {},
    dose: '',
    when: '',
    startDate: null,
    endDate: null,
    reminderTime: null,
  });

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDateForText = (date) => {
    if (date) {
      return moment(date).format('ll'); // e.g., "Jan 1, 2025"
    }
    return 'Select Date';
  };

  const formatTimeForText = (time) => {
    if (time) {
      return moment(time).format('hh:mm A'); // e.g., "10:30 AM"
    }
    return 'Select Time';
  };

  const saveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');

    if (!(formData.name && formData.type?.name && formData.dose && formData.startDate && formData.endDate && formData.reminderTime)) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    
    const dates = getDateRange(formData?.startDate, formData?.endDate);
    console.log(dates);

    setLoading(true);

    try {
      await setDoc(doc(collection(db, 'medications'), docId), {
        ...formData,
        userEmail: user?.email,
        docId,
        dates: dates
      });
      Alert.alert('Success', 'Medication added successfully!', [
        {
          text: 'Ok',
          onPress: () => router.push('(tabs)/Home'),
        },
      ]);
      setFormData({
        name: '',
        type: {},
        dose: '',
        when: '',
        startDate: null,
        endDate: null,
        reminderTime: null,
      });
    } catch (error) {
      console.error('Error saving medication: ', error);
      Alert.alert('Error', 'Failed to save medication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Medication</Text>

      {/* Medicine Name Input */}
      <View style={styles.inputGroup}>
        <FontAwesome name="medkit" size={24} color="white" style={styles.icon} />
        <TextInput
          placeholder="Medicine Name"
          style={styles.textInput}
          placeholderTextColor="#a3a3a3"
          value={formData.name}
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      {/* Type List (Horizontal List) */}
      <FlatList
        data={TypeList}
        horizontal
        style={styles.horizontalList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeListItem,
              { backgroundColor: item.name === formData?.type?.name ? '#3498db' : 'transparent' },
            ]}
            onPress={() => onHandleInputChange('type', item)}
          >
            <Text
              style={[
                styles.typeText,
                { color: item.name === formData?.type?.name ? 'white' : 'lightblue' },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose Input */}
      <View style={styles.inputGroup}>
        <Ionicons name="eyedrop-outline" size={24} color="white" style={styles.icon} />
        <TextInput
          placeholder="Dose (e.g., 2, 5ml)"
          style={styles.textInput}
          placeholderTextColor="#a3a3a3"
          value={formData.dose}
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      {/* When to Take (Picker) */}
      <View style={styles.inputGroup}>
        <Ionicons name="time-outline" size={24} color="white" style={styles.icon} />
        <Picker
          selectedValue={formData.when}
          onValueChange={(itemValue) => onHandleInputChange('when', itemValue)}
          style={styles.picker}
        >
          {whenToMake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start Date & End Date Input */}
      <View style={styles.dateGroup}>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartDate(true)}>
          <Entypo name="calendar" size={24} color="white" />
          <Text style={styles.dateText}>{formatDateForText(formData?.startDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowEndDate(true)}>
          <Entypo name="calendar" size={24} color="white" />
          <Text style={styles.dateText}>{formatDateForText(formData?.endDate)}</Text>
        </TouchableOpacity>
      </View>

      {showStartDate && (
        <RnDateTimePicker
          value={formData?.startDate ? new Date(formData.startDate) : new Date()}
          onChange={(event, selectedDate) => {
            onHandleInputChange('startDate', selectedDate || formData.startDate);
            setShowStartDate(false);
          }}
        />
      )}

      {showEndDate && (
        <RnDateTimePicker
          value={formData?.endDate ? new Date(formData.endDate) : new Date()}
          onChange={(event, selectedDate) => {
            onHandleInputChange('endDate', selectedDate || formData.endDate);
            setShowEndDate(false);
          }}
        />
      )}

      {/* Reminder Time Input */}
      <View style={styles.dateGroup}>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowTimePicker(true)}>
          <Entypo name="back-in-time" size={24} color="white" />
          <Text style={styles.dateText}>{formatTimeForText(formData?.reminderTime)}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RnDateTimePicker
          mode="time"
          value={formData?.reminderTime ? new Date(formData.reminderTime) : new Date()}
          onChange={(event, selectedTime) => {
            onHandleInputChange('reminderTime', selectedTime || formData.reminderTime);
            setShowTimePicker(false);
          }}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={saveMedication}
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="black" /> : <Text style={styles.buttonText}>Add New Medication</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e2a47',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
  },
  icon: {
    paddingRight: 10,
  },
  horizontalList: {
    marginTop: 10,
  },
  typeListItem: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    flex: 1,
    color: 'white',
  },
  dateGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#dcdcdc',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
});
