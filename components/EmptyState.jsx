import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getLocalStorage } from '../service/Storage';

const EmptyState = ({ style }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getLocalStorage('userDetail');
        if (userInfo) {
          setUser(userInfo);
        } else {
          setUser(null); // If no user, fallback to null
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null); // Fallback to null if error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
     
      <Image source={require('./../assets/images/medicine.png')} style={styles.image} />
      <Text style={styles.title}>No Medications Found!</Text>
      <Text style={styles.subtitle}>
        You currently have no medications. Kindly set up a new one to get started.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('login/AddMedicine')}
      >
        <Text style={styles.buttonText}>+ Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    position: 'relative',
   
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7551E3FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
