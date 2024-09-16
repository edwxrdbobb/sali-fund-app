import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ScreenOne = () => {
  const router = useRouter();

  const handleSelection = (type: string) => {
    router.push({
      pathname: '/(campaign)/create/campaignDetail',
      params: { fundraisingFor: type }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create fundraiser</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Who are you fundraising for?</Text>

        <TouchableOpacity style={styles.option} onPress={() => handleSelection('Yourself')}>
          <View style={styles.iconContainer}>
            <Ionicons name="refresh-outline" size={24} color="purple" />
          </View>
          <Text style={styles.optionText}>Yourself</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelection('Someone else')}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-outline" size={24} color="purple" />
          </View>
          <Text style={styles.optionText}>Someone else</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelection('Charity')}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={24} color="purple" />
          </View>
          <Text style={styles.optionText}>Charity</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ScreenOne;
