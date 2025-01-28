import React, { useState } from 'react';
import { auth } from './../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { setLocalStorage } from '../../service/Storage';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const OnCreateAccount = async () => {
    if (!email || !password || !name) {
      ToastAndroid.show('Please fill all details', ToastAndroid.BOTTOM);
      Alert.alert('Please fill all details');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the Firebase user profile with the display name
      await updateProfile(user, { displayName: name });

      // Save user details to local storage
      await setLocalStorage('userDetail', {
        displayName: name,
        email: user.email,
        uid: user.uid,
      });

      router.push('(tabs)/Home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error Code: ', errorCode, 'Error Message: ', errorMessage);

      if (errorCode === 'auth/email-already-in-use') {
        ToastAndroid.show('Email already exists', ToastAndroid.BOTTOM);
        Alert.alert('Email already exists');
      }
    }
  };

  return (
    <ImageBackground
      source={require('./../../assets/images/auth.jpeg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.glassContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#d1d1d1"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#d1d1d1"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#d1d1d1"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.registerButton} onPress={OnCreateAccount}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => router.push('login/SignIn')}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  glassContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  registerButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 15,
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
