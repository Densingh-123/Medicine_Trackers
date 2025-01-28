import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
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

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnSignInClick = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill All Details", ToastAndroid.BOTTOM);
      Alert.alert("Please fill All Details");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
       await setLocalStorage('userDetail',user);
        ToastAndroid.show("Welcome", ToastAndroid.BOTTOM);
        router.push('(tabs)/Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code: ", errorCode, "Error Message", errorMessage);
        if (errorCode === 'auth/invalid-credential') {
          ToastAndroid.show("Invalid Email or Password", ToastAndroid.BOTTOM);
          Alert.alert('Invalid Email Or Password');
        }
      });
  };

  return (
    <ImageBackground
      source={require('./../../assets/images/auth.jpeg')} // Local background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.glassContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
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
          <TouchableOpacity style={styles.loginButton} onPress={OnSignInClick}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => router.push('login/Register')}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  glassContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Glassmorphism effect
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
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 15,
    color: '#fff',
    fontSize: 14,
  },
  registerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
