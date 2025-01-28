import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/031/586/359/small/many-men-experience-the-widespread-phenomenon-of-loneliness-in-society-ai-generated-photo.jpg',
        }}
        style={styles.img}
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Add New Medication')}>
        <AntDesign name="pluscircle" size={24} color="#fff" />
        <Text style={styles.buttonText}>Add a New Medication</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Logout')}>
        <AntDesign name="logout" size={24} color="#fff" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('My Medication')}>
        <AntDesign name="medicinebox" size={24} color="#fff" />
        <Text style={styles.buttonText}>My Medication</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('History')}>
        <FontAwesome name="clock-o" size={24} color="#fff" />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#e0f7fa', // Light blue background
  },
  heading: {
    fontSize: 38,
    color: '#007bb5', // Dark blue
    fontWeight: 'bold',
    marginBottom: 20,
  },
  img: {
    width: 180,
    height: 180,
    borderRadius: 100, // Circular image
    borderWidth: 2,
    borderColor: '#007bb5', // Blue border
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bb5', // Blue background for buttons
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    width: '80%', // Ensure the button takes the full width
    justifyContent: 'center',
    opacity: 0.9, // Slight opacity for hover effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  buttonHovered: {
    opacity: 1, // On hover, make the button fully opaque
  }
});
