import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

const DescribeFundraiserScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleContinue = () => {
    router.push({
      pathname: '/create/campaignCoverImg',
      params: { ...params, title, description }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 2 of 3</Text>
      <Text style={styles.header}>Describe why you're fundraising</Text>

      <Text style={styles.label}>Give your fundraiser a title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Help Gabriel attend college"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Describe your need and situation</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Hi everyone, I'm fundraising for..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  step: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
  multilineInput: {
    height: 120,
  },
  continueButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DescribeFundraiserScreen;