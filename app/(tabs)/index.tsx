// HomeScreen.js
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://example.com/profile-pic.jpg' }}
            style={styles.profilePic}
          />
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Hi, welcome back!</Text>
            <Text style={styles.nameText}>John Amara</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.icon} />
            <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search pharmacy, drugs, coach..."
          />
        </View>

        <View style={styles.fundingCard}>
          <View>
            <Text style={styles.fundingTitle}>Start a funding campaign.</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://example.com/funding-image.jpg' }}
            style={styles.fundingImage}
          />
        </View>

        <View style={styles.healthResources}>
          <View style={styles.healthResourcesHeader}>
            <Text style={styles.healthResourcesTitle}>Health Resources</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.resourcesGrid}>
            {['Pharmacy', 'Medicine', 'Exercises', 'Health Food'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Ionicons name="medical" size={24} color="#6c5ce7" />
                </View>
                <Text style={styles.resourceText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  fundingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6c5ce7',
    borderRadius: 15,
    padding: 20,
    margin: 20,
  },
  fundingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b894',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: '#fff',
    marginRight: 5,
  },
  fundingImage: {
    width: 100,
    height: 100,
  },
  healthResources: {
    margin: 20,
  },
  healthResourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  healthResourcesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#00b894',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  resourceIcon: {
    backgroundColor: '#e0e0ff',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  resourceText: {
    textAlign: 'center',
  },
});

export default HomeScreen;