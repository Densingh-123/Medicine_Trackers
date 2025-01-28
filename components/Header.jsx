import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import EmptyState from './EmptyState'; // Import EmptyState

const Header = () => {
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [dropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    try {
      const userInfo = await getLocalStorage('userDetail'); // Fetch user details from local storage
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUsername = (email) => {
    if (email && email.includes('@gmail.com')) {
      return `Hello ${email.split('@')[0]} 👋`;
    }
    return 'Hi User';
  };

  const handleLogout = () => {
    router.push('/login/Index');
  };

  const handleAddMedicine = () => {
    setDropdownVisible(false); // Hide dropdown
    // Navigate to Add Medicine page or show EmptyState
    router.push('(tabs)/AddNew'); // Replace with your actual route
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/wink.png')} style={styles.avatar} />
      <Text style={styles.username}>{getUsername(user?.email)}</Text>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.iconContainer}>
        <AntDesign name="setting" size={28} color="gray" style={styles.icon} />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleAddMedicine} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Add Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    zIndex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between username and settings icon
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Takes available space between avatar and icon
  },
  iconContainer: {
    position: 'relative', // Position dropdown relative to icon
  },
  icon: {
    marginLeft: 40,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 150,
    paddingVertical: 10,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
