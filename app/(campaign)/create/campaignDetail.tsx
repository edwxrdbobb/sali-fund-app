import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FundraiserDetailsScreen = () => {
  const router = useRouter();
  const { fundraisingFor } = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleNext = () => {
    router.push({
      pathname: '/create/describeCampaign',
      params: { fundraisingFor, amount, category }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1 of 3</Text>
      <Text style={styles.header}>Fundraiser details</Text>

      <Text style={styles.label}>How much would you like to raise?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.currency}>USD</Text>
      </View>

      <Text style={styles.label}>What kind of fundraiser are you creating?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Select a category"
          value={category}
          onChangeText={setCategory}
        />
        <Icon name="chevron-down" size={24} color="#000" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  step: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  currency: {
    paddingRight: 10,
    color: '#666',
  },
  icon: {
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FundraiserDetailsScreen;