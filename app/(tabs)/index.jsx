import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity ,ScrollView} from 'react-native';
import Colors from '@/constants/Colors'; // Ensure this path is correct
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('./../../assets/images/login.jpg')} // Ensure this path is correct
        style={styles.image}
      />

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Stay on Track, Stay Healthy</Text>
        <Text style={styles.subtitle}>
          Track your medicine and take control of your health. Stay consistent, stay confident.
        </Text>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={()=>router.push('login/SignIn')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Terms Note */}
        <Text style={styles.note}>
          NOTE: By clicking Continue, you agree to our Terms and Conditions.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '55%', // Adjusted for better proportion
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.blue1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.blue7,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.blue7,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    
  },
  buttonText: {
    color: Colors.blue1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: Colors.light,
    textAlign: 'center',
    marginTop: 10,
  },
});
