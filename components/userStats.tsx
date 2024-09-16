import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserStats = () => {
  return (
    <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color="#6c5ce7" />
            <Text style={styles.statValue}>215bpm</Text>
            <Text style={styles.statLabel}>Heart rate</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#6c5ce7" />
            <Text style={styles.statValue}>756cal</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="scale" size={24} color="#6c5ce7" />
            <Text style={styles.statValue}>103lbs</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
        </View>
  )}

export default UserStats;

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      statItem: {
        alignItems: 'center',
      },
      statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6c5ce7',
        marginTop: 5,
      },
      statLabel: {
        fontSize: 14,
        color: '#666',
      },
});