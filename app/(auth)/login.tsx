import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase'; // Ensure this import is correct

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.replace('/(auth)/signup');
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      console.log('User profile:', profile);

      // Navigate to the main app screen
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign-in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Sign In heading */}
      <Text style={styles.heading}>Sign In</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="mail-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity>
          <Ionicons name="eye-off-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Checkbox and Terms */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#4630EB' : undefined}
        />
        <Text style={styles.termsText}>
          I agree to the healthcare <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignIn}
      >
        <Text style={styles.signUpButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color="black" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
      
      {/* Sign Up link */}
      <View style={styles.signInContainer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 8,
    fontSize: 14,
    color: 'gray',
  },
  linkText: {
    color: '#7B61FF', // purple color for the links
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#00C6AE', // gradient-inspired color
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#7B61FF',
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
});