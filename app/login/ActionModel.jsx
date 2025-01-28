import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, TextInput, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db } from '../../config/FirebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import moment from 'moment';

const ActionModel = () => {
  const router = useRouter();
  const { docId } = useLocalSearchParams(); // Get docId from URL parameters
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMedicationDetails = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'medications', docId); // Get the document reference using docId
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMedicine(data);
          setComments(data.comments || []); // Load existing comments if available
        } else {
          Alert.alert('Error', 'Medication not found');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch medication details');
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      fetchMedicationDetails();
    }
  }, [docId]);

  const updatedActionStatus = async (status) => {
    if (!medicine?.docId || !medicine?.dates) {
      Alert.alert('Error', 'Missing medication details.');
      return;
    }

    try {
      setLoading(true);
      const currentDate = moment().format('YYYY-MM-DD');
      const docRef = doc(db, 'medications', docId);
      const docSnap = await getDoc(docRef);
      const medicationData = docSnap.data();

      // Check if an action for today already exists
      const existingAction = medicationData?.action?.find((item) => item.date === currentDate);

      if (existingAction) {
        Alert.alert('Info', 'Status has already been set for today.');
        setLoading(false);
        return;
      }

      // Proceed with update
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          date: currentDate,
        }),
        actionStatus: status,
        actionDate: currentDate,
      });

      setLoading(false);
      Alert.alert(status, 'Response Saved!', [
        {
          text: 'OK',
          onPress: () => router.replace('(tabs)/Home'),
        },
      ]);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', 'Failed to update status.');
    }
  };

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        setLoading(true);
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const docRef = doc(db, 'medications', docId);
        const commentWithTimestamp = `${comment.trim()} (added at ${moment(currentTime).format('DD MMMM YYYY at hh:mm A')})`;
        await updateDoc(docRef, {
          comments: arrayUnion(commentWithTimestamp),
        });
        setComments((prevComments) => [...prevComments, commentWithTimestamp]);
        setComment('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add comment.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Comment cannot be empty.');
    }
  };

  const renderComments = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#1e90ff" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="closecircle" size={24} color="white" />
      </TouchableOpacity>

      {medicine && (
        <>
          <Image source={{ uri: medicine.type?.icon }} style={styles.image} />
          <Text style={styles.title}>{medicine?.name || 'Medication Reminder'}</Text>
          <Text style={styles.subText}>
            Dose: {medicine?.dose || 'Not Specified'} | Time: {medicine?.when || 'Not Specified'}
          </Text>
          <Text style={styles.subText}>
            Reminder Time: {Array.isArray(medicine?.reminderTime)
              ? medicine?.reminderTime.join(', ')
              : medicine?.reminderTime
              ? moment(medicine.reminderTime.toDate()).format('hh:mm A')
              : 'Not Specified'}
          </Text>
          <Text style={styles.subText}>
            Dates: {Array.isArray(medicine?.dates) ? medicine?.dates.join(', ') : 'Not Specified'}
          </Text>
          <Text style={styles.subText}>Status: {medicine?.actionStatus || 'Not Found'}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.missedButton} onPress={() => updatedActionStatus('Missed')}>
              <Entypo name="cross" size={24} color="white" />
              <Text style={styles.buttonText}>Missed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.takenButton} onPress={() => updatedActionStatus('Taken')}>
              <AntDesign name="check" size={24} color="white" />
              <Text style={styles.buttonText}>Taken</Text>
            </TouchableOpacity>
          </View>

          {/* Add Comment Section */}
          <View style={styles.commentSection}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
              <Text style={styles.buttonText}>Add Comment</Text>
            </TouchableOpacity>
          </View>

          {/* Display Comments */}
          <FlatList
            data={comments}
            renderItem={renderComments}
            keyExtractor={(item, index) => index.toString()}
            style={styles.commentList}
          />
        </>
      )}
    </View>
  );
};

export default ActionModel;

// Add styles below...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#1e90ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    zIndex: 1,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  missedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  takenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  commentSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addCommentButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  commentList: {
    marginTop: 20,
  },
  commentItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
