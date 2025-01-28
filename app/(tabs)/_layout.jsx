import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import getLocalStorage from '../../service/Storage';

const TabLayout = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Manage auth state

  useEffect(() => {
    const checkLocalUser = async () => {
      const userInfo = await getLocalStorage('userDetail');
      if (!userInfo) {
        setIsAuthenticated(false); // Not authenticated
        router.replace('/login/Index');
        return;
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // Not authenticated
        router.replace('/login/Index');
      }
    });

    checkLocalUser(); // Check local storage for user details
    return () => unsubscribe(); // Cleanup
  }, [router]);

  // Avoid rendering tabs until auth state is determined
  if (isAuthenticated === null) {
    return null; // Render nothing or a loading indicator
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: 'Add New',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
