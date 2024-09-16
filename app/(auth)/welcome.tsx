import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.title}>SALI</Text>

      {/* Welcome Text */}
      <Text style={styles.subheading}>Let’s get started!</Text>
      <Text style={styles.description}>Login to Stay healthy and fit</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace('/(auth)/signup')}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

            {/* Home Button */}
      {/* <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace('/(tabs)/')}>
        <Text style={styles.signUpButtonText}>Home</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A3764', // Navy blue color
    marginBottom: 40,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000', // Black color
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6C6C6C', // Light gray
    marginBottom: 40,
  },
  loginButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#00C6AE', // Gradient-inspired color (simplified to green)
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00C6AE', // Green border for sign-up
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#00C6AE', // Green text for sign-up
    fontWeight: 'bold',
  },
});