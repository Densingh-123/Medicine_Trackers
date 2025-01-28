import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator, // Import the ActivityIndicator for loading effect
} from 'react-native';
import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { getLocalStorage } from '../service/Storage';
import { getDateRangeToDiplay } from '../service/ConvertDateTime';
import MedicationCardItem from './MedicationCardItem';
import EmptyState from './EmptyState';
import { useRouter } from 'expo-router';

const MedicationList = () => {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [scale] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  useEffect(() => {
    fetchDateRangeList();
  }, []);

  useEffect(() => {
    fetchMedicationList(selectedDate);
  }, [selectedDate]);

  // Fetch date ranges for the selector
  const fetchDateRangeList = () => {
    const dateRange = getDateRangeToDiplay();
    setDateRange(dateRange);
  };

  // Handle the press on a specific date
  const handlePress = (formatDate) => {
    setSelectedDate(formatDate);
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  };

  // Fetch medications for the selected date
  const fetchMedicationList = async (selectedDate) => {
    setLoading(true); // Set loading to true while fetching data
    const user = await getLocalStorage('userDetail');
    if (!user || !user.email) {
      console.error('User details are missing.');
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'medications'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);
      const medications = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        medications.push(data);
      });

      console.log('Fetched Medications:', medications);

      setMedList(medications);
    } catch (error) {
      console.error('Error fetching medication list:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/med1.jpg')} style={styles.image} />

      {/* Date Range Selector */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dateRange}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handlePress(item.formatDate);
              fetchMedicationList(item.formatDate);
            }}
            activeOpacity={0.7}
            style={[
              styles.dateGroup,
              {
                backgroundColor: item?.formatDate === selectedDate ? '#1e90ff' : 'white',
                borderColor: item?.formatDate === selectedDate ? '#1e90ff' : '#f0f0f0',
              },
            ]}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <Text style={[styles.day, { color: item?.formatDate === selectedDate ? 'white' : '#333' }]}>
                {item.day}
              </Text>
              <Text style={[styles.date, { color: item?.formatDate === selectedDate ? 'white' : '#1e90ff' }]}>
                {item.date}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />

      {/* Medication List */}
      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" style={styles.loader} />
      ) : medList.length > 0 ? (
        <FlatList
          data={medList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: 'login/ActionModel',
                  params: {
                    docId: item.id,
                    name: item.name,
                    dosage: item.dosage,
                    time: item.time,
                    selectedDate,
                    type: item.type,
                    endDate: item.endDate,
                  },
                })
              }
            >
              <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noData}>No medications found for this date.</Text>}
        />
      ) : (
        <EmptyState style={styles.emptyState} />
      )}
    </View>
  );
};

export default MedicationList;

// Styling
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  dateGroup: {
    padding: 15,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
    borderWidth: 2,
  },
  day: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
  },
  emptyState: {
    marginTop: 110,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
});
